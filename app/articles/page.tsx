import { ArticleCard } from "@/components/blog/ArticleCard";
import { Pagination } from "@/components/blog/Pagination";
import { getAllArticles } from "@/lib/content/articles";

const ITEMS_PER_PAGE = 10;

interface ArticlesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolved = await searchParams;
  const currentPage = Number(resolved.page) || 1;
  const allArticles = getAllArticles();
  const totalPages = Math.ceil(allArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const articles = allArticles.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl font-bold mb-8">Articles</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Longer, evergreen pieces with custom-designed layouts, meant for deep
          dives and reference.
        </p>

        {articles.length === 0 ? (
          <p className="text-muted-foreground">No articles yet.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-1">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/articles"
            />
          </>
        )}
      </div>
    </div>
  );
}
