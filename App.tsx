
import React, { useState } from 'react';
import { CalculatorInputs, Language } from './types';
import { DEFAULT_INPUTS, TRANSLATIONS } from './constants';
import { calculateProfit } from './services/calculator';
import { InputGroup } from './components/InputGroup';
import { NumberInput } from './components/NumberInput';
import { SummaryCard } from './components/SummaryCard';
import { Calculator, Globe, Package, TrendingUp, Truck } from 'lucide-react';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [language, setLanguage] = useState<Language>(Language.TC);
  
  const result = calculateProfit(inputs);
  const t = TRANSLATIONS[language];

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.TC ? Language.JP : Language.TC);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              {t.appTitle}
            </h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
          >
            <Globe className="w-4 h-4" />
            {language === Language.TC ? '日本語' : '繁體中文'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Price Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-900">{t.sections.price}</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup label={t.fields.sellingPrice}>
                  <NumberInput
                    value={inputs.sellingPrice}
                    onChange={(e) => handleInputChange('sellingPrice', parseFloat(e.target.value) || 0)}
                    suffix="$"
                  />
                </InputGroup>
                <InputGroup label={t.fields.costMargin}>
                  <NumberInput
                    value={inputs.costMarginPercent}
                    onChange={(e) => handleInputChange('costMarginPercent', parseFloat(e.target.value) || 0)}
                    suffix="%"
                  />
                </InputGroup>
              </div>
            </div>

            {/* Logistics Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Truck className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-900">{t.sections.logistics}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <InputGroup label={t.fields.shippingFee}>
                  <NumberInput
                    value={inputs.manualShippingFee}
                    onChange={(e) => handleInputChange('manualShippingFee', parseFloat(e.target.value) || 0)}
                    suffix="$"
                  />
                </InputGroup>
                
                <div className="sm:col-span-2">
                   <InputGroup label={t.fields.dimensions} subLabel={t.tooltips.tsaiInfo}>
                      <div className="grid grid-cols-3 gap-2">
                        <NumberInput
                          placeholder="L"
                          value={inputs.length}
                          onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                          suffix="cm"
                        />
                         <NumberInput
                          placeholder="W"
                          value={inputs.width}
                          onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                          suffix="cm"
                        />
                         <NumberInput
                          placeholder="H"
                          value={inputs.height}
                          onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                          suffix="cm"
                        />
                      </div>
                  </InputGroup>
                </div>

                <div className="sm:col-span-2">
                  <InputGroup label={t.fields.storageDays} subLabel={t.tooltips.rateInfo}>
                    <NumberInput
                      value={inputs.storageDays}
                      onChange={(e) => handleInputChange('storageDays', parseFloat(e.target.value) || 0)}
                      suffix="Days"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>

            {/* Fees Section */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Package className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-900">{t.sections.fees}</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup label={t.fields.platformFeeRate}>
                  <NumberInput
                    value={inputs.platformFeeRatePercent}
                    onChange={(e) => handleInputChange('platformFeeRatePercent', parseFloat(e.target.value) || 0)}
                    suffix="%"
                    step={0.1}
                  />
                </InputGroup>
              </div>
            </div>

          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-5">
            <SummaryCard result={result} inputs={inputs} language={language} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
