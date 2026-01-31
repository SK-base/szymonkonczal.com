import type { Metadata } from "next";
import { absoluteUrl, buildOpenGraph } from "@/lib/metadata";

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
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-8">About</h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-surface rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Photo placeholder</span>
          </div>
          
          <div className="flex-1">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground mb-4">
                Welcome to my personal homepage. I&apos;m a developer, writer, and
                creator passionate about building meaningful things on the web.
              </p>
              <p className="text-muted-foreground mb-4">
                Here you&apos;ll find my notes, articles, and projects. I write about
                web development, design, and whatever else catches my interest.
              </p>
              <p className="text-muted-foreground">
                Feel free to explore and reach out if you&apos;d like to connect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
