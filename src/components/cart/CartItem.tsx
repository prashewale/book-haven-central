import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/store';
import type { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

export function CartItem({ item, compact }: CartItemProps) {
  const { updateQty, removeItem } = useCart();
  const price = item.book.discountPrice || item.book.price;

  return (
    <div className="flex gap-4">
      <img
        src={item.book.cover}
        alt={item.book.title}
        className={`rounded-lg object-cover bg-muted ${compact ? 'w-16 h-20' : 'w-24 h-32'}`}
      />
      <div className="flex-1 min-w-0 space-y-1">
        <h4 className={`font-serif font-semibold leading-tight truncate ${compact ? 'text-sm' : 'text-base'}`}>
          {item.book.title}
        </h4>
        <p className="text-xs text-muted-foreground">{item.book.author}</p>
        <p className="text-xs text-muted-foreground">{item.selectedFormat}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item.book.id, item.selectedFormat, item.quantity - 1)}
              className="h-7 w-7 rounded-full border flex items-center justify-center text-muted-foreground hover:bg-muted"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQty(item.book.id, item.selectedFormat, item.quantity + 1)}
              className="h-7 w-7 rounded-full border flex items-center justify-center text-muted-foreground hover:bg-muted"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-primary">${(price * item.quantity).toFixed(2)}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.book.id, item.selectedFormat)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
