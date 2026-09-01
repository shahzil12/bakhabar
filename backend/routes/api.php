<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\WidgetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Article endpoints
    Route::get('/articles/breaking', [ArticleController::class, 'breaking']);
    Route::get('/articles/hero', [ArticleController::class, 'hero']);
    Route::get('/articles/category/{slug}', [ArticleController::class, 'byCategory']);
    Route::get('/articles/{slug}', [ArticleController::class, 'show']);

    // Widget endpoints
    Route::get('/widgets/market-rates', [WidgetController::class, 'marketRates']);
    Route::get('/widgets/prayer-times', [WidgetController::class, 'prayerTimes']);
});
