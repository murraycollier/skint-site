---
title: Get started
description: Run Skint in Docker in a few minutes, then load your figures.
---

## What you need

- A computer or home server that runs Docker and Docker Compose
- Your Expenditure spreadsheet, if you want to import existing figures

## 1. Get the files

Get the Skint app folder. It contains the `docker-compose.yml`, the `Dockerfile` and a `.env.example` file.

## 2. Configure

Copy the example settings file and edit it:

```bash
cp .env.example .env
```

| Setting | What it does |
| --- | --- |
| `APP_PASSWORD` | Turns on the sign-in screen. Leave it empty to run without one. |
| `APP_USER` | The username for the sign-in screen. Defaults to `admin`. |
| `ALLOWED_HOSTS` | Domain names the app answers to, such as `skint.example.com,localhost`. |
| `MFA_REMEMBER_DAYS` | How many days a trusted browser stays signed in. Defaults to 7. Set 0 to ask every time. |

## 3. Start it

```bash
docker compose up -d --build
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## 4. Load your figures

On the first run the dashboard offers **Import spreadsheet**. Choose your `Expenditure.xlsx` file in **Settings** and the data is loaded.

Importing replaces everything stored, so download a backup first if you already have data.

Prefer to start fresh? Skip the import and add bills from the **Bills** page.

## 5. Add the household

Add each person in **Settings → People**. Everyone then sets up two-step sign-in: they scan a QR code with an authenticator app, enter the first code, and save their eight recovery codes.

## Keep your data safe

- Download a JSON backup from **Settings** regularly.
- Keep the Docker volume that holds the database. It's called `expenditure-data` by default.
- If you open Skint beyond your own network, set a password and put it behind HTTPS.

Need help? [Get in touch](mailto:you@example.com).
