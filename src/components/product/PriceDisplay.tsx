import { Crown } from "lucide-react";
import type { Book } from "@/lib/types";
import { useMembership, getMembershipPrice } from "@/lib/membership-store";

export function PriceDisplay({
  book,
  size = "md",
}: {
  book: Book;
  size?: "sm" | "md" | "lg";
}) {
  const discountPercent = useMembership((s) => s.getDiscountPercent());
  const basePrice = book.discountPrice || book.price;
  const hasMembership = discountPercent > 0;
  const memberPrice = hasMembership
    ? getMembershipPrice(basePrice, discountPercent)
    : basePrice;

  console.log(
    `book.discountPrice: ${book.discountPrice}, book.price: ${book.price}, discountPercent: ${discountPercent}, basePrice: ${basePrice}, hasMembership: ${hasMembership}, memberPrice: ${memberPrice}`,
  );

  const sizeClasses = {
    sm: { main: "text-base", strike: "text-sm", badge: "text-[10px]" },
    md: { main: "text-xl", strike: "text-base", badge: "text-xs" },
    lg: { main: "text-3xl", strike: "text-xl", badge: "text-sm" },
  }[size];

  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-3">
        <span className={`font-bold text-primary ${sizeClasses.main}`}>
          ₹{memberPrice.toFixed(2)}
        </span>
        {book.discountPrice && (
          <span
            className={`text-muted-foreground line-through ${sizeClasses.strike}`}
          >
            ₹{book.price.toFixed(2)}
          </span>
        )}
        {book.discountPrice && (
          <span className="text-xs font-bold text-primary bg-accent px-2 py-0.5 rounded-full">
            {Math.round(((book.price - book.discountPrice) / book.price) * 100)}
            % OFF
          </span>
        )}
      </div>
      {hasMembership && (
        <div
          className={`inline-flex items-center gap-1 font-semibold text-primary ${sizeClasses.badge}`}
        >
          <Crown className="h-3.5 w-3.5" />
          Member discount saves ₹{(basePrice - memberPrice).toFixed(0)} extra
        </div>
      )}
    </div>
  );
}
