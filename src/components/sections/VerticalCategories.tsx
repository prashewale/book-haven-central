import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { COLLECTIONS, BOOKS } from "@/lib/mock-data";

export function VerticalCategories() {
  return (
    <section className="py-12 bg-[hsl(var(--warm-paper))]">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Shop by Category
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Browse our curated genres
            </p>
          </div>
          <Link
            to="/books"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {COLLECTIONS.map((cat, i) => {
            const sample = BOOKS.find((b) => b.genres.includes(cat.name));
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/books?genre=${encodeURIComponent(cat.name)}`}
                  className="group block rounded-xl border bg-card overflow-hidden hover:shadow-warm hover:border-primary/40 transition-all"
                >
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/40 flex items-center justify-center relative overflow-hidden">
                    {sample && (
                      <img
                        src={sample.cover}
                        alt={cat.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                      />
                    )}
                    <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                  </div>
                  <div className="p-2.5 text-center">
                    <p className="font-semibold text-sm leading-tight">
                      {cat.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {cat.count} books
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
