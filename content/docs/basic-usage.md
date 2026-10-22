---
title: Basic usage
description: Signing in, reading the overview, managing bills and income, and keeping your data safe.
weight: 1
---

## Signing in

If your household has turned on sign-in (by setting `APP_PASSWORD`), you sign in with two steps:

1. Your **username** and **password**.
2. A **six-digit code** from your authenticator app.

The first time you sign in, you scan a QR code with your authenticator app and enter the first code. Skint then shows **eight recovery codes**. Save them somewhere safe, because each one works once and they aren't shown again.

Browsers you trust stay signed in for the number of days set by `MFA_REMEMBER_DAYS` (7 by default), so you won't be asked for a code on that browser until then.

If you lose your phone, an admin can reset your two-step sign-in under **Settings → People → Reset 2-step**. You'll set it up again the next time you sign in.

To change your password, go to **Settings** and choose **Change password**.

## Overview

The overview is the home page. It shows:

- **Take-home**: the household's monthly take-home pay, and who it comes from.
- **Outgoings**: the total of your direct debits, and what share of pay that is.
- **Left over**: what's left after outgoings.
- **Next to leave**: the next bill due.
- **Where the pay goes**: a donut chart of each category, with the amount left over.
- **Household split**: each person's share of take-home pay.
- **Coming up**: the next five bills, by due date.
- **Year ahead**: a twelve-month outlook.
- **Top 5 costs**: your biggest categories.

Use **All bills** on the overview to go to the full list.

## Bills

The **Bills** page lists every direct debit, with its amount, due day, category, payer and account holder.

- **Add a bill**: choose **Add bill**. A new row opens at the top of the list. Fill it in and press `Enter` to save.
- **Change a bill**: click any cell in its row and type. Press `Enter` to save, or `Escape` to cancel.
- **Search**: type in the search box to filter the list.
- **Monthly or annual**: switch between monthly and annual totals.
- **Sort and filter columns**: use the menu on a column heading to sort it, or to filter by a category, payer or account holder.
- **Delete a bill**: open the bill's details and choose **Delete**.

## Income

The **Income** page shows each earner's take-home pay, gross pay and what's left after outgoings, along with the household total.

- **Add an earner** with **Add earner**, then enter their name, gross pay and take-home pay.
- The **household split** shows each person's share of the total take-home pay.

## Settings

**Settings** has three parts:

- **People**: add household members, rename them, pick a colour and a photo, or remove them. Each person's name is used as the payer or account holder on bills and accounts.
- **Your data**: download a JSON backup, restore a JSON backup, export a formatted Excel workbook, or import your spreadsheet.
- **Password**: change the password you sign in with.

Skint follows your device's light or dark setting automatically.

## Backups

Download a JSON backup from **Settings → Your data** regularly, and keep a copy off the machine.

Restoring a backup and importing a spreadsheet both **replace everything stored**, so download a backup first if you have data you want to keep.
