<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'app' => 'Bakhabar (باخبر) Urdu News REST API Server',
        'version' => '1.0.0',
        'status' => 'operational',
        'documentation' => 'https://bakhabar.pk/docs',
    ]);
});
