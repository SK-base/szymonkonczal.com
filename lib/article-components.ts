import type React from "react";

/**
 * Registry of custom article components. Add a static import and entry here
 * when you create articles/[slug]/index.tsx. Webpack cannot resolve dynamic
 * import paths like `import(\`@/articles/${slug}/index\`)`, so we use a
 * static registry instead.
 *
 * Example when adding a custom component for slug "my-article":
 *   import MyArticle from "@/articles/my-article/index";
 *   ... and add "my-article": MyArticle to the record below.
 */
const CUSTOM_ARTICLE_COMPONENTS: Record<string, React.ComponentType> = {
  // e.g. "example-article-1": ExampleArticle1,
};

export const CUSTOM_ARTICLE_SLUGS = Object.keys(CUSTOM_ARTICLE_COMPONENTS);

export function getCustomArticleComponent(
  slug: string
): React.ComponentType | null {
  return CUSTOM_ARTICLE_COMPONENTS[slug] ?? null;
}
