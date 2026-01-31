"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logotype } from "@/components/layout/Logotype";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/note" },
  { label: "Articles", href: "/articles" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
          aria-label="Home"
        >
          <Logotype size="md" />
        </Link>
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-block text-sm font-semibold uppercase text-muted-foreground transition-colors",
                  "border-b-4 border-transparent pb-1 -mb-px",
                  "hover:text-accent hover:border-accent",
                  active && "text-accent border-accent"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
