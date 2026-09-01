<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MarketRate;
use App\Models\PrayerTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class WidgetController extends Controller
{
    /**
     * Get latest market rates (Gold & Forex).
     */
    public function marketRates(): JsonResponse
    {
        $rates = Cache::remember('market_rates_latest', 600, function () {
            return MarketRate::all();
        });

        return response()->json([
            'success' => true,
            'data' => [
                'forex' => $rates->where('rate_type', 'forex')->values(),
                'gold' => $rates->where('rate_type', 'gold')->values(),
            ],
        ]);
    }

    /**
     * Get prayer times for major Pakistani cities.
     */
    public function prayerTimes(): JsonResponse
    {
        $prayers = Cache::remember('prayer_times_today', 1800, function () {
            return PrayerTime::all();
        });

        return response()->json([
            'success' => true,
            'data' => $prayers,
        ]);
    }
}
