# Channi Transport Website

A plain HTML + CSS + Vanilla JS website for Channi Transport – a family-run tempo transport business in Samana, Punjab.

## Files

```
index.html          – main page
css/style.css       – all styles
js/frames.js        – frame manifest (FRAME_COUNT + FRAMES array)
js/translations.js  – EN / HI / PA dictionary
js/main.js          – all page logic
frames/fr_001.webp  – fr_240.webp  (video frames)
vercel.json         – Vercel config (cleanUrls + cache headers)
.gitignore
```

## Run locally

Open `index.html` directly in your browser, or serve with any static server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit http://localhost:8080

## What to edit

| What | Where |
|------|-------|
| Phone numbers | `index.html` – search for `tel:` and `wa.me` |
| Translations / text | `js/translations.js` |
| Frame count | `js/frames.js` – change `FRAME_COUNT` |
| Stats numbers | `index.html` – `data-n` attributes on `.stat-n` elements |
| Colors / fonts | `css/style.css` – `:root` tokens at the top |

## Add more frames

1. Export your video: `ffmpeg -i video.mp4 -vf "fps=12,scale=960:-1" -c:v libwebp -quality 55 frames/fr_%03d.webp`
2. Update `FRAME_COUNT` in `js/frames.js`

## Deploy to Vercel

1. Push to a GitHub repo
2. Import the repo on [vercel.com](https://vercel.com)
3. Set Framework Preset to **Other** (no build step)
4. Click Deploy