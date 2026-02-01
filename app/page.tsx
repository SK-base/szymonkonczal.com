import type { Metadata } from "next";
import Link from "next/link";
import { NoteCard } from "@/components/blog/NoteCard";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { getLatestNotes } from "@/lib/content/notes";
import { getLatestArticles } from "@/lib/content/articles";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/metadata";

const description =
  "Notes, articles, and projects from my journey. Personal homepage of Szymon Konczal.";

export const metadata: Metadata = {
  title: "Home",
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: buildOpenGraph({
    title: "Szymon Konczal",
    description,
    url: absoluteUrl("/"),
    type: "website",
  }),
  twitter: buildTwitter({ title: "Szymon Konczal", description }),
};

export default function HomePage() {
  const latestNotes = getLatestNotes(3);
  const latestArticles = getLatestArticles(3);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <section className="mb-16">
          {/* <h1 className="font-serif text-5xl font-bold mb-4">Welcome</h1> */}
          <p className="text-lg text-muted-foreground">
            Hello 👋, my name is <Link href="/about" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">Szymon!</Link> Welcome to my website! Read my articles, notes and see projects from my journey.
          </p>
        </section>

        {latestNotes.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-bold">Latest Notes</h2>
              <Link
                href="/note"
                className="text-accent hover:text-accent-dark text-sm font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
              {latestNotes.map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
            </div>
          </section>
        )}

        {latestArticles.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-bold">Latest Articles</h2>
              <Link
                href="/articles"
                className="text-accent hover:text-accent-dark text-sm font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
              {latestArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
