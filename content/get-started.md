---
title: Setup guide
description: Download Skint, run it with Docker Compose in a few minutes, then load your figures and add the household.
---

## What you need

- A computer or home server with **Docker** and **Docker Compose** installed (see [Install Docker](#install-docker) below)
- Your Expenditure spreadsheet, if you want to import existing figures

## Install Docker

Skint runs in Docker, so install Docker first. Pick the option for your system. You only need one.

### macOS or Windows: Docker Desktop

1. Download Docker Desktop from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) and install it.
2. On Windows, Docker Desktop uses WSL 2. If it asks you to enable it, follow the prompt and restart.
3. Open Docker Desktop and wait until it says it's running.

### macOS: OrbStack

OrbStack is a lighter alternative to Docker Desktop for Mac.

1. Download OrbStack from [orbstack.dev](https://orbstack.dev) and open it.
2. Finish the setup. OrbStack installs the `docker` and `docker compose` commands for you.

### Linux: Docker Engine

Docker's official install guide is at [docs.docker.com/engine/install](https://docs.docker.com/engine/install/). It covers Ubuntu, Debian, Fedora, CentOS and others. On Ubuntu or Debian, the steps are:

```bash
# Install Docker Engine and the Compose plugin from Docker's repository
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

To run `docker` without `sudo`, add your user to the `docker` group, then sign out and back in:

```bash
sudo usermod -aG docker $USER
```

### Check it works

Run these in a terminal. Both should print a version or a success message without errors:

```bash
docker --version
docker compose version
docker run --rm hello-world
```

Use `docker compose` with a space. The older `docker-compose` command isn't needed.

## 1. Download the files

Download the full app, or just the compose file and settings if you already have the source:

- [skint.zip](https://github.com/murraycollier/skint/releases/latest/download/skint.zip): the app source, Dockerfile and requirements
- [docker-compose.yml](https://github.com/murraycollier/skint/releases/latest/download/docker-compose.yml): publishes Skint on port 8080
- [env.example](https://github.com/murraycollier/skint/releases/latest/download/env.example): the settings file, to copy to `.env`

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

Skint is free. If it's useful, you can [buy me a coffee](https://buymeacoffee.com/murraycollier).
