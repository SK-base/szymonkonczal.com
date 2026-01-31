import { describe, it, expect } from "vitest";
import { getAllProjects } from "./projects";

describe("projects content", () => {
  describe("getAllProjects", () => {
    it("returns an array of projects", () => {
      const projects = getAllProjects();
      expect(Array.isArray(projects)).toBe(true);
    });

    it("returns projects with required fields", () => {
      const projects = getAllProjects();
      for (const project of projects) {
        expect(project).toHaveProperty("title");
        expect(project).toHaveProperty("description");
        expect(typeof project.title).toBe("string");
        expect(typeof project.description).toBe("string");
      }
    });

    it("optional fields have correct shape when present", () => {
      const projects = getAllProjects();
      for (const project of projects) {
        if (project.links != null) {
          expect(typeof project.links).toBe("object");
          if (project.links.website != null)
            expect(typeof project.links.website).toBe("string");
          if (project.links.github != null)
            expect(typeof project.links.github).toBe("string");
          if (project.links.demo != null)
            expect(typeof project.links.demo).toBe("string");
        }
        if (project.tags != null) {
          expect(Array.isArray(project.tags)).toBe(true);
          project.tags.forEach((t) => expect(typeof t).toBe("string"));
        }
      }
    });
  });
});
