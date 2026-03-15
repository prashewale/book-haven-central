import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { useMemo } from 'react';
import { BOOKS } from '@/lib/mock-data';
import { BookGrid } from '@/components/product/BookGrid';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return BOOKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genres.some((g) => g.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">
          {query ? `Results for "${query}"` : 'Search'}
        </h1>
        <p className="text-muted-foreground">
          {query ? `${results.length} book(s) found` : 'Use the search bar to find books'}
        </p>
      </div>

      {query && results.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <SearchIcon className="h-16 w-16 text-muted-foreground/20 mx-auto" />
          <h2 className="text-xl font-serif font-semibold">No results found</h2>
          <p className="text-muted-foreground">Try a different search term or browse our collections.</p>
        </div>
      ) : (
        <BookGrid books={results} columns={4} />
      )}
    </main>
  );
}
