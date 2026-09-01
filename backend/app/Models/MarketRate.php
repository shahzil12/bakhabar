<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarketRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'rate_type',
        'symbol',
        'title_urdu',
        'buying_price',
        'selling_price',
        'change_direction',
        'change_amount',
        'change_percentage',
        'rate_date',
    ];

    protected $casts = [
        'buying_price' => 'float',
        'selling_price' => 'float',
        'change_amount' => 'float',
        'change_percentage' => 'float',
        'rate_date' => 'date',
    ];
}
