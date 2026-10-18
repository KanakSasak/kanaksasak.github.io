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

## Images and diagrams

Store article images under `site/public/images/<article-slug>/` and reference them
in Markdown as `![Descriptive alternative text](/images/<article-slug>/figure.svg)`.
PNG, JPEG, WebP, and SVG images are supported. Article images scale to the text
column on smaller screens.

For an optional article banner, add these frontmatter properties:

```yaml
cover: /images/field-notes/banner.svg
coverAlt: "Describe the banner for readers using assistive technology."
coverCaption: "Optional caption."
```

Use a fenced code block with the language `mermaid` for diagrams. The article
layout renders them in the browser, follows the selected color theme, and
provides an expandable source view. Mermaid is bundled locally and loaded only
when a page has a diagram; it needs no server or external diagram service.
If rendering is unavailable or syntax is invalid, readers can still access the
source. See `field-notes.md` for a complete image and diagram example.

### Custom Mermaid palette

Diagram defaults are defined in `site/src/scripts/mermaid-theme.ts`. The light
and dark palettes match the site's blue process cards, pink decisions, lime
findings, and monospace type. All diagrams use these defaults automatically.
For optional semantic highlights in flowcharts, append `:::decision` to a node
for pink, or `:::finding` for lime. These classes adapt when the theme changes:

```text
A{Enough evidence?}:::decision --> B[Document findings]:::finding
```
