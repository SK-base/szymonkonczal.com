import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArticleFrontmatterSchema, type Article } from "@/lib/types/article";
import { calculateReadingTime } from "@/lib/utils/reading-time";

const articlesDirectory = path.join(process.cwd(), "content/articles");
const customArticlesDirectory = path.join(process.cwd(), "articles");

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
      
      // Check if custom component exists
      const customComponentPath = path.join(customArticlesDirectory, slug, "index.tsx");
      const hasCustomComponent = fs.existsSync(customComponentPath);

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

  return allArticles;
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = ArticleFrontmatterSchema.parse(data);
  const readingTime = calculateReadingTime(content);
  
  // Check if custom component exists
  const customComponentPath = path.join(customArticlesDirectory, slug, "index.tsx");
  const hasCustomComponent = fs.existsSync(customComponentPath);

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
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
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
