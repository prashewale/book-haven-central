import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function CartSummary() {
  const sub = useCart((s) => s.subtotal());
  const shipping = sub > 50 ? 0 : 5.99;
  const total = sub + shipping;

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 shadow-soft">
      <h3 className="font-serif text-xl font-semibold">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${sub.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">Free shipping on orders over $50</p>
        )}
        <Separator />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
      <Button className="w-full h-12 text-base rounded-full" size="lg">
        Proceed to Checkout
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Secure checkout • 30-day returns
      </p>
    </div>
  );
}
