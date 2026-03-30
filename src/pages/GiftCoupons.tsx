import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const GIFT_CARDS = [
  { id: "g1", value: 250, color: "from-amber-500 to-orange-600" },
  { id: "g2", value: 500, color: "from-primary to-amber-700" },
  { id: "g3", value: 1000, color: "from-amber-800 to-amber-950" },
  { id: "g4", value: 2000, color: "from-amber-600 to-primary" },
];

const ACTIVE_COUPONS = [
  {
    code: "WELCOME10",
    discount: "10% off your first order",
    expiry: "Dec 31, 2026",
  },
  {
    code: "READMORE20",
    discount: "20% off orders above ₹50",
    expiry: "Mar 31, 2026",
  },
  {
    code: "READMORE20",
    discount: "20% off orders above ₹50",
    expiry: "Mar 31, 2026",
  },
  {
    code: "BOOKWORM15",
    discount: "15% off all fiction books",
    expiry: "Jun 30, 2026",
  },
];

export default function GiftCoupons() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast.error("Please select a gift card amount");
      return;
    }
    toast.success("Gift card purchased! (Demo)");
    setSelectedCard(null);
    setRecipientEmail("");
    setMessage("");
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Gift Coupons & Cards
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Give the gift of reading — perfect for any book lover.
        </p>
      </motion.div>

      {/* Gift Cards */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-bold mb-6">
          Purchase a Gift Card
        </h2>
        <form onSubmit={handlePurchase} className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GIFT_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedCard(card.id)}
                className={`relative rounded-2xl p-6 text-center transition-all bg-gradient-to-br ${card.color} text-white ${
                  selectedCard === card.id
                    ? "ring-4 ring-ring scale-105"
                    : "hover:scale-105"
                }`}
              >
                <Gift className="h-8 w-8 mx-auto mb-2 opacity-80" />
                <span className="text-3xl font-bold">₹{card.value}</span>
                <p className="text-xs mt-1 opacity-80">Gift Card</p>
              </button>
            ))}
          </div>

          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipient Email</label>
              <Input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="friend@example.com"
                className="h-12 rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Personal Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy reading!"
                className="w-full rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring h-24 resize-none"
              />
            </div>
            <Button type="submit" className="rounded-full px-8">
              <Gift className="h-4 w-4 mr-2" /> Purchase Gift Card
            </Button>
          </div>
        </form>
      </section>

      {/* Active Coupons */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">
          Active Coupon Codes
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {ACTIVE_COUPONS.map((coupon) => (
            <div
              key={coupon.code}
              className="bg-card border border-border rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <code className="bg-accent text-accent-foreground px-3 py-1.5 rounded-lg font-mono font-bold text-sm">
                  {coupon.code}
                </code>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {copiedCode === coupon.code ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-sm font-medium">{coupon.discount}</p>
              <p className="text-xs text-muted-foreground">
                Expires: {coupon.expiry}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
