import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXContent } from "@/lib/mdx";
import { TagList } from "@/components/blog/TagList";
import { getNoteBySlug, getAllNoteSlugs } from "@/lib/content/notes";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {note.frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <time dateTime={note.frontmatter.date}>
              {format(new Date(note.frontmatter.date), "MMMM d, yyyy")}
            </time>
            <span>•</span>
            <span>{note.readingTime} min read</span>
          </div>
          {note.frontmatter.tags.length > 0 && (
            <TagList tags={note.frontmatter.tags} />
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXContent source={note.content} />
        </div>
      </article>
    </div>
  );
}
