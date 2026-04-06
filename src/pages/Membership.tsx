import { motion } from "framer-motion";
import { Crown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { MEMBERSHIP_PLANS, MOCK_USERS } from "@/lib/mock-users";
import { Badge } from "@/components/ui/badge";

export default function Membership() {
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

      {/* Plans Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="max-w-4xl mx-auto mb-12">
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
                {MEMBERSHIP_PLANS.map((plan) => (
                  <TableRow key={plan.code}>
                    <TableCell className="font-medium">{plan.srNo}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{plan.code}</span>
                    </TableCell>
                    <TableCell>{plan.duration}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{plan.discount}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">&#8377;{plan.price}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success(`${plan.code} membership selected! (Demo)`)}
                      >
                        Subscribe
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Members */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-center">Reward Points</TableHead>
                  <TableHead className="text-right">Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_USERS.map((user) => {
                  const plan = MEMBERSHIP_PLANS.find((p) => p.code === user.membershipCode);
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge>{plan?.code ?? "N/A"}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{user.city}</TableCell>
                      <TableCell className="text-center font-semibold text-primary">{user.rewardPoints.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {new Date(user.joinedDate).toLocaleDateString("en-IN", { year: "numeric", month: "short" })}
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
