---
title: "My homelab is up finally"
date: 2025-07-25
layout: layouts/blog.njk
---

Ever since I bought my (first ever) laptop, my desktop has been lying dormant. It had very good specs for my needs — Ryzen 3500X, GTX 1650 Super, 16 GB RAM, and two 240 GB SSDs (dedicated disks for Windows and Linux respectively) — but I needed the portability and flexibility of a laptop more.

I always had this vague idea of setting it up as a server, but I didn’t have a clear mental image of what that would look like. I could’ve figured that out with some tinkering, but I barely get around to that these days.

Recently, I’ve been thinking a lot about organizing my personal data: bookmarks, notes, docs, books, unread articles, music, movies, YouTube playlists, etc. Some of these are just lists of strings, others are actual files, some are both. This gave me enough clarity to finally take it up.

## Requirements

The very first thing I wanted to organize was my bookmarks.

Every time I’m online, I launch tens of tabs I want to come back to later. They sit in the tab bar, slowing everything down, until I either deal with them or give up. I usually just dump them in bookmarks once I’ve got too many — but that fragments everything. Sure, I could sync browser profiles, but I’m experimenting and don’t want to get locked into any browser’s ecosystem. And I simply want more control over my data.

I wanted a way to:

- Save bookmarks from both PC and phone (Android)
- Access and manage them from anywhere
- Not depend on some browser sync thing
- In future, integrate it with other tools I might deploy to manage my life

My first thought was: just write something. Maybe a browser extension + FastAPI/Django backend + Telegram bot. But this isn’t a particularly unique problem. There had to be a solid open-source project that already solves it.

I asked ChatGPT, and one of the options it suggested was Linkding — a self-hosted bookmark manager built with Django and a custom frontend. It looked simple, stable, and familiar. There’s a browser extension for desktop, several mobile apps, and even a Telegram bot. Sold.

## Proxmox

With this baseline requirement in mind, I started setting up the server.

I had come across [Proxmox](https://www.proxmox.com) several times on [Craft Computing](https://www.youtube.com/@CraftComputing/videos) and understood it as a good solution for hosting VMs on Linux. It also supports [LXC containers](https://linuxcontainers.org) and [ZFS](https://openzfs.org/wiki/Main_Page), which I could use later for backups and media.

I installed Proxmox on the dedicated Linux SSD and booted it up.

**Problem 1:** Proxmox insists on Ethernet, and I couldn’t run a cable or move the server near the router. I needed a quick fix, so I jury-rigged Wi‑Fi in two steps:

1. **USB tethering:** tethered my Android phone, switched Proxmox’s main bridge to the USB interface, updated gateway/DNS, and verified internet access.
2. **Wireless card:** installed the Wi‑Fi drivers, then repeated the same bridge and routing tweaks to move from USB to the onboard card.

It was a hack — static IPs, route adjustments, and DNS overrides — but it worked. Huge thanks to ChatGPT for guiding me through.

Next, I installed an Ubuntu Server VM.

**Problem 2:** Networking again. I’d have to redo a similar Wi‑Fi hack inside the VM. But worse — when using Wi‑Fi, Proxmox can’t create traditional network bridges, so I would need to set up NAT manually to allow internal routing.

At this point, I realized I was going to hit this same wall for _every_ VM or container I planned to run. I decided it wasn’t worth it.

Ubuntu Server is good enough for my use case. But again — no Wi‑Fi drivers out of the box. To avoid more hassle, I just went with Ubuntu Desktop.

## Ubuntu Desktop

I ditched Proxmox and installed Ubuntu Desktop directly. Then I installed [Coolify](https://coolify.io), an open-source PaaS.

Created a starter project, set up a Postgres DB… and **Problem 3**: SSD started dying.

Can’t remember if it shut down on its own or I rebooted — but it wouldn’t boot back. Diagnosed it with ChatGPT, ran checks — and yeah, disk was toast. Only 7% life left. Thankfully, there was no data in it to be lost.

That was it. I was too tired to keep pushing. Took a break.

## Round 3: Just Get It Working

I came back with one goal: no fancy tools, just get Linkding running.

Since my Windows SSD wasn’t doing anything anyway, I dual-booted Ubuntu Desktop onto it.

Set up Coolify again, launched a Postgres instance from a pre-built template, and then Linkding using its official Docker Compose. But they couldn’t talk to each other — some internal Docker network config was off. Debugging it inside Coolify was annoying, so I decided to simplify things further and drop Coolify as well. At this point, things were as simple as possible for me:

- No Proxmox
- No Coolify
- Just Ubuntu + Docker + Nginx + Tailscale

At the end, I was left with the tools I was most familiar with, and I was able to get the setup up and running in minutes this time. It’s just a simple Docker Compose script that defines the core app + DB, Nginx that handles routing of traffic landing in my server from the internet, and Tailscale Funnel bridging my server to the public internet.

Nginx routes requests to different services based on path — e.g. `/linkding` → Linkding container.

I’ll move to subdomain-based routing once I get a proper domain, but not right now.

## What’s Next?

I don’t trust local-only storage anymore — one dead SSD is enough. So I’ll eventually set up backups to a remote service like [Backblaze](https://www.backblaze.com) or [Wasabi](https://wasabi.com/pricing).

For now, I have a working home server running Linkding with Docker, Tailscale, and Nginx. I’ll build on top of this as needed.

That’s it. Not pretty, but it works. And I learned a lot.
