
export enum Language {
  TC = 'zh-TW',
  JP = 'ja-JP'
}

export interface CalculatorInputs {
  sellingPrice: number;
  costMarginPercent: number; // e.g., 40 means 40%
  manualShippingFee: number;
  length: number;
  width: number;
  height: number;
  storageDays: number;
  platformFeeRatePercent: number; // default 0.5
}

export interface CostBreakdownItem {
  id: string;
  name: string; // Changed from label to name for Recharts compatibility
  value: number;
  formulaDisplay?: string;
  color: string;
}

export interface CalculationResult {
  costPrice: number;
  salesBonus: number;
  platformFee: number;
  marketingSponsorship: number;
  warehousingFee: number;
  shippingFee: number;
  totalCost: number;
  netProfit: number;
  netProfitMargin: number;
  totalCostRatio: number;
  tsai: number; // The calculated dimension unit
  dailyStorageRate: number; // The applied rate per Tsai
  billableDays: number;
}
