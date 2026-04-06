import { Hero } from "@/components/sections/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { OnSaleCountdown } from "@/components/sections/OnSaleCountdown";
import { TabbedProducts } from "@/components/sections/TabbedProducts";
import { Testimonials } from "@/components/sections/Testimonials";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Newsletter } from "@/components/sections/Newsletter";
import { VideoSlider } from "@/components/sections/VideoSlider";
import { MembershipBanner } from "@/components/sections/MembershipBanner";
import { MembershipFloat } from "@/components/sections/MembershipFloat";
export default function Home() {
  return (
    <main>
      <Hero />
      <MembershipBanner />
      <OnSaleCountdown />
      <FeaturedCollections />
      <VideoSlider />
      <TabbedProducts />
      <Bestsellers />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
      <MembershipFloat />
    </main>
  );
}
