import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";

// ─── Banner Slides ────────────────────────────────────────────────────────────
// `banner`      → full-width banner image URL from Mehta Publishing House
// `title`       → bold heading overlaid on the banner
// `text`        → supporting line below the title
// `cta`         → primary button (label + internal route or external href)
// `secondaryCta`→ optional ghost button
// `to`          → set `external: true` for full URLs, false for react-router routes
const SLIDES = [
  {
    banner: "https://www.mehtapublishinghouse.com/images/homebanners/536.JPG",
    title: "Chhoti Aai & Amaravatiche Chhappan Swabhav",
    text: "Two unforgettable stories — now available together. Explore the richness of Marathi literature.",
    cta: {
      label: "Buy Now",
      href: "https://www.mehtapublishinghouse.com/book-details/CHHOTI-AAI/4230.aspx",
      external: true,
    },
    secondaryCta: {
      label: "All New Arrivals",
      href: "/books?filter=new",
      external: false,
    },
    align: "left" as const,
  },
  {
    banner: "https://www.mehtapublishinghouse.com/images/homebanners/534.JPG",
    title: "Haravlelya Karnaphule & Lullaby Town",
    text: "A captivating duo — two worlds, one shelf. Now in translation.",
    cta: {
      label: "Buy Now",
      href: "https://www.mehtapublishinghouse.com/book-details/LULLABY-TOWN/4227.aspx",
      external: true,
    },
    secondaryCta: {
      label: "Browse Translations",
      href: "/books",
      external: false,
    },
    align: "right" as const,
  },
  {
    banner: "https://www.mehtapublishinghouse.com/images/homebanners/538.JPG",
    title: "The Magic of Lost Series",
    text: "An enchanting series that takes you beyond the ordinary — into worlds waiting to be found.",
    cta: { label: "Explore the Series", href: "/books", external: false },
    secondaryCta: { label: "View All Books", href: "/books", external: false },
    align: "center" as const,
  },
  {
    banner: "https://www.mehtapublishinghouse.com/images/homebanners/537.JPG",
    title: "Atarkya",
    text: "The inexplicable. The gripping. A new must-read from Mehta Publishing House.",
    cta: {
      label: "Buy Now",
      href: "https://www.mehtapublishinghouse.com/book-details/ATARKYA/4229.aspx",
      external: true,
    },
    secondaryCta: { label: "More Like This", href: "/books", external: false },
    align: "left" as const,
  },
];

// Alignment helpers
const alignClass = {
  left: "items-start text-left",
  right: "items-end text-right",
  center: "items-center text-center",
};

export function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full overflow-hidden bg-stone-900">
      {/* ── Banner image layer ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.banner}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient scrim so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content overlay ── */}
      <div className="relative z-10 flex flex-col justify-end min-h-[60vh] md:min-h-[75vh] lg:min-h-[85vh]">
        <div className="container mx-auto px-6 md:px-10 pb-16 md:pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className={`flex flex-col gap-5 max-w-2xl ${alignClass[slide.align]} ${
                slide.align === "right"
                  ? "ml-auto"
                  : slide.align === "center"
                    ? "mx-auto"
                    : ""
              }`}
            >
              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white drop-shadow-lg">
                {slide.title}
              </h1>

              {/* Supporting text */}
              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-lg drop-shadow">
                {slide.text}
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-wrap gap-3 ${
                  slide.align === "center"
                    ? "justify-center"
                    : slide.align === "right"
                      ? "justify-end"
                      : ""
                }`}
              >
                {/* Primary CTA */}
                {slide.cta.external ? (
                  <a
                    href={slide.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="h-12 px-7 rounded-full text-base shadow-warm"
                    >
                      {slide.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                ) : (
                  <Button
                    size="lg"
                    className="h-12 px-7 rounded-full text-base shadow-warm"
                    asChild
                  >
                    <Link to={slide.cta.href}>
                      {slide.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}

                {/* Secondary CTA */}
                {slide.secondaryCta.external ? (
                  <a
                    href={slide.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-7 rounded-full text-base bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white"
                    >
                      {slide.secondaryCta.label}
                    </Button>
                  </a>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-7 rounded-full text-base bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white"
                    asChild
                  >
                    <Link to={slide.secondaryCta.href}>
                      {slide.secondaryCta.label}
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Slider controls ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/70 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white/70 hover:text-white hover:border-white/70 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* ── Slide counter (top-right) ── */}
        <div className="absolute top-6 right-6 text-white/60 text-sm font-medium tracking-widest select-none z-20">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
