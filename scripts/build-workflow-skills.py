"""Package the portfolio's original, public workflow skills as portable ZIPs."""
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
catalog = json.loads((root / 'src/data/workflowSkills.json').read_text(encoding='utf-8'))
license_text = (root / 'LICENSE').read_text(encoding='utf-8')
for item in catalog:
    slug = item['id']
    source = root / 'public/skills' / slug / 'SKILL.md'
    if not source.is_file():
        raise FileNotFoundError(source)
    with ZipFile(root / 'public/skills' / f'{slug}.zip', 'w', ZIP_DEFLATED) as archive:
        archive.writestr(f'{slug}/SKILL.md', source.read_text(encoding='utf-8'))
        archive.writestr(f'{slug}/LICENSE', license_text)
print(f'Packaged {len(catalog)} workflow skills with SKILL.md and MIT license.')
