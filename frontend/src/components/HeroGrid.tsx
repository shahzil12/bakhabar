'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types';
import { Eye, Clock, Share2 } from 'lucide-react';

interface HeroGridProps {
  articles: Article[];
}

export const HeroGrid: React.FC<HeroGridProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <section className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Hero Featured Article (Col Span 7) */}
        <div className="lg:col-span-7 group relative bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
          <Link href={`/article/${mainArticle.slug_urdu}`}>
            <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden">
              <Image
                src={mainArticle.featured_image}
                alt={mainArticle.title_urdu}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  خبرِ خاص
                </span>
                <span className="bg-brand-green text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                  {mainArticle.category?.name_urdu}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold leading-normal py-1 group-hover:text-brand-gold transition-colors">
                {mainArticle.title_urdu}
              </h1>

              <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed font-normal py-1">
                {mainArticle.summary_urdu}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-white/20">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>30 منٹ پہلے</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{mainArticle.view_count.toLocaleString()} مناظرے</span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* 4 Sub-Featured Grid Cards (Col Span 5) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sideArticles.map((art) => (
            <div
              key={art.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <Link href={`/article/${art.slug_urdu}`} className="block overflow-hidden relative h-40">
                <Image
                  src={art.featured_image}
                  alt={art.title_urdu}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-brand-green text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow">
                  {art.category?.name_urdu}
                </span>
              </Link>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <Link href={`/article/${art.slug_urdu}`}>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors line-clamp-2 leading-relaxed py-1">
                    {art.title_urdu}
                  </h3>
                </Link>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 mt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>2 گھنٹے پہلے</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 font-semibold">
                    <Eye className="w-3 h-3" />
                    <span>{art.view_count.toLocaleString()}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
