import { Link } from 'react-router-dom';
import { COLLECTIONS } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export function FeaturedCollections() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Browse Collections</h2>
          <p className="text-muted-foreground">Find your next read by genre</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/books?genre=${col.name}`}
                className="flex flex-col items-center gap-3 min-w-[120px] p-6 rounded-xl bg-card border hover:border-primary/30 hover:shadow-soft transition-all group"
              >
                <span className="text-3xl">{col.icon}</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {col.name}
                </span>
                <span className="text-xs text-muted-foreground">{col.count} books</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
