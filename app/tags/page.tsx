import Link from "next/link";
import { getAllTags } from "@/lib/content/tags";

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-4">Tags</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Browse notes and articles by tag.
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="px-3 py-1.5 text-sm rounded bg-warm-highlight/30 text-muted-foreground hover:bg-warm-highlight/50 hover:text-accent transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
