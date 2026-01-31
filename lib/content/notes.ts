import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NoteFrontmatterSchema, type Note } from "@/lib/types/note";
import { calculateReadingTime } from "@/lib/utils/reading-time";

const notesDirectory = path.join(process.cwd(), "content/notes");

/** In production only PUBLISHED content is visible; in dev/test DRAFT is included. */
const isProduction = process.env.NODE_ENV === "production";

function filterByStatus<T extends { frontmatter: { status: string } }>(
  items: T[]
): T[] {
  if (!isProduction) return items;
  return items.filter((item) => item.frontmatter.status === "PUBLISHED");
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const allNotes = fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const frontmatter = NoteFrontmatterSchema.parse(data);
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        frontmatter,
        content,
        readingTime,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA; // Newest first
    });

  return filterByStatus(allNotes);
}

export function getNoteBySlug(slug: string): Note | null {
  const filePath = path.join(notesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = NoteFrontmatterSchema.parse(data);
  if (isProduction && frontmatter.status === "DRAFT") {
    return null;
  }

  const readingTime = calculateReadingTime(content);

  return {
    slug,
    frontmatter,
    content,
    readingTime,
  };
}

export function getLatestNotes(count: number): Note[] {
  const allNotes = getAllNotes();
  return allNotes.slice(0, count);
}

export function getAllNoteSlugs(): string[] {
  return getAllNotes().map((note) => note.slug);
}
