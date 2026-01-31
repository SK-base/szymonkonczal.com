# Personal Homepage Blog

A personal homepage/blog built with Next.js, featuring notes, articles, projects, and an about page.

## Features

- **Notes**: Short, frequent posts for quick ideas and learnings
- **Articles**: Longer, evergreen pieces with customizable layouts
- **Projects**: Showcase your work with descriptions and links
- **Tag Filtering**: Browse content by tags
- **Static Generation**: Pre-rendered pages for optimal performance
- **Custom Article Components**: Create custom React components for specific articles

## Tech Stack

- **Next.js 16+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **MDX** for content
- **Zod** for validation
- **pnpm** for package management

## Getting Started

### Prerequisites

- Node.js 24+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Content Management

### Adding Notes

Create a new `.mdx` file in `content/notes/`:

```mdx
---
title: "My Note Title"
date: "2026-01-28"
tags: ["tag1", "tag2"]
---

Your note content here...
```

### Adding Articles

Create a new `.mdx` file in `content/articles/`:

```mdx
---
title: "My Article Title"
date: "2026-01-28"
tags: ["tag1", "tag2"]
featuredImage: "/images/article.jpg"
---

Your article content here...
```

### Custom Article Components

To create a custom layout for an article, create `articles/[slug]/index.tsx`:

```tsx
import { getArticleBySlug } from "@/lib/content/articles";

export default function CustomArticle() {
  const article = getArticleBySlug("my-article");
  // Build your custom layout
  return <div>...</div>;
}
```

### Adding Projects

Edit `content/projects.json`:

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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Manual Deployment

```bash
pnpm build
pnpm start
```

## CI/CD

The project includes a GitHub Actions workflow that:
- Runs type checking
- Runs linting
- Builds the project
- Deploys to Vercel (on push to main)

Configure these secrets in GitHub:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Project Structure

```
/
├── app/                    # Next.js pages
├── components/            # React components
├── content/               # Content files (MDX, JSON)
├── lib/                   # Utilities and types
└── public/                # Static assets
```

See [AGENTS.md](./AGENTS.md) for detailed architecture documentation.

## Styling

The project uses a custom color palette:
- Background: `#C2BAB3`
- Surface: `#AFA59E`
- Accent: `#DA7441`
- Primary text: `#15110F`

Fonts:
- Headings: Playfair Display (serif)
- Body: Manrope (sans-serif)

## License

MIT
