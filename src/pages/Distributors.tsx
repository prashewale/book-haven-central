import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';

const DISTRIBUTORS = [
  { id: 'd1', name: 'National Book Distributors', region: 'North India', city: 'New Delhi', phone: '+91 11 2345 6789', email: 'info@nbd.in', website: 'nbd.in' },
  { id: 'd2', name: 'Southern Reads Supply Co.', region: 'South India', city: 'Chennai', phone: '+91 44 9876 5432', email: 'sales@srs.in', website: 'srs.in' },
  { id: 'd3', name: 'Western Book Network', region: 'West India', city: 'Mumbai', phone: '+91 22 1234 5678', email: 'connect@wbn.in', website: 'wbn.in' },
  { id: 'd4', name: 'Eastern Literature Hub', region: 'East India', city: 'Kolkata', phone: '+91 33 8765 4321', email: 'info@elh.in', website: 'elh.in' },
  { id: 'd5', name: 'Global Books International', region: 'International', city: 'London, UK', phone: '+44 20 7946 0958', email: 'orders@gbi.co.uk', website: 'gbi.co.uk' },
];

export default function Distributors() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Distributor inquiry submitted! We will get back to you soon. (Demo)');
    setName(''); setEmail(''); setCompanyName('');
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Our Distributors</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Find Mehta Publishing House books through our trusted distribution network across India and worldwide.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {DISTRIBUTORS.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4 hover:shadow-warm transition-shadow"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-accent text-accent-foreground px-3 py-1 rounded-full">{d.region}</span>
            </div>
            <h3 className="font-serif text-lg font-bold">{d.name}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {d.city}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {d.phone}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> {d.email}</p>
              <p className="flex items-center gap-2"><Globe className="h-4 w-4 shrink-0" /> {d.website}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Become a distributor */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-6 text-center">Become a Distributor</h2>
        <form onSubmit={handleInquiry} className="bg-card border border-border rounded-2xl p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="h-12 rounded-xl" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-12 rounded-xl" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your distribution company" className="h-12 rounded-xl" required />
          </div>
          <Button type="submit" className="w-full rounded-full">Submit Inquiry</Button>
        </form>
      </motion.section>
    </main>
  );
}
