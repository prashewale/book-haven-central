import { Link } from "react-router-dom";
import { BookOpen, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">
                Mehta Publishing House
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your destination for curated reads, new releases, and timeless
              classics.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Books", to: "/books" },
                { label: "Combo Sets", to: "/combo-sets" },
                { label: "Discounts", to: "/discounts" },
                { label: "Gift Coupons", to: "/gift-coupons" },
                { label: "New Releases", to: "/books?filter=new" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Authors", to: "/authors" },
                { label: "Events", to: "/events" },
                { label: "Distributors", to: "/distributors" },
                { label: "Membership", to: "/membership" },
                { label: "Publish eBook", to: "/publish" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Help</h4>
            <ul className="space-y-2.5">
              {["FAQ", "Shipping", "Returns", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mehta Publishing House. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
