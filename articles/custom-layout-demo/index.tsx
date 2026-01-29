import { format } from "date-fns";
import { getArticleBySlug } from "@/lib/content/articles";
import { MDXContent } from "@/lib/mdx";
import { TagList } from "@/components/blog/TagList";

const SLUG = "custom-layout-demo";

/**
 * Custom article component for "Custom Article Layouts: A Visual Essay".
 * Renders a custom layout with a hero, key takeaways callout, MDX body,
 * and a custom summary section—all built with React elements.
 */
export default function CustomLayoutDemo() {
  const article = getArticleBySlug(SLUG);
  if (!article) return null;

  const { frontmatter, content, readingTime } = article;

  return (
    <>
      {/* Custom hero section */}
      <header className="mb-12 rounded-xl border border-border bg-surface/60 px-6 py-8 md:px-10 md:py-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent">
          Custom layout
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {frontmatter.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={frontmatter.date}>
            {format(new Date(frontmatter.date), "MMMM d, yyyy")}
          </time>
          <span aria-hidden>·</span>
          <span>{readingTime} min read</span>
        </div>
        {frontmatter.tags.length > 0 && (
          <div className="mt-4">
            <TagList tags={frontmatter.tags} />
          </div>
        )}
      </header>

      {/* Custom callout: key takeaways */}
      <aside
        className="mb-10 rounded-lg border-l-4 border-accent bg-warm-highlight/20 px-5 py-4"
        aria-label="Key takeaways"
      >
        <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">
          Key takeaways
        </h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Custom components live in <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">articles/[slug]/index.tsx</code></li>
          <li>Register each component in <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">lib/article-components.ts</code></li>
          <li>Use <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">getArticleBySlug(slug)</code> to load article data</li>
          <li>Compose MDX body with <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">MDXContent</code> and your own React elements</li>
        </ul>
      </aside>

      {/* Article body (MDX) */}
      <div className="mb-12">
        <MDXContent source={content} />
      </div>

      {/* Custom summary section */}
      <footer className="rounded-lg border border-border bg-surface/40 px-5 py-5">
        <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">
          Summary
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This page is rendered entirely by a custom React component. The content
          above comes from the MDX file; the hero, callout, and this summary are
          custom React elements. You can build any layout that fits your article.
        </p>
      </footer>
    </>
  );
}
