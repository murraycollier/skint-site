# Skint website

Marketing site for Skint, a free self-hosted household money tracker. Built with [Hugo](https://gohugo.io) and published with GitHub Pages at https://skint.site.

## Edit locally

```bash
hugo server            # http://localhost:1313
hugo --minify          # writes to public/
```

Replace the placeholder in `hugo.toml` before launch: `coffeeUrl`, which should point to your Buy Me a Coffee page. The same link is in `content/get-started.md`.

## Publish a new app release

Downloads and issues live in the public [skint](https://github.com/murraycollier/skint) repo, not here. To publish a new version:

```bash
python3 scripts/build_download.py /path/to/skint     # writes dist/skint.zip
cp release/docker-compose.yml release/env.example dist/
gh release create vX.Y.Z dist/skint.zip dist/docker-compose.yml dist/env.example --repo murraycollier/skint
```

The script packs an explicit list of files (the Dockerfile, requirements, README, `.env.example`, `app/` and `static/`), so `.env`, data and caches stay out. The compose file in the zip comes from `release/docker-compose.yml`.

The site links to `releases/latest/download/`, so each new release updates the downloads automatically.

## Deploy

Every push to `main` runs `.github/workflows/pages.yml`, which builds the site and publishes it to GitHub Pages. The custom domain comes from `static/CNAME`. In the repo settings, **Pages → Build and deployment → Source** must be **GitHub Actions**.
