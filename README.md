# Bali Doctor Now

Marketing site for **Bali Doctor Now** — travelers in Bali can message on WhatsApp to request a licensed doctor visit at their hotel or villa.

Stack: [Vite](https://vite.dev/) + [React](https://react.dev/). Static output (`dist/`) — ideal for [Cloudflare Pages](https://developers.cloudflare.com/pages/).

**GitHub:** https://github.com/Moko51/bali-doctor-now

## Local development

Requirements: Node.js **20+** (22 recommended).

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Other scripts:

| Command        | Purpose              |
| -------------- | -------------------- |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | Run oxlint           |

## Site configuration

Contact links and analytics are controlled in **`src/config.js`**, or via Cloudflare **environment variables** at build time (see below).

| Setting    | Config constant | Optional env var (Cloudflare) |
| ---------- | --------------- | ----------------------------- |
| WhatsApp   | `WA_NUMBER`     | `VITE_WA_NUMBER`              |
| Email      | `EMAIL`         | `VITE_EMAIL`                  |
| Google Analytics 4 | `GA_ID` | `VITE_GA_ID`                  |

WhatsApp prefill text is in `WA_TEXT` in the same file. Leave `GA_ID` as `G-XXXXXXXXXX` (or omit `VITE_GA_ID`) to disable analytics.

After changing config, commit and push (Git deploy) or run `npm run build` and redeploy (CLI).

## Deploy to Cloudflare Pages

### Option A — Connect GitHub (recommended)

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Choose **GitHub** and authorize access to **`Moko51/bali-doctor-now`**.
3. Use these **Build settings**:

   | Field | Value |
   | ----- | ----- |
   | Production branch | `main` |
   | Framework preset | None (or Vite) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave empty)* |

4. **Environment variables** (optional, **Production** and **Preview** as needed):

   - `NODE_VERSION` = `22` (if the build image does not pick up `.node-version`)
   - `VITE_GA_ID` = your GA4 measurement ID (e.g. `G-XXXXXXXXXX`)
   - `VITE_WA_NUMBER` / `VITE_EMAIL` if you prefer not to edit `src/config.js`

5. **Save and Deploy**. Each push to `main` triggers a new production deployment.

6. **Custom domain** (e.g. `balidoctornow.com`): Pages project → **Custom domains** → add domain and follow DNS instructions (Cloudflare can proxy the zone or you add the CNAME they provide).

### Option B — Wrangler CLI

Install and log in once:

```bash
npm install -g wrangler
wrangler login
```

Build and deploy:

```bash
npm run build
npx wrangler pages deploy dist --project-name=bali-doctor-now
```

First deploy may prompt to create the Pages project. `wrangler.toml` in this repo sets `pages_build_output_dir` for consistency.

Optional: set production env vars in the dashboard (**Settings → Environment variables**) so Git and CLI builds behave the same.

## Files added for Cloudflare

| File | Role |
| ---- | ---- |
| `wrangler.toml` | Pages project name and output directory for Wrangler |
| `.node-version` | Node version hint for CI / Pages |
| `public/_headers` | Security headers on static assets |
| `public/_redirects` | SPA fallback (`/*` → `index.html`) for deep links |

## Project layout

```
index.html          # HTML shell, meta, canonical
public/             # Static assets (copied to dist/)
src/App.jsx         # Page content and sections
src/config.js       # WhatsApp, email, GA defaults + env overrides
src/analytics.js    # GA4 loader and event helpers
src/index.css       # Styles (from original landing page)
```

## License

Private project — all rights reserved unless stated otherwise.
