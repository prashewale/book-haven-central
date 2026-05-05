import { HeroWithOffer } from "@/components/sections/HeroWithOffer";
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
import { VideoSlider } from "@/components/sections/VideoSlider";

export default function Home() {
  return (
    <main>
      <HeroWithOffer />
      <OnSaleCountdown />
      <NewArrivalsSection />
      <UpcomingSection />
      <FeaturedSection />
      <AllTimeBestsellerSection />
      <RecentBestsellerSection />
      <VerticalCategories />
      <FeaturedAuthor />
      <VideoSlider />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </main>
  );
}
