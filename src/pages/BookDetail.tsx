import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { BOOKS, MOCK_REVIEWS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormatSelector } from "@/components/product/FormatSelector";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { BookGrid } from "@/components/product/BookGrid";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ReviewForm } from "@/components/product/ReviewForm";
import { cn } from "@/lib/utils";
import type { BookFormat, Review } from "@/lib/types";
import { toast } from "sonner";

export default function BookDetail() {
  const { slug } = useParams();
  const book = BOOKS.find((b) => b.slug === slug);
  const addItem = useCart((s) => s.addItem);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>(
    book?.formats[0] || "Paperback",
  );
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold">Book not found</h1>
        <Button variant="outline" asChild>
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Books
          </Link>
        </Button>
      </div>
    );
  }

  const galleryImages = book.gallery?.length ? book.gallery : [book.cover];

  const related = BOOKS.filter(
    (b) => b.id !== book.id && b.genres.some((g) => book.genres.includes(g)),
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(book, selectedFormat);
    toast.success(`Added "${book.title}" to cart`, {
      description: `Format: ${selectedFormat}`,
    });
  };

  const handleReviewSubmit = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : book.rating.toFixed(1);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link to="/books" className="hover:text-foreground">
          Books
        </Link>
        <span>/</span>
        <span className="text-foreground">{book.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-24"
        >
          <ImageGallery images={galleryImages} alt={book.title} />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary text-sm font-medium tracking-wide uppercase">
              {book.genres.join(" • ")}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              {book.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              by{" "}
              <span className="text-foreground font-medium underline underline-offset-4 decoration-primary/30">
                {book.author}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(Number(avgRating))
                        ? "fill-current text-amber-glow"
                        : "text-muted",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{avgRating}</span>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <PriceDisplay book={book} size="lg" />
          <FormatSelector
            formats={book.formats}
            selected={selectedFormat}
            onSelect={setSelectedFormat}
          />

          <div className="flex gap-3 pt-2">
            <Button
              size="lg"
              className="flex-1 h-14 rounded-full text-base shadow-warm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full p-0"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 w-14 rounded-full p-0"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t">
            <div className="flex gap-3">
              <Truck className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over ₹500
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  100% SSL encrypted
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="pt-6">
            <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-6">
              {["description", "details", "reviews"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3 text-sm font-bold uppercase tracking-widest"
                >
                  {tab === "reviews" ? `Reviews (${reviews.length})` : tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              value="description"
              className="pt-6 text-muted-foreground leading-relaxed"
            >
              {book.description}
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                {[
                  ["Published", book.pubDate],
                  ["ISBN", book.isbn],
                  ["Pages", book.pages.toString()],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6 space-y-8">
              {/* Add review form */}
              <ReviewForm onSubmit={handleReviewSubmit} />

              {/* Existing reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="space-y-2 pb-6 border-b last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">
                        {review.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-current text-amber-glow"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
            You May Also Like
          </h2>
          <BookGrid books={related} columns={4} />
        </section>
      )}
    </main>
  );
}
