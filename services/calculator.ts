
import { CalculatorInputs, CalculationResult } from '../types';

/**
 * Calculates the Tsai unit based on dimensions.
 * Formula: (L * W * H) / 27826
 * Rules: < 0.5 -> 0.5; 0.5 ~ 1.0 -> 1.0; > 1.0 -> Actual (3 decimal places)
 */
const calculateTsai = (l: number, w: number, h: number): number => {
  const raw = (l * w * h) / 27826;
  if (raw < 0.5) return 0.5;
  if (raw <= 1.0) return 1.0;
  return parseFloat(raw.toFixed(3));
};

export const calculateProfit = (inputs: CalculatorInputs): CalculationResult => {
  const {
    sellingPrice,
    costMarginPercent,
    manualShippingFee,
    length,
    width,
    height,
    storageDays,
    platformFeeRatePercent,
  } = inputs;

  // 1. Cost Price (Selling Price * (Cost Margin / 100))
  const costPrice = Math.round(sellingPrice * (costMarginPercent / 100));

  // 2. Sales Bonus (3% of Selling Price)
  const salesBonus = Math.round(sellingPrice * 0.03);

  // 3. Platform Fee (Cost Price * max(InputRate, 0.5%))
  const effectivePlatformRate = Math.max(platformFeeRatePercent, 0.5) / 100;
  const platformFee = Math.round(costPrice * effectivePlatformRate);

  // 4. Marketing Sponsorship
  // 20-30% margin -> 0.3% of Cost Price
  // 31-40% margin -> 0.4% of Cost Price
  // Else -> 0
  let marketingRate = 0;
  if (costMarginPercent >= 20 && costMarginPercent <= 30) {
    marketingRate = 0.003;
  } else if (costMarginPercent >= 31 && costMarginPercent <= 40) {
    marketingRate = 0.004;
  }
  const marketingSponsorship = Math.round(costPrice * marketingRate);

  // 5. Warehousing Fee
  // Fixed logic requested: Use 6th month rate (0.7)
  // Rate calculation: Month 1 (0.2) -> Month 6 = 0.2 + (5 * 0.1) = 0.7
  const tsai = calculateTsai(length, width, height);
  const dailyRate = 0.7; 
  const billableDays = storageDays; // Simplified: no exemption logic
  
  const warehousingFee = Math.round(tsai * dailyRate * billableDays);

  // 6. Total & Net
  const totalCost = costPrice + salesBonus + platformFee + marketingSponsorship + warehousingFee + manualShippingFee;
  const netProfit = sellingPrice - totalCost;
  const netProfitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const totalCostRatio = sellingPrice > 0 ? (totalCost / sellingPrice) * 100 : 0;

  return {
    costPrice,
    salesBonus,
    platformFee,
    marketingSponsorship,
    warehousingFee,
    shippingFee: manualShippingFee,
    totalCost,
    netProfit,
    netProfitMargin,
    totalCostRatio,
    tsai,
    dailyStorageRate: dailyRate,
    billableDays
  };
};
