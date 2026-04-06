import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit3, Save, X, Crown, Gift, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { MOCK_USERS, MEMBERSHIP_PLANS } from "@/lib/mock-users";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState({ ...MOCK_USERS[0] });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...user });

  const membership = MEMBERSHIP_PLANS.find((p) => p.code === user.membershipCode);

  const handleSave = () => {
    setUser({ ...draft });
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setDraft({ ...user });
    setEditing(false);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">My Profile</h1>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-24 w-24 rounded-full border-4 border-primary/20 object-cover"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-serif font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                {membership && (
                  <span className="inline-flex items-center gap-1 mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Crown className="h-3 w-3" /> {membership.code} Member
                  </span>
                )}
              </div>
              <Button
                variant={editing ? "destructive" : "outline"}
                size="sm"
                onClick={() => (editing ? handleCancel() : setEditing(true))}
              >
                {editing ? <><X className="h-4 w-4" /> Cancel</> : <><Edit3 className="h-4 w-4" /> Edit</>}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="details"><User className="h-4 w-4 mr-1" /> Details</TabsTrigger>
            <TabsTrigger value="shipping"><Truck className="h-4 w-4 mr-1" /> Shipping</TabsTrigger>
            <TabsTrigger value="rewards"><Award className="h-4 w-4 mr-1" /> Rewards</TabsTrigger>
            <TabsTrigger value="membership"><Crown className="h-4 w-4 mr-1" /> Membership</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    {editing ? (
                      <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                    ) : (
                      <p className="mt-1 flex items-center gap-2 text-foreground"><User className="h-4 w-4 text-muted-foreground" />{user.name}</p>
                    )}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {editing ? (
                      <Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
                    ) : (
                      <p className="mt-1 flex items-center gap-2 text-foreground"><Mail className="h-4 w-4 text-muted-foreground" />{user.email}</p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {editing ? (
                      <Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                    ) : (
                      <p className="mt-1 flex items-center gap-2 text-foreground"><Phone className="h-4 w-4 text-muted-foreground" />{user.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label>Joined</Label>
                    <p className="mt-1 text-foreground">{new Date(user.joinedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <Label className="mb-2 block">Address</Label>
                  {editing ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Street" value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} />
                      <Input placeholder="City" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
                      <Input placeholder="State" value={draft.state} onChange={(e) => setDraft({ ...draft, state: e.target.value })} />
                      <Input placeholder="Pincode" value={draft.pincode} onChange={(e) => setDraft({ ...draft, pincode: e.target.value })} />
                    </div>
                  ) : (
                    <p className="flex items-start gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      {user.address}, {user.city}, {user.state} - {user.pincode}
                    </p>
                  )}
                </div>

                {editing && (
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSave}><Save className="h-4 w-4" /> Save Changes</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping Tab */}
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping History</CardTitle>
              </CardHeader>
              <CardContent>
                {user.shippingHistory.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {user.shippingHistory.map((order) => (
                      <div key={order.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{order.id}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            order.status === "Delivered" ? "bg-green-100 text-green-700" :
                            order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                            order.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</p>
                        <p className="text-sm mt-1">{order.items.join(", ")}</p>
                        <div className="flex items-center justify-between mt-2 text-sm">
                          <span className="text-muted-foreground">Tracking: {order.trackingId}</span>
                          <span className="font-semibold">&#8377;{order.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>My Reward Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-4">
                    <Gift className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-5xl font-bold text-primary">{user.rewardPoints.toLocaleString()}</p>
                  <p className="text-muted-foreground mt-1">Total Reward Points</p>
                  <p className="text-sm text-muted-foreground mt-4">Equivalent to <span className="font-semibold text-foreground">&#8377;{(user.rewardPoints * 0.5).toFixed(0)}</span> discount</p>
                </div>
                <div className="border-t pt-6 mt-4 space-y-3">
                  <h4 className="font-semibold text-sm">How to earn points</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> 10 points per &#8377;100 spent</li>
                    <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> 50 points for writing a review</li>
                    <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> 100 points for referral signup</li>
                    <li className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> 2x points during festive sales</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Membership Tab */}
          <TabsContent value="membership">
            <Card>
              <CardHeader>
                <CardTitle>My Membership</CardTitle>
              </CardHeader>
              <CardContent>
                {membership ? (
                  <div className="text-center py-6">
                    <Crown className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl font-bold">{membership.code}</h3>
                    <p className="text-muted-foreground">{membership.duration} &middot; {membership.discount} discount</p>
                    <p className="text-lg font-semibold mt-2">&#8377;{membership.price}</p>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No active membership.</p>
                )}
                <div className="text-center mt-4">
                  <Link to="/membership">
                    <Button variant="outline">View All Plans</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  );
}
