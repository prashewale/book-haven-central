import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  ShoppingCart,
  Sparkles,
  PartyPopper,
  Gift,
  BookOpen,
} from "lucide-react";

import { BOOKS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";

// Festival data for each month
const FESTIVALS = [
  {
    month: 0, // January
    name: "New Year",
    subtitle: "Fresh Starts & New Stories",
    icon: "🎊",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/30",
    textColor: "text-blue-500",
    shadowColor: "shadow-blue-400/20",
    hoverColor: "hover:border-blue-300 hover:bg-blue-500/5",
    genres: ["Self-Help", "Motivational", "Philosophy"],
  },
  {
    month: 1, // February
    name: "Valentine's Day",
    subtitle: "Tales of Love & Romance",
    icon: "💝",
    color: "from-pink-500 to-rose-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-400/30",
    textColor: "text-pink-500",
    shadowColor: "shadow-pink-400/20",
    hoverColor: "hover:border-pink-300 hover:bg-pink-500/5",
    genres: ["Romance", "Literary", "Fiction"],
  },
  {
    month: 2, // March
    name: "Holi",
    subtitle: "Festival of Colors & Joy",
    icon: "🎨",
    color: "from-orange-500 to-pink-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-400/30",
    textColor: "text-orange-500",
    shadowColor: "shadow-orange-400/20",
    hoverColor: "hover:border-orange-300 hover:bg-orange-500/5",
    genres: ["Fiction", "Comedy", "Literary"],
  },
  {
    month: 3, // April
    name: "Easter",
    subtitle: "Renewal & Reflection",
    icon: "🐣",
    color: "from-green-500 to-emerald-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-400/30",
    textColor: "text-green-500",
    shadowColor: "shadow-green-400/20",
    hoverColor: "hover:border-green-300 hover:bg-green-500/5",
    genres: ["Spiritual", "Philosophy", "Self-Help"],
  },
  {
    month: 4, // May
    name: "Mother's Day",
    subtitle: "Celebrating Love & Sacrifice",
    icon: "🌸",
    color: "from-pink-400 to-rose-300",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-300/30",
    textColor: "text-pink-500",
    shadowColor: "shadow-pink-300/20",
    hoverColor: "hover:border-pink-200 hover:bg-pink-400/5",
    genres: ["Fiction", "Memoir", "Biography"],
  },
  {
    month: 5, // June
    name: "Father's Day",
    subtitle: "Honoring Strength & Wisdom",
    icon: "👔",
    color: "from-blue-600 to-indigo-400",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-600",
    shadowColor: "shadow-blue-500/20",
    hoverColor: "hover:border-blue-400 hover:bg-blue-600/5",
    genres: ["Biography", "Historical", "Non-Fiction"],
  },
  {
    month: 6, // July
    name: "Independence Day",
    subtitle: "Freedom & Patriotism",
    icon: "🇮🇳",
    color: "from-orange-500 to-green-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-400/30",
    textColor: "text-orange-600",
    shadowColor: "shadow-orange-400/20",
    hoverColor: "hover:border-orange-300 hover:bg-orange-500/5",
    genres: ["Historical", "Biography", "Non-Fiction"],
  },
  {
    month: 7, // August
    name: "Raksha Bandhan",
    subtitle: "Bond of Siblings",
    icon: "🧿",
    color: "from-yellow-500 to-orange-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-400/30",
    textColor: "text-yellow-600",
    shadowColor: "shadow-yellow-400/20",
    hoverColor: "hover:border-yellow-300 hover:bg-yellow-500/5",
    genres: ["Fiction", "Literary", "Drama"],
  },
  {
    month: 8, // September
    name: "Ganesh Chaturthi",
    subtitle: "New Beginnings & Wisdom",
    icon: "🐘",
    color: "from-orange-500 to-red-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-400/30",
    textColor: "text-orange-600",
    shadowColor: "shadow-orange-400/20",
    hoverColor: "hover:border-orange-300 hover:bg-orange-500/5",
    genres: ["Spiritual", "Philosophy", "Self-Help"],
  },
  {
    month: 9, // October
    name: "Diwali",
    subtitle: "Festival of Lights",
    icon: "🪔",
    color: "from-amber-500 to-orange-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-400/30",
    textColor: "text-amber-600",
    shadowColor: "shadow-amber-400/20",
    hoverColor: "hover:border-amber-300 hover:bg-amber-500/5",
    genres: ["Spiritual", "Fantasy", "Fiction"],
  },
  {
    month: 10, // November
    name: "Christmas",
    subtitle: "Joy & Giving",
    icon: "🎄",
    color: "from-red-500 to-green-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-400/30",
    textColor: "text-red-500",
    shadowColor: "shadow-red-400/20",
    hoverColor: "hover:border-red-300 hover:bg-red-500/5",
    genres: ["Fiction", "Classic", "Literary"],
  },
  {
    month: 11, // December
    name: "New Year Eve",
    subtitle: "Celebration & Reflection",
    icon: "🎆",
    color: "from-purple-500 to-pink-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-400/30",
    textColor: "text-purple-500",
    shadowColor: "shadow-purple-400/20",
    hoverColor: "hover:border-purple-300 hover:bg-purple-500/5",
    genres: ["Self-Help", "Memoir", "Philosophy"],
  },
];

export function FestivalOfMonth() {
  const addItem = useCart((s) => s.addItem);

  const currentFestival = FESTIVALS[new Date().getMonth()];

  // Filter books based on festival genres
  const festivalBooks = BOOKS.filter((book) =>
    book.genres.some((g) => currentFestival.genres.includes(g))
  ).slice(0, 8);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentFestival.bgColor} via-background to-background`}
      />

      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className={`absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br ${currentFestival.color} blur-3xl`}
        />
        <div
          className={`absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gradient-to-br ${currentFestival.color} blur-3xl`}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          whileInView={{ opacity: 0.1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute left-10 top-20 text-6xl"
        >
          {currentFestival.icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          whileInView={{ opacity: 0.1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute right-10 bottom-20 text-6xl"
        >
          {currentFestival.icon}
        </motion.div>
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
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border ${currentFestival.borderColor} ${currentFestival.bgColor} px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${currentFestival.textColor} backdrop-blur`}
          >
            <PartyPopper className="h-4 w-4" />
            Festival Celebration
          </div>

          <div className="mb-3 text-6xl">{currentFestival.icon}</div>

          <h2 className="font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {currentFestival.name}
          </h2>

          <p className="mt-2 text-lg font-medium text-muted-foreground">
            {currentFestival.subtitle}
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Curated collection of books perfect for the{" "}
            <span className={`font-semibold ${currentFestival.textColor}`}>
              {currentFestival.name}
            </span>{" "}
            spirit. Discover stories that celebrate the essence of this special
            time.
          </p>
        </motion.div>

        {/* Festival Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mb-12 overflow-hidden rounded-3xl border ${currentFestival.borderColor} bg-gradient-to-r ${currentFestival.color} p-8 md:p-12`}
        >
          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                <Sparkles className="h-5 w-5 text-white/80" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  Special Offer
                </span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-white md:text-4xl">
                Celebrate with Books
              </h3>
              <p className="mt-2 max-w-md text-white/80">
                Get exclusive discounts on our curated festival collection.
                Perfect gifts for your loved ones!
              </p>
            </div>
            <Link
              to={`/books?festival=${encodeURIComponent(currentFestival.name.toLowerCase().replace(/\s+/g, "-"))}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-gray-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <Gift className="h-5 w-5" />
              Shop Festival Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {festivalBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Festival Badge */}
              <div className="absolute left-3 right-3 top-3 z-10 flex justify-between">
                <div
                  className={`rounded-full bg-gradient-to-r ${currentFestival.color} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg`}
                >
                  {currentFestival.name}
                </div>
                {book.onSale && (
                  <div className="rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
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
                  className={`absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r ${currentFestival.color} p-3 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100`}
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
                  <p className="mt-1 line-clamp-1 text-xs text-white/70">
                    by {book.author}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {book.rating}
                  </div>
                </div>
              </div>

              <div className="border-t p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-end gap-2">
                    <span
                      className={`text-lg font-bold ${currentFestival.textColor}`}
                    >
                      ₹
                      {(book.discountPrice || book.price).toFixed(2)}
                    </span>
                    {book.discountPrice && (
                      <span className="mb-1 text-xs text-muted-foreground line-through">
                        ₹{book.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {book.discountPrice && (
                    <span className="text-xs font-medium text-green-600">
                      Save ₹{(book.price - book.discountPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            to={`/books?festival=${encodeURIComponent(currentFestival.name.toLowerCase().replace(/\s+/g, "-"))}`}
            className={`group inline-flex items-center gap-2 rounded-full border ${currentFestival.borderColor} ${currentFestival.bgColor} px-6 py-3 text-sm font-semibold ${currentFestival.textColor} shadow-sm backdrop-blur transition-all hover:shadow-lg`}
          >
            <BookOpen className="h-4 w-4" />
            Explore Full {currentFestival.name} Collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}