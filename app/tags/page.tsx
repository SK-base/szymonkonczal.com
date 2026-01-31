import type { Metadata } from "next";
import { TagList } from "@/components/blog/TagList";
import { getAllTags } from "@/lib/content/tags";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/metadata";

const description = "Browse notes and articles by tag.";

export const metadata: Metadata = {
  title: "Tags",
  description,
  alternates: { canonical: absoluteUrl("/tags") },
  openGraph: buildOpenGraph({
    title: "Tags | Szymon Konczal",
    description,
    url: absoluteUrl("/tags"),
    type: "website",
  }),
  twitter: buildTwitter({ title: "Tags | Szymon Konczal", description }),
};

export default function TagsIndexPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-4">Tags</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Browse notes and articles by tag.
        </p>
        <TagList
          tags={tags}
          className="[&_a]:px-3 [&_a]:py-1.5 [&_a]:text-sm [&_a]:hover:text-accent"
        />
      </div>
    </div>
  );
}
