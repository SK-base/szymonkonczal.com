import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticleFrontmatterSchema, type Article } from "@/lib/types/article";
import { calculateReadingTime } from "@/lib/utils/reading-time";
import { CUSTOM_ARTICLE_SLUGS } from "@/lib/article-components";

const articlesDirectory = path.join(process.cwd(), "content/articles");

/** In production only PUBLISHED content is visible; in dev/test DRAFT is included. */
const isProduction = process.env.NODE_ENV === "production";

function filterByStatus<T extends { frontmatter: { status: string } }>(
  items: T[]
): T[] {
  if (!isProduction) return items;
  return items.filter((item) => item.frontmatter.status === "PUBLISHED");
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticles = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontmatter = ArticleFrontmatterSchema.parse(data);
      const readingTime = calculateReadingTime(content);
      const hasCustomComponent = CUSTOM_ARTICLE_SLUGS.includes(slug);

      return {
        slug,
        frontmatter,
        content,
        readingTime,
        hasCustomComponent,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Newest first
    });

  return filterByStatus(allArticles);
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = ArticleFrontmatterSchema.parse(data);
  if (isProduction && frontmatter.status === "DRAFT") {
    return null;
  }

  const readingTime = calculateReadingTime(content);
  const hasCustomComponent = CUSTOM_ARTICLE_SLUGS.includes(slug);

  return {
    slug,
    frontmatter,
    content,
    readingTime,
    hasCustomComponent,
  };
}

export function getLatestArticles(count: number): Article[] {
  const allArticles = getAllArticles();
  return allArticles.slice(0, count);
}

export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

// This isn't used anywhere yet. It will be useful on tags page.
export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tagSet = new Set<string>();
  
  articles.forEach((article) => {
    article.frontmatter.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}
