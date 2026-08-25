# SWDL Salon Website

Official multi-page website for **SWDL Salon** — a premium unisex salon (hair, braids, colouring, nails, makeup, barbering &amp; spa). The business is currently **FOR SALE** by **Seedwel Investment Limited**.

## Pages

| Page | File | Highlights |
|---|---|---|
| Home | `index.html` | Auto-playing hero slideshow, stats, previews, featured auto-slider, for-sale teaser |
| About | `about.html` | Story, values, stats |
| Services | `services.html` | 6 service cards + indicative price list |
| Gallery | `gallery.html` | Auto-scrolling marquee, featured auto-slider, full photo grid + lightbox |
| For Sale | `for-sale.html` | Sale details, what's included, purchase process, FOR SALE stamp |
| Contact | `contact.html` | Contact cards (SWDL · xxxxx · xxxxx · abc), form, opening hours |

## Structure

```
├── index.html / about.html / services.html / gallery.html / for-sale.html / contact.html
├── css/style.css     # Shared styling (dark + gold luxury theme)
├── js/main.js        # Auto-playing sliders, marquee, lightbox, active nav
├── images/           # Salon imagery (hero + gallery)
└── vercel.json       # Vercel config (clean URLs)
```

## Run locally

```bash
python3 -m http.server 8000 --bind 0.0.0.0
# open http://localhost:8000
```

## Deploy to Vercel

This is a plain static site — no build step required.

1. Go to [vercel.com/new](https://vercel.com/new) and import the `prayerdome0/Saloon` repository.
2. Framework preset: **Other** · Build command: *(none)* · Output directory: *(root)*.
3. Click **Deploy** — done. Every push to the repo auto-deploys afterwards.
4. To serve this branch as production: **Project Settings → Git → Production Branch → `arena/01a038a1-saloon`**, or merge it into `main`.

© Seedwel Investment Limited. All Rights Reserved.

> Replace the placeholder contact details (`xxxxx`, `abc`) with the real email, phone number and address before publishing.
