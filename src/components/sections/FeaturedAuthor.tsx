import { Link } from "react-router-dom";
import { BOOKS } from "@/lib/mock-data";
import { BookGrid } from "@/components/product/BookGrid";
import { Award } from "lucide-react";

export function FeaturedAuthor() {
  // Pick author with most books, take first 5 books
  const counts: Record<string, number> = {};
  BOOKS.forEach((b) => (counts[b.author] = (counts[b.author] || 0) + 1));
  const featuredAuthor =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || BOOKS[0].author;
  const authorBooks = BOOKS.filter((b) => b.author === featuredAuthor).slice(0, 5);
  // pad with others if too few
  const books = authorBooks.length >= 4 ? authorBooks : [...authorBooks, ...BOOKS.slice(0, 5 - authorBooks.length)];

  return (
    <section className="py-14 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/40 p-6 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              <Award className="h-3 w-3" /> Featured Author
            </div>
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center font-serif text-3xl font-bold text-primary">
              {featuredAuthor.charAt(0)}
            </div>
            <h3 className="font-serif text-xl font-bold">{featuredAuthor}</h3>
            <p className="text-xs text-muted-foreground">
              Celebrated voice of contemporary literature with multiple bestsellers.
            </p>
            <Link
              to={`/books?author=${encodeURIComponent(featuredAuthor)}`}
              className="inline-block text-sm font-medium text-primary hover:underline"
            >
              View all books →
            </Link>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Books by {featuredAuthor}
            </h2>
            <BookGrid books={books} columns={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
