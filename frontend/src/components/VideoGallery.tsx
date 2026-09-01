'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Video } from 'lucide-react';

export const VideoGallery: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: 'اسلام آباد میں نئی مصنوعی ذہانت ٹیکنالوجی سٹی کا افتتاح، خصوص رپورٹس',
      duration: '04:12',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'پاکستان بمقابلہ بھارت ایشیا کپ میچ: ماہرین کا خصوصی تجزیہ اور تبصرہ',
      duration: '08:45',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'مرکزی بینک کا شرح سود میں کمی کا اعلان، کاروباری طبقے کی خوشی',
      duration: '03:30',
      thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="my-8">
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-brand-red">
        <div className="flex items-center gap-2 text-brand-red font-bold text-xl sm:text-2xl">
          <Video className="w-6 h-6" />
          <h2>ویڈیو نیوز گیلری</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="group bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative cursor-pointer"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={vid.thumbnail}
                alt={vid.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ms-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 end-2 bg-slate-900/90 text-white text-[11px] font-sans px-2 py-0.5 rounded">
                {vid.duration}
              </span>
            </div>

            <div className="p-3.5">
              <h3 className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-2 leading-relaxed">
                {vid.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
