# KanakSasak Research Blog

Static Astro website for https://kanaksasak.github.io/.

## Local development

Requires Node.js 24 and pnpm 11.25.0.

```sh
cd site
pnpm install --frozen-lockfile
pnpm dev --background
```

Open the localhost URL printed by Astro. Stop it with `pnpm exec astro dev stop`.

## Production build

```sh
cd site
pnpm build
```

The complete static website is generated in `site/dist/`. GitHub Pages serves
this output; it does not require a running Node server.

## Publish on GitHub Pages

1. In the repository's **Settings > Pages > Build and deployment**, select
   **GitHub Actions** as the source.
2. Commit and push the source, including `site/pnpm-lock.yaml` and
   `.github/workflows/deploy.yml`, to `main`.
3. Open **Actions > Deploy Astro** and verify that both build and deploy succeed.
4. Visit https://kanaksasak.github.io/.

The workflow installs Node.js 24 and pnpm 11.25.0, builds the project in `site/`,
uploads its `dist/` directory, and deploys the artifact to GitHub Pages. Future
pushes to `main` deploy automatically. It can also be run with **Run workflow**.

The Astro configuration uses static output and the root GitHub Pages address.
No repository subpath or hosting adapter is needed. Keep `node_modules/`,
`.astro/`, and `dist/` out of Git; they are ignored and generated during builds.

Official deployment guide: https://docs.astro.build/en/guides/deploy/github/

## Theme and writing

The custom theme uses oversized type, an atmospheric signal animation, retro
analysis windows, and a searchable research archive. Animations respect reduced
motion preferences. It remains a static site compatible with GitHub Pages.

- Homepage and interactions: `site/src/pages/index.astro`
- Research archive entries: `site/src/data/research.ts`
- Shared styles: `site/src/styles/global.css`
- Shared navigation and metadata: `site/src/layouts/Base.astro`
- Article layout: `site/src/layouts/Article.astro`

To add a local article, create a Markdown file in `site/src/pages/research/`.
Copy the frontmatter from `field-notes.md`, then update its title, description,
and display date. Add an entry in the archive data with its `/research/slug/`
URL. Second-level headings automatically appear in the article's table of
contents. The introductory field note is starter editorial copy to review
before publication. Existing research links open at their original publisher.

The header's sun/moon control switches between light and dark themes on every
page. The first visit follows the device color scheme; an explicit selection
is saved in local storage and synchronized between tabs. If storage is blocked,
the control still works for the current page. Theme selection runs before the
page paints to avoid flashing the wrong background.
