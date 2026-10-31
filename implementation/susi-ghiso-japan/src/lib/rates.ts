import ratesData from "@/generated/rates.json";

export type Rate = {
  fetchedAt: string;
  rateDate: string;
  source: string;
  eurPerJpy: number;
  stale: boolean;
};

export const rate = ratesData as Rate;
