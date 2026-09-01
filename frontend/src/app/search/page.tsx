'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockArticles } from '@/lib/mockData';
import { Search, Clock, Eye, ChevronLeft } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = mockArticles.filter((article) => {
    if (!query) return true;
    const qLower = query.toLowerCase();
    return (
      article.title_urdu.toLowerCase().includes(qLower) ||
      (article.summary_urdu && article.summary_urdu.toLowerCase().includes(qLower)) ||
      article.content_urdu.toLowerCase().includes(qLower) ||
      (article.tags && article.tags.some((t) => t.toLowerCase().includes(qLower)))
    );
  });

  return (
    <main className="container mx-auto px-4 py-6 flex-1 max-w-5xl">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link href="/" className="hover:text-brand-green">صفحہ اول</Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold">تلاش کی نتائج</span>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center font-bold">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              تلاش کا نتیجہ: « {query} »
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              کل {results.length} نتائج ملے۔
            </p>
          </div>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
          <p className="text-slate-600 text-lg">معذرت! آپ کی تلاش کا کوئی نتیجہ نہیں ملا۔</p>
          <p className="text-slate-400 text-xs">برائے مہربانی دیگر الفاظ یا مختلف الفاظ کے ساتھ تلاش کریں۔</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <Link href={`/article/${art.slug_urdu}`} className="block relative h-48 w-full overflow-hidden">
                <Image
                  src={art.featured_image}
                  alt={art.title_urdu}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-brand-green text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow">
                  {art.category?.name_urdu}
                </span>
              </Link>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <Link href={`/article/${art.slug_urdu}`}>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors line-clamp-2 leading-snug">
                    {art.title_urdu}
                  </h3>
                </Link>

                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {art.summary_urdu}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{art.published_at.split('T')[0]}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <Eye className="w-3 h-3" />
                    <span>{art.view_count.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Suspense fallback={<div className="container mx-auto p-12 text-center">لوڈنگ...</div>}>
        <SearchResultsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
