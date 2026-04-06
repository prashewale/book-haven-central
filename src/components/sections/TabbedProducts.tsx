import { useMemo, useState } from "react";
import { BOOKS } from "@/lib/mock-data";
import { BookGrid } from "@/components/product/BookGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TABS = [
  { value: "featured", label: "Featured Books" },
  { value: "new", label: "New Arrivals" },
  { value: "popular", label: "Most Viewed" },
];

export function TabbedProducts() {
  const featured = useMemo(
    () => BOOKS.filter((b) => b.isBestseller || b.onSale).slice(0, 8),
    [],
  );
  const newArrivals = useMemo(
    () => BOOKS.filter((b) => b.isNewRelease).slice(0, 8),
    [],
  );
  // Mock "most viewed" by highest review count
  const mostViewed = useMemo(
    () => [...BOOKS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8),
    [],
  );

  const tabData: Record<string, typeof BOOKS> = {
    featured,
    new: newArrivals,
    popular: mostViewed,
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Our Collection
          </h2>
          <p className="text-muted-foreground">
            Curated picks for every reader
          </p>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted/50 rounded-full p-1 h-auto">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-warm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <BookGrid books={tabData[tab.value]} columns={4} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
