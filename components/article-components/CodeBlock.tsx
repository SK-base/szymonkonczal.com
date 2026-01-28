import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  language?: string;
}

export function CodeBlock({
  className,
  inline = false,
  language,
  children,
  ...props
}: CodeBlockProps) {
  if (inline) {
    return (
      <code
        className={cn(
          "px-1.5 py-0.5 rounded bg-surface text-sm font-mono",
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg bg-surface p-4 my-4",
        "border border-border",
        className
      )}
      {...props}
    >
      <code
        className="text-sm font-mono text-foreground"
        data-language={language}
      >
        {children}
      </code>
    </pre>
  );
}
