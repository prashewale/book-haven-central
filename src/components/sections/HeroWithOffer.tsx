import { Hero } from "./Hero";
import { TodaysOffer } from "./TodaysOffer";

export function HeroWithOffer() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="rounded-2xl overflow-hidden">
          <Hero />
        </div>
        <div className="hidden lg:block">
          <TodaysOffer />
        </div>
      </div>
    </section>
  );
}
