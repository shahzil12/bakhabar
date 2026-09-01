<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrayerTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_name_urdu',
        'city_name_english',
        'fajr',
        'sunrise',
        'dhuhr',
        'asr',
        'maghrib',
        'isha',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
