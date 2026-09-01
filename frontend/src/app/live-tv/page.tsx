import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronLeft, Tv, Radio, PlayCircle, Volume2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'لائیو ٹی وی و ریڈیو نشریات | باخبر',
  description: 'باخبر پاکستان کی برائے راست 24/7 لائیو ٹی وی نشریات اور اردو خبریں۔',
};

export default function LiveTvPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1 max-w-5xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-gold">صفحہ اول</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-white font-bold">لائیو ٹی وی نشریات</span>
        </div>

        <div className="space-y-6">
          {/* Header title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold animate-pulse">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  باخبر لائیو ٹی وی نشریات 24/7
                </h1>
                <p className="text-xs text-slate-400">
                  پاکستان اور دنیا بھر کی لمحہ بہ لمحہ کی برائے راست HD نشریات
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-red-950/80 border border-red-800/60 px-3 py-1 rounded-full text-xs font-bold text-rose-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>LIVE BROADCAST</span>
            </div>
          </div>

          {/* Video Player Box */}
          <div className="relative bg-slate-950 aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 z-10 pointer-events-none" />

            <div className="text-center space-y-4 z-20 p-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-brand-red/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                <PlayCircle className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-slate-200">
                برائے راست ایچ ڈی ویڈیو سٹریمنگ
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                پاکستان کا سب سے تیز ترین اور معیاری نیوز چینل لائیو دیکھیں۔
              </p>
            </div>

            <div className="absolute bottom-4 start-4 end-4 z-20 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl backdrop-blur-md border border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-brand-gold animate-pulse" />
                <span className="font-semibold text-white">باخبر 24/7 نیوز سٹریمنگ</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4" />
                <span>1080p HD Quality</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
