import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/types";

// ── Types ─────────────────────────────────────────────────────────────────────
interface StoreOption {
  id: string;
  name: string;
  emoji: string;
  price: string;
  badge?: string;
  badgeVariant?: "amber" | "blue" | "green" | "red" | "purple";
  desc: string;
  cta: string;
  url: (isbn: string) => string;
}

// ── Store Definitions ─────────────────────────────────────────────────────────
const EBOOK_STORES: StoreOption[] = [
  {
    id: "kindle",
    name: "Kindle",
    emoji: "📱",
    price: "₹199",
    badge: "Best Value",
    badgeVariant: "amber",
    desc: "Read on any device with free Kindle app",
    cta: "Get Kindle Edition",
    url: (isbn) => `https://www.amazon.in/s?k=${isbn}&i=digital-text`,
  },
  {
    id: "google",
    name: "Google Play Books",
    emoji: "🎮",
    price: "₹179",
    badge: "Lowest Price",
    badgeVariant: "green",
    desc: "Android, iOS & web — sync across devices",
    cta: "Buy on Google Play",
    url: (isbn) => `https://play.google.com/store/search?q=${isbn}&c=books`,
  },
  {
    id: "apple",
    name: "Apple Books",
    emoji: "🍎",
    price: "₹229",
    desc: "Optimised for iPhone, iPad & Mac",
    cta: "Buy on Apple Books",
    url: (isbn) => `https://books.apple.com/search?term=${isbn}`,
  },
  {
    id: "kobo",
    name: "Rakuten Kobo",
    emoji: "📖",
    price: "₹189",
    desc: "Perfect for Kobo e-reader owners",
    cta: "Buy on Kobo",
    url: (isbn) => `https://www.kobo.com/in/en/search?query=${isbn}`,
  },
];

const PRINT_STORES: StoreOption[] = [
  {
    id: "amazon",
    name: "Amazon India",
    emoji: "📦",
    price: "₹349",
    badge: "Prime Delivery",
    badgeVariant: "blue",
    desc: "Free delivery for Prime members",
    cta: "Buy on Amazon",
    url: (isbn) => `https://www.amazon.in/s?k=${isbn}`,
  },
  {
    id: "flipkart",
    name: "Flipkart",
    emoji: "🛒",
    price: "₹329",
    badge: "SuperCoin",
    badgeVariant: "blue",
    desc: "Fast delivery across India",
    cta: "Buy on Flipkart",
    url: (isbn) => `https://www.flipkart.com/search?q=${isbn}&type=books`,
  },
  {
    id: "snapdeal",
    name: "Snapdeal",
    emoji: "⚡",
    price: "₹319",
    badge: "Cash on Delivery",
    badgeVariant: "red",
    desc: "COD available pan-India",
    cta: "Buy on Snapdeal",
    url: (isbn) => `https://www.snapdeal.com/search?keyword=${isbn}`,
  },
  {
    id: "crossword",
    name: "Crossword",
    emoji: "📚",
    price: "₹399",
    badge: "Member Discount",
    badgeVariant: "purple",
    desc: "India's favourite bookstore chain",
    cta: "Buy on Crossword",
    url: (isbn) => `https://www.crossword.in/search?q=${isbn}`,
  },
  {
    id: "bookswagon",
    name: "BooksWagon",
    emoji: "🚂",
    price: "₹299",
    badge: "Cheapest",
    badgeVariant: "green",
    desc: "Discount books delivered across India",
    cta: "Buy on BooksWagon",
    url: (isbn) => `https://www.bookswagon.com/search-book/${isbn}`,
  },
];

// ── Badge colour map ──────────────────────────────────────────────────────────
const BADGE_CLASSES: Record<string, string> = {
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50  text-blue-700  border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50   text-red-700   border-red-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
};

// ── Single store row ──────────────────────────────────────────────────────────
function StoreRow({ store, isbn }: { store: StoreOption; isbn: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-3 transition-all duration-200",
        hovered
          ? "border-primary/40 bg-primary/[0.03] shadow-sm"
          : "border-border bg-card",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-lg transition-transform duration-200",
          hovered
            ? "scale-110 border-primary/20 bg-primary/5"
            : "border-border bg-accent/40",
        )}
      >
        {store.emoji}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold leading-tight">
            {store.name}
          </span>
          {store.badge && store.badgeVariant && (
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                BADGE_CLASSES[store.badgeVariant],
              )}
            >
              {store.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {store.desc}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="font-serif text-base font-bold leading-none text-foreground">
          {store.price}
        </span>
        <a
          href={store.url(isbn)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all duration-150",
            hovered
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          {store.cta}
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
interface BuyingOptionsProps {
  book: Book;
}

export function BuyingOptions({ book }: BuyingOptionsProps) {
  const [tab, setTab] = useState<"ebook" | "print">("ebook");
  const stores = tab === "ebook" ? EBOOK_STORES : PRINT_STORES;

  return (
    <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
      {/* Header */}
      <div className="border-b bg-accent/30 px-4 py-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
          Also Available At
        </p>

        {/* Tab toggle */}
        <div className="flex gap-1 rounded-xl border bg-background p-1">
          {(["ebook", "print"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                tab === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "ebook" ? (
                <BookOpen className="h-3 w-3" />
              ) : (
                <Package className="h-3 w-3" />
              )}
              {t === "ebook" ? "eBook" : "Print Book"}
            </button>
          ))}
        </div>
      </div>

      {/* Store list */}
      <div className="p-3 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="space-y-2"
          >
            {stores.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <StoreRow store={store} isbn={book.isbn} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer note */}
      <div className="border-t bg-accent/20 px-4 py-2.5">
        <p className="text-[10px] text-muted-foreground">
          💡 Prices are indicative. Links open the retailer's website.
        </p>
      </div>
    </div>
  );
}
