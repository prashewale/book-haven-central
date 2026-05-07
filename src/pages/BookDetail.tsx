import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Star,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Check,
  BookOpen,
  Package,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Award,
  Users,
  MessageSquare,
  ZoomIn,
  X,
  Building2,
  ListCollapse,
  UserRound,
} from "lucide-react";
import { useState, useRef } from "react";
import { BOOKS, MOCK_REVIEWS } from "@/lib/mock-data";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { PriceDisplay } from "@/components/product/PriceDisplay";
import { BookGrid } from "@/components/product/BookGrid";
import { ReviewForm } from "@/components/product/ReviewForm";
import { cn } from "@/lib/utils";
import type { BookFormat, Review } from "@/lib/types";
import { toast } from "sonner";
import { BuyingOptions } from "@/components/product/BuyingOptions";

// ── Rating breakdown ──────────────────────────────────────────────────────────
function getRatingBreakdown(reviews: Review[]) {
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++;
  });
  const total = reviews.length || 1;
  return counts
    .map((c, i) => ({
      stars: i + 1,
      count: c,
      pct: Math.round((c / total) * 100),
    }))
    .reverse();
}

// ── Zoom Modal ────────────────────────────────────────────────────────────────
function ZoomModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        className="relative max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="w-full rounded-2xl shadow-2xl object-contain max-h-[85vh]"
        />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const cls =
    size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            cls,
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const [helpful, setHelpful] = useState<null | "yes" | "no">(null);
  const [helpCount, setHelpCount] = useState(Math.floor(Math.random() * 20));

  return (
    <div className="py-6 border-b last:border-0 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {review.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-semibold text-sm">{review.name}</span>
            <Badge
              variant="outline"
              className="text-[10px] py-0 h-5 text-green-600 border-green-200 bg-green-50"
            >
              Verified Purchase
            </Badge>
          </div>
          <Stars rating={review.rating} size="sm" />
        </div>
        <span className="text-xs text-muted-foreground shrink-0">
          {review.date}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.text}
      </p>
      <div className="flex items-center gap-3 pt-1">
        <span className="text-xs text-muted-foreground">
          Helpful? ({helpCount})
        </span>
        <button
          onClick={() => {
            if (helpful !== "yes") {
              setHelpful("yes");
              setHelpCount((n) => n + 1);
            }
          }}
          className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors",
            helpful === "yes"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary",
          )}
        >
          <ThumbsUp className="h-3 w-3" /> Yes
        </button>
        <button
          onClick={() => {
            if (helpful !== "no") setHelpful("no");
          }}
          className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors",
            helpful === "no"
              ? "border-destructive bg-destructive/10 text-destructive"
              : "border-border text-muted-foreground hover:border-destructive hover:text-destructive",
          )}
        >
          <ThumbsDown className="h-3 w-3" /> No
        </button>
      </div>
    </div>
  );
}

