import { getAllNotes } from "./notes";
import { getAllArticles } from "./articles";

export function getAllTags(): string[] {
  const notes = getAllNotes();
  const articles = getAllArticles();
  const tagSet = new Set<string>();

  notes.forEach((note) => {
    note.frontmatter.tags.forEach((tag) => tagSet.add(tag));
  });

  articles.forEach((article) => {
    article.frontmatter.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getNotesByTag(tag: string) {
  const notes = getAllNotes();
  return notes.filter((note) =>
    note.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getArticlesByTag(tag: string) {
  const articles = getAllArticles();
  return articles.filter((article) =>
    article.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
