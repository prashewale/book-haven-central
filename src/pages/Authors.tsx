import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BOOKS } from "@/lib/mock-data";
import { useMemo } from "react";

const AUTHOR_PHOTOS: Record<string, string> = {
  "AUTHOR 1":
    "https://www.mehtapublishinghouse.com/images/authorphotos/389.jpg",
  "AUTHOR 2":
    "https://www.mehtapublishinghouse.com/images/authorphotos/1614.jpg",
  "AUTHOR 3":
    "https://www.mehtapublishinghouse.com/images/authorphotos/183.jpg",
  "AUTHOR 4":
    "https://www.mehtapublishinghouse.com/images/authorphotos/339.jpg",
  "AUTHOR 5":
    "https://www.mehtapublishinghouse.com/images/authorphotos/313.jpg",
  "AUTHOR 6":
    "https://www.mehtapublishinghouse.com/images/authorphotos/723.jpg",
  "AUTHOR 7":
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 8":
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 9":
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 10":
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 11":
    "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 12":
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 13":
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 14":
    "https://images.unsplash.com/photo-1548449112-96a38a643324?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 15":
    "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 16":
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face",
  "AUTHOR 17":
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop&crop=face",
};

export default function Authors() {
  const authors = useMemo(() => {
    const authorMap = new Map<
      string,
      { bookCount: number; genres: Set<string>; slug: string }
    >();
    BOOKS.forEach((book) => {
      const existing = authorMap.get(book.author);
      if (existing) {
        existing.bookCount++;
        book.genres.forEach((g) => existing.genres.add(g));
      } else {
        authorMap.set(book.author, {
          bookCount: 1,
          genres: new Set(book.genres),
          slug: book.slug,
        });
      }
    });
    return Array.from(authorMap.entries()).map(([name, data]) => ({
      name,
      photo:
        AUTHOR_PHOTOS[name] ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=c4956a&color=fff&size=200`,
      bookCount: data.bookCount,
      genres: Array.from(data.genres).slice(0, 3),
      slug: data.slug,
    }));
  }, []);

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Our Authors
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Discover the talented writers behind our curated collection at Mehta
          Publishing House.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authors.map((author, i) => (
          <motion.div
            key={author.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/books?author=${encodeURIComponent(author.name)}`}
              className="group block bg-card border border-border rounded-2xl p-6 text-center hover:shadow-warm transition-all"
            >
              <img
                src={author.photo}
                alt={author.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border group-hover:border-primary transition-colors"
              />
              <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                {author.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {author.bookCount} book{author.bookCount > 1 ? "s" : ""}
              </p>
              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {author.genres.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
