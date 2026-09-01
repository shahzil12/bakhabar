import React from 'react';
import { Header } from '@/components/Header';
import { HeroGrid } from '@/components/HeroGrid';
import { WidgetsBar } from '@/components/WidgetsBar';
import { CategorySection } from '@/components/CategorySection';
import { PoetryWidget } from '@/components/PoetryWidget';
import { VideoGallery } from '@/components/VideoGallery';
import { Footer } from '@/components/Footer';
import {
  mockArticles,
  mockMarketRates,
  mockPrayerTimes,
  mockPoetry,
} from '@/lib/mockData';

export default function HomePage() {
  // Filter news by categories
  const pakistanNews = mockArticles.filter((a) => a.category_id === 2 || a.category_id === 1);
  const sportsNews = mockArticles.filter((a) => a.category_id === 5);
  const techNews = mockArticles.filter((a) => a.category_id === 7 || a.category_id === 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. Portal Sticky Header */}
      <Header />

      {/* 2. Main Page Content Container */}
      <main className="container mx-auto px-4 flex-1 py-4">
        {/* Hero Grid Breaking & Featured Stories */}
        <HeroGrid articles={mockArticles} />

        {/* Live Widgets Bar: Prayer Times & Market Rates */}
        <WidgetsBar prayerTimes={mockPrayerTimes} marketRates={mockMarketRates} />

        {/* National News Section */}
        <CategorySection
          title="پاکستان - قومی خبریں"
          categorySlug="pakistan"
          articles={pakistanNews}
          accentColor="#004b23"
        />

        {/* Poetry & Literature Highlight Widget */}
        <PoetryWidget poetryList={mockPoetry} />

        {/* Sports / Cricket Section */}
        <CategorySection
          title="کھیل و کرکٹ"
          categorySlug="sports"
          articles={sportsNews}
          accentColor="#9a3412"
        />

        {/* Video News Gallery */}
        <VideoGallery />

        {/* Technology & Science Section */}
        <CategorySection
          title="ٹیکنالوجی و سائنس"
          categorySlug="technology"
          articles={techNews}
          accentColor="#4c1d95"
        />
      </main>

      {/* 3. Global Urdu Footer */}
      <Footer />
    </div>
  );
}
