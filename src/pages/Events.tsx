import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const EVENTS = [
  {
    id: 'e1',
    title: 'Book Launch: "Whispers of Dawn"',
    date: 'Apr 15, 2026',
    time: '6:00 PM – 8:00 PM',
    location: 'Mehta Publishing House, Main Hall',
    description: 'Join us for the launch of our newest fiction release. Meet the author and get signed copies.',
    spots: 50,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop',
    type: 'Book Launch',
  },
  {
    id: 'e2',
    title: "Children's Reading Hour",
    date: 'Apr 20, 2026',
    time: '10:00 AM – 11:30 AM',
    location: 'Mehta Publishing House, Kids Corner',
    description: 'A fun and interactive reading session for children aged 5-12. Stories, activities, and prizes!',
    spots: 30,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=300&fit=crop',
    type: 'Workshop',
  },
  {
    id: 'e3',
    title: 'Author Talk: The Art of Storytelling',
    date: 'May 5, 2026',
    time: '5:00 PM – 7:00 PM',
    location: 'Online (Zoom)',
    description: 'An intimate conversation with bestselling authors about their creative process and journey.',
    spots: 200,
    image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=300&fit=crop',
    type: 'Webinar',
  },
  {
    id: 'e4',
    title: 'Annual Book Fair 2026',
    date: 'Jun 10–12, 2026',
    time: '9:00 AM – 6:00 PM',
    location: 'City Convention Center',
    description: 'Our biggest event of the year! Hundreds of titles, author meet-and-greets, panel discussions, and exclusive deals.',
    spots: 500,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop',
    type: 'Book Fair',
  },
];

export default function Events() {
  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Events</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Book launches, readings, workshops, and more — be part of the Mehta Publishing House community.
        </p>
      </motion.div>

      <div className="space-y-8">
        {EVENTS.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden md:flex hover:shadow-warm transition-shadow"
          >
            <img src={event.image} alt={event.title} className="md:w-72 h-48 md:h-auto object-cover" />
            <div className="p-6 flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground px-3 py-1 rounded-full">
                  {event.type}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold">{event.title}</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {event.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {event.time}</span>
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {event.location}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {event.spots} spots</span>
              </div>
              <Button className="rounded-full" onClick={() => toast.success(`Registered for ${event.title}! (Demo)`)}>
                Register Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
