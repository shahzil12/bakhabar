'use client';

import React from 'react';
import { MarketRate } from '@/types';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface FinanceStripProps {
  rates: MarketRate[];
}

export const FinanceStrip: React.FC<FinanceStripProps> = ({ rates }) => {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 border-b border-slate-800">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4 overflow-hidden">
        <div className="flex items-center gap-2 text-brand-gold shrink-0 font-medium">
          <DollarSign className="w-3.5 h-3.5" />
          <span>مارکیٹ ریٹس:</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs">
          {rates.map((rate) => (
            <div key={rate.id} className="inline-flex items-center gap-1.5">
              <span className="text-slate-400">{rate.title_urdu}:</span>
              <span className="font-semibold text-white">
                Rs. {rate.buying_price.toLocaleString()}
              </span>
              {rate.change_direction === 'up' ? (
                <span className="inline-flex items-center text-emerald-400 text-[11px] font-sans dir-ltr">
                  <TrendingUp className="w-3 h-3 me-0.5" />
                  +{rate.change_amount} ({rate.change_percentage}%)
                </span>
              ) : (
                <span className="inline-flex items-center text-rose-400 text-[11px] font-sans dir-ltr">
                  <TrendingDown className="w-3 h-3 me-0.5" />
                  -{rate.change_amount} ({rate.change_percentage}%)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
