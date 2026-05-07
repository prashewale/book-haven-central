import { SaleOfferSlider } from "./SaleOfferSlider";
import { VideoSlider } from "./VideoSlider";

export function SaleOfferWithFeaturedVideo() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1fr_360px] gap-4 items-stretch">
        <SaleOfferSlider />
        <div className="hidden lg:block">
          <VideoSlider />
        </div>
      </div>
    </section>
  );
}
