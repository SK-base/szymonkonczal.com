"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types/project";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = project.image || project.logo;

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-surface flex items-center justify-center">
        {imageSrc && !imageError ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-muted-foreground text-sm">Photo placeholder</span>
        )}
      </div>
      <CardHeader>
        <h3 className="font-serif text-2xl font-bold">{project.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        {project.links && (
          <div className="flex gap-2 flex-wrap">
            {project.links.website && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.links.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Website
                </Link>
              </Button>
            )}
            {project.links.github && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            )}
            {project.links.demo && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </Link>
              </Button>
            )}
          </div>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded bg-warm-highlight/30 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
