'use client';

import React, { useState } from 'react';
import { PrayerTime, MarketRate } from '@/types';
import { Clock, Coins, MapPin, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface WidgetsBarProps {
  prayerTimes: PrayerTime[];
  marketRates: MarketRate[];
}

export const WidgetsBar: React.FC<WidgetsBarProps> = ({ prayerTimes, marketRates }) => {
  const [selectedCityIdx, setSelectedCityIdx] = useState(0);
  const activeCity = prayerTimes[selectedCityIdx] || prayerTimes[0];

  const goldRates = marketRates.filter((r) => r.rate_type === 'gold');
  const forexRates = marketRates.filter((r) => r.rate_type === 'forex');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
      {/* 1. Prayer Times Widget (Col Span 7) */}
      <div className="md:col-span-7 bg-gradient-to-br from-emerald-950 to-brand-greenDark text-white p-5 rounded-2xl shadow-lg border border-emerald-800">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80 mb-4">
          <div className="flex items-center gap-2 text-brand-gold font-bold text-base">
            <Clock className="w-5 h-5" />
            <span>اوقاتِ نماز (پاکستان)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-700 text-xs">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <select
              value={selectedCityIdx}
              onChange={(e) => setSelectedCityIdx(Number(e.target.value))}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {prayerTimes.map((pt, idx) => (
                <option key={pt.id} value={idx} className="bg-slate-900 text-white">
                  {pt.city_name_urdu} ({pt.city_name_english})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Prayer Time Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
            <span className="block text-[11px] text-emerald-200">فجر</span>
            <span className="block text-xs font-bold text-white mt-1 font-sans">{activeCity?.fajr}</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
            <span className="block text-[11px] text-emerald-200">طلوع آفتاب</span>
            <span className="block text-xs font-bold text-white mt-1 font-sans">{activeCity?.sunrise}</span>
          </div>
          <div className="bg-brand-gold/20 p-2.5 rounded-xl backdrop-blur-sm border border-brand-gold/40 hover:bg-brand-gold/30 transition-all">
            <span className="block text-[11px] text-brand-gold font-bold">ظہر</span>
            <span className="block text-xs font-extrabold text-brand-gold mt-1 font-sans">{activeCity?.dhuhr}</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
            <span className="block text-[11px] text-emerald-200">عصر</span>
            <span className="block text-xs font-bold text-white mt-1 font-sans">{activeCity?.asr}</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
            <span className="block text-[11px] text-emerald-200">مغرب</span>
            <span className="block text-xs font-bold text-white mt-1 font-sans">{activeCity?.maghrib}</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
            <span className="block text-[11px] text-emerald-200">عشاء</span>
            <span className="block text-xs font-bold text-white mt-1 font-sans">{activeCity?.isha}</span>
          </div>
        </div>
      </div>

      {/* 2. Gold & Forex Market Rates Box (Col Span 5) */}
      <div className="md:col-span-5 bg-white p-5 rounded-2xl shadow-md border border-slate-200 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <div className="flex items-center gap-2 text-brand-green font-bold text-base">
            <Coins className="w-5 h-5" />
            <span>سونا اور فاریکس ریٹس</span>
          </div>
          <span className="text-[11px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded border border-amber-200">
            آج کے ریٹس
          </span>
        </div>

        <div className="space-y-2">
          {goldRates.slice(0, 2).map((g) => (
            <div key={g.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="font-semibold text-slate-800">{g.title_urdu}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 font-sans">
                  Rs. {g.selling_price.toLocaleString()}
                </span>
                <span className="text-emerald-600 font-medium flex items-center dir-ltr">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +{g.change_amount}
                </span>
              </div>
            </div>
          ))}

          {forexRates.slice(0, 2).map((f) => (
            <div key={f.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <span className="font-semibold text-slate-800">{f.title_urdu}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 font-sans">
                  Rs. {f.buying_price}
                </span>
                {f.change_direction === 'up' ? (
                  <span className="text-emerald-600 font-medium flex items-center dir-ltr">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{f.change_amount}
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium flex items-center dir-ltr">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    -{f.change_amount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
