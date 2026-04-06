import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// YouTube URL to Embed Converter (unchanged - works great)
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
      return `https://www.youtube.com/embed/${extract(match)}?autoplay=1&rel=0&modestbranding=1`;
  }
  return url;
}

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

  // Auto-advance
  useEffect(() => {
    if (isPlaying) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isPlaying]);

  const video = VIDEOS[current];

  return (
    <section className="py-20 bg-[hsl(var(--warm-paper))]">
      <div className="container mx-auto px-4">
        {/* Attractive Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-sm font-medium tracking-widest text-[hsl(var(--sienna))]">
              VIDEO SERIES
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(var(--deep-brown))] tracking-tight">
            Featured Videos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
            Watch exclusive reviews, events, and author interviews
          </p>
        </div>

        {/* Larger Video Container */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-3xl overflow-hidden shadow-2xl bg-black relative"
            >
              {isPlaying ? (
                /* YouTube Player - Larger */
                <iframe
                  className="w-full aspect-video"
                  src={toEmbedUrl(video.url)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* Enhanced Poster with Bigger Play Button */
                <div
                  className="relative w-full aspect-video cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                  role="button"
                  aria-label={`Play ${video.title}`}
                >
                  <img
                    src={video.poster}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Darker cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition-all duration-500" />

                  {/* Large Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      className="w-24 h-24 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/50 ring-8 ring-white/20 group-hover:ring-[hsl(var(--sienna))]/30 transition-all"
                    >
                      <Play className="w-12 h-12 text-[hsl(var(--sienna))] fill-current ml-1" />
                    </motion.div>
                  </div>

                  {/* Title Overlay - Bigger & Elegant */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-semibold leading-tight drop-shadow-md">
                      {video.title}
                    </h3>
                  </div>

                  {/* Subtle badge */}
                  <div className="absolute top-6 right-6 px-4 py-1 bg-black/60 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    Watch Now
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Larger & More Visible */}
          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-white shadow-warm border border-border hover:border-[hsl(var(--sienna))] hover:text-[hsl(var(--sienna))] transition-all z-20"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-white shadow-warm border border-border hover:border-[hsl(var(--sienna))] hover:text-[hsl(var(--sienna))] transition-all z-20"
            aria-label="Next video"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Title Below (Bigger) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mt-8"
          >
            <h3 className="text-2xl font-serif font-semibold text-[hsl(var(--deep-brown))]">
              {video.title}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-10">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-10 bg-[hsl(var(--sienna))]"
                  : "w-3 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
