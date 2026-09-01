import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockCategories, mockArticles } from '@/lib/mockData';
import { ChevronLeft, Map, Folder, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سائٹ میپ | باخبر اردو پورٹل',
  description: 'باخبر نیوز پورٹل کا مکمل سائٹ میپ اور زمرہ جات کی فہرست۔',
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green">صفحہ اول</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">سائٹ میپ</span>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <Map className="w-8 h-8 text-brand-green" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">سائٹ میپ (Sitemap)</h1>
              <p className="text-xs text-slate-500">تمام صفحات اور زمرہ جات کی ڈائریکٹری</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Categories Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-green font-bold text-base border-b border-slate-200 pb-2">
                <Folder className="w-5 h-5" />
                <h2>اہم زمرہ جات</h2>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-brand-green font-semibold">صفحہ اول (Home)</Link>
                </li>
                {mockCategories.filter(c => c.slug !== 'home').map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="hover:text-brand-green">
                      {cat.name_urdu} ({cat.name_english})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Articles Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-green font-bold text-base border-b border-slate-200 pb-2">
                <FileText className="w-5 h-5" />
                <h2>تازہ ترین خبریں و مضامین</h2>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {mockArticles.map((art) => (
                  <li key={art.id}>
                    <Link href={`/article/${art.slug_urdu}`} className="hover:text-brand-green block truncate">
                      • {art.title_urdu}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
