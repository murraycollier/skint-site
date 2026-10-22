# Skint website

Marketing site for Skint, a free self-hosted household money tracker. Built with [Hugo](https://gohugo.io) and published with GitHub Pages at https://skint.site.

## Edit locally

```bash
hugo server            # http://localhost:1313
hugo --minify          # writes to public/
```

Replace the placeholder in `hugo.toml` before launch: `coffeeUrl`, which should point to your Buy Me a Coffee page. The same link is in `content/get-started.md`.

## Refresh the app download

The site offers `static/downloads/skint.zip`, built from the Skint app folder. Rebuild it whenever the app changes:

```bash
python3 scripts/build_download.py /path/to/skint
```

The script packs an explicit list of files (the Dockerfile, requirements, README, `.env.example`, `app/` and `static/`), so `.env`, data and caches stay out. The zip's compose file comes from `static/downloads/docker-compose.yml`. Edit that file to change the compose setup for downloads.

## Deploy

Every push to `main` runs `.github/workflows/pages.yml`, which builds the site and publishes it to GitHub Pages. The custom domain comes from `static/CNAME`. In the repo settings, **Pages → Build and deployment → Source** must be **GitHub Actions**.
