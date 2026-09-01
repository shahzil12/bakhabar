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
        Schema::create('market_rates', function (Blueprint $table) {
            $table->id();
            $table->enum('rate_type', ['gold', 'forex']);
            $table->string('symbol'); // e.g., 'USD/PKR', '24K_TOLA', '22K_10G'
            $table->string('title_urdu'); // e.g., 'امریکی ڈالر', 'سونا 24 کیراٹ فی تولہ'
            $table->decimal('buying_price', 12, 2);
            $table->decimal('selling_price', 12, 2);
            $table->enum('change_direction', ['up', 'down', 'stable'])->default('stable');
            $table->decimal('change_amount', 10, 2)->default(0.00);
            $table->decimal('change_percentage', 5, 2)->default(0.00);
            $table->date('rate_date')->index();
            $table->timestamps();

            $table->unique(['symbol', 'rate_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('market_rates');
    }
};
