---
title: Setup guide
description: Run Skint with Docker Compose in a few minutes, then load your figures and add the household.
---

## What you need

- A computer or home server with **Docker** and **Docker Compose** installed
- The Skint app folder you received when you bought it
- Your Expenditure spreadsheet, if you want to import existing figures

## 1. Create the compose file

In the Skint folder, create a file called `docker-compose.yml` with this content:

```yaml
services:
  skint:
    build: .
    container_name: skint
    restart: unless-stopped
    ports:
      - "8080:8000"
    environment:
      APP_USER: ${APP_USER:-admin}
      APP_PASSWORD: ${APP_PASSWORD:-}
      ALLOWED_HOSTS: ${ALLOWED_HOSTS:-}
      MFA_REMEMBER_DAYS: ${MFA_REMEMBER_DAYS:-7}
    volumes:
      - skint-data:/data

volumes:
  skint-data:
```

This publishes Skint on port 8080 of your machine and stores the database in a Docker volume called `skint-data`, so it survives restarts and rebuilds.

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

The `docker-compose.yml` in the app folder is set up for a Traefik proxy. It joins an external `proxy` network and publishes no port, so Traefik can route to it. If that's your setup, use that file instead of the one above, and set `ALLOWED_HOSTS` to your domain.

## Keep your data safe

- Download a JSON backup from **Settings** regularly, and keep a copy off the machine.
- Don't run `docker compose down -v`. The `-v` flag deletes the data volume.
- If you open Skint beyond your own network, set a password and put it behind HTTPS.

Need help? [Get in touch](mailto:you@example.com).
