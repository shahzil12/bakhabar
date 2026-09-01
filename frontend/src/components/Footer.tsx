'use client';

import React from 'react';
import Link from 'next/link';
import { mockCategories } from '@/lib/mockData';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-6 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info & Newsletter (Col Span 4) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-brand-greenLight">باخبر</span>
              <span className="text-xs bg-brand-gold text-slate-950 font-bold px-2 py-0.5 rounded">
                نیوز پورٹل
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              باخبر پاکستان کا معروف اور غیر جانبدار اردو نیوز پورٹل ہے۔ ہم لمحہ بہ لمحہ کی تازہ ترین خبریں، معاشی اشاریے، کھیل اور اردو ادب آپ تک پہنچاتے ہیں۔
            </p>

            {/* Newsletter Input */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-brand-gold block">
                روزانہ کی خبریں ای میل پر حاصل کریں:
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="اپنی ای میل درج کریں..."
                  className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-brand-green flex-1"
                />
                <button
                  type="submit"
                  className="bg-brand-green hover:bg-brand-greenLight text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>سبسکرائب</span>
                </button>
              </form>
            </div>
          </div>

          {/* Category Directory (Col Span 5) */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              اہم شعبہ جات
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {mockCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.slug === 'home' ? '/' : `/category/${cat.slug}`}
                  className="hover:text-brand-gold transition-colors py-1 block"
                >
                  {cat.name_urdu}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links & Contact (Col Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              ہم سے رابطہ کریں
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>اسلام آباد، پاکستان</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>editor@bakhabar.pk</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+92 51 111 222 333</span>
              </li>
            </ul>

            <div className="pt-2 flex items-center gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center sm:text-start">
          <p>© {new Date().getFullYear()} باخبر نیوز نیٹ ورک (Bakhabar Network)۔ جملہ حقوق محفوظ ہیں۔</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">پرائیویسی پالیسی</Link>
            <Link href="/terms" className="hover:underline">شرائط و ضوابط</Link>
            <Link href="/sitemap" className="hover:underline">سائٹ میپ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
