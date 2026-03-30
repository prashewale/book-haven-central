import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, FileText, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const GENRES_LIST = ['Fiction', 'Non-Fiction', 'Fantasy', 'Romance', 'Mystery', 'Thriller', 'Sci-Fi', 'Self-Help', 'Biography', 'Children', 'Academic', 'Poetry', 'Other'];

export default function PublishEbook() {
  const [form, setForm] = useState({
    authorName: '',
    email: '',
    phone: '',
    bookTitle: '',
    genre: '',
    synopsis: '',
    manuscriptPages: '',
    previousPublications: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeTerms) { toast.error('Please agree to the terms'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Manuscript submitted successfully! Our team will review and contact you within 7 business days.');
      setForm({ authorName: '', email: '', phone: '', bookTitle: '', genre: '', synopsis: '', manuscriptPages: '', previousPublications: '', agreeTerms: false });
    }, 1500);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Publish Your eBook</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Submit your manuscript to Mehta Publishing House. We help aspiring authors bring their stories to life.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
        {/* Info sidebar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2 space-y-6">
          <div className="bg-accent/50 rounded-2xl p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold">Why Publish With Us?</h3>
            <ul className="space-y-3 text-sm">
              {[
                'Professional editing & formatting',
                'Cover design assistance',
                'Distribution to major platforms',
                'Marketing & promotional support',
                'Competitive royalty rates',
                'Dedicated author liaison',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <h3 className="font-serif text-lg font-bold">Submission Guidelines</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Manuscript should be min. 10,000 words</li>
              <li>• Original, unpublished work only</li>
              <li>• Review takes 5–7 business days</li>
              <li>• We accept all genres</li>
            </ul>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3">
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Manuscript Submission Form
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Author Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={form.authorName} onChange={(e) => update('authorName', e.target.value)} placeholder="Your full name" className="pl-10 h-12 rounded-xl" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" className="pl-10 h-12 rounded-xl" required />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 98765 43210" className="pl-10 h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Book Title *</label>
                <Input value={form.bookTitle} onChange={(e) => update('bookTitle', e.target.value)} placeholder="Working title" className="h-12 rounded-xl" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Genre *</label>
              <select
                value={form.genre}
                onChange={(e) => update('genre', e.target.value)}
                required
                className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a genre</option>
                {GENRES_LIST.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Synopsis / Brief Description *</label>
              <textarea
                value={form.synopsis}
                onChange={(e) => update('synopsis', e.target.value)}
                placeholder="Tell us about your book in 200–500 words..."
                required
                className="w-full rounded-xl border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring h-32 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Pages / Word Count</label>
                <Input value={form.manuscriptPages} onChange={(e) => update('manuscriptPages', e.target.value)} placeholder="e.g. 250 pages / 60,000 words" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Previous Publications</label>
                <Input value={form.previousPublications} onChange={(e) => update('previousPublications', e.target.value)} placeholder="Any prior published works" className="h-12 rounded-xl" />
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Upload Manuscript (PDF/DOCX)</p>
              <p className="text-xs text-muted-foreground mt-1">Max 25MB — Drag & drop or click to browse</p>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={(e) => update('agreeTerms', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input accent-primary"
              />
              <span className="text-sm text-muted-foreground">
                I confirm this is my original work and I agree to Mehta Publishing House's submission terms and conditions. *
              </span>
            </label>

            <Button type="submit" className="w-full rounded-full h-12 text-base" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Manuscript'}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
