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
import { AuthorBirthdaySpecial } from "@/components/sections/AuthorBirthdaySpecial";
import { FestivalOfMonth } from "@/components/sections/FestivalOfMonth";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Newsletter } from "@/components/sections/Newsletter";
import { MembershipFloat } from "@/components/sections/MembershipFloat";

export default function Home() {
  return (
    <main>
      <HeroWithOffer />
      <SaleOfferWithFeaturedVideo />
      {/* <OnSaleCountdown /> */}
      <NewArrivalsSection />
      <FeaturedSection />
      <AllTimeBestsellerSection />

      <AuthorBirthdaySpecial />
      <FestivalOfMonth />
      <RecentBestsellerSection />
      {/* <UpcomingSection /> */}
      <VerticalCategories />
      <FeaturedAuthor />
      <TodaysOffer />

      <Testimonials />
      {/* <InstagramFeed /> */}
      <Newsletter />
    </main>
  );
}
