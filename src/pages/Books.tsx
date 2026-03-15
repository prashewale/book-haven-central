import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BOOKS, GENRES } from '@/lib/mock-data';
import { BookGrid } from '@/components/product/BookGrid';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BookFormat } from '@/lib/types';

const FORMATS: BookFormat[] = ['Hardcover', 'Paperback', 'eBook', 'Audiobook'];
const ITEMS_PER_PAGE = 12;

export default function Books() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const genreParam = searchParams.get('genre');

  const [selectedGenres, setSelectedGenres] = useState<string[]>(genreParam ? [genreParam] : []);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat | ''>('');
  const [sortBy, setSortBy] = useState('title');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...BOOKS];

    if (filterParam === 'bestseller') result = result.filter((b) => b.isBestseller);
    if (filterParam === 'new') result = result.filter((b) => b.isNewRelease);

    if (selectedGenres.length > 0) {
      result = result.filter((b) => b.genres.some((g) => selectedGenres.includes(g)));
    }
    if (selectedFormat) {
      result = result.filter((b) => b.formats.includes(selectedFormat));
    }

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)); break;
      case 'price-high': result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedGenres, selectedFormat, sortBy, filterParam]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const pageTitle = filterParam === 'bestseller' ? 'Bestsellers' : filterParam === 'new' ? 'New Releases' : 'All Books';

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} books found</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title A–Z</SelectItem>
              <SelectItem value="price-low">Price: Low</SelectItem>
              <SelectItem value="price-high">Price: High</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-40 bg-background p-6 overflow-y-auto' : 'hidden'} md:block md:relative md:w-56 md:shrink-0`}>
          {showFilters && (
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h3 className="font-serif text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Genre</h4>
              <div className="space-y-2">
                {GENRES.slice(0, 10).map((genre) => (
                  <label key={genre} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={() => toggleGenre(genre)}
                    />
                    <span className="text-muted-foreground hover:text-foreground transition-colors">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Format</h4>
              <div className="space-y-2">
                {FORMATS.map((format) => (
                  <label key={format} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      checked={selectedFormat === format}
                      onChange={() => setSelectedFormat(selectedFormat === format ? '' : format)}
                      className="accent-primary"
                    />
                    <span className="text-muted-foreground">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            {(selectedGenres.length > 0 || selectedFormat) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setSelectedGenres([]); setSelectedFormat(''); }}
                className="text-primary"
              >
                Clear all filters
              </Button>
            )}
          </div>

          {showFilters && (
            <Button className="w-full mt-6 md:hidden" onClick={() => setShowFilters(false)}>
              Show {filtered.length} results
            </Button>
          )}
        </aside>

        {/* Grid */}
        <div className="flex-1 space-y-8">
          {paged.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No books match your filters.</p>
            </div>
          ) : (
            <BookGrid books={paged} columns={3} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button
                variant="outline"
                size="icon"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
