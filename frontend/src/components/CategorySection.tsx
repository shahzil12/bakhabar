'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { ChevronLeft, Eye, Clock } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  categorySlug: string;
  articles: Article[];
  accentColor?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  categorySlug,
  articles,
  accentColor = '#004b23',
}) => {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const listArticles = articles.slice(1, 4);

  return (
    <section className="my-8">
      {/* Category Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div className="flex items-center gap-2">
          <span className="w-3 h-6 rounded-sm" style={{ backgroundColor: accentColor }} />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{title}</h2>
        </div>

        <Link
          href={`/category/${categorySlug}`}
          className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-green transition-colors"
        >
          <span>مزید دیکھیں</span>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Big Lead Article (Col Span 6) */}
        <div className="md:col-span-6 bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 group flex flex-col justify-between">
          <Link href={`/article/${leadArticle.slug_urdu}`} className="block relative h-56 w-full overflow-hidden">
            <Image
              src={leadArticle.featured_image}
              alt={leadArticle.title_urdu}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <Link href={`/article/${leadArticle.slug_urdu}`}>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-relaxed py-1">
                  {leadArticle.title_urdu}
                </h3>
              </Link>
              <p className="text-slate-600 text-xs line-clamp-2 mt-1 leading-relaxed py-1">
                {leadArticle.summary_urdu}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>1 گھنٹہ پہلے</span>
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Eye className="w-3 h-3" />
                <span>{leadArticle.view_count.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right 3 Stacked List Items (Col Span 6) */}
        <div className="md:col-span-6 space-y-3">
          {listArticles.map((art) => (
            <div
              key={art.id}
              className="group bg-white p-3 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all flex items-center gap-3"
            >
              <Link href={`/article/${art.slug_urdu}`} className="relative h-20 w-28 shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={art.featured_image}
                  alt={art.title_urdu}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between py-1">
                <Link href={`/article/${art.slug_urdu}`}>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-brand-green transition-colors line-clamp-2 leading-relaxed py-1">
                    {art.title_urdu}
                  </h4>
                </Link>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                  <span>2 گھنٹے پہلے</span>
                  <span>•</span>
                  <span>{art.view_count.toLocaleString()} مناظرے</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
