const FEED_IMAGES = [
  'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=300&fit=crop',
];

export function InstagramFeed() {
  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">#BookHavenReads</h2>
          <p className="text-muted-foreground">Share your reading moments with us</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {FEED_IMAGES.map((src, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-xl">
              <img src={src} alt={`Reader photo ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
