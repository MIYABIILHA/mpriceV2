
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { CalculationResult, Language, CostBreakdownItem } from '../types';
import { COLORS, TRANSLATIONS } from '../constants';

interface SummaryCardProps {
  result: CalculationResult;
  inputs: { sellingPrice: number };
  language: Language;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ result, inputs, language }) => {
  const t = TRANSLATIONS[language];

  // Map data to include 'name' property for Recharts Legend to display correctly
  const data: CostBreakdownItem[] = [
    { id: 'costPrice', name: t.results.costPrice, value: result.costPrice, color: COLORS.costPrice },
    { id: 'salesBonus', name: t.results.salesBonus, value: result.salesBonus, color: COLORS.salesBonus, formulaDisplay: `${inputs.sellingPrice} x 3%` },
    { id: 'platformFee', name: t.results.platformFee, value: result.platformFee, color: COLORS.platformFee },
    { id: 'marketing', name: t.results.marketing, value: result.marketingSponsorship, color: COLORS.marketing },
    { id: 'warehousing', name: t.results.warehousing, value: result.warehousingFee, color: COLORS.warehousing, formulaDisplay: `${result.tsai} Tsai x $${result.dailyStorageRate} x ${result.billableDays} Days` },
    { id: 'shipping', name: t.results.shipping, value: result.shippingFee, color: COLORS.shipping },
  ].filter(item => item.value > 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(val);
  };

  const isProfitPositive = result.netProfit >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-6">
      <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {t.results.title}
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm text-center">
            <p className="text-xs text-gray-300 mb-1">{t.results.netProfit}</p>
            <p className={`text-lg font-bold ${isProfitPositive ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(result.netProfit)}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm text-center">
            <p className="text-xs text-gray-300 mb-1">{t.results.profitMargin}</p>
            <p className={`text-lg font-bold ${isProfitPositive ? 'text-green-400' : 'text-red-400'}`}>
              {result.netProfitMargin.toFixed(1)}%
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm text-center">
            <p className="text-xs text-gray-300 mb-1">{t.results.totalCostRatio}</p>
            <p className="text-lg font-bold text-blue-300">
              {result.totalCostRatio.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {t.results.costStructure}
        </h3>
        
        <div className="h-64 w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="name" // Explicitly use 'name' key for Legend labels
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col border-b border-gray-100 last:border-0 pb-2 last:pb-0">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{formatCurrency(item.value)}</span>
              </div>
              {item.formulaDisplay && (
                <div className="ml-5 text-xs text-gray-400 mt-0.5">
                  {item.formulaDisplay}
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-4 border-t border-gray-200 mt-4">
             <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-gray-900">{t.results.totalCost}</span>
                <span className="text-gray-900">{formatCurrency(result.totalCost)}</span>
             </div>
             <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                <span>{t.results.tsai}</span>
                <span>{result.tsai} Tsai</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
