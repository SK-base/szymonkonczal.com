import type { Metadata } from "next";
import { NoteCard } from "@/components/blog/NoteCard";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import {
  getAllTags,
  getNotesByTag,
  getArticlesByTag,
} from "@/lib/content/tags";
import type { Note } from "@/lib/types/note";
import type { Article } from "@/lib/types/article";
import { notFound } from "next/navigation";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/metadata";

const ITEMS_PER_PAGE = 10;

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string; type?: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({
  params,
  searchParams,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const resolved = await searchParams;
  const notes = getNotesByTag(tag);
  const articles = getArticlesByTag(tag);
  const total = notes.length + articles.length;
  if (total === 0) return {};

  const title = tag.charAt(0).toUpperCase() + tag.slice(1);
  const description =
    total === 1
      ? `1 note or article tagged with "${tag}".`
      : `${total} notes and articles tagged with "${tag}".`;

  const query = new URLSearchParams();
  if (resolved.page) query.set("page", resolved.page);
  if (resolved.type && resolved.type !== "all") query.set("type", resolved.type);
  const qs = query.toString();
  const path = `/tags/${encodeURIComponent(tag)}${qs ? `?${qs}` : ""}`;
  const canonicalUrl = absoluteUrl(path);

  return {
    title: `Tag: ${title}`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: buildOpenGraph({
      title: `Tag: ${title} | Szymon Konczal`,
      description,
      url: canonicalUrl,
      type: "website",
    }),
    twitter: buildTwitter({
      title: `Tag: ${title} | Szymon Konczal`,
      description,
    }),
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const resolved = await searchParams;
  const rawPage = Number(resolved.page) || 1;
  const currentPage = Math.max(1, Math.floor(rawPage));
  const type = resolved.type || "all"; // 'all', 'notes', 'articles'

  const notes = getNotesByTag(tag);
  const articles = getArticlesByTag(tag);

  type TaggedItem =
    | { type: "note"; slug: string; data: Note }
    | { type: "article"; slug: string; data: Article };

  let items: TaggedItem[] = [];

  if (type === "notes") {
    items = notes.map((note) => ({ type: "note" as const, slug: note.slug, data: note }));
  } else if (type === "articles") {
    items = articles.map((article) => ({
      type: "article" as const,
      slug: article.slug,
      data: article,
    }));
  } else {
    // Combine and sort by date
    items = [
      ...notes.map((note) => ({ type: "note" as const, slug: note.slug, data: note })),
      ...articles.map((article) => ({
        type: "article" as const,
        slug: article.slug,
        data: article,
      })),
    ].sort((a, b) => {
      const dateA = new Date(a.data.frontmatter.date).getTime();
      const dateB = new Date(b.data.frontmatter.date).getTime();
      return dateB - dateA;
    });
  }

  if (items.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = items.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-4">
          Tag: {tag}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {items.length} {items.length === 1 ? "item" : "items"} tagged with{" "}
          &quot;{tag}&quot;
        </p>

        <div className="grid gap-6 md:grid-cols-1 mb-8">
          {paginatedItems.map((item) => {
            if (item.type === "note") {
              return <NoteCard key={`note-${item.slug}`} note={item.data} />;
            } else {
              return <ArticleCard key={`article-${item.slug}`} article={item.data} />;
            }
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/tags/${encodeURIComponent(tag)}`}
          queryParams={type !== "all" ? { type } : undefined}
        />
      </div>
    </div>
  );
}
