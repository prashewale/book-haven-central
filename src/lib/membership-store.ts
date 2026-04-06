import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MEMBERSHIP_PLANS, type MembershipPlan } from './mock-users';

interface MembershipStore {
  activePlanCode: string | null;
  totalSavings: number;
  subscribe: (planCode: string) => void;
  getActivePlan: () => MembershipPlan | null;
  getDiscountPercent: () => number;
  addSavings: (amount: number) => void;
}

export const useMembership = create<MembershipStore>()(
  persist(
    (set, get) => ({
      activePlanCode: "MMGJ3", // default user has MMGJ3
      totalSavings: 0,
      subscribe: (planCode) => set({ activePlanCode: planCode }),
      getActivePlan: () => {
        const code = get().activePlanCode;
        return MEMBERSHIP_PLANS.find((p) => p.code === code) ?? null;
      },
      getDiscountPercent: () => {
        const plan = get().getActivePlan();
        if (!plan) return 0;
        return parseFloat(plan.discount) / 100;
      },
      addSavings: (amount) => set((s) => ({ totalSavings: s.totalSavings + amount })),
    }),
    {
      name: 'mehta-membership',
      partialize: (state) => ({ activePlanCode: state.activePlanCode, totalSavings: state.totalSavings }),
    }
  )
);

/** Calculate the membership-discounted price */
export function getMembershipPrice(originalPrice: number, discountPercent: number): number {
  return originalPrice * (1 - discountPercent);
}
