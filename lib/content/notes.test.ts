import { describe, it, expect } from "vitest";
import {
  getAllNotes,
  getNoteBySlug,
  getLatestNotes,
  getAllNoteSlugs,
} from "./notes";

describe("notes content", () => {
  describe("getAllNotes", () => {
    it("returns an array of notes", () => {
      const notes = getAllNotes();
      expect(Array.isArray(notes)).toBe(true);
    });

    it("returns notes with required fields", () => {
      const notes = getAllNotes();
      for (const note of notes) {
        expect(note).toHaveProperty("slug");
        expect(note).toHaveProperty("frontmatter");
        expect(note).toHaveProperty("content");
        expect(note).toHaveProperty("readingTime");
        expect(note.frontmatter).toHaveProperty("title");
        expect(note.frontmatter).toHaveProperty("date");
        expect(note.frontmatter).toHaveProperty("tags");
        expect(Array.isArray(note.frontmatter.tags)).toBe(true);
        expect(note.frontmatter).toHaveProperty("status");
        expect(["DRAFT", "PUBLISHED"]).toContain(note.frontmatter.status);
      }
    });

    it("sorts notes by date newest first", () => {
      const notes = getAllNotes();
      for (let i = 1; i < notes.length; i++) {
        const prev = new Date(notes[i - 1].frontmatter.date).getTime();
        const curr = new Date(notes[i].frontmatter.date).getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });

    it("each note has readingTime as non-negative integer", () => {
      const notes = getAllNotes();
      for (const note of notes) {
        expect(Number.isInteger(note.readingTime)).toBe(true);
        expect(note.readingTime).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("getNoteBySlug", () => {
    it("returns null for non-existent slug", () => {
      expect(getNoteBySlug("non-existent-note-xyz")).toBeNull();
    });

    it("returns note when slug exists", () => {
      const slugs = getAllNoteSlugs();
      if (slugs.length === 0) return;
      const note = getNoteBySlug(slugs[0]);
      expect(note).not.toBeNull();
      expect(note?.slug).toBe(slugs[0]);
    });

    it("matches note from getAllNotes for same slug", () => {
      const all = getAllNotes();
      if (all.length === 0) return;
      const slug = all[0].slug;
      const bySlug = getNoteBySlug(slug);
      expect(bySlug?.slug).toBe(all[0].slug);
      expect(bySlug?.frontmatter.title).toBe(all[0].frontmatter.title);
    });
  });

  describe("getLatestNotes", () => {
    it("returns at most count notes", () => {
      expect(getLatestNotes(2).length).toBeLessThanOrEqual(2);
      expect(getLatestNotes(10).length).toBeLessThanOrEqual(10);
    });

    it("returns same order as getAllNotes slice", () => {
      const all = getAllNotes();
      const latest = getLatestNotes(5);
      for (let i = 0; i < latest.length; i++) {
        expect(latest[i].slug).toBe(all[i].slug);
      }
    });
  });

  describe("getAllNoteSlugs", () => {
    it("returns array of strings", () => {
      const slugs = getAllNoteSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      slugs.forEach((s) => expect(typeof s).toBe("string"));
    });

    it("slugs match getAllNotes slugs", () => {
      const notes = getAllNotes();
      const slugs = getAllNoteSlugs();
      const noteSlugs = notes.map((n) => n.slug).sort();
      expect([...slugs].sort()).toEqual(noteSlugs);
    });
  });
});
