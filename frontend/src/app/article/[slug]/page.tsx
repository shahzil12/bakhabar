import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockArticles } from '@/lib/mockData';
import { Clock, Eye, Share2, Facebook, Twitter, MessageSquare, ChevronLeft, Bookmark } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const article =
    mockArticles.find(
      (a) =>
        a.slug_urdu === params.slug ||
        a.slug_urdu === decodedSlug ||
        a.slug_roman === params.slug ||
        a.slug_roman === decodedSlug ||
        String(a.id) === params.slug
    ) || mockArticles[0];

  return {
    title: `${article.title_urdu} | باخبر`,
    description: article.summary_urdu,
    openGraph: {
      title: article.title_urdu,
      description: article.summary_urdu,
      images: [{ url: article.featured_image }],
      type: 'article',
      locale: 'ur_PK',
    },
  };
}

export default function SingleArticlePage({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const article =
    mockArticles.find(
      (a) =>
        a.slug_urdu === params.slug ||
        a.slug_urdu === decodedSlug ||
        a.slug_roman === params.slug ||
        a.slug_roman === decodedSlug ||
        String(a.id) === params.slug
    ) || mockArticles[0];
  const relatedArticles = mockArticles.filter((a) => a.id !== article.id).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title_urdu,
    image: [article.featured_image],
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: {
      '@type': 'Person',
      name: article.author_name || 'Bakhabar News Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'باخبر',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bakhabar.pk/logo.png',
      },
    },
    description: article.summary_urdu,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="container mx-auto px-4 py-6 flex-1 max-w-5xl">
        {/* Dynamic Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium">
          <Link href="/" className="hover:text-brand-green">صفحہ اول</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href={`/category/${article.category?.slug}`} className="hover:text-brand-green">
            {article.category?.name_urdu}
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold truncate max-w-xs">{article.title_urdu}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content (Col Span 8) */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 space-y-6">
            {/* Category Badge & Meta */}
            <div className="flex items-center justify-between">
              <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">
                {article.category?.name_urdu}
              </span>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>30 منٹ پہلے</span>
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.view_count.toLocaleString()} مناظرے</span>
                </span>
              </div>
            </div>

            {/* Article Urdu Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-normal py-2">
              {article.title_urdu}
            </h1>

            {/* Author Credit */}
            <div className="flex items-center justify-between py-3 border-y border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-green text-white font-bold flex items-center justify-center text-sm">
                  {article.author_name?.[0] || 'ب'}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{article.author_name}</span>
                  <span className="text-slate-400">باخبر خصوصی نمائندہ</span>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-1.5">
                <button className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src={article.featured_image}
                alt={article.title_urdu}
                fill
                priority
                className="object-cover"
              />
            </div>
            {article.image_caption_urdu && (
              <p className="text-center text-xs text-slate-500 italic">
                {article.image_caption_urdu}
              </p>
            )}

            {/* Urdu Rich-Text Body */}
            <div
              className="prose max-w-none text-slate-800 text-lg leading-nastaliq space-y-4 pt-2 font-urdu"
              dangerouslySetInnerHTML={{ __html: article.content_urdu }}
            />

            {/* Designated Responsive Ad Placement Box */}
            <div className="bg-slate-100 p-4 rounded-xl border border-dashed border-slate-300 text-center my-6">
              <span className="text-xs text-slate-400 block font-sans">ADVERTISEMENT</span>
              <div className="h-24 flex items-center justify-center text-sm font-semibold text-slate-500">
                [ Responsive Ad Placement Header 728x90 / 300x250 ]
              </div>
            </div>

            {/* Article Tags */}
            {article.tags && (
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 me-2">ٹیگز:</span>
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full border border-slate-200">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar Recommendations (Col Span 4) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-brand-green pb-2">
                متعلقہ خبریں
              </h3>

              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/article/${rel.slug_urdu}`}
                    className="group block space-y-2 pb-3 border-b border-slate-100 last:border-0"
                  >
                    <div className="relative h-32 w-full rounded-xl overflow-hidden">
                      <Image
                        src={rel.featured_image}
                        alt={rel.title_urdu}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-snug">
                      {rel.title_urdu}
                    </h4>
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
