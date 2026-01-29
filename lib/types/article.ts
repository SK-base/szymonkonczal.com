import { z } from "zod";
import { parseableDateSchema } from "./date";

export const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  date: parseableDateSchema,
  tags: z.array(z.string()),
  featuredImage: z.string().optional(),
});

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
  hasCustomComponent?: boolean;
}
