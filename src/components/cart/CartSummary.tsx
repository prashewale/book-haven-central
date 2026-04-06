import { Crown } from "lucide-react";
import { useCart } from "@/lib/store";
import { useMembership, getMembershipPrice } from "@/lib/membership-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartSummary() {
  const items = useCart((s) => s.items);
  const discountPercent = useMembership((s) => s.getDiscountPercent());
  const hasMembership = discountPercent > 0;

  const subtotalBeforeMembership = items.reduce(
    (sum, i) => sum + (i.book.discountPrice || i.book.price) * i.quantity, 0
  );
  const subtotalAfterMembership = items.reduce(
    (sum, i) => sum + getMembershipPrice(i.book.discountPrice || i.book.price, discountPercent) * i.quantity, 0
  );
  const memberSavings = subtotalBeforeMembership - subtotalAfterMembership;
  const sub = subtotalAfterMembership;
  const shipping = sub > 50 ? 0 : 5.99;
  const total = sub + shipping;

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 shadow-soft">
      <h3 className="font-serif text-xl font-semibold">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">₹{subtotalBeforeMembership.toFixed(2)}</span>
        </div>
        {hasMembership && memberSavings > 0 && (
          <div className="flex justify-between text-primary">
            <span className="flex items-center gap-1"><Crown className="h-3.5 w-3.5" /> Member Discount</span>
            <span className="font-medium">-₹{memberSavings.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">Free shipping on orders over ₹500</p>
        )}
        <Separator />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary">₹{total.toFixed(2)}</span>
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
