import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin } from "lucide-react";

const PHOTOS = [
  {
    id: 1,
    title: "Annual Book Fair 2025",
    date: "Dec 2025",
    location: "Pune",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900",
  },
  {
    id: 2,
    title: "Author Meet — Sudha Murty",
    date: "Nov 2025",
    location: "Mumbai",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900",
  },
  {
    id: 3,
    title: "Book Launch — Atarkya",
    date: "Oct 2025",
    location: "Mehta Hall",
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900",
  },
  {
    id: 4,
    title: "Children's Reading Hour",
    date: "Sep 2025",
    location: "Kids Corner",
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900",
  },
  {
    id: 5,
    title: "Marathi Literature Festival",
    date: "Aug 2025",
    location: "Pune Convention Centre",
    src: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=900",
  },
  {
    id: 6,
    title: "Panchgangechya Teeravarun Launch",
    date: "Jul 2025",
    location: "Kolhapur",
    src: "https://images.unsplash.com/photo-1591951425600-d29ff0606e8a?w=900",
  },
  {
    id: 7,
    title: "Distributors Conclave",
    date: "Jun 2025",
    location: "Mumbai",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900",
  },
  {
    id: 8,
    title: "Poetry Evening",
    date: "May 2025",
    location: "Pune",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900",
  },
  {
    id: 9,
    title: "Authors Workshop",
    date: "Apr 2025",
    location: "Online",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900",
  },
];

export default function Events() {
  const [active, setActive] = useState<typeof PHOTOS[0] | null>(null);

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Events Gallery
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Moments from book launches, author meets, and literary festivals at
          Mehta Publishing House.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {PHOTOS.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setActive(p)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
          >
            <img
              src={p.src}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
              <p className="text-white text-sm font-semibold line-clamp-1">
                {p.title}
              </p>
              <p className="text-white/70 text-xs">{p.date}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={active.src}
                alt={active.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold">{active.title}</h3>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {active.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {active.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
