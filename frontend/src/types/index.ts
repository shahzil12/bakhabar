export interface Category {
  id: number;
  name_urdu: string;
  name_english: string;
  slug: string;
  color?: string;
  icon?: string;
  children?: Category[];
}

export interface Article {
  id: number;
  category_id: number;
  category?: Category;
  author_id?: number;
  author_name?: string;
  title_urdu: string;
  slug_urdu: string;
  slug_roman: string;
  summary_urdu?: string;
  content_urdu: string;
  featured_image: string;
  image_caption_urdu?: string;
  view_count: number;
  is_breaking: boolean;
  is_featured: boolean;
  is_trending: boolean;
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  tags?: string[];
}

export interface PoetryStanza {
  misra_1: string;
  misra_2: string;
}

export interface Poetry {
  id: number;
  poet_name_urdu: string;
  poet_name_english?: string;
  title_urdu: string;
  slug: string;
  type: 'ghazal' | 'nazm' | 'rubai' | 'qataa';
  stanzas: PoetryStanza[];
  views: number;
  is_featured: boolean;
}

export interface MarketRate {
  id: number;
  rate_type: 'gold' | 'forex';
  symbol: string;
  title_urdu: string;
  buying_price: number;
  selling_price: number;
  change_direction: 'up' | 'down' | 'stable';
  change_amount: number;
  change_percentage: number;
  rate_date: string;
}

export interface PrayerTime {
  id: number;
  city_name_urdu: string;
  city_name_english: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}
