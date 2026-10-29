"""Rebuild responsive preview assets; full case-study media stays unchanged.

Run with Python + Pillow after changing image paths in projects.ts.
"""
import hashlib
import json
from pathlib import Path
import re

from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
output = root / "public/assets/project-previews"
output.mkdir(parents=True, exist_ok=True)
paths = set(re.findall(r"['\"](/assets/[^'\"]+\.(?:webp|png|jpe?g))['\"]", (root / "src/data/projects.ts").read_text(encoding="utf-8")))
manifest = {}
for src in sorted(paths):
    source = root / "public" / src.lstrip("/")
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
        variants = []
        for width in sorted({min(image.width, size) for size in (320, 480, 640, 960)}):
            name = f"{digest}-{width}.webp"
            image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS).save(output / name, "WEBP", quality=78, method=6)
            variants.append(f"/assets/project-previews/{name} {width}w")
        manifest[src] = ", ".join(variants)
(root / "src/data/projectPreviews.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(f"Prepared {len(manifest)} responsive project images.")
