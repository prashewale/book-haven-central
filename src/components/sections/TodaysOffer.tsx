import { useState } from "react";
import { Link } from "react-router-dom";
import { BOOKS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const TABS = [
  { value: "new", label: "New Arrivals", filter: (b: typeof BOOKS[0]) => b.isNewRelease || b.id >= "2020" },
  { value: "upcoming", label: "Upcoming", filter: (b: typeof BOOKS[0]) => b.id >= "2022" },
  { value: "forthcoming", label: "Forthcoming", filter: (b: typeof BOOKS[0]) => b.id >= "2023" },
  { value: "today", label: "Today's Offer", filter: (b: typeof BOOKS[0]) => !!b.onSale },
];

export function TodaysOffer() {
  const [active, setActive] = useState("new");
  const tab = TABS.find((t) => t.value === active)!;
  const items = BOOKS.filter(tab.filter).slice(0, 4);

  return (
    <div className="rounded-2xl border bg-card overflow-hidden h-full flex flex-col">
      <div className="flex border-b bg-accent/30 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setActive(t.value)}
            className={cn(
              "flex-1 px-3 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2",
              active === t.value
                ? "border-primary text-primary bg-background"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-3 grid grid-cols-2 gap-3 flex-1">
        {items.map((b) => (
          <Link
            key={b.id}
            to={`/books/${b.slug}`}
            className="group flex flex-col gap-1.5"
          >
            <div className="aspect-[3/4] rounded-md overflow-hidden bg-muted">
              <img
                src={b.cover}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-[11px] font-medium leading-tight line-clamp-2 group-hover:text-primary">
              {b.title}
            </p>
            <p className="text-[11px] font-bold text-primary">
              ₹{(b.discountPrice ?? b.price).toFixed(0)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
