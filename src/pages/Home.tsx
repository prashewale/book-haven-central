import { Hero } from '@/components/sections/Hero';
import { FeaturedCollections } from '@/components/sections/FeaturedCollections';
import { Bestsellers } from '@/components/sections/Bestsellers';
import { OnSaleCountdown } from '@/components/sections/OnSaleCountdown';
import { Testimonials } from '@/components/sections/Testimonials';
import { InstagramFeed } from '@/components/sections/InstagramFeed';
import { Newsletter } from '@/components/sections/Newsletter';
import { BookGrid } from '@/components/product/BookGrid';
import { BOOKS } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const newReleases = BOOKS.filter((b) => b.isNewRelease).slice(0, 4);

  return (
    <main>
      <Hero />
      <FeaturedCollections />
      <Bestsellers />
      <OnSaleCountdown />

      {/* Latest Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Latest Arrivals</h2>
              <p className="text-muted-foreground">Fresh off the press</p>
            </div>
            <Link to="/books?filter=new" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <BookGrid books={newReleases} columns={4} />
        </div>
      </section>

      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </main>
  );
}
