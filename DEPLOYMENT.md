# SPYDR deployment

SPYDR uses one frontend with host-specific serverless routing.

## Vercel

- Import this repository with the project root set to the repository root.
- Use no build command and no output directory.
- Vercel automatically serves the files in `api/` as serverless functions.
- Add the environment variables listed below.

## Cloudflare Pages

- Connect this repository as a Pages project, using the repository root.
- Leave the build command empty and set the build output directory to `.`.
- The Pages Functions live in `functions/`; `wrangler.jsonc` enables Node compatibility for the existing API handlers.
- Set the same environment variables in the Pages project's production and preview environments.
- The root `_routes.json` keeps Functions limited to `/api/*`, so ordinary static assets are served directly.
- For CLI deployment, run `npm install` and then `npm run deploy`. The configured Pages project name is `spydr`.

## GitHub Pages

- Set the repository's Pages source to **GitHub Actions** once.
- The workflow checks out all five Git submodules recursively and builds a static copy.
- The build adjusts root-relative asset paths for the `u-spe.github.io/spydr/` project URL. It also supports a custom domain at the root.
- GitHub Pages cannot execute the API handlers. The static build points API requests at `https://spydr-delta.vercel.app` by default. You can override this by adding a GitHub Actions repository variable named `SPYDR_API_ORIGIN` with your Cloudflare Pages or other API deployment origin. The selected API host must allow cross-origin requests from GitHub Pages.

## Environment variables

Set these as secrets in Vercel and Cloudflare Pages. Never put their values in this repository.

| Variable | Used by |
| --- | --- |
| `GROQ_API_KEY` | Venomous chat |
| `YOUTUBE_API_KEY` | YouTube search |
| `YT_CONVERTER_SERVER` | YouTube video conversion endpoint |
| `TMDB_TOKEN` | Movie and TV metadata |

The YouTube converter service must be reachable from the serverless runtime. The frontend does not receive these secrets.

## Local preview

- `npm start` runs the Express static preview.
- `npm run preview` runs the Cloudflare Pages preview, including Pages Functions.
- The Express preview is for static UI checking; use the Pages preview to test the Cloudflare API adapters.
