# CineGeek in SPYDR

CineGeek is isolated as a Next.js application under `/apps/mov`.

## Run in Codespaces

```bash
cd apps/mov
npm ci
cp .env.example .env.local
npm run dev
```

Open forwarded port 3000. The app is configured for the `/apps/mov` base path.

## Environment

Set `NEXT_PUBLIC_APP_URL` to the full public URL including `/apps/mov`, `NEXT_PUBLIC_SITE_NAME` to the display name, and `TMDB_READ_ACCESS_TOKEN` as a server-side secret. Optional analytics and social links are also supported. Never commit `.env.local` or deployment secrets.

## Build

```bash
npm ci
npm run build
npm start
```

This is a separate Next.js server app, not a static folder. SPYDR's existing Cloudflare Pages deployment will not automatically run this nested app; it needs a compatible Next.js runtime and routing for `/apps/mov/*`.
