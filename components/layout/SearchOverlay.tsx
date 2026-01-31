"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 300;

export interface SearchResult {
  notes: { slug: string; title: string; tags: string[]; href: string }[];
  articles: { slug: string; title: string; tags: string[]; href: string }[];
  tags: string[];
  about: { title: string; href: string } | null;
  projects: { title: string; href: string }[];
}

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Debounce query
  useEffect(() => {
    if (!query.trim()) {
      setDebouncedQuery("");
      setResults(null);
      return;
    }
    const t = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch results when debounced query changes
  const fetchResults = useCallback(async (q: string) => {
    if (!q) {
      setResults(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = (await res.json()) as SearchResult;
        setResults(data);
      } else {
        setResults(null);
      }
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      void fetchResults(debouncedQuery);
    } else {
      setResults(null);
    }
  }, [debouncedQuery, fetchResults]);

  // Focus input when opened, reset query when closed
  useEffect(() => {
    if (open) {
      setQuery("");
      setDebouncedQuery("");
      setResults(null);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Escape to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Close on backdrop click (not on content)
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  if (typeof document === "undefined" || !open) return null;

  const hasResults =
    results &&
    (results.notes.length > 0 ||
      results.articles.length > 0 ||
      results.tags.length > 0 ||
      results.about ||
      results.projects.length > 0);

  const content = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-100 flex flex-col items-center pt-[min(10vh,4rem)] px-4"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      {/* Blur backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-md"
        aria-hidden
      />

      {/* Content: input + results */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <div className="relative w-full flex items-center">
          <Search
            className="absolute left-5 size-6 text-muted-foreground pointer-events-none"
            aria-hidden
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, articles, tags…"
            autoComplete="off"
            className={cn(
              "w-full h-14 pl-14 pr-14 rounded-full text-lg",
              "bg-surface border-2 border-border text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20",
              "transition-colors"
            )}
            aria-label="Search"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-surface/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close search"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Results panel */}
        <div className="mt-4 w-full max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-surface/95 shadow-lg">
          {loading && (
            <div className="p-6 text-center text-muted-foreground text-sm">
              Searching…
            </div>
          )}
          {!loading && debouncedQuery && !hasResults && (
            <div className="p-6 text-center text-muted-foreground text-sm">
              No results for &quot;{debouncedQuery}&quot;
            </div>
          )}
          {!loading && hasResults && results && (
            <div className="p-4 space-y-6">
              {results.notes.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Notes
                  </h3>
                  <ul className="space-y-1">
                    {results.notes.map((n) => (
                      <li key={n.slug}>
                        <Link
                          href={n.href}
                          onClick={onClose}
                          className="block py-2 px-3 rounded-lg hover:bg-warm-highlight text-foreground font-medium"
                        >
                          {n.title}
                          {n.tags.length > 0 && (
                            <span className="ml-2 text-xs font-mono text-muted-foreground">
                              {n.tags.join(", ")}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {results.articles.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Articles
                  </h3>
                  <ul className="space-y-1">
                    {results.articles.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={a.href}
                          onClick={onClose}
                          className="block py-2 px-3 rounded-lg hover:bg-warm-highlight text-foreground font-medium"
                        >
                          {a.title}
                          {a.tags.length > 0 && (
                            <span className="ml-2 text-xs font-mono text-muted-foreground">
                              {a.tags.join(", ")}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {results.tags.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Tags
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {results.tags.map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/tags/${encodeURIComponent(tag)}`}
                          onClick={onClose}
                          className="inline-block py-1.5 px-3 rounded-md font-mono text-sm bg-warm-highlight hover:bg-accent hover:text-accent-foreground text-foreground transition-colors"
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {results.about && (
                <section>
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Page
                  </h3>
                  <Link
                    href={results.about.href}
                    onClick={onClose}
                    className="block py-2 px-3 rounded-lg hover:bg-warm-highlight text-foreground font-medium"
                  >
                    {results.about.title}
                  </Link>
                </section>
              )}
              {results.projects.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                    Projects
                  </h3>
                  <ul className="space-y-1">
                    {results.projects.map((p) => (
                      <li key={p.title}>
                        <Link
                          href={p.href}
                          onClick={onClose}
                          className="block py-2 px-3 rounded-lg hover:bg-warm-highlight text-foreground font-medium"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
