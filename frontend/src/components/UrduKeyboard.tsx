'use client';

import React from 'react';
import { Delete, Space, X } from 'lucide-react';

interface UrduKeyboardProps {
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

const urduKeysRow1 = ['آ', 'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ'];
const urduKeysRow2 = ['د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض'];
const urduKeysRow3 = ['ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن'];
const urduKeysRow4 = ['و', 'ہ', 'ھ', 'ء', 'ی', 'ے', 'ئ', 'ؤ', 'ٹ', 'ڈ', 'ڑ'];

export const UrduKeyboard: React.FC<UrduKeyboardProps> = ({ onKeyPress, onBackspace, onClose }) => {
  return (
    <div className="absolute top-full right-0 mt-2 z-50 w-full max-w-xl bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
        <span className="text-sm font-semibold text-brand-gold">اردو کی بورڈ (Phonetic)</span>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2 dir-rtl">
        <div className="flex justify-center gap-1.5 flex-wrap">
          {urduKeysRow1.map((char, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onKeyPress(char)}
              className="w-9 h-10 bg-slate-800 hover:bg-brand-green text-white text-lg rounded-lg border border-slate-700 transition-all active:scale-95 flex items-center justify-center font-urdu"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 flex-wrap">
          {urduKeysRow2.map((char, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onKeyPress(char)}
              className="w-9 h-10 bg-slate-800 hover:bg-brand-green text-white text-lg rounded-lg border border-slate-700 transition-all active:scale-95 flex items-center justify-center font-urdu"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 flex-wrap">
          {urduKeysRow3.map((char, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onKeyPress(char)}
              className="w-9 h-10 bg-slate-800 hover:bg-brand-green text-white text-lg rounded-lg border border-slate-700 transition-all active:scale-95 flex items-center justify-center font-urdu"
            >
              {char}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 flex-wrap items-center">
          {urduKeysRow4.map((char, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onKeyPress(char)}
              className="w-9 h-10 bg-slate-800 hover:bg-brand-green text-white text-lg rounded-lg border border-slate-700 transition-all active:scale-95 flex items-center justify-center font-urdu"
            >
              {char}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onKeyPress(' ')}
            className="px-4 h-10 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg border border-slate-600 flex items-center gap-1 transition-all"
          >
            <Space className="w-4 h-4" />
            <span>اسپیس</span>
          </button>

          <button
            type="button"
            onClick={onBackspace}
            className="px-3 h-10 bg-brand-red/80 hover:bg-brand-red text-white text-xs rounded-lg flex items-center gap-1 transition-all"
          >
            <Delete className="w-4 h-4" />
            <span>حذف</span>
          </button>
        </div>
      </div>
    </div>
  );
};
