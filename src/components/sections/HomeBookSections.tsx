import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { BookSlider } from "@/components/product/BookSlider";

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
    <section className={`py-10 ${bg}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold">{title}</h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <Link
            to={href}
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <BookSlider books={books} minVisible={6} />
      </div>
    </section>
  );
}

export function NewArrivalsSection() {
  return <Section title="New Arrivals" subtitle="Fresh off the press" books={BOOKS.slice(0, 12)} />;
}

export function UpcomingSection() {
  return (
    <Section
      title="Upcoming Releases"
      subtitle="Pre-order tomorrow's bestsellers"
      books={BOOKS.slice(6, 18)}
      bg="bg-accent/20"
    />
  );
}

export function FeaturedSection() {
  return (
    <Section
      title="Featured Books"
      subtitle="Editor's curated picks"
      books={BOOKS.filter((b) => b.isBestseller).slice(0, 12)}
    />
  );
}

export function AllTimeBestsellerSection() {
  const books = [...BOOKS]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 12);
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
    .slice(0, 12);
  return <Section title="Recent Bestsellers" subtitle="Trending right now" books={books} />;
}
