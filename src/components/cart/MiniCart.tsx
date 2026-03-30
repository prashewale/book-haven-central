import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/store";
import { CartItem } from "./CartItem";
import { Button } from "@/components/ui/button";

export function MiniCart() {
  const { items, isCartOpen, setCartOpen, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l shadow-warm flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-xl font-semibold">Your Cart</h2>
                <span className="text-sm text-muted-foreground">
                  ({items.length})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/30" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button
                    variant="outline"
                    onClick={() => setCartOpen(false)}
                    asChild
                  >
                    <Link to="/books">Browse Books</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem
                    key={`${item.book.id}-${item.selectedFormat}`}
                    item={item}
                    compact
                  />
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Subtotal</span>
                  <span className="text-primary">₹{subtotal().toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    asChild
                    onClick={() => setCartOpen(false)}
                  >
                    <Link to="/cart">View Cart</Link>
                  </Button>
                  <Button>Checkout</Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
