export interface MembershipPlan {
  srNo: number;
  code: string;
  duration: string;
  discount: string;
  price: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  membershipCode: string | null;
  rewardPoints: number;
  joinedDate: string;
  shippingHistory: ShippingOrder[];
}

export interface ShippingOrder {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  trackingId: string;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  { srNo: 1, code: "MMGJ3", duration: "3 Years", discount: "23.00%", price: 450 },
  { srNo: 2, code: "MMGJ5", duration: "5 Years", discount: "28.00%", price: 600 },
  { srNo: 3, code: "DMMGJ3", duration: "3 Years", discount: "23.00%", price: 300 },
  { srNo: 4, code: "DMMGJ5", duration: "5 Years", discount: "28.00%", price: 400 },
  { srNo: 5, code: "TBC36", duration: "For 6 Books", discount: "48.00%", price: 50 },
  { srNo: 6, code: "TBCClassic", duration: "For Minimum 8 Books", discount: "48.00%", price: 100 },
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: "u1",
    name: "Rahul Mehta",
    email: "rahul.mehta@email.com",
    phone: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/150?img=11",
    address: "42, Shanti Nagar, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    membershipCode: "MMGJ3",
    rewardPoints: 1250,
    joinedDate: "2024-01-15",
    shippingHistory: [
      { id: "ORD-1001", date: "2026-03-20", items: ["The Great Gatsby", "Sapiens"], total: 890, status: "Delivered", trackingId: "TRK9876543" },
      { id: "ORD-1002", date: "2026-03-28", items: ["Atomic Habits"], total: 450, status: "Shipped", trackingId: "TRK9876544" },
    ],
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    avatar: "https://i.pravatar.cc/150?img=5",
    address: "15, Lajpat Nagar",
    city: "Delhi",
    state: "Delhi",
    pincode: "110024",
    membershipCode: "MMGJ5",
    rewardPoints: 3400,
    joinedDate: "2023-06-10",
    shippingHistory: [
      { id: "ORD-2001", date: "2026-02-14", items: ["Dune", "1984", "Brave New World"], total: 1350, status: "Delivered", trackingId: "TRK1234567" },
      { id: "ORD-2002", date: "2026-04-01", items: ["Project Hail Mary"], total: 599, status: "Processing", trackingId: "TRK1234568" },
    ],
  },
  {
    id: "u3",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    avatar: "https://i.pravatar.cc/150?img=12",
    address: "8, CG Road, Navrangpura",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380009",
    membershipCode: "TBC36",
    rewardPoints: 780,
    joinedDate: "2025-02-20",
    shippingHistory: [
      { id: "ORD-3001", date: "2026-03-05", items: ["Think and Grow Rich", "Rich Dad Poor Dad"], total: 680, status: "Delivered", trackingId: "TRK5551234" },
    ],
  },
  {
    id: "u4",
    name: "Sneha Kulkarni",
    email: "sneha.k@email.com",
    phone: "+91 65432 10987",
    avatar: "https://i.pravatar.cc/150?img=9",
    address: "23, FC Road, Deccan",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411004",
    membershipCode: "DMMGJ3",
    rewardPoints: 2100,
    joinedDate: "2024-09-01",
    shippingHistory: [
      { id: "ORD-4001", date: "2026-01-10", items: ["Pride and Prejudice"], total: 320, status: "Delivered", trackingId: "TRK7771234" },
      { id: "ORD-4002", date: "2026-03-15", items: ["The Alchemist", "Ikigai"], total: 750, status: "Delivered", trackingId: "TRK7771235" },
      { id: "ORD-4003", date: "2026-04-02", items: ["Educated"], total: 499, status: "Shipped", trackingId: "TRK7771236" },
    ],
  },
  {
    id: "u5",
    name: "Vikram Singh",
    email: "vikram.s@email.com",
    phone: "+91 54321 09876",
    avatar: "https://i.pravatar.cc/150?img=15",
    address: "7, Bani Park",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302016",
    membershipCode: "TBCClassic",
    rewardPoints: 560,
    joinedDate: "2025-11-05",
    shippingHistory: [
      { id: "ORD-5001", date: "2026-03-25", items: ["Shiva Trilogy Box Set"], total: 999, status: "Processing", trackingId: "TRK3331234" },
    ],
  },
];
