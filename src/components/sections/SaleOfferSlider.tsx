import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag, ArrowRight } from "lucide-react";
import { BOOKS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useMembership, getMembershipPrice } from "@/lib/membership-store";

const SALE = BOOKS.filter((b) => b.onSale || b.discountPrice).slice(0, 8);
const ITEMS = SALE.length ? SALE : BOOKS.slice(0, 6);

export function SaleOfferSlider() {
  const [i, setI] = useState(0);
  const discount = useMembership((s) => s.getDiscountPercent());

  const next = useCallback(() => setI((c) => (c + 1) % ITEMS.length), []);
  const prev = useCallback(
    () => setI((c) => (c - 1 + ITEMS.length) % ITEMS.length),
    [],
  );

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  const book = ITEMS[i];
  const base = book.discountPrice ?? book.price;
  const memberPrice = discount > 0 ? getMembershipPrice(base, discount) : base;
  const offPct = book.discountPrice
    ? Math.round(((book.price - book.discountPrice) / book.price) * 100)
    : 20;

  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 min-h-[340px] md:min-h-[420px]">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_30%,#dc2626,transparent_55%),radial-gradient(circle_at_85%_70%,#b45309,transparent_60%)]" />

      <div className="relative grid md:grid-cols-2 items-center gap-6 p-6 md:p-8 min-h-[340px] md:min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={book.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.45 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
              <Tag className="h-3 w-3" /> Limited Sale Offer
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight line-clamp-3 text-[hsl(var(--deep-brown))]">
              {book.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              by <span className="font-medium">{book.author}</span>
            </p>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl md:text-4xl font-bold text-red-600">
                ₹{memberPrice.toFixed(0)}
              </span>
              <span className="text-base text-muted-foreground line-through">
                ₹{book.price.toFixed(0)}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-600 text-white">
                Save {offPct}%
              </span>
            </div>

            <Button asChild size="lg" className="rounded-full shadow-warm">
              <Link to={`/books/${book.slug}`}>
                Grab the Deal <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={book.id + "i"}
            initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link to={`/books/${book.slug}`}>
              <img
                src={book.cover}
                alt={book.title}
                className="h-[260px] md:h-[320px] w-auto object-cover rounded-xl shadow-2xl"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          onClick={prev}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white border shadow-sm"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-6 bg-red-600" : "w-1.5 bg-red-600/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white border shadow-sm"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
