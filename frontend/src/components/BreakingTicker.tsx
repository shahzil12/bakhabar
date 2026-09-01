'use client';

import React from 'react';
import { Flame } from 'lucide-react';

interface BreakingTickerProps {
  news: string[];
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ news }) => {
  return (
    <div className="bg-brand-red text-white py-1.5 px-4 flex items-center shadow-inner relative z-10">
      <div className="flex items-center gap-1.5 shrink-0 bg-brand-redDark px-3 py-1 rounded text-xs font-bold me-3 animate-pulse">
        <Flame className="w-4 h-4 text-yellow-300" />
        <span>اہم خبریں</span>
      </div>

      <div className="ticker-wrap flex-1 overflow-hidden relative">
        <div className="ticker-content flex items-center gap-8 text-sm font-medium">
          {news.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-3 cursor-pointer hover:underline">
              <span>{item}</span>
              <span className="text-yellow-300 opacity-60">❖</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
