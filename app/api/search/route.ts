import { NextRequest } from "next/server";
import { getAllNotes } from "@/lib/content/notes";
import { getAllArticles } from "@/lib/content/articles";
import { getAllTags } from "@/lib/content/tags";
import { getAllProjects } from "@/lib/content/projects";

/** About page searchable text (title + key phrases). */
const ABOUT_SEARCHABLE =
  "About developer writer creator homepage notes articles projects web development design";

function matchesQuery(text: string, q: string): boolean {
  if (!q.trim()) return false;
  const lower = text.toLowerCase();
  const terms = q
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return terms.every((term) => lower.includes(term));
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const query = q.trim();
  if (!query) {
    return Response.json({
      notes: [],
      articles: [],
      tags: [],
      about: null,
      projects: [],
    });
  }

  const notes = getAllNotes();
  const articles = getAllArticles();
  const allTags = getAllTags();
  const projects = getAllProjects();

  const matchedNotes = notes
    .filter(
      (n) =>
        matchesQuery(n.frontmatter.title, query) ||
        n.frontmatter.tags.some((t) => matchesQuery(t, query))
    )
    .map((n) => ({
      slug: n.slug,
      title: n.frontmatter.title,
      tags: n.frontmatter.tags,
      href: `/note/${n.slug}`,
    }));

  const matchedArticles = articles
    .filter(
      (a) =>
        matchesQuery(a.frontmatter.title, query) ||
        a.frontmatter.tags.some((t) => matchesQuery(t, query))
    )
    .map((a) => ({
      slug: a.slug,
      title: a.frontmatter.title,
      tags: a.frontmatter.tags,
      href: `/articles/${a.slug}`,
    }));

  const matchedTags = allTags.filter((tag) => matchesQuery(tag, query));

  const aboutMatch = matchesQuery(
    `About ${ABOUT_SEARCHABLE}`,
    query
  )
    ? { title: "About", href: "/about" }
    : null;

  const matchedProjects = projects
    .filter(
      (p) =>
        matchesQuery(p.title, query) ||
        matchesQuery(p.description, query) ||
        (p.tags ?? []).some((t) => matchesQuery(t, query))
    )
    .map((p) => ({ title: p.title, href: "/projects" }));

  return Response.json({
    notes: matchedNotes,
    articles: matchedArticles,
    tags: matchedTags,
    about: aboutMatch,
    projects: matchedProjects,
  });
}
