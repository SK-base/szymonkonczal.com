import { NoteCard } from "@/components/blog/NoteCard";
import { Pagination } from "@/components/blog/Pagination";
import { getAllNotes } from "@/lib/content/notes";

const ITEMS_PER_PAGE = 10;

interface NotesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolved = await searchParams;
  const currentPage = Number(resolved.page) || 1;
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
