import { motion } from 'framer-motion';
import { Tag, Percent, Clock } from 'lucide-react';
import { BOOKS } from '@/lib/mock-data';
import { BookCard } from '@/components/product/BookCard';

const DEALS = [
  { label: 'Clearance Sale', description: 'Up to 30% off selected titles', icon: Tag, color: 'bg-red-100 text-red-700' },
  { label: 'Student Discount', description: '15% off with a valid student ID', icon: Percent, color: 'bg-blue-100 text-blue-700' },
  { label: 'Flash Deals', description: 'Limited-time offers updated weekly', icon: Clock, color: 'bg-amber-100 text-amber-700' },
];

export default function Discounts() {
  const saleBooks = BOOKS.filter((b) => b.onSale || b.discountPrice);

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Discounts & Deals</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Never miss a deal — grab your favorite reads at unbeatable prices.</p>
      </motion.div>

      {/* Deal banners */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {DEALS.map((deal, i) => (
          <motion.div
            key={deal.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 text-center space-y-3 hover:shadow-warm transition-shadow"
          >
            <div className={`inline-flex p-3 rounded-full ${deal.color}`}>
              <deal.icon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-lg font-bold">{deal.label}</h3>
            <p className="text-sm text-muted-foreground">{deal.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Sale books */}
      <h2 className="text-2xl font-serif font-bold mb-6">Books on Sale</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {saleBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {saleBooks.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No discounted books right now. Check back soon!</p>
      )}
    </main>
  );
}
