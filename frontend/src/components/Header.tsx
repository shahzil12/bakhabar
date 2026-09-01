'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FinanceStrip } from './FinanceStrip';
import { BreakingTicker } from './BreakingTicker';
import { UrduKeyboard } from './UrduKeyboard';
import { mockCategories, mockMarketRates, mockBreakingNews } from '@/lib/mockData';
import { Search, Keyboard, Calendar, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (char: string) => {
    setSearchQuery((prev) => prev + char);
  };

  const handleBackspace = () => {
    setSearchQuery((prev) => prev.slice(0, -1));
  };

  // Hijri and Gregorian Dates
  const todayGregorian = new Date().toLocaleDateString('ur-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      {/* 1. Live Market Rates Ticker Bar */}
      <FinanceStrip rates={mockMarketRates} />

      {/* 2. Top Utility & Branding Header */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Logo & Tagline */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-extrabold text-brand-green tracking-wide group-hover:text-brand-greenLight transition-colors">
                باخبر
              </span>
              <span className="text-xs bg-brand-gold text-slate-900 font-bold px-2 py-0.5 rounded shadow-sm">
                نیوز
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              پاکستان اور دنیا کا معتبر اردو پورٹل
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 me-6 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Calendar className="w-4 h-4 text-brand-green" />
            <span>{todayGregorian} | ۱۴ صفر ۱۴۴۸ھ</span>
          </div>
        </div>

        {/* Center: Search Bar with Virtual Urdu Keyboard */}
        <div className="relative flex-1 max-w-md mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="خبریں، مضامین اور شاعری تلاش کریں..."
              className="w-full bg-slate-100 text-slate-900 text-sm rounded-full ps-11 pe-24 py-2.5 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-4 pointer-events-none" />

            <div className="absolute end-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
                className={`p-1.5 rounded-full text-xs flex items-center gap-1 transition-colors ${
                  isKeyboardOpen
                    ? 'bg-brand-green text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
                title="اردو کی بورڈ"
              >
                <Keyboard className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="bg-brand-green hover:bg-brand-greenDark text-white text-xs px-3 py-1.5 rounded-full transition-all font-medium"
              >
                تلاش
              </button>
            </div>
          </form>

          {/* Urdu Phonetic Virtual Keyboard Dropdown Overlay */}
          {isKeyboardOpen && (
            <UrduKeyboard
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              onClose={() => setIsKeyboardOpen(false)}
            />
          )}
        </div>

        {/* Right Side: Mobile Menu Button & Live Radio/TV Stream Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/live-tv"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-red-50 text-brand-red border border-red-200 px-3 py-1.5 rounded-full hover:bg-brand-red hover:text-white transition-all shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
            <span>لائیو ٹی وی</span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-brand-green focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Primary Multi-Tier Category Navigation Menu */}
      <nav className="bg-brand-green text-white border-t border-brand-greenDark shadow-inner">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex items-center justify-between gap-1 overflow-x-auto text-sm font-medium py-1">
            {mockCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={cat.slug === 'home' ? '/' : `/category/${cat.slug}`}
                  className="px-3.5 py-2 rounded-md hover:bg-white/15 transition-all block text-center whitespace-nowrap"
                >
                  {cat.name_urdu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 space-y-2 border-t border-slate-800">
          {mockCategories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.slug === 'home' ? '/' : `/category/${cat.slug}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 px-3 rounded hover:bg-brand-green transition-colors text-base"
            >
              {cat.name_urdu}
            </Link>
          ))}
        </div>
      )}

      {/* 4. Breaking News Live Ticker */}
      <BreakingTicker news={mockBreakingNews} />
    </header>
  );
};
