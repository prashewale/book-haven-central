import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { MiniCart } from '@/components/cart/MiniCart';
import { MobileNav } from './MobileNav';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { GENRES } from '@/lib/mock-data';

const GENRE_GROUPS = [
  { label: 'Popular', genres: ['Fiction', 'Non-Fiction', 'Romance', 'Mystery'] },
  { label: 'Speculative', genres: ['Fantasy', 'Sci-Fi', 'Thriller'] },
  { label: 'More', genres: ['Historical', 'Self-Help', 'Memoir', 'Biography', 'Classic'] },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const totalItems = useCart((s) => s.totalItems());
  const setCartOpen = useCart((s) => s.setCartOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 -ml-2 text-foreground"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-xl lg:text-2xl font-bold tracking-tight text-foreground">
              Mehta<span className="text-primary"> Publishing</span>
            </span>
          </Link>

          {/* Desktop nav with hover dropdowns */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                  Books
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-6">
                    <div className="mb-4">
                      <Link to="/books" className="block text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        Browse All Books →
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {GENRE_GROUPS.map((group) => (
                        <div key={group.label}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{group.label}</p>
                          <ul className="space-y-1.5">
                            {group.genres.map((genre) => (
                              <li key={genre}>
                                <Link to={`/books?genre=${encodeURIComponent(genre)}`} className="block text-sm text-foreground/80 hover:text-primary transition-colors">
                                  {genre}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[320px] p-4 space-y-1">
                    <Link to="/combo-sets" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      📦 Combo Sets
                    </Link>
                    <Link to="/discounts" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      🔥 Discounts & Deals
                    </Link>
                    <Link to="/gift-coupons" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      🎁 Gift Coupons
                    </Link>
                    <Link to="/books?filter=new" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      🆕 New Releases
                    </Link>
                    <Link to="/books?filter=bestseller" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      🏆 Bestsellers
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">
                  More
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[320px] p-4 space-y-1">
                    <Link to="/authors" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      ✍️ Authors
                    </Link>
                    <Link to="/membership" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      👑 Membership
                    </Link>
                    <Link to="/events" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      📅 Events
                    </Link>
                    <Link to="/distributors" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      🚚 Distributors
                    </Link>
                    <Link to="/publish" className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors">
                      📝 Publish eBook
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="h-9 w-48 rounded-full border bg-muted/50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
                />
              </div>
            </form>

            <Link to="/login" className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden md:flex" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MiniCart />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
