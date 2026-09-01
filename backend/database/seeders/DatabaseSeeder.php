<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Article;
use App\Models\Poetry;
use App\Models\MarketRate;
use App\Models\PrayerTime;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Categories Seeder
        $categories = [
            ['name_urdu' => 'صفحہ اول', 'name_english' => 'Home', 'slug' => 'home', 'order' => 1, 'color' => '#004b23'],
            ['name_urdu' => 'پاکستان', 'name_english' => 'Pakistan', 'slug' => 'pakistan', 'order' => 2, 'color' => '#004b23'],
            ['name_urdu' => 'بین الاقوامی', 'name_english' => 'World', 'slug' => 'world', 'order' => 3, 'color' => '#1e3a8a'],
            ['name_urdu' => 'تجارت و معیشت', 'name_english' => 'Business', 'slug' => 'business', 'order' => 4, 'color' => '#065f46'],
            ['name_urdu' => 'کھیل و کرکٹ', 'name_english' => 'Sports', 'slug' => 'sports', 'order' => 5, 'color' => '#9a3412'],
            ['name_urdu' => 'شوبز و تفریح', 'name_english' => 'Showbiz', 'slug' => 'showbiz', 'order' => 6, 'color' => '#831843'],
            ['name_urdu' => 'ٹیکنالوجی', 'name_english' => 'Technology', 'slug' => 'technology', 'order' => 7, 'color' => '#4c1d95'],
            ['name_urdu' => 'اسلامی دنیا', 'name_english' => 'Islamic', 'slug' => 'islamic', 'order' => 8, 'color' => '#14532d'],
            ['name_urdu' => 'اردو شاعری', 'name_english' => 'Poetry', 'slug' => 'poetry', 'order' => 9, 'color' => '#701a75'],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        // 2. Initial Articles Seeder
        $pakCat = Category::where('slug', 'pakistan')->first();
        if ($pakCat) {
            Article::updateOrCreate(
                ['slug_urdu' => 'economic-recovery-state-bank-interest-rate-cut'],
                [
                    'category_id' => $pakCat->id,
                    'title_urdu' => 'معاشی بحالی کا نیا سفر: اسٹیٹ بینک کا شرح سود میں بڑی کٹوتی کا اشارہ',
                    'slug_roman' => 'economic-recovery-state-bank-interest-rate-cut',
                    'summary_urdu' => 'اسٹیٹ بینک آف پاکستان نے افراط زر میں ریکارڈ کمی کے بعد شرح سود میں ممکنہ 200 بیسس پوائنٹس کی کٹوتی کا اشارہ دیا ہے۔',
                    'content_urdu' => '<p>اسلام آباد (باخبر رپورٹ): اسٹیٹ بینک آف پاکستان کے ترجمان کے مطابق مسلسل چوتھے ماہ شرحِ تورم (انفلیشن) میں ریکارڈ کمی دیکھی گئی ہے۔ معاشی ماہرین کا ماننا ہے کہ اس سے ملکی صنعتوں کو نیا تحرک ملے گا اور روزگار کے نئے مواقع پیدا ہوں گے۔</p>',
                    'featured_image' => 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
                    'view_count' => 14200,
                    'is_breaking' => true,
                    'is_featured' => true,
                    'status' => 'published',
                    'published_at' => now(),
                    'tags' => ['معیشت', 'اسٹیٹ بینک', 'پاکستان'],
                ]
            );
        }

        // 3. Initial Poetry Seeder
        Poetry::updateOrCreate(
            ['slug' => 'sudai-o-aql-iqbal'],
            [
                'poet_name_urdu' => 'علامہ محمد اقبال',
                'poet_name_english' => 'Allama Iqbal',
                'title_urdu' => 'سودائی و عقل',
                'type' => 'ghazal',
                'views' => 18500,
                'is_featured' => true,
                'stanzas' => [
                    ['misra_1' => 'ترے عشق کی انتہا چاہتا ہوں', 'misra_2' => 'میری سادگی دیکھ کیا چاہتا ہوں'],
                    ['misra_1' => 'بھری بزم میں راز کی بات کہہ دی', 'misra_2' => 'بڑا بے ادب ہوں سزا چاہتا ہوں'],
                    ['misra_1' => 'بھروسہ نہیں ہے ریاضِ جہاں کا', 'misra_2' => 'ترے در کی دائمی پناہ چاہتا ہوں'],
                ],
            ]
        );

        // 4. Initial Market Rates
        $today = now()->toDateString();
        MarketRate::updateOrCreate(
            ['symbol' => '24K_TOLA', 'rate_date' => $today],
            [
                'rate_type' => 'gold',
                'title_urdu' => 'سونا 24 کیراٹ (فی تولہ)',
                'buying_price' => 242500,
                'selling_price' => 243200,
                'change_direction' => 'up',
                'change_amount' => 1500,
                'change_percentage' => 0.62,
            ]
        );

        MarketRate::updateOrCreate(
            ['symbol' => 'USD/PKR', 'rate_date' => $today],
            [
                'rate_type' => 'forex',
                'title_urdu' => 'امریکی ڈالر (USD)',
                'buying_price' => 278.50,
                'selling_price' => 280.20,
                'change_direction' => 'up',
                'change_amount' => 0.35,
                'change_percentage' => 0.12,
            ]
        );

        // 5. Initial Prayer Times
        PrayerTime::updateOrCreate(
            ['city_name_english' => 'Karachi', 'date' => $today],
            [
                'city_name_urdu' => 'کراچی',
                'fajr' => '05:12 AM',
                'sunrise' => '06:28 AM',
                'dhuhr' => '12:35 PM',
                'asr' => '04:02 PM',
                'maghrib' => '06:42 PM',
                'isha' => '07:58 PM',
            ]
        );
    }
}
