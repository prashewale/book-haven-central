import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    subtitle: 'Welcome to Mehta Publishing House',
    title: 'Discover Your Next',
    highlight: 'Favorite',
    titleEnd: 'Read',
    description: 'Explore thousands of curated titles across every genre. From timeless classics to today\'s bestsellers.',
    cta: { label: 'Shop Books', to: '/books' },
    secondaryCta: { label: 'New Releases', to: '/books?filter=new' },
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop',
    ],
  },
  {
    subtitle: 'Bestsellers Collection',
    title: 'Stories That',
    highlight: 'Captivate',
    titleEnd: 'Millions',
    description: 'Dive into the most loved books of the year. Hand-picked by readers around the world.',
    cta: { label: 'View Bestsellers', to: '/books?filter=bestseller' },
    secondaryCta: { label: 'On Sale Now', to: '/books?filter=sale' },
    images: [
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    ],
  },
  {
    subtitle: 'New This Month',
    title: 'Fresh Pages',
    highlight: 'Await',
    titleEnd: 'You',
    description: 'Be the first to explore newly released titles. Updated weekly with the latest arrivals.',
    cta: { label: 'Browse New', to: '/books?filter=new' },
    secondaryCta: { label: 'All Books', to: '/books' },
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=400&fit=crop',
      'https://images.unsplash.com/photo-1510172951991-856a654063f9?w=300&h=400&fit=crop',
    ],
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-accent/50">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-balance">
                  {slide.title}{' '}
                  <span className="text-primary italic">{slide.highlight}</span>{' '}
                  {slide.titleEnd}
                </h1>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  {slide.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-13 px-8 rounded-full text-base shadow-warm" asChild>
                  <Link to={slide.cta.to}>
                    {slide.cta.label} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-13 px-8 rounded-full text-base" asChild>
                  <Link to={slide.secondaryCta.to}>{slide.secondaryCta.label}</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative hidden md:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <img src={slide.images[0]} alt="Featured book" className="rounded-xl shadow-warm object-cover w-full aspect-[3/4]" />
                  <img src={slide.images[1]} alt="Featured book" className="rounded-xl shadow-soft object-cover w-full aspect-[3/4]" />
                </div>
                <div className="space-y-4">
                  <img src={slide.images[2]} alt="Featured book" className="rounded-xl shadow-soft object-cover w-full aspect-[3/4]" />
                  <img src={slide.images[3]} alt="Featured book" className="rounded-xl shadow-warm object-cover w-full aspect-[3/4]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
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
                  i === current ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
