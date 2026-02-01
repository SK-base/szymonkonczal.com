import type { Metadata } from "next";
import { absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/metadata";
import Link from "next/link";

const description =
  "I'm a developer, writer, and creator passionate about building meaningful things on the web. Notes, articles, and projects.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: buildOpenGraph({
    title: "About | Szymon Konczal",
    description,
    url: absoluteUrl("/about"),
    type: "website",
  }),
  twitter: buildTwitter({ title: "About | Szymon Konczal", description }),
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-8">About</h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-surface rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Photo placeholder</span>
          </div>
          
          <div className="flex-1">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
              I&apos;m a software engineer, builder and traveler. I&apos;ve been coding for most of my life. My main technology is JavaScript (on the frontend, backend, mobile and wherever you can use it).
              </p>
              <p className="text-lg text-muted-foreground mb-4">
              These days I mostly talk to AI. I build software with AI tools and share what actually works. I&apos;m really into vibe coding.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
              Here, on this website, you can read some of my thoughts.
              </p>
            </div>
          </div>
        </div>
        <h2 className="font-serif text-3xl font-bold mb-4">Stay in touch</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Let&apos;s stay in touch. If you want to stay up to date and not miss any of my updates, join my <Link href="/mailing-list" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">mailing list</Link> or follow me on social media:
        </p>
        <ul className="list-disc list-inside text-lg text-muted-foreground mb-4">
          <li><Link href="https://x.com/szymonkonczal" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">X (Twitter)</Link></li>
          <li><Link href="https://linkedin.com/in/szymonkonczal" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">LinkedIn</Link></li>
          <li><Link href="https://github.com/archon-" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">GitHub</Link></li>
          <li><Link href="https://instagram.com/szymonkonczal" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">Instagram</Link></li>
        </ul>
        <h2 className="font-serif text-3xl font-bold mb-4">Contact</h2>
        <p className="text-lg text-muted-foreground mb-4">
          If you want to reach out - drop me an email on <Link href="mailto:hello@szymonkonczal.com" className="text-accent hover:text-accent-dark underline decoration-2 decoration-accent underline-offset-2">hello@szymonkonczal.com</Link>.
        </p>
      </div>
    </div>
  );
}
