import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

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
    poster: "https://www.mehtapublishinghouse.com/images/promotionalvideo/11.JPG",
    title: "CRIMINALS IN UNIFORM REVIEW",
  },
  {
    url: "https://www.youtube.com/live/2a724qTJ1vY?si=RyY0rfsqHo2A5ur5",
    poster: "https://www.mehtapublishinghouse.com/images/promotionalvideo/25.JPG",
    title: "SWAMI 61 YEARS EVENT",
  },
  {
    url: "https://youtu.be/Ya_vnboJThw?si=Y2idYOL42mq41v_M",
    poster: "https://www.mehtapublishinghouse.com/images/promotionalvideo/27.JPG",
    title: "TATHAGATA GOTAM BUDDHA INTERVIEW",
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

  useEffect(() => {
    if (isPlaying) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next, isPlaying]);

  const video = VIDEOS[current];

  return (
    <div className="relative h-full rounded-2xl overflow-hidden bg-black shadow-warm flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex-1 min-h-[300px]"
        >
          {isPlaying ? (
            <iframe
              className="w-full h-full"
              src={toEmbedUrl(video.url)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setIsPlaying(true)}
              role="button"
              aria-label={`Play ${video.title}`}
            >
              <img
                src={video.poster}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl ring-4 ring-white/20"
                >
                  <Play className="w-7 h-7 text-[hsl(var(--sienna))] fill-current ml-0.5" />
                </motion.div>
              </div>
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                Featured Video
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm font-serif font-semibold leading-tight line-clamp-2 drop-shadow">
                  {video.title}
                </h3>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* controls */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
        <button
          onClick={prev}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white border shadow-sm"
          aria-label="Previous video"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={next}
          className="p-1.5 rounded-full bg-white/90 hover:bg-white border shadow-sm"
          aria-label="Next video"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
