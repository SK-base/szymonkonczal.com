# Tasks – Future Improvements

Actionable task list grouped by area. Use checkboxes to track progress.

---

## Phase 1 – Theme and layout

### UI – Theme and colors

- [x] **(TASK-001)** Use white/dirty-white background (#FAFAFA) and dark-almost-black (#292727); set main active color to dark green (#204136).
  - Files: `app/globals.css`
- [x] **(TASK-002)** Implement dark mode (CSS variables + class on `html` or `body`, persist preference).
  - Files: `app/globals.css`, `app/layout.tsx` (or theme provider)
- [x] **(TASK-003)** Apply new palette in `app/globals.css` (and dark variant) and ensure components use semantic tokens.

### UI – Bottom bar

- [x] **(TASK-004)** Add a footer component with: copyright 2007–2026, “Made with ❤️ by Szymon Konczal”, theme toggle (light/dark), social links (LinkedIn, GitHub, X, Instagram).
  - New file: `components/layout/Footer.tsx` (or equivalent)
- [x] **(TASK-005)** Integrate footer into `app/layout.tsx`.

### UI – Logotype

- [x] **(TASK-006)** Logotype in circle: white initials on black circle (light mode), reversed in dark mode; use in NavBar (replace or wrap current “SK” link).
  - Files: `components/layout/NavBar.tsx`, optionally a `components/layout/Logotype.tsx`

---

## Phase 2 – Navigation and content structure

### UI – Menu and nav

- [x] **(TASK-007)** Make menu items uppercase via CSS only (no text change) in `components/layout/NavBar.tsx`.
- [x] **(TASK-008)** Add “Tags” link below Articles/Notes in nav (e.g. link to `/tags` index or dedicated tags page).
  - Files: `components/layout/NavBar.tsx`
- [x] **(TASK-009)** Add hamburger menu for narrow viewports; show full nav in drawer/sheet on toggle.
  - Files: `components/layout/NavBar.tsx` (or new mobile nav component)

### UI – Default note and article view

- [ ] **(TASK-010)** Move tags below post content (or below title block) on default note and article single pages.
  - Files: `app/note/[slug]/page.tsx`, `app/articles/[slug]/page.tsx`
- [ ] **(TASK-011)** Use monospace font (e.g. Courier New) for tags in note/article.
  - Files: `app/note/[slug]/page.tsx`, `app/articles/[slug]/page.tsx`, possibly `app/globals.css`

### UI – Pagination

- [ ] **(TASK-012)** Redesign `components/blog/Pagination.tsx` (visual/style; keep accessibility).

---

## Phase 3 – New pages and content

### Content – About page

- [ ] **(TASK-013)** Add photo (asset + layout).
  - Files: `app/about/page.tsx`, `public/images/` or equivalent
- [ ] **(TASK-014)** Add description and sections for technology and specialization.
  - Files: `app/about/page.tsx`
- [ ] **(TASK-015)** Add MailerLite mailing list widget.
  - Files: `app/about/page.tsx`
- [ ] **(TASK-016)** Add contact email (e.g. mailto or contact section).
  - Files: `app/about/page.tsx`

### Content – New pages

- [ ] **(TASK-017)** Add Search page: large search input at top, list of tags with usage count below.
  - New route: `app/search/page.tsx` (or equivalent); extend `lib/content/tags.ts` for tag usage counts
- [ ] **(TASK-018)** Add Philosophy subpage (route + content).
  - New route: `app/philosophy/page.tsx` (or equivalent)

---

## Phase 4 – Content and distribution

### Content – RSS and mailing list

- [ ] **(TASK-019)** Add RSS feed (route + feed generation for notes and articles).
  - New route: e.g. `app/feed.xml/route.ts` or `app/rss/route.ts`
- [ ] **(TASK-020)** Integrate MailerLite (form/embed or API) where needed (e.g. About, optional elsewhere).

### Content – Notes

- [ ] **(TASK-021)** Add Previous/Next note links on note single page (ordered by date; get adjacent slugs from `lib/content/notes.ts`).
  - Files: `app/note/[slug]/page.tsx`, `lib/content/notes.ts`

### Optional

- [ ] **(TASK-022)** Share posts on social media (e.g. share buttons or links; scope TBD).

---

## Phase 5 – Technical quality and delivery

### Technical – Content status

- [ ] **(TASK-023)** Add status field (e.g. DRAFT, PUBLISHED) to note/article frontmatter and Zod schemas.
  - Files: `lib/types/note.ts`, `lib/types/article.ts`, content MDX frontmatter
- [ ] **(TASK-024)** Filter to only PUBLISHED in production; allow DRAFT in dev (e.g. via `process.env.NODE_ENV` or env flag).
  - Files: `lib/content/notes.ts`, `lib/content/articles.ts`

### Technical – Testing

- [ ] **(TASK-025)** Add unit tests (e.g. Vitest or Jest) for `lib/content` and key utilities.
- [ ] **(TASK-026)** Add E2E tests with Playwright (critical paths: home, note, article, search if implemented).

### Technical – Analytics and SEO

- [ ] **(TASK-027)** Add Google Analytics (e.g. script in layout or `next/script`).
  - Files: `app/layout.tsx`
- [ ] **(TASK-028)** Document SEO improvements in a list (meta tags, Open Graph, sitemap, etc.) in TASKS or a dedicated doc.

### Technical – Pipeline and deployment

- [ ] **(TASK-029)** Ensure pipeline runs on PR and runs all checks (typecheck, lint, build).
  - Files: `.github/workflows/deploy.yml`
- [ ] **(TASK-030)** Add Vercel preview deployment (deploy on PR; production on push to `main`).
  - Files: `.github/workflows/deploy.yml`
- [ ] **(TASK-031)** Document required Vercel/GitHub secrets and any preview-specific config (e.g. in README or AGENTS.md).
