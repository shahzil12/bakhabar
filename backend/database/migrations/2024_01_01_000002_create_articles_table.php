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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('author_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('title_urdu');
            $table->string('slug_urdu', 500)->index();
            $table->string('slug_roman', 255)->index();
            $table->text('summary_urdu')->nullable();
            $table->longText('content_urdu');
            $table->string('featured_image')->nullable();
            $table->string('image_caption_urdu')->nullable();
            $table->unsignedBigInteger('view_count')->default(0);
            $table->boolean('is_breaking')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_trending')->default(false);
            $table->enum('status', ['draft', 'published', 'archived'])->default('published');
            $table->timestamp('published_at')->nullable()->index();
            $table->json('tags')->nullable();
            $table->string('meta_title_urdu')->nullable();
            $table->text('meta_description_urdu')->nullable();
            $table->timestamps();

            $table->index(['status', 'published_at']);
            $table->index(['is_breaking', 'status']);
            $table->index(['is_featured', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
