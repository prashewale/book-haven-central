import { Link } from "react-router-dom";
import { COLLECTIONS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FeaturedCollections() {
  return (
    <section className="py-16 lg:py-20 bg-[hsl(var(--warm-paper))] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4a373_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-10" />

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[hsl(var(--deep-brown))]">
              Featured Collections
            </h2>
            <p className="mt-3 text-xl text-muted-foreground max-w-md">
              Curated worlds waiting for you. Find your next favorite genre.
            </p>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center gap-3 px-6 py-3.5 bg-[hsl(var(--sienna))] hover:bg-[hsl(var(--deep-brown))] text-white rounded-2xl font-medium transition-all active:scale-95 group"
          >
            Explore All
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.04 }}
              className="group"
            >
              <Link
                to={`/books?genre=${encodeURIComponent(col.name)}`}
                className="flex h-full bg-white border border-[hsl(var(--border))] rounded-3xl overflow-hidden shadow-soft hover:shadow-2xl hover:border-[hsl(var(--sienna))]/40 transition-all duration-500"
              >
                {/* Left Image / Icon Area - Attractive & Compact */}
                <div className="w-5/12 bg-gradient-to-br from-amber-900 via-amber-800 to-[hsl(var(--sienna))] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff10_0%,transparent_70%)]" />
                  <span className="text-7xl drop-shadow-xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 z-10">
                    {col.icon}
                  </span>
                </div>

                {/* Right Content Area - Wide & Elegant */}
                <div className="flex-1 p-7 flex flex-col justify-center">
                  <h3 className="font-serif text-2xl font-semibold text-[hsl(var(--deep-brown))] group-hover:text-[hsl(var(--sienna))] transition-colors leading-tight">
                    {col.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {col.count} carefully selected books
                  </p>

                  <div className="mt-auto pt-6 flex items-center text-[hsl(var(--sienna))] text-sm font-medium opacity-80 group-hover:opacity-100 transition-all">
                    Discover the collection
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
