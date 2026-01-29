import { z } from "zod";
import { parseableDateSchema } from "./date";

export const NoteFrontmatterSchema = z.object({
  title: z.string(),
  date: parseableDateSchema,
  tags: z.array(z.string()),
  featuredImage: z.string().optional(),
});

export type NoteFrontmatter = z.infer<typeof NoteFrontmatterSchema>;

export interface Note {
  slug: string;
  frontmatter: NoteFrontmatter;
  content: string;
  readingTime: number;
}
