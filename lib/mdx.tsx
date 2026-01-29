import { MDXRemote } from "next-mdx-remote/rsc";
import { Blockquote } from "@/components/article-components/Blockquote";
import { CodeBlock } from "@/components/article-components/CodeBlock";
import { Separator } from "@/components/article-components/Separator";

const components = {
  blockquote: Blockquote,
  pre: CodeBlock,
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <CodeBlock inline {...props} />
  ),
  hr: Separator,
  // Standard HTML elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-serif text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-serif text-3xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-serif text-2xl font-bold mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent hover:text-accent-dark underline underline-offset-2"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="ml-4" {...props} />
  ),
};

interface MDXContentProps {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ source, components: customComponents }: MDXContentProps) {
  const mergedComponents = { ...components, ...customComponents };
  
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={source} components={mergedComponents} />
    </div>
  );
}
