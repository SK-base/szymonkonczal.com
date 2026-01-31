"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  { Icon: Linkedin, href: "https://linkedin.com/in/szymonkonczal", aria: "LinkedIn" },
  { Icon: Github, href: "https://github.com/szymonkonczal", aria: "GitHub" },
  { Icon: X, href: "https://x.com/szymonkonczal", aria: "X (Twitter)" },
  { Icon: Instagram, href: "https://instagram.com/szymonkonczal", aria: "Instagram" },
] as const;

const iconLinkClass = cn(
  "text-muted-foreground transition-colors hover:text-accent",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
);

export function Footer() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-6 max-w-7xl sm:flex-row sm:items-center sm:justify-between">
        <div className="hidden min-w-0 flex-1 sm:block" aria-hidden />
        <p className="w-full shrink-0 text-center text-sm text-muted-foreground sm:w-auto">
          © 2007–2026 Made with <span className="text-foreground" aria-hidden>❤️</span> by Szymon Konczal
        </p>
        <div className="flex w-full items-center justify-end gap-4 sm:w-auto sm:flex-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "text-muted-foreground",
              theme === "light" ? "hover:text-background" : "hover:text-foreground"
            )}
          >
            {theme === "dark" ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
          </Button>

          <nav aria-label="Social links" className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ Icon, href, aria }) => (
              <Link
                key={aria}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconLinkClass}
                aria-label={aria}
              >
                <Icon className="size-5" aria-hidden />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
