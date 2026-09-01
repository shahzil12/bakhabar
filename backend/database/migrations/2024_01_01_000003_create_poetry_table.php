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
        Schema::create('poetry', function (Blueprint $table) {
            $table->id();
            $table->string('poet_name_urdu');
            $table->string('poet_name_english')->nullable();
            $table->string('title_urdu');
            $table->string('slug')->unique();
            $table->enum('type', ['ghazal', 'nazm', 'rubai', 'qataa'])->default('ghazal');
            $table->json('stanzas'); // JSON structure: [{"misra_1": "...", "misra_2": "..."}, ...]
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->unsignedBigInteger('views')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();

            $table->index(['type', 'is_featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poetry');
    }
};
