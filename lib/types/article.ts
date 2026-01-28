import { z } from "zod";

export const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
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
