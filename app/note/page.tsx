import type { Metadata } from "next";
import { NoteCard } from "@/components/blog/NoteCard";
import { Pagination } from "@/components/blog/Pagination";
import { getAllNotes } from "@/lib/content/notes";
import { absoluteUrl, buildOpenGraph } from "@/lib/metadata";

const description =
  "Short, frequent posts—quick ideas, tips, links, and learnings.";

export const metadata: Metadata = {
  title: "Notes",
  description,
  alternates: { canonical: absoluteUrl("/note") },
  openGraph: buildOpenGraph({
    title: "Notes | Szymon Konczal",
    description,
    url: absoluteUrl("/note"),
    type: "website",
  }),
};

const ITEMS_PER_PAGE = 10;

interface NotesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolved = await searchParams;
  const rawPage = Number(resolved.page) || 1;
  const currentPage = Math.max(1, Math.floor(rawPage));
  const allNotes = getAllNotes();
  const totalPages = Math.ceil(allNotes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const notes = allNotes.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-8">Notes</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Short, frequent posts—quick ideas, tips, links, and learnings.
        </p>

        {notes.length === 0 ? (
          <p className="text-muted-foreground">No notes yet.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-1">
              {notes.map((note) => (
                <NoteCard key={note.slug} note={note} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/note"
            />
          </>
        )}
      </div>
    </div>
  );
}
