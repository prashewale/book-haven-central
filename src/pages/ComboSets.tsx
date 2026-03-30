import { motion } from "framer-motion";
import { ShoppingBag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";
import { toast } from "sonner";

const COMBOS = [
  {
    id: "c1",
    name: "Fiction Starter Pack",
    description:
      "Three acclaimed fiction novels to kickstart your reading journey.",
    bookIds: ["1", "2", "8"],
    discount: 20,
  },
  {
    id: "c2",
    name: "Sci-Fi Explorer Bundle",
    description:
      "Dive into worlds beyond imagination with this hand-picked sci-fi set.",
    bookIds: ["5", "9", "15"],
    discount: 15,
  },
  {
    id: "c3",
    name: "Self-Growth Collection",
    description:
      "Transform your habits and mindset with these bestselling non-fiction reads.",
    bookIds: ["3", "6", "11"],
    discount: 25,
  },
  {
    id: "c4",
    name: "Romance & Historical Set",
    description:
      "Love stories that span centuries — from ancient myths to modern romance.",
    bookIds: ["4", "7", "14"],
    discount: 18,
  },
];

export default function ComboSets() {
  const addItem = useCart((s) => s.addItem);

  const handleAddCombo = (comboId: string) => {
    const combo = COMBOS.find((c) => c.id === comboId);
    if (!combo) return;
    combo.bookIds.forEach((id) => {
      const book = BOOKS.find((b) => b.id === id);
      if (book) addItem(book, book.formats[0]);
    });
    toast.success(`${combo.name} added to cart!`);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Combo Sets
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Save more when you buy together — curated book bundles at special
          prices.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {COMBOS.map((combo, i) => {
          const books = combo.bookIds
            .map((id) => BOOKS.find((b) => b.id === id)!)
            .filter(Boolean);
          const originalTotal = books.reduce((sum, b) => sum + b.price, 0);
          const discountedTotal = originalTotal * (1 - combo.discount / 100);

          return (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-warm transition-shadow"
            >
              <div className="flex gap-1 p-4 bg-accent/50">
                {books.map((book) => (
                  <img
                    key={book.id}
                    src={book.cover}
                    alt={book.title}
                    className="h-36 w-24 object-cover rounded-lg shadow-soft"
                  />
                ))}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold">
                      {combo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {combo.description}
                    </p>
                  </div>
                  <span className="shrink-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {combo.discount}% OFF
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-primary">
                    ₹{discountedTotal.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{originalTotal.toFixed(2)}
                  </span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {books.map((b) => (
                    <li key={b.id}>
                      • {b.title} — {b.author}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleAddCombo(combo.id)}
                  className="w-full rounded-full"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" /> Add Bundle to Cart
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
