import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BOOKS } from '@/lib/mock-data';
import { BookGrid } from '@/components/product/BookGrid';

export function Bestsellers() {
  const bestsellers = BOOKS.filter((b) => b.isBestseller).slice(0, 8);

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Bestsellers</h2>
            <p className="text-muted-foreground">The books everyone's talking about</p>
          </div>
          <Link to="/books?filter=bestseller" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <BookGrid books={bestsellers} />
      </div>
    </section>
  );
}
