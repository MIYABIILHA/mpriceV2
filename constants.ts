import { Language } from './types';

export const DEFAULT_INPUTS = {
  sellingPrice: 1000,
  costMarginPercent: 25, // Default set to 25% as requested
  manualShippingFee: 60,
  length: 10,
  width: 10,
  height: 10,
  storageDays: 30,
  platformFeeRatePercent: 0.5,
};

export const COLORS = {
  costPrice: '#3B82F6', // Blue
  salesBonus: '#10B981', // Green
  platformFee: '#F59E0B', // Amber
  marketing: '#8B5CF6', // Purple
  warehousing: '#EF4444', // Red
  shipping: '#6B7280', // Gray
};

export const TRANSLATIONS = {
  [Language.TC]: {
    appTitle: 'MOMO 電商收益試算',
    sections: {
      price: '價格與成本設定',
      logistics: '物流與材積設定',
      fees: '平台與其他費用',
    },
    fields: {
      sellingPrice: '商品售價 (含稅)',
      costMargin: '進價毛利 %',
      shippingFee: '自訂運費',
      dimensions: '商品尺寸 (長 x 寬 x 高 cm)',
      storageDays: '寄倉天數',
      platformFeeRate: '平台服務費率 %',
    },
    results: {
      title: '試算結果',
      netProfit: '淨利潤',
      profitMargin: '淨利率',
      totalCostRatio: '總費用率',
      costStructure: '成本結構分析',
      breakdown: '費用明細',
      costPrice: '進價成本',
      salesBonus: '銷售獎勵金',
      platformFee: '平台服務費',
      marketing: '行銷贊助金',
      warehousing: '寄倉倉租費',
      shipping: '運費',
      totalCost: '總成本',
      tsai: '材積數',
      rate: '倉租費率',
    },
    tooltips: {
      tsaiInfo: '材積計算：(長x寬x高)/27826。未滿0.5算0.5，0.5~1算1，超過1依實際計算。',
      rateInfo: '固定以第6個月費率計算：0.7元/材/天。',
    }
  },
  [Language.JP]: {
    appTitle: 'MOMO 電子商取引利益計算',
    sections: {
      price: '価格とコスト設定',
      logistics: '物流と寸法設定',
      fees: 'プラットフォーム手数料',
    },
    fields: {
      sellingPrice: '販売価格 (税込)',
      costMargin: 'コストマージン %',
      shippingFee: '配送料',
      dimensions: '寸法 (縦 x 横 x 高さ cm)',
      storageDays: '保管日数',
      platformFeeRate: 'サービス手数料率 %',
    },
    results: {
      title: '計算結果',
      netProfit: '純利益',
      profitMargin: '純利益率',
      totalCostRatio: '総コスト比率',
      costStructure: 'コスト構造分析',
      breakdown: '費用詳細',
      costPrice: '進価コスト',
      salesBonus: '販売奨励金',
      platformFee: 'プラットフォーム利用料',
      marketing: 'マーケティング協賛金',
      warehousing: '倉庫保管料',
      shipping: '配送料',
      totalCost: '総コスト',
      tsai: '才数 (Tsai)',
      rate: '保管料率',
    },
    tooltips: {
      tsaiInfo: '才数計算：(縦x横x高さ)/27826。0.5未満は0.5、0.5~1は1、1超は実数。',
      rateInfo: '6ヶ月目の料率で固定：0.7元/才/日。',
    }
  }
};