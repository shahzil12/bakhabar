<?php

namespace App\Jobs;

use App\Models\PrayerTime;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class FetchPrayerTimesJob implements ShouldQueue
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

        $cities = [
            [
                'city_name_english' => 'Karachi',
                'city_name_urdu' => 'کراچی',
                'fajr' => '05:12 AM',
                'sunrise' => '06:28 AM',
                'dhuhr' => '12:35 PM',
                'asr' => '04:02 PM',
                'maghrib' => '06:42 PM',
                'isha' => '07:58 PM',
            ],
            [
                'city_name_english' => 'Lahore',
                'city_name_urdu' => 'لاہور',
                'fajr' => '04:52 AM',
                'sunrise' => '06:14 AM',
                'dhuhr' => '12:20 PM',
                'asr' => '03:52 PM',
                'maghrib' => '06:26 PM',
                'isha' => '07:48 PM',
            ],
            [
                'city_name_english' => 'Islamabad',
                'city_name_urdu' => 'اسلام آباد',
                'fajr' => '04:50 AM',
                'sunrise' => '06:15 AM',
                'dhuhr' => '12:22 PM',
                'asr' => '03:56 PM',
                'maghrib' => '06:29 PM',
                'isha' => '07:54 PM',
            ],
            [
                'city_name_english' => 'Peshawar',
                'city_name_urdu' => 'پشاور',
                'fajr' => '04:55 AM',
                'sunrise' => '06:20 AM',
                'dhuhr' => '12:26 PM',
                'asr' => '04:00 PM',
                'maghrib' => '06:33 PM',
                'isha' => '07:58 PM',
            ],
            [
                'city_name_english' => 'Quetta',
                'city_name_urdu' => 'کوئٹہ',
                'fajr' => '05:18 AM',
                'sunrise' => '06:38 AM',
                'dhuhr' => '12:44 PM',
                'asr' => '04:16 PM',
                'maghrib' => '06:50 PM',
                'isha' => '08:10 PM',
            ],
            [
                'city_name_english' => 'Multan',
                'city_name_urdu' => 'ملتان',
                'fajr' => '05:04 AM',
                'sunrise' => '06:24 AM',
                'dhuhr' => '12:28 PM',
                'asr' => '03:58 PM',
                'maghrib' => '06:32 PM',
                'isha' => '07:52 PM',
            ],
        ];

        try {
            foreach ($cities as $cityData) {
                PrayerTime::updateOrCreate(
                    [
                        'city_name_english' => $cityData['city_name_english'],
                        'date' => $today,
                    ],
                    [
                        'city_name_urdu' => $cityData['city_name_urdu'],
                        'fajr' => $cityData['fajr'],
                        'sunrise' => $cityData['sunrise'],
                        'dhuhr' => $cityData['dhuhr'],
                        'asr' => $cityData['asr'],
                        'maghrib' => $cityData['maghrib'],
                        'isha' => $cityData['isha'],
                    ]
                );
            }

            Cache::forget('prayer_times_today');
            Log::info('Prayer times updated for: ' . $today);
        } catch (\Throwable $e) {
            Log::error('Prayer times update error: ' . $e->getMessage());
        }
    }
}
