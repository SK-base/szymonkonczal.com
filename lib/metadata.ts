/**
 * Site base URL for canonical links and absolute URLs.
 * Override with NEXT_PUBLIC_SITE_URL in production.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://szymonkonczal.com";

/** Site name for Open Graph and metadata. */
export const SITE_NAME = "Szymon Konczal";

/** Default OG image path (add public/images/og-default.png for site-wide OG image). */
export const DEFAULT_OG_IMAGE_PATH = "/images/og-default.png";

/**
 * Build an absolute URL for a path (used for canonical and OG URLs).
 */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${normalized}`;
}

export type OpenGraphType = "website" | "article";

export interface OpenGraphOptions {
  title: string;
  description: string;
  url: string;
  type: OpenGraphType;
  image?: string | null;
}

/**
 * Build Open Graph metadata for Next.js metadata.openGraph.
 * Uses SITE_NAME and en_US locale; optional image (absolute URL or path).
 */
export function buildOpenGraph(options: OpenGraphOptions) {
  const { title, description, url, type, image } = options;
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl(DEFAULT_OG_IMAGE_PATH);

  return {
    title,
    description,
    url,
    siteName: SITE_NAME,
    locale: "en_US" as const,
    type,
    images: [{ url: imageUrl }],
  };
}

const META_DESCRIPTION_MAX_LENGTH = 160;

/**
 * Derive a plain-text excerpt from MDX/Markdown content for meta description.
 * Strips markdown syntax and truncates to ~150–160 characters.
 */
export function excerptFromContent(content: string, maxLength = META_DESCRIPTION_MAX_LENGTH): string {
  if (!content || !content.trim()) return "";

  let text = content
    // Code blocks (multiline)
    .replace(/```[\s\S]*?```/g, " ")
    // Inline code
    .replace(/`[^`]+`/g, " ")
    // Headers (# ## ###)
    .replace(/^#{1,6}\s+/gm, " ")
    // Bold/italic
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    // Links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Images ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    // Horizontal rules, list markers
    .replace(/^[-*]\s+/gm, " ")
    .replace(/^\d+\.\s+/gm, " ")
    // Multiple spaces/newlines
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 3).lastIndexOf(" ");
  const end = cut > maxLength / 2 ? cut : maxLength - 3;
  return text.slice(0, end).trim() + "...";
}
