---
title: Setup guide
description: Download Skint, run it with Docker Compose in a few minutes, then load your figures and add the household.
---

## What you need

- A computer or home server with **Docker** and **Docker Compose** installed
- Your Expenditure spreadsheet, if you want to import existing figures

## 1. Download the files

Download the full app, or just the compose file and settings if you already have the source:

- [skint.zip](/downloads/skint.zip): the app source, Dockerfile and requirements
- [docker-compose.yml](/downloads/docker-compose.yml): publishes Skint on port 8080
- [env.example](/downloads/env.example): the settings file, to copy to `.env`

Unzip `skint.zip` into a new folder, then put `docker-compose.yml` in the same folder.

## 2. Configure

Copy the example settings file and open it in a text editor:

```bash
cp .env.example .env
```

| Setting | What it does |
| --- | --- |
| `APP_PASSWORD` | Turns on the sign-in screen. Leave it empty to run without one. |
| `APP_USER` | The username for the sign-in screen. Defaults to `admin`. |
| `ALLOWED_HOSTS` | Domain names the app answers to, such as `skint.example.com,localhost`. Leave empty to accept any address. |
| `MFA_REMEMBER_DAYS` | How many days a trusted browser stays signed in without a code. Defaults to 7. Set 0 to ask every time. |

If you set `ALLOWED_HOSTS`, include `localhost` as well if you plan to open the app from the same machine.

## 3. Start it

```bash
docker compose up -d --build
```

The first build takes a minute or two. Open [http://localhost:8080](http://localhost:8080) in your browser.

Useful commands:

```bash
docker compose ps            # check the container is running
docker compose logs -f skint # follow the app's log
docker compose restart skint # restart after changing .env
docker compose down          # stop the app (your data is kept)
```

## 4. Load your figures

On the first run the dashboard offers **Import spreadsheet**. Choose your `Expenditure.xlsx` file in **Settings** and the data is loaded.

Importing replaces everything stored, so download a backup first if you already have data.

Prefer to start fresh? Skip the import and add bills from the **Bills** page.

## 5. Add the household

Add each person in **Settings → People**. Everyone then sets up two-step sign-in: they scan a QR code with an authenticator app, enter the first code, and save their eight recovery codes.

## Already running Traefik?

The app's own `docker-compose.yml`, which is not in the download, joins an external `proxy` network and publishes no port, so Traefik can route to it. If that's your setup, write your own compose file along those lines and set `ALLOWED_HOSTS` to your domain.

## Keep your data safe

- Download a JSON backup from **Settings** regularly, and keep a copy off the machine.
- Don't run `docker compose down -v`. The `-v` flag deletes the data volume.
- If you open Skint beyond your own network, set a password and put it behind HTTPS.

## Enjoying it?

Skint is free. If it's useful, you can [buy me a coffee](https://www.buymeacoffee.com/YOURNAME).
