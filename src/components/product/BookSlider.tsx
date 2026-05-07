import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";

interface Props {
  books: Book[];
  /** Min visible cards on desktop (controls width). Default 6. */
  minVisible?: number;
}

export function BookSlider({ books, minVisible = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "l" | "r") => {
    const el = ref.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * (dir === "l" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  // Tailwind needs static classes; map for common values
  const widthClass =
    minVisible === 6
      ? "w-[44%] sm:w-[30%] md:w-[22%] lg:w-[16%]"
      : "w-[44%] sm:w-[30%] md:w-[22%] lg:w-[19%]";

  return (
    <div className="relative group">
      <div
        ref={ref}
        className="flex gap-3 md:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {books.map((b) => (
          <div
            key={b.id}
            className={`shrink-0 snap-start ${widthClass}`}
          >
            <BookCard book={b} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("l")}
        className="hidden md:flex absolute -left-3 top-1/3 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-background border shadow-md hover:bg-primary hover:text-primary-foreground transition opacity-0 group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={() => scroll("r")}
        className="hidden md:flex absolute -right-3 top-1/3 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-background border shadow-md hover:bg-primary hover:text-primary-foreground transition opacity-0 group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
