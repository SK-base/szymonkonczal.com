import { createElement } from "react";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXContent } from "@/lib/mdx";
import { TagList } from "@/components/blog/TagList";
import {
  getArticleBySlug,
  getAllArticleSlugs,
} from "@/lib/content/articles";
import { getCustomArticleComponent } from "@/lib/article-components";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const CustomArticleLayout = getCustomArticleComponent(slug);

  if (CustomArticleLayout) {
    return (
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {createElement(CustomArticleLayout)}
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {article.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time dateTime={article.frontmatter.date}>
              {format(
                new Date(article.frontmatter.date),
                "MMMM d, yyyy"
              )}
            </time>
            <span>•</span>
            <span>{article.readingTime} min read</span>
          </div>
          {article.frontmatter.tags.length > 0 && (
            <TagList tags={article.frontmatter.tags} />
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXContent source={article.content} />
        </div>
      </article>
    </div>
  );
}
