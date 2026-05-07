import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  Star,
  ShoppingCart,
  ArrowRight,
  Eye,
  Sparkles,
  Quote,
  TrendingUp,
} from "lucide-react";

import { BOOKS } from "@/lib/mock-data";
import type { Book } from "@/lib/types";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function FeaturedAuthor() {
  const addItem = useCart((s) => s.addItem);

  const featuredAuthor = useMemo(() => {
    const counts: Record<string, number> = {};

    BOOKS.forEach((b) => {
      counts[b.author] = (counts[b.author] || 0) + 1;
    });

    return (
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      BOOKS[0].author
    );
  }, []);

  const authorBooks = BOOKS.filter((b) => b.author === featuredAuthor);

  const displayBooks =
    authorBooks.length >= 6
      ? authorBooks
      : [
          ...authorBooks,
          ...BOOKS.filter((b) => b.author !== featuredAuthor).slice(
            0,
            6 - authorBooks.length,
          ),
        ];

  const [selectedBook, setSelectedBook] = useState<Book>(displayBooks[0]);

  const totalBooks = authorBooks.length;

  const avgRating =
    authorBooks.reduce((s, b) => s + b.rating, 0) /
    Math.max(authorBooks.length, 1);

  const totalReviews = authorBooks.reduce((s, b) => s + b.reviewCount, 0);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-background to-primary/[0.03]" />

      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-400 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Author
            </div>

            <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Stories That Stay With You
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover bestselling titles, highly rated collections, and
              beautifully written stories from one of our most celebrated
              authors.
            </p>
          </div>

          <Link
            to={`/books?author=${encodeURIComponent(featuredAuthor)}`}
            className="group inline-flex items-center gap-2 rounded-full border bg-background/70 px-5 py-3 text-sm font-semibold shadow-sm backdrop-blur transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg"
          >
            Explore Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Main Layout */}
        <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-2xl backdrop-blur"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent" />

            <div className="relative">
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-400 font-serif text-3xl font-bold text-primary-foreground shadow-xl ring-4 ring-primary/20">
                  {featuredAuthor.charAt(0)}
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Author Spotlight
                  </p>

                  <h3 className="font-serif text-3xl font-bold">
                    {featuredAuthor}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Award-winning storyteller
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-8 rounded-2xl border bg-background/60 p-5 backdrop-blur">
                <Quote className="mb-3 h-5 w-5 text-primary" />

                <p className="text-sm leading-relaxed text-muted-foreground">
                  “A compelling voice that blends imagination, emotion, and
                  unforgettable storytelling.”
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Books
                    </span>
                  </div>

                  <div className="mt-2 text-2xl font-bold">{totalBooks}</div>
                </div>

                <div className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Rating
                    </span>
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {avgRating.toFixed(1)}
                  </div>
                </div>

                <div className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Reviews
                    </span>
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {totalReviews > 999
                      ? `${(totalReviews / 1000).toFixed(1)}k`
                      : totalReviews}
                  </div>
                </div>

                <div className="rounded-2xl border bg-background/70 p-4">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Award className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>

                  <div className="mt-2 text-2xl font-bold">
                    {authorBooks.filter((b) => b.onSale).length}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* BOOK GRID */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold">
                    Featured Books
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Handpicked titles from the collection
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {displayBooks.slice(0, 6).map((book, i) => {
                  const active = selectedBook.id === book.id;

                  return (
                    <motion.button
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative overflow-hidden rounded-2xl border bg-card text-left transition-all duration-300 ${
                        active
                          ? "border-primary shadow-2xl shadow-primary/20"
                          : "hover:border-primary/20 hover:shadow-xl"
                      }`}
                    >
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className={`h-full w-full object-cover transition-transform duration-500 ${
                            active ? "scale-105" : "group-hover:scale-105"
                          }`}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        {book.onSale && (
                          <div className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
                            Sale
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="line-clamp-1 text-sm font-bold text-white">
                            {book.title}
                          </h4>

                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {book.rating}
                            </div>

                            {active && (
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                                <Eye className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* DETAILS CARD */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBook.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="sticky top-24 h-fit overflow-hidden rounded-3xl border bg-card shadow-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={selectedBook.cover}
                    alt={selectedBook.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground backdrop-blur">
                    Featured Pick
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="mb-2 flex items-center gap-2 text-white">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

                      <span className="text-sm font-bold">
                        {selectedBook.rating}
                      </span>

                      <span className="text-xs text-white/70">
                        ({selectedBook.reviewCount} reviews)
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-white">
                      {selectedBook.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/70">
                      by {selectedBook.author}
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-2">
                    {selectedBook.genres.slice(0, 3).map((g) => (
                      <span
                        key={g}
                        className="rounded-full border bg-muted/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 rounded-2xl border bg-muted/30 p-4 text-center">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Pages
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {selectedBook.pages}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Published
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {selectedBook.pubDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        Genre
                      </p>

                      <p className="mt-1 text-sm font-bold">
                        {selectedBook.genres[0]}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selectedBook.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-5">
                    <div>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-primary">
                          ₹
                          {(
                            selectedBook.discountPrice || selectedBook.price
                          ).toFixed(2)}
                        </span>

                        {selectedBook.discountPrice && (
                          <span className="mb-1 text-sm text-muted-foreground line-through">
                            ₹{selectedBook.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {selectedBook.discountPrice && (
                        <p className="mt-1 text-xs font-medium text-green-600">
                          Save ₹
                          {(
                            selectedBook.price - selectedBook.discountPrice
                          ).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/books/${selectedBook.slug}`}
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Details
                      </Link>

                      <Button
                        onClick={() =>
                          addItem(selectedBook, selectedBook.formats[0])
                        }
                        className="h-11 rounded-xl px-5"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
