import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/store';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const { items, clearCart } = useCart();

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold">Your Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/20 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added any books yet.</p>
          </div>
          <Button size="lg" className="rounded-full" asChild>
            <Link to="/books"><ArrowLeft className="h-4 w-4 mr-2" /> Browse Books</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{items.length} item(s)</p>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.book.id}-${item.selectedFormat}`} className="p-4 rounded-xl border bg-card">
                  <CartItem item={item} />
                </div>
              ))}
            </div>
            <Button variant="outline" asChild>
              <Link to="/books"><ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping</Link>
            </Button>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </main>
  );
}
