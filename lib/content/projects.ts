import fs from "fs";
import path from "path";
import { ProjectSchema, type Project } from "@/lib/types/project";

const projectsFilePath = path.join(process.cwd(), "content/projects.json");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsFilePath)) {
    return [];
  }

  const fileContents = fs.readFileSync(projectsFilePath, "utf8");
  const projectsData = JSON.parse(fileContents);

  // Validate and parse projects
  if (Array.isArray(projectsData)) {
    return projectsData.map((project) => ProjectSchema.parse(project));
  }

  // If it's an object with a projects array
  if (projectsData.projects && Array.isArray(projectsData.projects)) {
    return projectsData.projects.map((project: unknown) =>
      ProjectSchema.parse(project)
    );
  }

  return [];
}
