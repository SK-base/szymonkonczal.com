import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NoteFrontmatterSchema, type Note } from "@/lib/types/note";
import { calculateReadingTime } from "@/lib/utils/reading-time";

const notesDirectory = path.join(process.cwd(), "content/notes");

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

  return allNotes;
}

export function getNoteBySlug(slug: string): Note | null {
  const filePath = path.join(notesDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = NoteFrontmatterSchema.parse(data);
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
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}
