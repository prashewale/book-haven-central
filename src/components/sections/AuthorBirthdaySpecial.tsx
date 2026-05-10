import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cake,
  Star,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Gift,
  Calendar,
} from "lucide-react";

import { BOOKS } from "@/lib/mock-data";
import type { Book } from "@/lib/types";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";

// Mock data for author birthdays (month-day format)
const AUTHOR_BIRTHDAYS: Record<string, string> = {
  "AUTHOR 1": "05-15",
  "AUTHOR 3": "05-22",
  "AUTHOR 7": "05-08",
  "AUTHOR 12": "05-28",
  "AUTHOR 5": "06-10",
  "AUTHOR 9": "06-15",
  "AUTHOR 15": "06-20",
  "AUTHOR 2": "07-05",
  "AUTHOR 8": "07-12",
  "AUTHOR 14": "07-25",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function AuthorBirthdaySpecial() {
  const addItem = useCart((s) => s.addItem);

  const { birthdayAuthors, currentMonth } = useMemo(() => {
    const now = new Date();
    const currentMonthNum = now.getMonth(); // 0-11
    const monthName = MONTH_NAMES[currentMonthNum];

    // Find authors with birthdays in current month
    const birthdayMonth = (currentMonthNum + 1).toString().padStart(2, "0");

    const birthdayAuthorsList = Object.entries(AUTHOR_BIRTHDAYS)
      .filter(([_, date]) => date.startsWith(birthdayMonth))
      .map(([author, date]) => {
        const day = parseInt(date.split("-")[1]);
        const books = BOOKS.filter((b) => b.author === author);
        return { author, date: `${day} ${monthName}`, books };
      })
      .sort((a, b) => parseInt(a.date) - parseInt(b.date));

    // If no birthdays this month, show some default authors
    const authorsToShow =
      birthdayAuthorsList.length > 0
        ? birthdayAuthorsList
        : [
            {
              author: BOOKS[0].author,
              date: `15 ${monthName}`,
              books: BOOKS.filter((b) => b.author === BOOKS[0].author),
            },
            {
              author: BOOKS[4].author,
              date: `22 ${monthName}`,
              books: BOOKS.filter((b) => b.author === BOOKS[4].author),
            },
          ];

    return { birthdayAuthors: authorsToShow, currentMonth: monthName };
  }, []);

  const [selectedAuthor, setSelectedAuthor] = useState(birthdayAuthors[0]);
  const [selectedBook, setSelectedBook] = useState(
    selectedAuthor.books[0] || BOOKS[0]
  );

  const handleAuthorChange = (authorData: (typeof birthdayAuthors)[0]) => {
    setSelectedAuthor(authorData);
    setSelectedBook(authorData.books[0] || BOOKS[0]);
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/[0.06] via-background to-amber-400/[0.04]" />

      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-pink-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-300 blur-3xl" />
      </div>

      {/* Confetti decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: [0, 1, 0], y: [0, 100, 200] }}
            viewport={{ once: true }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className={`absolute h-2 w-2 rounded-full ${
              i % 2 === 0 ? "bg-pink-400" : "bg-amber-400"
            }`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 backdrop-blur">
            <Cake className="h-4 w-4" />
            Birthday Celebrations
          </div>

          <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Author Birthday Special
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Celebrating our beloved authors born in{" "}
            <span className="font-semibold text-pink-500">{currentMonth}</span>.
            Discover their remarkable works with exclusive birthday offers!
          </p>
        </motion.div>

        {/* Author Birthday Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {birthdayAuthors.map((authorData, index) => (
            <motion.button
              key={authorData.author}
              onClick={() => handleAuthorChange(authorData)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex items-center gap-4 rounded-2xl border p-4 pr-6 transition-all ${
                selectedAuthor.author === authorData.author
                  ? "border-pink-400 bg-pink-500/10 shadow-lg shadow-pink-400/20"
                  : "border-muted bg-card/50 hover:border-pink-300 hover:bg-pink-500/5"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl font-serif text-xl font-bold transition-colors ${
                  selectedAuthor.author === authorData.author
                    ? "bg-gradient-to-br from-pink-500 to-amber-400 text-white"
                    : "bg-muted text-muted-foreground group-hover:bg-pink-100 group-hover:text-pink-500"
                }`}
              >
                {authorData.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold">{authorData.author}</p>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {authorData.date}
                  {selectedAuthor.author === authorData.author && (
                    <span className="ml-1 rounded-full bg-pink-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Today
                    </span>
                  )}
                </div>
              </div>
              {selectedAuthor.author === authorData.author && (
                <motion.div
                  layoutId="birthday-indicator"
                  className="absolute -right-1 -top-1"
                >
                  <Gift className="h-5 w-5 text-pink-500" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Books Grid for Selected Author */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAuthor.author}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Cake className="h-5 w-5 text-pink-500" />
                  <h3 className="font-serif text-2xl font-bold">
                    Books by {selectedAuthor.author}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedAuthor.books.length} title
                  {selectedAuthor.books.length !== 1 ? "s" : ""} available
                </p>
              </div>
              <Link
                to={`/books?author=${encodeURIComponent(selectedAuthor.author)}`}
                className="group inline-flex items-center gap-2 rounded-full border bg-background/70 px-5 py-3 text-sm font-semibold shadow-sm backdrop-blur transition-all hover:border-pink-300 hover:bg-pink-500/5 hover:shadow-lg"
              >
                View All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {selectedAuthor.books.slice(0, 5).map((book, i) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-300 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-400/10"
                >
                  {/* Birthday Badge */}
                  <div className="absolute left-3 right-3 top-3 z-10 flex justify-between">
                    <div className="rounded-full bg-pink-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                      <span className="flex items-center gap-1">
                        <Cake className="h-3 w-3" />
                        Birthday
                      </span>
                    </div>
                    {book.onSale && (
                      <div className="rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        Sale
                      </div>
                    )}
                  </div>

                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-pink-500 p-3 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(book, book.formats[0]);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </motion.button>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="line-clamp-2 text-sm font-bold text-white">
                        {book.title}
                      </h4>
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          {book.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-lg font-bold text-pink-500">
                          ₹
                          {(
                            book.discountPrice || book.price
                          ).toFixed(2)}
                        </span>
                        {book.discountPrice && (
                          <span className="ml-1.5 text-xs text-muted-foreground line-through">
                            ₹{book.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}