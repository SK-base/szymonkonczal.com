"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logotype } from "@/components/layout/Logotype";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/note" },
  { label: "Articles", href: "/articles" },
  { label: "Tags", href: "/tags" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function NavLinks({
  pathname,
  linkClassName,
  onLinkClick,
  activeIndicator = "underline",
}: {
  pathname: string;
  linkClassName: string;
  onLinkClick?: () => void;
  activeIndicator?: "underline" | "triangle";
}) {
  return (
    <>
      {navItems.map((item) => {
        const active = isActive(item.href, pathname);
        const activeClass =
          activeIndicator === "triangle"
            ? active && "text-accent"
            : active && "text-accent border-accent";
        const label =
          activeIndicator === "triangle" && active
            ? `▶ ${item.label}`
            : item.label;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(linkClassName, activeClass)}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const desktopLinkClass = cn(
    "inline-block text-sm font-semibold uppercase text-muted-foreground transition-colors",
    "border-b-4 border-transparent pb-1 -mb-px",
    "hover:text-accent hover:border-accent"
  );

  const mobileLinkClass = cn(
    "block py-3 pl-5 text-base font-semibold uppercase text-muted-foreground transition-colors border-b border-border",
    "hover:text-accent"
  );

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

        {/* Desktop nav – hidden on narrow, visible from md */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks pathname={pathname} linkClassName={desktopLinkClass} />
        </div>

        {/* Mobile: hamburger + sheet */}
        <div className="flex md:hidden items-center">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="text-muted-foreground hover:text-accent"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(85vw,20rem)]">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col pt-4" aria-label="Mobile navigation">
                <NavLinks
                  pathname={pathname}
                  linkClassName={mobileLinkClass}
                  onLinkClick={() => setMobileOpen(false)}
                  activeIndicator="triangle"
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
