import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronLeft, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شرائط و ضوابط | باخبر اردو پورٹل',
  description: 'باخبر نیوز پورٹل کے استعمال کی شرائط و ضوابط۔',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1 max-w-4xl">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green">صفحہ اول</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">شرائط و ضوابط</span>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <FileText className="w-8 h-8 text-brand-green" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">شرائط و ضوابط</h1>
              <p className="text-xs text-slate-500">آخری اپ ڈیٹ: اگست 2026</p>
            </div>
          </div>

          <div className="prose max-w-none text-slate-700 space-y-4 text-sm leading-relaxed font-urdu">
            <h2 className="text-lg font-bold text-slate-900">1. ویب سائٹ کا استعمال</h2>
            <p>
              باخبر پورٹل کا مقصد غیر جانبدار اور صحیح معلومات کی فراہمی ہے۔ اس پورٹل کے مواد کو کاپی کرنے یا بلا اجازت استعمال کرنے کی ممانعت ہے۔
            </p>

            <h2 className="text-lg font-bold text-slate-900">2. حقوق دانش (Copyright)</h2>
            <p>
              تمام خبریں، تصاویر اور اردو تحریریں باخبر نیوز نیٹ ورک کی ملکیت ہیں۔
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
