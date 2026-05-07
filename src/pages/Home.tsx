import { HeroWithOffer } from "@/components/sections/HeroWithOffer";
import { SaleOfferWithFeaturedVideo } from "@/components/sections/SaleOfferWithFeaturedVideo";
import { TodaysOffer } from "@/components/sections/TodaysOffer";
import { OnSaleCountdown } from "@/components/sections/OnSaleCountdown";
import {
  NewArrivalsSection,
  UpcomingSection,
  FeaturedSection,
  AllTimeBestsellerSection,
  RecentBestsellerSection,
} from "@/components/sections/HomeBookSections";
import { VerticalCategories } from "@/components/sections/VerticalCategories";
import { FeaturedAuthor } from "@/components/sections/FeaturedAuthor";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main>
      <HeroWithOffer />
      <SaleOfferWithFeaturedVideo />
      <TodaysOffer />
      <OnSaleCountdown />
      <NewArrivalsSection />
      <UpcomingSection />
      <FeaturedSection />
      <AllTimeBestsellerSection />
      <RecentBestsellerSection />
      <VerticalCategories />
      <FeaturedAuthor />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </main>
  );
}
