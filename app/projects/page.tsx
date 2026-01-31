import type { Metadata } from "next";
import { ProjectCard } from "@/components/blog/ProjectCard";
import { getAllProjects } from "@/lib/content/projects";
import { absoluteUrl, buildOpenGraph } from "@/lib/metadata";

const description = "A collection of my work and side projects.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: absoluteUrl("/projects") },
  openGraph: buildOpenGraph({
    title: "Projects | Szymon Konczal",
    description,
    url: absoluteUrl("/projects"),
    type: "website",
  }),
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-8">Projects</h1>
        <p className="text-lg text-muted-foreground mb-12">
          A collection of my work and side projects.
        </p>

        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
