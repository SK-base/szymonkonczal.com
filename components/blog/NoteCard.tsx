import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TagList } from "./TagList";
import type { Note } from "@/lib/types/note";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
  className?: string;
}

export function NoteCard({ note, className }: NoteCardProps) {
  const excerpt = note.content
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .slice(0, 2)
    .join(" ")
    .substring(0, 150);

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader>
        <Link href={`/note/${note.slug}`}>
          <h3 className="font-serif text-2xl font-bold hover:text-accent transition-colors">
            {note.frontmatter.title}
          </h3>
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
          <time dateTime={note.frontmatter.date}>
            {format(new Date(note.frontmatter.date), "MMMM d, yyyy")}
          </time>
          <span>•</span>
          <span>{note.readingTime} min read</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}...</p>
        {note.frontmatter.tags.length > 0 && (
          <TagList tags={note.frontmatter.tags} />
        )}
      </CardContent>
    </Card>
  );
}
