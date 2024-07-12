export type TPlanName = "free" | "core" | "advanced" | "vip"
export type TPlanResponse = {
  id: string;
  name: TPlanName;
  amount: number;
  duration_in_days: number;
  perMonth:number;
};