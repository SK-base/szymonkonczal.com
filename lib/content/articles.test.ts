import { describe, it, expect } from "vitest";
import {
  getAllArticles,
  getArticleBySlug,
  getLatestArticles,
  getAllArticleSlugs,
  getAllTags as getArticlesAllTags,
} from "./articles";

describe("articles content", () => {
  describe("getAllArticles", () => {
    it("returns an array of articles", () => {
      const articles = getAllArticles();
      expect(Array.isArray(articles)).toBe(true);
    });

    it("returns articles with required fields", () => {
      const articles = getAllArticles();
      for (const article of articles) {
        expect(article).toHaveProperty("slug");
        expect(article).toHaveProperty("frontmatter");
        expect(article).toHaveProperty("content");
        expect(article).toHaveProperty("readingTime");
        expect(article).toHaveProperty("hasCustomComponent");
        expect(article.frontmatter).toHaveProperty("title");
        expect(article.frontmatter).toHaveProperty("date");
        expect(article.frontmatter).toHaveProperty("tags");
        expect(Array.isArray(article.frontmatter.tags)).toBe(true);
      }
    });

    it("sorts articles by date newest first", () => {
      const articles = getAllArticles();
      for (let i = 1; i < articles.length; i++) {
        const prev = new Date(articles[i - 1].frontmatter.date).getTime();
        const curr = new Date(articles[i].frontmatter.date).getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });

    it("each article has readingTime as non-negative integer", () => {
      const articles = getAllArticles();
      for (const article of articles) {
        expect(Number.isInteger(article.readingTime)).toBe(true);
        expect(article.readingTime).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("getArticleBySlug", () => {
    it("returns null for non-existent slug", () => {
      expect(getArticleBySlug("non-existent-article-xyz")).toBeNull();
    });

    it("returns article when slug exists", () => {
      const slugs = getAllArticleSlugs();
      if (slugs.length === 0) return;
      const article = getArticleBySlug(slugs[0]);
      expect(article).not.toBeNull();
      expect(article?.slug).toBe(slugs[0]);
    });

    it("matches article from getAllArticles for same slug", () => {
      const all = getAllArticles();
      if (all.length === 0) return;
      const slug = all[0].slug;
      const bySlug = getArticleBySlug(slug);
      expect(bySlug?.slug).toBe(all[0].slug);
      expect(bySlug?.frontmatter.title).toBe(all[0].frontmatter.title);
    });
  });

  describe("getLatestArticles", () => {
    it("returns at most count articles", () => {
      expect(getLatestArticles(2).length).toBeLessThanOrEqual(2);
      expect(getLatestArticles(10).length).toBeLessThanOrEqual(10);
    });

    it("returns same order as getAllArticles slice", () => {
      const all = getAllArticles();
      const latest = getLatestArticles(5);
      for (let i = 0; i < latest.length; i++) {
        expect(latest[i].slug).toBe(all[i].slug);
      }
    });
  });

  describe("getAllArticleSlugs", () => {
    it("returns array of strings", () => {
      const slugs = getAllArticleSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      slugs.forEach((s) => expect(typeof s).toBe("string"));
    });

    it("slugs match getAllArticles slugs", () => {
      const articles = getAllArticles();
      const slugs = getAllArticleSlugs();
      const articleSlugs = articles.map((a) => a.slug).sort();
      expect([...slugs].sort()).toEqual(articleSlugs);
    });
  });

  describe("getAllTags (articles)", () => {
    it("returns sorted array of unique tag strings", () => {
      const tags = getArticlesAllTags();
      expect(Array.isArray(tags)).toBe(true);
      const sorted = [...tags].sort();
      expect(tags).toEqual(sorted);
      expect(new Set(tags).size).toBe(tags.length);
    });
  });
});
