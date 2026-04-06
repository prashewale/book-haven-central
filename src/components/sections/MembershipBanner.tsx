import { motion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_PLANS } from "@/lib/mock-users";

export function MembershipBanner() {
  const topPlan = MEMBERSHIP_PLANS[4]; // TBC36 — cheapest high-discount

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-2xl md:text-3xl font-serif font-bold">
                Become a Member &amp; Save Up to 48%
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Join the Mehta Publishing House family! Get exclusive discounts on every purchase.
                Plans start at just <span className="font-bold text-primary">₹{topPlan.price}</span>.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {MEMBERSHIP_PLANS.slice(0, 3).map((p) => (
                  <span key={p.code} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {p.code} — {p.discount} off
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link to="/membership">
                <Button size="lg" className="rounded-full gap-2">
                  View Plans <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
