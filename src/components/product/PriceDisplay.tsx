import type { Book } from "@/lib/types";

export function PriceDisplay({
  book,
  size = "md",
}: {
  book: Book;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: { main: "text-base", strike: "text-sm" },
    md: { main: "text-xl", strike: "text-base" },
    lg: { main: "text-3xl", strike: "text-xl" },
  }[size];

  return (
    <div className="flex items-baseline gap-3">
      <span className={`font-bold text-primary ${sizeClasses.main}`}>
        ₹{(book.discountPrice || book.price).toFixed(2)}
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
          {Math.round(((book.price - book.discountPrice) / book.price) * 100)}%
          OFF
        </span>
      )}
    </div>
  );
}
