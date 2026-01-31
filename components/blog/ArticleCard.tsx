"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TagList } from "./TagList";
import type { Article } from "@/lib/types/article";
import { cn } from "@/lib/utils";
import { excerptFromContent } from "@/lib/metadata";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false);
  const excerpt = excerptFromContent(article.content, 150);

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-surface flex items-center justify-center">
        {article.frontmatter.featuredImage && !imageError ? (
          <Image
            src={article.frontmatter.featuredImage}
            alt={article.frontmatter.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-muted-foreground text-sm">Photo placeholder</span>
        )}
      </div>
      <CardHeader>
        <Link href={`/articles/${article.slug}`}>
          <h3 className="font-serif text-2xl font-bold hover:text-accent transition-colors">
            {article.frontmatter.title}
          </h3>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <time dateTime={article.frontmatter.date}>
            {format(new Date(article.frontmatter.date), "MMMM d, yyyy")}
          </time>
          <span>•</span>
          <span>{article.readingTime} min read</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        {article.frontmatter.tags.length > 0 && (
          <TagList tags={article.frontmatter.tags} />
        )}
      </CardContent>
    </Card>
  );
}
