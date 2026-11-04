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

## Google discovery and indexing

The production build generates `/sitemap-index.xml` and its sitemap files using
Astro's sitemap integration. New local pages are included automatically; the
404 page is excluded and has a `noindex` tag. `/robots.txt` allows crawling and
points to the sitemap index. Canonical URLs use a consistent trailing slash.
The homepage and local articles render their text and links as static HTML.
External publication links remain on their publishers' domains and are not
included in this site's sitemap.

After deploying these changes:

1. Open https://search.google.com/search-console and add a **URL prefix** property
   for `https://kanaksasak.github.io/`.
2. Verify ownership using the **HTML tag** method. Copy only the tag's `content`
   value into a GitHub repository Actions variable named
   `PUBLIC_GOOGLE_SITE_VERIFICATION` (**Settings > Secrets and variables > Actions
   > Variables**). The deployment workflow passes it to Astro at build time.
   Redeploy, check that the meta tag appears in the live page source, then click
   **Verify** in Search Console. Keep the variable after verification. For local
   verification builds, copy `site/.env.example` to `site/.env` and set the value.
3. In **Sitemaps**, submit `sitemap-index.xml`. Check that Google can read it.
4. In **URL Inspection**, inspect the homepage and both local articles:
   `/research/git-hook-campaign/` and `/research/field-notes/`. Use **Test live URL**
   to check eligibility, then **Request indexing** for each URL.
5. Monitor **Page indexing** and URL Inspection for the actual exclusion reason,
   Google-selected canonical, and last crawl. Check **Manual actions** and
   **Security issues** if Search Console reports problems.

The verification token is public metadata, not a password. Google Analytics
tracking alone does not submit pages for indexing. A sitemap helps Google
discover pages but does not guarantee indexing or ranking. Crawling can take
days to weeks; repeated requests do not speed it up. Link to this blog from
your GitHub profile and relevant author profiles so readers and crawlers can
discover it naturally.

Google's guides:
[request a crawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
and [submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

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
