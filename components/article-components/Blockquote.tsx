import { cn } from "@/lib/utils";

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  variant?: "default" | "accent" | "muted";
  cite?: string;
}

export function Blockquote({
  className,
  variant = "default",
  cite,
  children,
  ...props
}: BlockquoteProps) {
  const variantStyles = {
    default: "border-l-4 border-accent bg-surface/50",
    accent: "border-l-4 border-accent-dark bg-warm-highlight/30",
    muted: "border-l-4 border-border bg-surface/30",
  };

  return (
    <blockquote
      className={cn(
        "my-6 pl-4 py-2 italic text-muted-foreground",
        variantStyles[variant],
        className
      )}
      cite={cite}
      {...props}
    >
      {children}
      {cite && (
        <footer className="mt-2 text-sm not-italic">
          — <cite>{cite}</cite>
        </footer>
      )}
    </blockquote>
  );
}
