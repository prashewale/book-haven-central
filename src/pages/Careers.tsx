import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const OPENINGS = [
  {
    title: "Senior Editor — Marathi Literature",
    location: "Pune, India",
    type: "Full-time",
    desc: "Lead editorial direction for our flagship Marathi imprint.",
  },
  {
    title: "Marketing Manager",
    location: "Mumbai, India",
    type: "Full-time",
    desc: "Drive book launches, campaigns, and author publicity.",
  },
  {
    title: "Graphic Designer (Book Covers)",
    location: "Remote",
    type: "Contract",
    desc: "Design captivating covers for upcoming releases.",
  },
  {
    title: "Sales Executive",
    location: "Multiple cities",
    type: "Full-time",
    desc: "Build and manage distributor & retail relationships.",
  },
];

export default function Careers() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto space-y-3"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Careers at Mehta Publishing House
        </h1>
        <p className="text-muted-foreground">
          Help us bring transformative stories to readers across the world.
        </p>
      </motion.div>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-6">Open Positions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {OPENINGS.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border bg-card p-5 hover:shadow-warm hover:border-primary/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {job.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {job.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto rounded-2xl border bg-card p-6 md:p-8">
        <h2 className="font-serif text-2xl font-bold mb-1">Apply Now</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Send us your details and we'll get back to you.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Application submitted! We'll be in touch soon.");
          }}
          className="space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input required placeholder="Your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input required type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <Label>Position</Label>
            <Input required placeholder="Which role are you applying for?" />
          </div>
          <div>
            <Label>Cover Letter</Label>
            <Textarea
              required
              rows={5}
              placeholder="Tell us about yourself..."
            />
          </div>
          <Button type="submit" className="rounded-full gap-2">
            <Send className="h-4 w-4" /> Submit Application
          </Button>
        </form>
      </section>
    </main>
  );
}
