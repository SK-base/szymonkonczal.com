import { z } from "zod";
import { parseableDateSchema } from "./date";

export const ContentStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);
export type ContentStatus = z.infer<typeof ContentStatusSchema>;

export const NoteFrontmatterSchema = z.object({
  title: z.string(),
  date: parseableDateSchema,
  tags: z.array(z.string()),
  featuredImage: z.string().optional(),
  status: ContentStatusSchema.default("PUBLISHED"),
});

export type NoteFrontmatter = z.infer<typeof NoteFrontmatterSchema>;

export interface Note {
  slug: string;
  frontmatter: NoteFrontmatter;
  content: string;
  readingTime: number;
}
