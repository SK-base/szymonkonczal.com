import * as React from "react";
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

  const childArray = React.Children.toArray(children);
  const onlyChild = childArray.length === 1 ? childArray[0] : null;

  // next-mdx-remote renders fenced/indented blocks as <pre><code className="language-...">...</code></pre>.
  // When `CodeBlock` is used as the `pre` component, `children` will be that inner element.
  const codeChildProps =
    onlyChild && React.isValidElement(onlyChild) ? (onlyChild.props as any) : null;

  const resolvedLanguage =
    language ??
    (typeof codeChildProps?.className === "string"
      ? codeChildProps.className.match(/(?:^|\s)language-([a-z0-9_-]+)(?:\s|$)/i)?.[1]
      : undefined);

  const codeContent = codeChildProps?.children ?? children;

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
        data-language={resolvedLanguage}
      >
        {codeContent}
      </code>
    </pre>
  );
}
