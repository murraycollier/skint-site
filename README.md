# Skint website

Marketing site for Skint, built with [Hugo](https://gohugo.io) and published with GitHub Pages.

## Edit locally

```bash
hugo server            # http://localhost:1313
hugo --minify          # writes to public/
```

Replace the placeholders before launch: `price`, `buyUrl` and `contactEmail` in `hugo.toml`, and the contact email in `content/get-started.md`.

## Deploy

Every push to `main` runs `.github/workflows/pages.yml`, which builds the site and publishes it to GitHub Pages. In the repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