// ── Accordion Panel ───────────────────────────────────────────────────────────
function AccordionPanel({
  id,
  icon: Icon,
  title,
  openId,
  setOpenId,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  openId: string | null;
  setOpenId: (id: string | null) => void;
  children: React.ReactNode;
}) {
  const isOpen = openId === id;
  return (
    <div
      className={cn(
        "rounded-2xl border transition-colors duration-200",
        isOpen
          ? "border-primary/30 bg-primary/[0.02]"
          : "border-border bg-card",
      )}
    >
      <button
        onClick={() => setOpenId(isOpen ? null : id)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
            isOpen
              ? "bg-primary/10 text-primary"
              : "bg-accent/60 text-muted-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <span
          className={cn(
            "flex-1 font-semibold text-sm transition-colors",
            isOpen ? "text-foreground" : "text-foreground/80",
          )}
        >
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-colors",
              isOpen ? "text-primary" : "text-muted-foreground",
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Detail Row (for Book Details table) ──────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-border/60 last:border-0">
      <dt className="w-36 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground pt-0.5">
        {label}
      </dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function BookDetail() {
  const { slug } = useParams();
  const book = BOOKS.find((b) => b.slug === slug);
  const addItem = useCart((s) => s.addItem);

  const [selectedFormat, setSelectedFormat] = useState<BookFormat>(
    book?.formats[0] || "Paperback",
  );
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [wishlist, setWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [descExpanded, setDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);
  // Accordion: one open at a time; default open = book details
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "bookdetails",
  );
  const reviewsRef = useRef<HTMLDivElement>(null);

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
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : book.rating;
  const breakdown = getRatingBreakdown(reviews);
  const filteredReviews = reviewFilter
    ? reviews.filter((r) => r.rating === reviewFilter)
    : reviews;

  const handleAddToCart = () => {
    addItem(book, selectedFormat);
    toast.success(`Added "${book.title}" to cart`, {
      description: `Format: ${selectedFormat}`,
    });
  };
  const handleBuyNow = () => {
    addItem(book, selectedFormat);
    toast.success("Proceeding to checkout…");
  };
  const handleShare = async () => {
    try {
      await navigator.share({ title: book.title, url: window.location.href });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  const scrollToReviews = () => {
    setActiveTab("reviews");
    setTimeout(
      () =>
        reviewsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      50,
    );
  };

  return (
    <main className="min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="container mx-auto px-4 pt-8 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-foreground transition-colors">
            Books
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{book.title}</span>
        </div>
      </div>

      {/* ── Main product section ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[auto_1fr_340px] gap-10 lg:gap-12 items-start">
          {/* ── Col 1: Image Gallery ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24 w-full lg:w-[340px]"
          >
            <div
              className="relative rounded-2xl overflow-hidden bg-accent/30 aspect-[3/4] group cursor-zoom-in shadow-warm"
              onClick={() => setZoomSrc(galleryImages[activeImage])}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={galleryImages[activeImage]}
                  alt={book.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" />
              </div>
              {book.isBestseller && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-amber-500 text-white border-0 text-xs font-bold shadow">
                    #1 Bestseller
                  </Badge>
                </div>
              )}
              {book.onSale && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-red-500 text-white border-0 text-xs font-bold shadow">
                    On Sale
                  </Badge>
                </div>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-16 h-20 rounded-lg overflow-hidden border-2 transition-all",
                      i === activeImage
                        ? "border-primary shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 rounded-xl border bg-card p-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Truck className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-green-700">Free Delivery</p>
                  <p className="text-muted-foreground text-xs">
                    On orders over ₹500. Arrives in 3–5 days.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-muted-foreground text-xs">
                    7-day hassle-free return policy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-muted-foreground text-xs">
                    100% SSL encrypted checkout.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Col 2: Book info + tabs + accordion ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6 min-w-0"
          >
            {/* Genre chips */}
            <div className="flex flex-wrap gap-2">
              {book.genres.map((g) => (
                <Badge
                  key={g}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {g}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
                {book.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                by{" "}
                <Link
                  to={`/books?author=${encodeURIComponent(book.author)}`}
                  className="text-foreground font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
                >
                  {book.author}
                </Link>
              </p>
              {book.publisher && (
                <p className="text-sm text-muted-foreground">
                  Publisher:{" "}
                  <span className="text-foreground">{book.publisher}</span>
                </p>
              )}
            </div>

            {/* Rating */}
            <button
              onClick={scrollToReviews}
              className="flex items-center gap-2 group hover:opacity-80 transition-opacity text-left"
            >
              <Stars rating={avgRating} size="md" />
              <span className="font-bold text-sm">{avgRating.toFixed(1)}</span>
              <span className="text-sm text-primary underline underline-offset-2 group-hover:decoration-2">
                {reviews.length} ratings
              </span>
            </button>

            {/* Description expand/collapse */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">
                About this book
              </h3>
              <div
                className={cn(
                  "text-muted-foreground leading-relaxed text-sm relative",
                  !descExpanded && "line-clamp-4",
                )}
              >
                {book.description}
                {!descExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
                )}
              </div>
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="flex items-center gap-1 text-primary text-sm font-medium hover:underline"
              >
                {descExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" /> Read more
                  </>
                )}
              </button>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y">
              {[
                {
                  icon: BookOpen,
                  label: "Pages",
                  value: book.pages.toString(),
                },
                { icon: Package, label: "Format", value: book.formats[0] },
                { icon: Award, label: "Published", value: book.pubDate },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-accent/40"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-xs font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {/* ── Tabs ── */}
            <div ref={reviewsRef} className="space-y-4 pt-2">
              <div className="flex border-b gap-6">
                {(["description", "details", "reviews"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "pb-3 text-sm font-bold uppercase tracking-widest border-b-2 transition-colors -mb-px",
                      activeTab === tab
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab === "reviews" ? `Reviews (${reviews.length})` : tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-muted-foreground leading-relaxed text-sm space-y-3"
                  >
                    <p>{book.description}</p>
                    <div className="pt-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                        Frequently bought together
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {related.slice(0, 3).map((b) => (
                          <Link key={b.id} to={`/books/${b.slug}`}>
                            <div className="flex items-center gap-2 border rounded-full px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary transition-colors">
                              <img
                                src={b.cover}
                                alt=""
                                className="w-4 h-5 object-cover rounded"
                              />
                              {b.title.length > 22
                                ? b.title.slice(0, 22) + "…"
                                : b.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <dl className="divide-y text-sm">
                      {[
                        ["Title", book.title],
                        ["Author", book.author],
                        ...(book.publisher
                          ? [["Publisher", book.publisher]]
                          : []),
                        ["Publication Date", book.pubDate],
                        ["ISBN", book.isbn],
                        ["Pages", book.pages.toString()],
                        ["Language", "Marathi / English"],
                        ["Available Formats", book.formats.join(", ")],
                      ].map(([label, value]) => (
                        <div key={label} className="flex py-2.5 gap-4">
                          <dt className="w-40 shrink-0 text-muted-foreground">
                            {label}
                          </dt>
                          <dd className="font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-[auto_1fr] gap-8 p-5 rounded-2xl bg-accent/30 border">
                      <div className="flex flex-col items-center justify-center gap-1 pr-8 border-r">
                        <span className="text-6xl font-serif font-bold leading-none">
                          {avgRating.toFixed(1)}
                        </span>
                        <Stars rating={avgRating} size="md" />
                        <span className="text-xs text-muted-foreground mt-1">
                          {reviews.length} ratings
                        </span>
                      </div>
                      <div className="space-y-2 justify-center flex flex-col">
                        {breakdown.map(({ stars, pct, count }) => (
                          <button
                            key={stars}
                            onClick={() =>
                              setReviewFilter(
                                reviewFilter === stars ? null : stars,
                              )
                            }
                            className={cn(
                              "flex items-center gap-3 group rounded-lg px-2 py-1 transition-colors",
                              reviewFilter === stars
                                ? "bg-primary/10"
                                : "hover:bg-accent",
                            )}
                          >
                            <span className="text-xs w-12 text-right text-primary font-medium shrink-0">
                              {stars} star{stars !== 1 ? "s" : ""}
                            </span>
                            <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="h-full rounded-full bg-amber-400"
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8 shrink-0">
                              {count}
                            </span>
                            {reviewFilter === stars && (
                              <Check className="h-3 w-3 text-primary shrink-0" />
                            )}
                          </button>
                        ))}
                        {reviewFilter && (
                          <button
                            onClick={() => setReviewFilter(null)}
                            className="text-xs text-primary underline text-left pl-2 pt-1"
                          >
                            Clear filter
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          icon: Users,
                          label: "Total Reviews",
                          value: reviews.length,
                        },
                        {
                          icon: Star,
                          label: "Avg. Rating",
                          value: `${avgRating.toFixed(1)} / 5`,
                        },
                        {
                          icon: MessageSquare,
                          label: "With Comments",
                          value: reviews.filter((r) => r.text).length,
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="p-3 rounded-xl border text-center space-y-1"
                        >
                          <Icon className="h-4 w-4 text-primary mx-auto" />
                          <p className="text-xs text-muted-foreground">
                            {label}
                          </p>
                          <p className="font-bold text-sm">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border rounded-2xl p-5">
                      <h3 className="font-serif font-bold text-lg mb-4">
                        Write a Customer Review
                      </h3>
                      <ReviewForm
                        onSubmit={(r: Review) =>
                          setReviews((prev) => [r, ...prev])
                        }
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-sm">
                          {reviewFilter
                            ? `Showing ${filteredReviews.length} ${reviewFilter}-star review${filteredReviews.length !== 1 ? "s" : ""}`
                            : `All ${reviews.length} Reviews`}
                        </h3>
                      </div>
                      <div className="divide-y">
                        {filteredReviews.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-6 text-center">
                            No reviews match this filter.
                          </p>
                        ) : (
                          filteredReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                ── Accordion: From the Publisher · Book Details · About Author ──
                ════════════════════════════════════════════════════════════════ */}
            <div className="space-y-3 pt-6">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-1">
                  More Information
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* ── Book Details ───────────────────────────────────────── */}
              <AccordionPanel
                id="bookdetails"
                icon={ListCollapse}
                title="Book Details"
                openId={openAccordion}
                setOpenId={setOpenAccordion}
              >
                <dl className="pt-3">
                  {[
                    ["ISBN-13", book.isbn],
                    [
                      "ISBN-10",
                      book.isbn?.replace(/-/g, "").slice(3, 12) ?? "—",
                    ],
                    ["Language", "Marathi / English"],
                    ["Pages", book.pages.toString()],
                    ["Available Formats", book.formats.join(", ")],
                    ["Publisher", book.publisher ?? "—"],
                    ["Publication Date", book.pubDate],
                    ["Genre", book.genres.join(", ")],
                    ["Reading Age", "14+"],
                    ["Dimensions", "21 × 14 × 2 cm"],
                    ["Weight", "320 g"],
                    [
                      "Binding",
                      book.formats.includes("Hardcover")
                        ? "Hardcover"
                        : "Paperback",
                    ],
                  ].map(([label, value]) => (
                    <DetailRow key={label} label={label} value={value} />
                  ))}
                </dl>
              </AccordionPanel>

              {/* ── 3. About the Author ───────────────────────────────────── */}
              <AccordionPanel
                id="author"
                icon={UserRound}
                title="About the Author"
                openId={openAccordion}
                setOpenId={setOpenAccordion}
              >
                <div className="space-y-5 pt-3">
                  {/* Author identity card */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-accent/30 border border-border/60">
                    {/* Avatar with verified dot */}
                    <div className="relative shrink-0">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 flex items-center justify-center text-primary font-serif font-bold text-2xl">
                        {book.author.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif font-bold text-base leading-tight">
                        {book.author}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Verified Author · India
                      </p>
                      {/* Genre tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {book.genres.slice(0, 3).map((g) => (
                          <span
                            key={g}
                            className="rounded-full bg-background border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {book.author} is a celebrated author whose works have moved
                    and inspired readers across India and beyond. Known for
                    their command over language and profound understanding of
                    the human condition, {book.author.split(" ")[0]}'s writing
                    blends traditional storytelling with contemporary themes —
                    creating narratives that are both timeless and deeply
                    relevant. Their books have earned critical acclaim, numerous
                    literary honours, and a devoted readership spanning several
                    generations.
                  </p>

                  {/* Author stats */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Books Published", value: "12+" },
                      { label: "Awards Won", value: "5" },
                      { label: "Languages", value: "8" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl bg-accent/50 border border-border/60 p-3 text-center"
                      >
                        <p className="font-serif font-bold text-xl text-primary leading-none">
                          {value}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-1 leading-tight">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* More books by this author */}
                  {related.length > 0 && (
                    <div className="space-y-2.5">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        More by {book.author.split(" ")[0]}
                      </p>
                      <div
                        className="flex gap-3 overflow-x-auto pb-1"
                        style={{ scrollbarWidth: "none" }}
                      >
                        {related.map((b) => (
                          <Link
                            key={b.id}
                            to={`/books/${b.slug}`}
                            className="shrink-0 group"
                          >
                            <div className="w-14 h-20 rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-all duration-200 shadow-sm group-hover:shadow-md">
                              <img
                                src={b.cover}
                                alt={b.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1.5 w-14 line-clamp-2 group-hover:text-foreground transition-colors leading-tight">
                              {b.title}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </AccordionPanel>
            </div>
            {/* ── End Accordion ── */}
          </motion.div>

          {/* ── Col 3: Buy box (sticky) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="sticky top-24 space-y-4"
          >
            <div className="rounded-2xl border bg-card shadow-soft p-5 space-y-5">
              <PriceDisplay book={book} size="lg" />

              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <Check className="h-4 w-4" /> In Stock — Ready to Ship
              </div>

              <div className="text-xs text-muted-foreground">
                Format: <span className="font-semibold text-foreground">{book.formats[0]}</span>
                {book.formats.length > 1 && (
                  <span className="ml-1">+ {book.formats.length - 1} more</span>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <Button
                  size="lg"
                  className="w-full h-12 rounded-full text-base shadow-warm font-semibold"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 rounded-full text-base font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setWishlist((w) => !w);
                    toast.success(
                      wishlist ? "Removed from wishlist" : "Added to wishlist!",
                    );
                  }}
                  className={cn(
                    "flex-1 gap-2 rounded-full border transition-colors",
                    wishlist
                      ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                      : "border-border",
                  )}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      wishlist && "fill-red-500 text-red-500",
                    )}
                  />
                  {wishlist ? "Wishlisted" : "Wishlist"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="flex-1 gap-2 rounded-full border border-border"
                >
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-border accent-primary w-4 h-4"
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  This is a gift — add gift wrapping
                </span>
              </label>
            </div>

            {/* Buying Options */}
            <BuyingOptions book={book} />

            {/* Seller info */}
            <div className="rounded-xl border bg-card p-4 text-sm space-y-2">
              <p className="font-semibold text-xs uppercase tracking-widest text-muted-foreground">
                Sold & Fulfilled By
              </p>
              <p className="font-bold text-primary">Mehta Publishing House</p>
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Stars rating={4.8} size="sm" />
                <span>4.8 · Trusted Seller</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Related books ── */}
      {related.length > 0 && (
        <section className="container mx-auto px-4 mt-20 pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 rounded-full bg-primary" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              You May Also Like
            </h2>
          </div>
          <BookGrid books={related} columns={4} />
        </section>
      )}

      {/* ── Zoom modal ── */}
      <AnimatePresence>
        {zoomSrc && (
          <ZoomModal
            src={zoomSrc}
            alt={book.title}
            onClose={() => setZoomSrc(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
