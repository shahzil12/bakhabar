import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'باخبر - پاکستان اور دنیا بھر کی تازہ ترین خبریں | Bakhabar Urdu News',
  description: 'باخبر پاکستان کا بہترین اور معتبر اردو نیوز اور ملٹی ورٹیکل پورٹل۔ پاکستان، عالمی، کھیل، معیشت، اور اردو شاعری کی تازہ ترین خبریں۔',
  keywords: ['اردو خبریں', 'پاکستان', 'Urdu News', 'Bakhabar', 'کھیل', 'شاعری', 'معیشت'],
  authors: [{ name: 'Bakhabar News Team' }],
  openGraph: {
    title: 'باخبر - اردو نیوز پورٹل',
    description: 'پاکستان اور دنیا بھر کی تازہ ترین خبریں باخبر پر پڑھیں۔',
    url: 'https://bakhabar.pk',
    siteName: 'باخبر (Bakhabar)',
    locale: 'ur_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'باخبر (Bakhabar)',
    url: 'https://bakhabar.pk',
    logo: 'https://bakhabar.pk/logo.png',
    sameAs: [
      'https://facebook.com/bakhabar',
      'https://twitter.com/bakhabar',
      'https://youtube.com/bakhabar',
    ],
  };

  return (
    <html lang="ur" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-urdu selection:bg-brand-green selection:text-white">
        {children}
      </body>
    </html>
  );
}
