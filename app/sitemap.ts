import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { getAllArticles } from "@/lib/content/articles";
import { getAllNotes } from "@/lib/content/notes";
import { getAllTags } from "@/lib/content/tags";

function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const notes = getAllNotes();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/articles"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/note"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/tags"), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const noteEntries: MetadataRoute.Sitemap = notes.map((note) => ({
    url: absoluteUrl(`/note/${note.slug}`),
    lastModified: new Date(note.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: absoluteUrl(`/tags/${encodeURIComponent(tag)}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...articleEntries, ...noteEntries, ...tagEntries];
}
