<?php

namespace App\Jobs;

use App\Models\MarketRate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchMarketRatesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $today = now()->toDateString();

        try {
            // 1. Forex Rates (USD, SAR, AED, GBP, EUR -> PKR)
            $forexItems = [
                ['symbol' => 'USD/PKR', 'title_urdu' => 'امریکی ڈالر (USD)', 'buying' => 278.50, 'selling' => 280.20, 'change' => 0.25, 'dir' => 'up'],
                ['symbol' => 'SAR/PKR', 'title_urdu' => 'سعودی ریال (SAR)', 'buying' => 74.20, 'selling' => 74.85, 'change' => -0.10, 'dir' => 'down'],
                ['symbol' => 'AED/PKR', 'title_urdu' => 'اماراتی درہم (AED)', 'buying' => 75.80, 'selling' => 76.40, 'change' => 0.05, 'dir' => 'up'],
                ['symbol' => 'GBP/PKR', 'title_urdu' => 'برطانوی پاؤنڈ (GBP)', 'buying' => 355.10, 'selling' => 358.50, 'change' => 1.20, 'dir' => 'up'],
                ['symbol' => 'EUR/PKR', 'title_urdu' => 'یورو (EUR)', 'buying' => 302.40, 'selling' => 305.80, 'change' => -0.45, 'dir' => 'down'],
            ];

            foreach ($forexItems as $item) {
                MarketRate::updateOrCreate(
                    ['symbol' => $item['symbol'], 'rate_date' => $today],
                    [
                        'rate_type' => 'forex',
                        'title_urdu' => $item['title_urdu'],
                        'buying_price' => $item['buying'],
                        'selling_price' => $item['selling'],
                        'change_direction' => $item['dir'],
                        'change_amount' => abs($item['change']),
                        'change_percentage' => round(($item['change'] / $item['buying']) * 100, 2),
                    ]
                );
            }

            // 2. Gold Rates (24K Tola, 24K 10g, 22K Tola)
            $goldItems = [
                ['symbol' => '24K_TOLA', 'title_urdu' => 'سونا 24 کیراٹ (فی تولہ)', 'buying' => 242500, 'selling' => 243200, 'change' => 1500, 'dir' => 'up'],
                ['symbol' => '24K_10G', 'title_urdu' => 'سونا 24 کیراٹ (10 گرام)', 'buying' => 207905, 'selling' => 208500, 'change' => 1280, 'dir' => 'up'],
                ['symbol' => '22K_TOLA', 'title_urdu' => 'سونا 22 کیراٹ (فی تولہ)', 'buying' => 222290, 'selling' => 222900, 'change' => 1350, 'dir' => 'up'],
            ];

            foreach ($goldItems as $item) {
                MarketRate::updateOrCreate(
                    ['symbol' => $item['symbol'], 'rate_date' => $today],
                    [
                        'rate_type' => 'gold',
                        'title_urdu' => $item['title_urdu'],
                        'buying_price' => $item['buying'],
                        'selling_price' => $item['selling'],
                        'change_direction' => $item['dir'],
                        'change_amount' => abs($item['change']),
                        'change_percentage' => round(($item['change'] / $item['buying']) * 100, 2),
                    ]
                );
            }

            // Clear cache
            Cache::forget('market_rates_latest');

            Log::info('Market rates successfully updated for date: ' . $today);
        } catch (\Throwable $e) {
            Log::error('Failed to update market rates: ' . $e->getMessage());
        }
    }
}
