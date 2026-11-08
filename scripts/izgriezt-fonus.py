"""
Noņem fonu kostīmu bildēm, lai kartītēs krāsainais aplis būtu aiz kostīma.

Lietošana (vienreiz: pip install "rembg[cpu]" pillow):
    python3 scripts/izgriezt-fonus.py                         # visām bildēm, kurām vēl nav izgriezuma
    python3 scripts/izgriezt-fonus.py kostimi/mascotas/x.jpg  # tikai norādītajām

Rezultāts: public/kostimi-izgriezti/<ceļš>.webp un atjaunots lib/costumeCutouts.json.
Pēc tam pārskati bildes (dažreiz modelis izgriež par daudz) un nosūti izmaiņas (git push).
"""
import json
import os
import sys

from PIL import Image
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public", "kostimi")
OUT = os.path.join(ROOT, "public", "kostimi-izgriezti")
MANIFEST = os.path.join(ROOT, "lib", "costumeCutouts.json")


def targets():
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            yield os.path.relpath(os.path.join(ROOT, "public", arg.lstrip("/")), SRC)
        return
    for folder, _, files in os.walk(SRC):
        for name in sorted(files):
            if name.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
                yield os.path.relpath(os.path.join(folder, name), SRC)


def main():
    session = new_session("isnet-general-use")
    for rel in targets():
        dst = os.path.join(OUT, os.path.splitext(rel)[0] + ".webp")
        if os.path.exists(dst) and len(sys.argv) == 1:
            continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        image = Image.open(os.path.join(SRC, rel)).convert("RGB")
        image.thumbnail((900, 900))
        cut = remove(image, session=session, post_process_mask=True)
        box = cut.getbbox()
        if box:
            cut = cut.crop(box)
        cut.thumbnail((640, 640))
        cut.save(dst, "WEBP", quality=86, method=5)
        print("✓", rel)

    done = []
    for folder, _, files in os.walk(OUT):
        for name in files:
            if name.endswith(".webp"):
                done.append(os.path.splitext(os.path.relpath(os.path.join(folder, name), OUT))[0])
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(sorted(done), f, ensure_ascii=False, indent=0)
    print(f"Gatavs: {len(done)} izgriezumi")


if __name__ == "__main__":
    main()
