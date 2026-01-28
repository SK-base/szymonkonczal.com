# AGENTS.md - Project Architecture Guide

## Overview
This is a personal homepage/blog built with Next.js, featuring notes, articles, projects, and an about page. The site is optimized for static generation and deployed on Vercel.

## Architecture

### Tech Stack
- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom color palette
- **UI Components**: shadcn/ui
- **Content**: MDX files with frontmatter
- **Validation**: Zod schemas
- **Package Manager**: pnpm

### Directory Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with NavBar
│   ├── page.tsx           # Homepage
│   ├── note/              # Notes pages
│   ├── articles/          # Articles pages
│   ├── projects/          # Projects page
│   ├── about/             # About page
│   └── tags/              # Tag filtering pages
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (NavBar)
│   ├── blog/              # Blog-specific components
│   └── article-components/ # Reusable article components
├── content/               # Content files
│   ├── notes/            # Note MDX files
│   ├── articles/         # Article MDX files
│   └── projects.json     # Projects data
├── lib/
│   ├── content/          # Content loading utilities
│   ├── types/            # TypeScript types and Zod schemas
│   ├── utils/            # Utility functions
│   └── mdx.tsx           # MDX rendering configuration
└── articles/             # Custom article components (optional)
    └── [slug]/
        └── index.tsx      # Custom React component for article
```

## Content Management

### Adding a Note
1. Create a new `.mdx` file in `content/notes/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Note Title"
   date: "2026-01-28"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write content in MDX format
4. File will automatically appear in notes list and homepage

### Adding an Article
1. Create a new `.mdx` file in `content/articles/`
2. Add frontmatter (same format as notes)
3. Optionally create custom component in `articles/[slug]/index.tsx`
4. If custom component exists, it will be used instead of MDX rendering

### Custom Article Components
- Place custom React components in `articles/[slug]/index.tsx`
- Component receives article data via props (can be accessed via `getArticleBySlug`)
- Allows full customization: colors, layout, custom React components
- Falls back to MDX rendering if component doesn't exist

### Adding a Project
1. Edit `content/projects.json`
2. Add project object:
   ```json
   {
     "title": "Project Name",
     "description": "Description",
     "image": "/images/project.jpg",
     "links": {
       "website": "https://example.com",
       "github": "https://github.com/..."
     },
     "tags": ["tag1", "tag2"]
   }
   ```

## Component Patterns

### Blog Components
- `NoteCard`: Displays note preview with metadata
- `ArticleCard`: Displays article preview with optional featured image
- `ProjectCard`: Displays project with image and links
- `Pagination`: Handles pagination for list pages
- `TagList`: Displays tags with links to tag pages

### Article Components
- `Blockquote`: Customizable quotation component
  - Props: `variant` (default/accent/muted), `cite`
- `CodeBlock`: Syntax-highlighted code blocks
  - Props: `inline`, `language`
- `Separator`: Customizable separator
  - Props: `variant` (default/thick/dashed/dotted), `spacing` (tight/normal/loose)

## Styling

### Color Palette
- Background: `#C2BAB3`
- Surface: `#AFA59E`
- Border: `#9B9687`
- Muted text: `#7B7267`
- Primary text: `#15110F`
- Accent: `#DA7441`
- Accent dark: `#91482C`
- Warm highlight: `#B79F89`

### Typography
- Headings: Playfair Display (serif)
- Body: Manrope (sans-serif)

### Design Philosophy
- Clean, minimal aesthetic inspired by Trent Walton
- Focus on readability and content
- Subtle interactions and hover states

## Routing

### URL Structure
- Homepage: `/`
- Notes list: `/note`
- Note page: `/note/[slug]`
- Articles list: `/articles`
- Article page: `/articles/[slug]` (or `/[slug]` for root-level articles)
- Projects: `/projects`
- About: `/about`
- Tag page: `/tags/[tag]`

### Static Generation
- All pages use `generateStaticParams` for pre-rendering
- Content is loaded at build time
- No runtime data fetching (except for search params)

## Development

### Running Locally
```bash
pnpm install
pnpm dev
```

### Building
```bash
pnpm build
pnpm start
```

### Type Checking
```bash
pnpm exec tsc --noEmit
```

### Linting
```bash
pnpm lint
```

## Deployment

### Vercel
- Automatic deployment on push to `main` branch
- Uses GitHub Actions workflow for CI/CD
- Requires Vercel secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### CI/CD Pipeline
1. Checkout code
2. Setup pnpm and Node.js
3. Install dependencies
4. Run type check
5. Run linter
6. Build project
7. Deploy to Vercel (production only)

## Customization

### Custom Article Layouts
1. Create `articles/[slug]/index.tsx`
2. Import article data using `getArticleBySlug(slug)`
3. Build custom layout with full React component capabilities
4. Component will be used instead of default MDX rendering

### Adding New Components
- Place reusable components in appropriate directory
- Use TypeScript interfaces for props
- Use `cn()` utility for className merging
- Follow existing component patterns

## Best Practices

1. **Type Safety**: Always use Zod schemas for validation
2. **Static Generation**: Prefer static generation for performance
3. **Component Reusability**: Create reusable components
4. **Accessibility**: Use semantic HTML and proper ARIA attributes
5. **Performance**: Optimize images with Next.js Image component
6. **Content Organization**: Keep content files organized and validated

## Troubleshooting

### Content Not Appearing
- Check frontmatter matches Zod schema
- Verify file is in correct directory
- Check file extension is `.mdx`
- Ensure date format is correct (YYYY-MM-DD)

### Custom Component Not Loading
- Verify file exists at `articles/[slug]/index.tsx`
- Check component exports default export
- Verify article slug matches directory name

### Build Errors
- Run `pnpm exec tsc --noEmit` to check types
- Verify all imports are correct
- Check Zod schema validation errors
