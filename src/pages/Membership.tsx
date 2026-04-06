import { motion } from "framer-motion";
import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { MEMBERSHIP_PLANS } from "@/lib/mock-users";
import { Badge } from "@/components/ui/badge";
import { useMembership } from "@/lib/membership-store";

export default function Membership() {
  const { activePlanCode, subscribe } = useMembership();

  const handleSubscribe = (code: string) => {
    subscribe(code);
    toast.success(`Subscribed to ${code} membership! Discounts now applied to all prices.`);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Membership Plans</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join the Mehta Publishing House family and unlock exclusive discounts on every purchase.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" /> Available Memberships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Sr. No</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-center">Discount</TableHead>
                  <TableHead className="text-right">Price (&#8377;)</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MEMBERSHIP_PLANS.map((plan) => {
                  const isActive = activePlanCode === plan.code;
                  return (
                    <TableRow key={plan.code} className={isActive ? "bg-primary/5" : ""}>
                      <TableCell className="font-medium">{plan.srNo}</TableCell>
                      <TableCell>
                        <span className="font-semibold">{plan.code}</span>
                        {isActive && <Badge className="ml-2 text-[10px]" variant="default">Active</Badge>}
                      </TableCell>
                      <TableCell>{plan.duration}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{plan.discount}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">&#8377;{plan.price}</TableCell>
                      <TableCell className="text-right">
                        {isActive ? (
                          <Button size="sm" variant="ghost" disabled className="gap-1">
                            <Check className="h-4 w-4" /> Subscribed
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSubscribe(plan.code)}
                          >
                            Subscribe
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
