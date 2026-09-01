import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پرائیویسی پالیسی | باخبر اردو پورٹل',
  description: 'باخبر نیوز پورٹل کی پرائیویسی پالیسی اور صارفین کی معلومات کا تحفظ۔',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1 max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green">صفحہ اول</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">پرائیویسی پالیسی</span>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <ShieldCheck className="w-8 h-8 text-brand-green" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">پرائیویسی پالیسی</h1>
              <p className="text-xs text-slate-500">آخری اپ ڈیٹ: اگست 2026</p>
            </div>
          </div>

          <div className="prose max-w-none text-slate-700 space-y-4 text-sm leading-relaxed font-urdu">
            <h2 className="text-lg font-bold text-slate-900">1. معلومات کا حصول</h2>
            <p>
              باخبر نیوز پورٹل اپنے صارفین کی پرائیویسی کا مکمل احترام کرتا ہے۔ جب آپ ہماری ویب سائٹ استعمال کرتے ہیں، تو ہم آپ کی رضامندی سے نیوز لیٹر کی ترسیل کے لیے ای میل ایڈریس یا سروس کے معیار میں بہتری کے لیے کوکیز کا استعمال کر سکتے ہیں۔
            </p>

            <h2 className="text-lg font-bold text-slate-900">2. کوکیز پالیسی</h2>
            <p>
              ویب سائٹ کے بہتر تجربے اور ذاتی نوعیت کی خبریں تجویز کرنے کے لیے کوکیز کا استعمال کیا جاتا ہے۔ آپ اپنے براؤزر سیٹنگز سے کوکیز کو معطل بھی کر سکتے ہیں۔
            </p>

            <h2 className="text-lg font-bold text-slate-900">3. معلومات کا تحفظ</h2>
            <p>
              صارفین کی تمام ذاتی معلومات کو جدید ترین سیکیورٹی معیارات کے تحت محفوظ رکھا جاتا ہے اور کسی تیسرے فریق کو فروخت نہیں کیا جاتا۔
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
