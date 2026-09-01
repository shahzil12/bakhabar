<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prayer_times', function (Blueprint $table) {
            $table->id();
            $table->string('city_name_urdu');
            $table->string('city_name_english');
            $table->string('fajr');
            $table->string('sunrise');
            $table->string('dhuhr');
            $table->string('asr');
            $table->string('maghrib');
            $table->string('isha');
            $table->date('date')->index();
            $table->timestamps();

            $table->unique(['city_name_english', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prayer_times');
    }
};
