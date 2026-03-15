import { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { BOOKS } from '@/lib/mock-data';
import { BookGrid } from '@/components/product/BookGrid';

export function OnSaleCountdown() {
  const saleBooks = BOOKS.filter((b) => b.onSale).slice(0, 4);
  const targetDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(differenceInSeconds(targetDate, new Date()));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const d = Math.floor(timeLeft / (3600 * 24));
  const h = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <section className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Flash Sale</h2>
            <p className="text-muted-foreground max-w-md">
              Limited time offers on this season's most anticipated literary releases.
            </p>
          </div>
          <div className="flex gap-3">
            {[
              { label: 'Days', val: d },
              { label: 'Hrs', val: h },
              { label: 'Min', val: m },
              { label: 'Sec', val: s },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center min-w-[56px] p-3 bg-background rounded-lg shadow-soft border">
                <span className="text-2xl font-bold tabular-nums">{unit.val.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{unit.label}</span>
              </div>
            ))}
          </div>
        </div>
        <BookGrid books={saleBooks} columns={4} />
      </div>
    </section>
  );
}
