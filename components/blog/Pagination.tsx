import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}?page=${page}`;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className={cn("flex items-center justify-center gap-2 mt-8", className)}
      aria-label="Pagination"
    >
      {isFirstPage ? (
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "opacity-50 cursor-not-allowed pointer-events-none"
          )}
          aria-disabled="true"
          aria-label="Previous (disabled)"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </span>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link href={getPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        </Button>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                asChild
              >
                <Link href={getPageUrl(page)}>{page}</Link>
              </Button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return <span key={page} className="px-2">...</span>;
          }
          return null;
        })}
      </div>

      {isLastPage ? (
        <span
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "opacity-50 cursor-not-allowed pointer-events-none"
          )}
          aria-disabled="true"
          aria-label="Next (disabled)"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </span>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link href={getPageUrl(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </nav>
  );
}
