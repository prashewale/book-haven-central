import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent/50">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Welcome to BookHaven
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-balance">
                Discover Your Next{' '}
                <span className="text-primary italic">Favorite</span> Read
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Explore thousands of curated titles across every genre. From timeless classics to today's bestsellers.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="h-13 px-8 rounded-full text-base shadow-warm" asChild>
                <Link to="/books">
                  Shop Books <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-13 px-8 rounded-full text-base" asChild>
                <Link to="/books?filter=new">New Releases</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
                  alt="Featured book"
                  className="rounded-xl shadow-warm object-cover w-full aspect-[3/4]"
                />
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
                  alt="Featured book"
                  className="rounded-xl shadow-soft object-cover w-full aspect-[3/4]"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
                  alt="Featured book"
                  className="rounded-xl shadow-soft object-cover w-full aspect-[3/4]"
                />
                <img
                  src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop"
                  alt="Featured book"
                  className="rounded-xl shadow-warm object-cover w-full aspect-[3/4]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
