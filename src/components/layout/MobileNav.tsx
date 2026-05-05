import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'All Books', to: '/books' },
  { label: 'Authors', to: '/authors' },
  { label: 'Combo Sets', to: '/combo-sets' },
  { label: 'Discounts', to: '/discounts' },
  { label: 'Gift Coupons', to: '/gift-coupons' },
  { label: 'Membership', to: '/membership' },
  { label: 'Events', to: '/events' },
  { label: 'Distributors', to: '/distributors' },
  
  { label: 'Publish with us', to: '/publish' },
  { label: 'Careers', to: '/careers' },
  { label: 'Cart', to: '/cart' },
];

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r shadow-warm"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-serif text-xl font-bold">Mehta Publishing</span>
              <button onClick={onClose} className="p-2 text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-65px)]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
