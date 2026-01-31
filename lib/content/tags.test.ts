import { describe, it, expect } from "vitest";
import { getAllTags, getNotesByTag, getArticlesByTag } from "./tags";

describe("tags content", () => {
  describe("getAllTags", () => {
    it("returns sorted array of unique tag strings", () => {
      const tags = getAllTags();
      expect(Array.isArray(tags)).toBe(true);
      const sorted = [...tags].sort();
      expect(tags).toEqual(sorted);
      expect(new Set(tags).size).toBe(tags.length);
    });
  });

  describe("getNotesByTag", () => {
    it("returns array of notes", () => {
      const tags = getAllTags();
      if (tags.length === 0) return;
      const notes = getNotesByTag(tags[0]);
      expect(Array.isArray(notes)).toBe(true);
    });

    it("returns only notes that have the tag (case-insensitive)", () => {
      const tags = getAllTags();
      if (tags.length === 0) return;
      const tag = tags[0];
      const notes = getNotesByTag(tag);
      for (const note of notes) {
        const hasTag = note.frontmatter.tags.some(
          (t) => t.toLowerCase() === tag.toLowerCase()
        );
        expect(hasTag).toBe(true);
      }
    });

    it("returns empty array for non-existent tag", () => {
      const notes = getNotesByTag("nonexistent-tag-xyz-123");
      expect(notes).toEqual([]);
    });
  });

  describe("getArticlesByTag", () => {
    it("returns array of articles", () => {
      const tags = getAllTags();
      if (tags.length === 0) return;
      const articles = getArticlesByTag(tags[0]);
      expect(Array.isArray(articles)).toBe(true);
    });

    it("returns only articles that have the tag (case-insensitive)", () => {
      const tags = getAllTags();
      if (tags.length === 0) return;
      const tag = tags[0];
      const articles = getArticlesByTag(tag);
      for (const article of articles) {
        const hasTag = article.frontmatter.tags.some(
          (t) => t.toLowerCase() === tag.toLowerCase()
        );
        expect(hasTag).toBe(true);
      }
    });

    it("returns empty array for non-existent tag", () => {
      const articles = getArticlesByTag("nonexistent-tag-xyz-123");
      expect(articles).toEqual([]);
    });
  });
});
