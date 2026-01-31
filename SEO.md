# SEO improvements checklist

This document is a checklist of SEO improvements for the personal homepage. Implementation is tracked separately in [TASKS.md](TASKS.md) or future tickets. Use the checkboxes below to track progress as items are implemented.

---

## 1. Meta tags and titles

- [x] **Title template** – Use Next.js `metadata.title.template` (e.g. `%s | Szymon Konczal`) in root layout so child pages get consistent branding.
- [x] **Per-page titles** – Set unique `title` for homepage, `/about`, `/articles`, `/note`, `/projects`, `/tags`, and dynamic routes (`/articles/[slug]`, `/note/[slug]`, `/tags/[tag]`).
- [x] **Meta description** – Set `description` per page; for articles/notes use excerpt (see section 6) or first N characters of content; keep length ~150–160 characters.
- [x] **Canonical URL** – Set `metadata.alternates.canonical` for each page (absolute URL) to avoid duplicate-content issues (e.g. with/without trailing slash or query params).

## 2. Open Graph (OG)

- [ ] **og:title, og:description, og:url, og:type** – Populate via Next.js `metadata.openGraph`; use article title/description and canonical URL; `type`: `website` for listing/about, `article` for posts.
- [ ] **og:image** – Default image for the site (e.g. logo or banner); for articles/notes use `featuredImage` from frontmatter when present.
- [ ] **og:site_name** – Site name (e.g. "Szymon Konczal").
- [ ] **og:locale** – e.g. `en_US` (optional but good practice).

## 3. Twitter Cards

- [ ] **twitter:card** – `summary_large_image` when image available, else `summary`.
- [ ] **twitter:title, twitter:description, twitter:image** – Mirror OG or set explicitly via `metadata.twitter`.

## 4. Sitemap and robots

- [ ] **Sitemap** – Add `app/sitemap.ts` (Next.js 13+ convention) or static `public/sitemap.xml`; include homepage, about, articles list, note list, projects, tags index, and all article/note/tag URLs; set `lastmod` from content dates where possible.
- [ ] **robots.txt** – Add `app/robots.ts` or `public/robots.txt`; allow crawlers and reference sitemap URL (e.g. `https://szymonkonczal.com/sitemap.xml`).

## 5. Structured data (JSON-LD)

- [ ] **Person** – On about page (and optionally layout), add JSON-LD for the site author (name, url, sameAs for social links).
- [ ] **BlogPosting / Article** – On article and note single pages: headline, datePublished, dateModified, author, description, optional image.

## 6. Per-page metadata implementation notes

- [ ] **generateMetadata** – Article/note pages should use `generateMetadata({ params })` to read content by slug and return title, description, openGraph, twitter; need a way to get description (excerpt) per post—see next.
- [ ] **Description source for posts** – Either: (a) add optional `description` or `excerpt` to note/article frontmatter and Zod schemas, or (b) derive from first paragraph or first N characters of `content` (strip MDX). Document the chosen approach when implementing.

## 7. Technical and performance

- [x] **Language** – `lang="en"` on `<html>` (already set in `app/layout.tsx`).
- [x] **Favicon** – `app/favicon.ico` present; apple-touch-icon and other sizes are optional improvements.
- [x] **Viewport** – Next.js sets viewport by default; no action unless overriding.
- [ ] **Core Web Vitals** – Static generation and Next.js Image (where used) support LCP/CLS; optional monitoring (e.g. with TASK-027 analytics or Vercel Analytics).

## 8. Content and UX (SEO-adjacent)

- [x] **Semantic HTML** – Already using `<article>`, `<time>`, headings; helps crawlability and accessibility.
- [x] **Internal linking** – Tag pages and nav already link content; clear hierarchy (home → sections → posts) and links from posts to related/tag pages are good for SEO.
- [ ] **RSS** – RSS feed (TASK-019) can help discovery and repeat visits; link from doc to that task when implemented.

---

## References

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph protocol](https://ogp.me/)
- [Google Search Central – Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google Search Central – Structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
