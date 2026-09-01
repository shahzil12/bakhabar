<?php

use Illuminate\Support\Facades\Schedule;

// Schedule hourly Gold & Forex market rates fetch
Schedule::command('market:fetch-rates')->hourly();

// Schedule daily city prayer times sync at midnight
Schedule::command('prayer:fetch-times')->dailyAt('00:05');
