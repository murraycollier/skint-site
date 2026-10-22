"""Pack the Skint app into dist/skint.zip.

Usage: python3 scripts/build_download.py /path/to/skint

Only an explicit list of files goes in, so .env, data and caches never do.
The compose file in the zip is the standalone one from release/,
not the app's own Traefik-specific docker-compose.yml.
"""

import sys
import zipfile
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "dist" / "skint.zip"
TOP_LEVEL = ["Dockerfile", ".dockerignore", "requirements.txt", "README.md", ".env.example"]
FOLDERS = ["app", "static"]


def main(source: Path) -> None:
    files = [source / name for name in TOP_LEVEL]
    for folder in FOLDERS:
        files += sorted(p for p in (source / folder).rglob("*") if p.is_file())
    files = [p for p in files if "__pycache__" not in p.parts and p.suffix != ".pyc"]
    missing = [str(p) for p in files if not p.exists()]
    if missing:
        raise SystemExit(f"Missing files: {missing}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in files:
            zf.write(path, path.relative_to(source).as_posix())
        zf.write(SITE / "release" / "docker-compose.yml", "docker-compose.yml")
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes, {len(files) + 1} files)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(Path(sys.argv[1]).resolve())
