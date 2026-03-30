import { motion } from "framer-motion";
import { Check, Crown, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PLANS = [
  {
    name: "Reader",
    price: 0,
    period: "Free forever",
    icon: Star,
    features: [
      "Browse full catalog",
      "Wishlist (up to 10)",
      "Monthly newsletter",
      "Standard shipping",
    ],
    cta: "Current Plan",
    highlight: false,
  },
  {
    name: "Bookworm",
    price: 450,
    period: " For 3 Years",
    icon: Zap,
    features: [
      "Everything in Reader",
      "10% off all orders",
      "Free standard shipping",
      "Early access to new releases",
      "Unlimited wishlist",
      "Exclusive member events",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Literary Elite",
    price: 199,
    period: "/month",
    icon: Crown,
    features: [
      "Everything in Bookworm",
      "20% off all orders",
      "Free express shipping",
      "Signed first editions access",
      "Author meet & greet invites",
      "1 free eBook per month",
      "Priority customer support",
    ],
    cta: "Go Elite",
    highlight: false,
  },
];

export default function Membership() {
  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Membership Plans
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join the Mehta Publishing House family and unlock exclusive perks for
          book lovers.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`relative rounded-2xl border p-8 flex flex-col ${
              plan.highlight
                ? "border-primary bg-accent/50 shadow-warm scale-105"
                : "border-border bg-card"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <div className="text-center mb-6">
              <plan.icon
                className={`h-10 w-10 mx-auto mb-3 ${plan.highlight ? "text-primary" : "text-muted-foreground"}`}
              />
              <h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`mt-8 rounded-full w-full ${plan.highlight ? "" : "variant-outline"}`}
              variant={plan.highlight ? "default" : "outline"}
              onClick={() => toast.success(`${plan.name} selected! (Demo)`)}
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
