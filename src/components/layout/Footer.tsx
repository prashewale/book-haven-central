import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">BookHaven</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your destination for curated reads, new releases, and timeless classics.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Shop', links: ['All Books', 'New Releases', 'Bestsellers', 'On Sale', 'Gift Cards'] },
            { title: 'About', links: ['Our Story', 'Blog', 'Careers', 'Press'] },
            { title: 'Help', links: ['FAQ', 'Shipping', 'Returns', 'Contact Us'] },
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-serif text-lg font-semibold">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BookHaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
