import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, BookOpen, Star, ArrowRight, Quote } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { BookSlider } from "@/components/product/BookSlider";

export function FeaturedAuthor() {
  // Pick author with most books
  const counts: Record<string, number> = {};
  BOOKS.forEach((b) => (counts[b.author] = (counts[b.author] || 0) + 1));
  const featuredAuthor =
    Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || BOOKS[0].author;

  const authorBooks = BOOKS.filter((b) => b.author === featuredAuthor);
  const books =
    authorBooks.length >= 6
      ? authorBooks
      : [...authorBooks, ...BOOKS.filter((b) => b.author !== featuredAuthor).slice(0, 8 - authorBooks.length)];

  const totalBooks = authorBooks.length;
  const avgRating =
    authorBooks.reduce((s, b) => s + b.rating, 0) / Math.max(authorBooks.length, 1);
  const totalReviews = authorBooks.reduce((s, b) => s + b.reviewCount, 0);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/30" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-amber-glow/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start">
          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden lg:sticky lg:top-24"
          >
            {/* Top banner */}
            <div className="relative h-24 bg-gradient-to-br from-primary via-primary/80 to-amber-glow">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }} />
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Award className="h-3 w-3" /> Featured Author
              </div>
            </div>

            <div className="px-6 pb-6 -mt-12 text-center space-y-3">
              {/* Avatar */}
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-background to-accent border-4 border-background shadow-lg flex items-center justify-center font-serif text-4xl font-bold text-primary">
                  {featuredAuthor.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-amber-glow border-2 border-background flex items-center justify-center">
                  <Star className="h-3.5 w-3.5 fill-background text-background" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold">{featuredAuthor}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Acclaimed Author</p>
              </div>

              <div className="relative px-2">
                <Quote className="absolute -top-1 left-0 h-4 w-4 text-primary/30" />
                <p className="text-sm italic text-muted-foreground leading-relaxed pl-5">
                  A celebrated voice whose words have shaped generations of readers across the world.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <BookOpen className="h-3.5 w-3.5" />
                  </div>
                  <div className="font-serif text-lg font-bold">{totalBooks}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Books</div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1 text-amber-glow">
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <div className="font-serif text-lg font-bold">{avgRating.toFixed(1)}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Rating</div>
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Award className="h-3.5 w-3.5" />
                  </div>
                  <div className="font-serif text-lg font-bold">
                    {totalReviews > 999 ? `${(totalReviews / 1000).toFixed(1)}k` : totalReviews}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Reviews</div>
                </div>
              </div>

              <Link
                to={`/books?author=${encodeURIComponent(featuredAuthor)}`}
                className="inline-flex items-center justify-center gap-1.5 w-full mt-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group"
              >
                Explore all books
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Books Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                  Author Spotlight
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold">
                  Books by {featuredAuthor}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Dive into a celebrated collection of timeless reads
                </p>
              </div>
            </div>
            <BookSlider books={books} minVisible={5} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
