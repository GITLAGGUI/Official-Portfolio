"""Measure application source bytes, excluding dependencies, media and generated output."""
import argparse
import datetime
import json
import math
import os
from collections import defaultdict
from pathlib import Path

EXTENSIONS = {
    '.ts': 'TypeScript', '.tsx': 'TypeScript', '.js': 'JavaScript', '.jsx': 'JavaScript', '.mjs': 'JavaScript', '.cjs': 'JavaScript',
    '.css': 'CSS', '.scss': 'SCSS', '.html': 'HTML', '.py': 'Python', '.sql': 'SQL', '.cs': 'C#', '.dart': 'Dart', '.php': 'PHP', '.ps1': 'PowerShell', '.sh': 'Shell',
}
SKIP = {'node_modules', 'dist', 'build', 'public', 'qa', 'output', 'outputs', 'graphify-out', 'dataset', 'datasets', 'weights', 'tmp', 'venv', '__pycache__', 'coverage', 'site-packages', 'vendor'}
parser = argparse.ArgumentParser()
parser.add_argument('--source', action='append', required=True, help='project-slug=source-directory')
args = parser.parse_args()
groups = defaultdict(list)
for source in args.source:
    slug, folder = source.split('=', 1)
    groups[slug].append(Path(folder).resolve())
records = {}
for slug, roots in groups.items():
    sizes, files, visited = defaultdict(int), 0, set()
    for root in roots:
        if not root.is_dir():
            raise SystemExit(f'Missing source directory for {slug}: {root}')
        for current, directories, names in os.walk(root):
            directories[:] = [name for name in directories if name not in SKIP and not name.startswith('.')]
            for name in names:
                file = Path(current, name)
                if file.suffix.lower() not in EXTENSIONS or file.name.endswith('.d.ts') or file.resolve() in visited:
                    continue
                visited.add(file.resolve())
                sizes[EXTENSIONS[file.suffix.lower()]] += file.stat().st_size
                files += 1
    total = sum(sizes.values())
    rows = [{'name': name, 'bytes': size, 'units': math.floor(size / total * 1000), 'fraction': size / total * 1000 % 1} for name, size in sorted(sizes.items(), key=lambda item: -item[1])]
    for row in sorted(rows, key=lambda item: -item['fraction'])[:1000-sum(row['units'] for row in rows)]:
        row['units'] += 1
    records[slug] = {'basis': 'Application source bytes', 'measured': datetime.date(2026, 10, 21).isoformat(), 'files': files, 'totalBytes': total, 'languages': [{'name': row['name'], 'bytes': row['bytes'], 'percent': row['units'] / 10} for row in rows]}
    print(slug, f'{files} source files:', ', '.join(f"{row['name']} {row['units']/10}%" for row in rows))
Path('src/data/projectLanguages.json').write_text(json.dumps(records, indent=2) + '\n', encoding='utf-8')
