import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockArticles, mockCategories } from '@/lib/mockData';
import { Clock, Eye, ChevronLeft, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = mockCategories.find((c) => c.slug === params.slug);
  const titleName = category ? category.name_urdu : 'زمرہ';

  return {
    title: `${titleName} | باخبر اردو پورٹل`,
    description: `باخبر پورٹل پر ${titleName} کی تازہ ترین خبریں، رپورٹیں اور کالم پڑھیں۔`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'home') {
    redirect('/');
  }

  const category = mockCategories.find((c) => c.slug === params.slug);
  const categoryArticles = mockArticles.filter(
    (a) => a.category?.slug === params.slug || (category && a.category_id === category.id)
  );

  // If no specific articles for this category in mock, show related articles so page is rich
  const displayArticles = categoryArticles.length > 0 ? categoryArticles : mockArticles;
  const leadArticle = displayArticles[0];
  const remainingArticles = displayArticles.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-6 flex-1 max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green">صفحہ اول</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">
            {category ? category.name_urdu : 'خبریں'}
          </span>
        </div>

        {/* Category Header Banner */}
        <div
          className="rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ backgroundColor: category?.color || '#004b23' }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-5 h-5 opacity-80" />
              <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                {category?.name_english || 'Category'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{category?.name_urdu || 'زمرہ'}</h1>
            <p className="text-sm opacity-90 mt-1 max-w-xl">
              تازہ ترین ملکی و غیر ملکی اہم خبریں، لمحہ بہ لمحہ اپ ڈیٹس اور تجزیے۔
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-semibold border border-white/20">
            کل خبریں: {displayArticles.length}
          </div>
        </div>

        {/* Category Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Stream (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Featured Lead Article in Category */}
            {leadArticle && (
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group">
                <Link href={`/article/${leadArticle.slug_urdu}`} className="block relative h-64 sm:h-80 w-full overflow-hidden">
                  <Image
                    src={leadArticle.featured_image}
                    alt={leadArticle.title_urdu}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 start-4 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    اہم ترین
                  </span>
                </Link>

                <div className="p-6 space-y-3">
                  <Link href={`/article/${leadArticle.slug_urdu}`}>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-brand-green transition-colors leading-snug">
                      {leadArticle.title_urdu}
                    </h2>
                  </Link>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {leadArticle.summary_urdu}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>جدید ترین</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{leadArticle.view_count.toLocaleString()} مناظرے</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* List of remaining articles in category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {remainingArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <Link href={`/article/${art.slug_urdu}`} className="block relative h-44 w-full overflow-hidden">
                    <Image
                      src={art.featured_image}
                      alt={art.title_urdu}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <Link href={`/article/${art.slug_urdu}`}>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors line-clamp-2 leading-snug">
                        {art.title_urdu}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>{art.published_at.split('T')[0]}</span>
                      <span className="flex items-center gap-1 font-medium text-slate-600">
                        <Eye className="w-3 h-3" />
                        <span>{art.view_count.toLocaleString()}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-brand-green pb-2">
                دیگر زمرہ جات
              </h3>
              <div className="space-y-2">
                {mockCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.slug === 'home' ? '/' : `/category/${cat.slug}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                      cat.slug === params.slug
                        ? 'bg-brand-green text-white shadow'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name_urdu}</span>
                    <ChevronLeft className="w-4 h-4 opacity-70" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
