'use client';

import React, { useState } from 'react';
import { Poetry } from '@/types';
import { Feather, Heart, Share2, BookOpen } from 'lucide-react';

interface PoetryWidgetProps {
  poetryList: Poetry[];
}

export const PoetryWidget: React.FC<PoetryWidgetProps> = ({ poetryList }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePoem = poetryList[activeIdx] || poetryList[0];

  return (
    <section className="my-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
      {/* Background Subtle Calligraphy Graphic Accent */}
      <div className="absolute top-0 end-0 opacity-10 pointer-events-none text-9xl font-urdu text-brand-gold select-none pe-8 pt-4">
        شاعری
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-2 text-brand-gold font-extrabold text-2xl">
          <Feather className="w-6 h-6" />
          <h2>اردو ادب و شاعری</h2>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {poetryList.map((poem, idx) => (
            <button
              key={poem.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeIdx === idx
                  ? 'bg-brand-gold text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {poem.poet_name_urdu} ({poem.type === 'ghazal' ? 'غزل' : 'نظم'})
            </button>
          ))}
        </div>
      </div>

      {/* Main Stanza Display */}
      {activePoem && (
        <div className="max-w-2xl mx-auto text-center space-y-6 py-4">
          <div className="inline-block bg-slate-800/80 px-4 py-1 rounded-full border border-slate-700 text-xs text-brand-gold font-semibold mb-2">
            شاعر: {activePoem.poet_name_urdu}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 text-brand-gold">
            « {activePoem.title_urdu} »
          </h3>

          <div className="space-y-5 my-6 text-lg sm:text-xl leading-nastaliq font-urdu text-slate-200">
            {activePoem.stanzas.map((stanza, idx) => (
              <div key={idx} className="space-y-2 hover:text-brand-gold transition-colors py-2 border-b border-slate-800/50 last:border-0">
                <p>{stanza.misra_1}</p>
                <p>{stanza.misra_2}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 text-xs text-slate-400 border-t border-slate-800">
            <button className="flex items-center gap-1.5 bg-slate-800 hover:bg-brand-red px-3 py-1.5 rounded-full transition-colors text-white">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>پسند کریں</span>
            </button>
            <button className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors text-white">
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>شیئر کریں</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
