import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { BookGrid } from "@/components/product/BookGrid";

interface Props {
  title: string;
  subtitle?: string;
  books: typeof BOOKS;
  href?: string;
  bg?: string;
}

function Section({ title, subtitle, books, href = "/books", bg = "" }: Props) {
  if (!books.length) return null;
  return (
    <section className={`py-12 ${bg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <Link
            to={href}
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <BookGrid books={books} columns={5} />
      </div>
    </section>
  );
}

export function NewArrivalsSection() {
  const books = BOOKS.slice(0, 6);
  return <Section title="New Arrivals" subtitle="Fresh off the press" books={books} />;
}

export function UpcomingSection() {
  const books = BOOKS.slice(6, 12);
  return (
    <Section
      title="Upcoming Releases"
      subtitle="Pre-order tomorrow's bestsellers"
      books={books}
      bg="bg-accent/20"
    />
  );
}

export function FeaturedSection() {
  const books = BOOKS.filter((b) => b.isBestseller).slice(0, 6);
  return <Section title="Featured Books" subtitle="Editor's curated picks" books={books} />;
}

export function AllTimeBestsellerSection() {
  const books = [...BOOKS]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 6);
  return (
    <Section
      title="All Time Bestsellers"
      subtitle="Loved by generations of readers"
      books={books}
      bg="bg-accent/20"
    />
  );
}

export function RecentBestsellerSection() {
  const books = [...BOOKS]
    .filter((b) => b.isBestseller)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  return <Section title="Recent Bestsellers" subtitle="Trending right now" books={books} />;
}
