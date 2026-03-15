import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thanks for subscribing!', { description: 'You\'ll receive our weekly picks soon.' });
      setEmail('');
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Stay in the Loop</h2>
          <p className="text-muted-foreground">
            Get weekly reading recommendations, exclusive deals, and early access to new arrivals.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 h-12 rounded-full border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" size="lg" className="h-12 rounded-full px-6">
              <Send className="h-4 w-4 mr-2" /> Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground">No spam, unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
