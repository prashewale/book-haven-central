import { useState } from "react";
import { BOOKS } from "@/lib/mock-data";
import { BookSlider } from "@/components/product/BookSlider";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "new", label: "New Arrivals", filter: (b: typeof BOOKS[0]) => b.isNewRelease || b.id >= "2020" },
  { value: "upcoming", label: "Upcoming", filter: (b: typeof BOOKS[0]) => b.id >= "2022" },
  { value: "featured", label: "Featured", filter: (b: typeof BOOKS[0]) => !!b.isBestseller },
  { value: "alltime", label: "All Time Bestseller", filter: () => true, sort: (a: typeof BOOKS[0], b: typeof BOOKS[0]) => b.reviewCount - a.reviewCount },
  { value: "recent", label: "Recent Bestseller", filter: (b: typeof BOOKS[0]) => !!b.isBestseller, sort: (a: typeof BOOKS[0], b: typeof BOOKS[0]) => b.rating - a.rating },
  { value: "today", label: "Today's Offer", filter: (b: typeof BOOKS[0]) => !!b.onSale },
];

export function TodaysOffer() {
  const [active, setActive] = useState("new");
  const tab = TABS.find((t) => t.value === active)!;
  let items = BOOKS.filter(tab.filter);
  if ("sort" in tab && tab.sort) items = [...items].sort(tab.sort);
  items = items.slice(0, 12);

  return (
    <section className="py-10 bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="mb-5">
          <h2 className="text-xl md:text-2xl font-serif font-bold">Today's Offer</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Hand-picked deals refreshed daily
          </p>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-hide">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setActive(t.value)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap rounded-full border transition-colors",
                active === t.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {items.length ? (
          <BookSlider books={items} minVisible={6} />
        ) : (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No items in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
