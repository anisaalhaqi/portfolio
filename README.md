# portfolio

Personal portfolio of Anisa Aulia, a UI/UX designer and researcher based in Bandung.

Live at **https://anisaalhaqi.github.io/portfolio**

## Stack

- Next.js 15 (App Router) with static export (`output: "export"`)
- React 19, TypeScript, CSS Modules
- Hosted on GitHub Pages under the `/portfolio` base path

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000/portfolio. The base path applies in development too, so `localhost:3000` alone returns a 404.

`npm run build` writes the static site to `out/`.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/data/projects.tsx` | Every case study and UI project, plus the block types they're built from |
| `src/data/otherWork.ts` | Papers, data, and code shown under Other Work on the home page |
| `src/app/page.tsx` | Home page, including the case study cards |
| `src/app/about/page.tsx` | About page: bio, experience, and awards |
| `src/components/ProjectPage/` | Renders a project page from its data |
| `public/` | Images, grouped in one folder per project |

## Adding or editing a project

Each entry in `projects` in `src/data/projects.tsx` has a `kind`:

- `case-study` is served at `/case-study/<slug>` and is laid out by the Design Thinking phases (Empathize, Define, Ideate, Prototype, Test). A phase with no blocks shows as pending.
- `ui` is served at `/ui-design/<slug>` and uses free-form sections.

Both are built from blocks such as `text`, `cards`, `mapping`, `showcase`, `images`, `compare`, and `metrics`. The `Block` type at the top of the file lists each one with a comment on its layout.

A few conventions:

- Image paths start with `/portfolio/` and encode spaces as `%20`, e.g. `/portfolio/Temu.in/Cover%20Temu.in.webp`.
- Leave an image's `src` empty to show an "Image coming soon" placeholder until it's exported.
- Case study cards on the home page live in `src/app/page.tsx`, separate from `projects.tsx`. Update both when a title, tag, or description changes.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `out/` to GitHub Pages. GitHub Pages caches pages for up to 10 minutes, so a hard refresh (Ctrl+Shift+R) may be needed to see a new deploy.
