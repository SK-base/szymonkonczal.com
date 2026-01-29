import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  logo: z.string().optional(),
  links: z.object({
    website: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
