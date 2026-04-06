import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// ─── Converts any YouTube URL to an embeddable iframe src ─────────────────────
// Supports: watch?v=, /live/, youtu.be/, /shorts/
// YouTube iframes require the /embed/ format — other URL formats are blocked by browsers.
// You just paste any YouTube URL in the VIDEOS array; this handles the conversion.
function toEmbedUrl(url: string): string {
  const patterns: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/, (m) => m[1]],
    [/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/, (m) => m[1]],
    [/youtu\.be\/([a-zA-Z0-9_-]{11})/, (m) => m[1]],
    [/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/, (m) => m[1]],
  ];
  for (const [pattern, extract] of patterns) {
    const match = url.match(pattern);
    if (match)
      return `https://www.youtube.com/embed/${extract(match)}?autoplay=1&rel=0`;
  }
  return url; // fallback: return as-is
}

// ─── Video Data ───────────────────────────────────────────────────────────────
// `url`    → paste any YouTube URL (watch, live, youtu.be, shorts — all work)
// `poster` → image shown before the user hits play (book cover, banner, etc.)
// `title`  → shown in the overlay on the poster and below the player
const VIDEOS = [
  {
    url: "https://www.youtube.com/watch?v=446UHtwcTHw",
    poster:
      "https://www.mehtapublishinghouse.com/images/promotionalvideo/11.JPG",
    title: "CRIMINALS IN UNIFORM REVIEW",
  },
  {
    url: "https://www.youtube.com/live/2a724qTJ1vY?si=RyY0rfsqHo2A5ur5",
    poster:
      "https://www.mehtapublishinghouse.com/images/promotionalvideo/25.JPG",
    title: "SWAMI 61 YEARS EVENT",
  },
  {
    url: "https://youtu.be/Ya_vnboJThw?si=Y2idYOL42mq41v_M",
    poster:
      "https://www.mehtapublishinghouse.com/images/promotionalvideo/27.JPG",
    title: '"TATHAGATA GOTAM BUDDHA" AUTHOR VASANT GAIKWAD INTERVIEW',
  },
];

export function VideoSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const next = useCallback(() => {
    setIsPlaying(false);
    setCurrent((c) => (c + 1) % VIDEOS.length);
  }, []);

  const prev = useCallback(() => {
    setIsPlaying(false);
    setCurrent((c) => (c - 1 + VIDEOS.length) % VIDEOS.length);
  }, []);

  const goTo = (index: number) => {
    setIsPlaying(false);
    setCurrent(index);
  };

  // Auto-advance every 8s when not actively playing
  useEffect(() => {
    if (isPlaying) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next, isPlaying]);

  const video = VIDEOS[current];

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        {/* Section Header — matches Hero.tsx style */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Watch &amp; Discover
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Featured Videos
          </h2>
        </div>

        {/* Slider wrapper */}
        <div className="relative max-w-4xl mx-auto">
          {/* Video card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-warm bg-black"
            >
              {isPlaying ? (
                /* ── Embedded YouTube player ── */
                <iframe
                  className="w-full aspect-video"
                  src={toEmbedUrl(video.url)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* ── Poster image with play button ── */
                <div
                  className="relative w-full aspect-video cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  aria-label={`Play: ${video.title}`}
                >
                  {/* Poster image */}
                  <img
                    src={video.poster}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/40 transition-all duration-300" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-warm"
                    >
                      <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                    </motion.div>
                  </div>

                  {/* Title overlay at bottom of poster */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-lg font-serif font-bold leading-tight line-clamp-1">
                      {video.title}
                    </h3>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Side prev/next buttons — matches Hero.tsx style */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 p-2 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground transition-colors shadow-soft z-10"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 p-2 rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground transition-colors shadow-soft z-10"
            aria-label="Next video"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Title below player */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-5"
          >
            <h3 className="text-xl font-serif font-semibold text-foreground">
              {video.title}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators + arrows — matches Hero.tsx pattern exactly */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            aria-label="Next video"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
