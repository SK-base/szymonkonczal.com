import Link from "next/link";
import { cn } from "@/lib/utils";

interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
          className="px-2 py-1 text-xs rounded bg-warm-highlight/30 text-muted-foreground hover:bg-warm-highlight/50 transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
