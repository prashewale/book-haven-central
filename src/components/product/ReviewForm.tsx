import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Review } from '@/lib/types';

interface ReviewFormProps {
  onSubmit: (review: Review) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      toast.error('Please fill in all fields and select a rating');
      return;
    }
    const review: Review = {
      id: Date.now().toString(),
      name: name.trim(),
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      text: text.trim(),
    };
    onSubmit(review);
    setName('');
    setRating(0);
    setText('');
    toast.success('Review submitted! Thank you for your feedback.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
      <h4 className="font-serif text-lg font-bold">Write a Review</h4>

      {/* Star rating */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Your Rating</label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  'h-6 w-6 transition-colors',
                  (hoverRating || rating) > i
                    ? 'fill-current text-amber-glow'
                    : 'text-muted-foreground/40'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="reviewer-name" className="text-sm font-medium">Your Name</label>
        <Input
          id="reviewer-name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="review-text" className="text-sm font-medium">Your Review</label>
        <Textarea
          id="review-text"
          placeholder="Share your thoughts about this book..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="rounded-lg resize-none"
        />
      </div>

      <Button type="submit" className="rounded-full">
        Submit Review
      </Button>
    </form>
  );
}
