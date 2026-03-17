import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BOOKS, GENRES } from '@/lib/mock-data';
import { BookGrid } from '@/components/product/BookGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BookFormat } from '@/lib/types';

const FORMATS: BookFormat[] = ['Hardcover', 'Paperback', 'eBook', 'Audiobook'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(true);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedFormat('');
    setPriceRange([0, 50]);
    setSortBy('relevance');
  };

  const activeFilterCount =
    selectedGenres.length + (selectedFormat ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 50 ? 1 : 0);

  const results = useMemo(() => {
    let filtered = [...BOOKS];

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genres.some((g) => g.toLowerCase().includes(q)) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((b) =>
        selectedGenres.some((g) => b.genres.includes(g))
      );
    }

    // Format filter
    if (selectedFormat) {
      filtered = filtered.filter((b) =>
        b.formats.includes(selectedFormat as BookFormat)
      );
    }

    // Price filter
    filtered = filtered.filter((b) => {
      const price = b.discountPrice || b.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        break;
    }

    return filtered;
  }, [query, selectedGenres, selectedFormat, priceRange, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Search header */}
      <div className="space-y-6 mb-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">Advanced Search</h1>

        <form onSubmit={handleSubmit} className="flex gap-3 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, genre, or keyword..."
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-6 rounded-xl">
            Search
          </Button>
        </form>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} w-64 shrink-0 space-y-6 hidden md:block`}>
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-semibold text-lg">Filters</h3>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Genres */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Genre</h4>
            <div className="flex flex-wrap gap-2">
              {GENRES.slice(0, 12).map((genre) => (
                <Badge
                  key={genre}
                  variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Format</h4>
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
                  <span className="text-foreground/80">{format}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Price Range</h4>
            <Slider
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as [number, number])}
              min={0}
              max={50}
              step={1}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Sort By</h4>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {results.length} book{results.length !== 1 ? 's' : ''} found
            </p>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>

          {/* Active filters tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedGenres.map((g) => (
                <Badge key={g} variant="secondary" className="gap-1">
                  {g}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => toggleGenre(g)} />
                </Badge>
              ))}
              {selectedFormat && (
                <Badge variant="secondary" className="gap-1">
                  {selectedFormat}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedFormat('')} />
                </Badge>
              )}
            </div>
          )}

          {results.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <SearchIcon className="h-16 w-16 text-muted-foreground/20 mx-auto" />
              <h2 className="text-xl font-serif font-semibold">No results found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <BookGrid books={results} columns={3} />
          )}
        </div>
      </div>
    </main>
  );
}
