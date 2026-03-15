import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, BookFormat, CartItem } from './types';

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (book: Book, format: BookFormat) => void;
  removeItem: (bookId: string, format: BookFormat) => void;
  updateQty: (bookId: string, format: BookFormat, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      addItem: (book, format) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.book.id === book.id && i.selectedFormat === format
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isCartOpen: true,
            };
          }
          return {
            items: [...state.items, { book, quantity: 1, selectedFormat: format }],
            isCartOpen: true,
          };
        }),
      removeItem: (bookId, format) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.book.id === bookId && i.selectedFormat === format)
          ),
        })),
      updateQty: (bookId, format, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.book.id === bookId && i.selectedFormat === format
              ? { ...i, quantity: Math.max(1, qty) }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      setCartOpen: (open) => set({ isCartOpen: open }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (i.book.discountPrice || i.book.price) * i.quantity,
          0
        ),
    }),
    {
      name: 'bookhaven-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
