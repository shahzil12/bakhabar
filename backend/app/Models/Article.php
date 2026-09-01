<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'author_id',
        'title_urdu',
        'slug_urdu',
        'slug_roman',
        'summary_urdu',
        'content_urdu',
        'featured_image',
        'image_caption_urdu',
        'view_count',
        'is_breaking',
        'is_featured',
        'is_trending',
        'status',
        'published_at',
        'tags',
        'meta_title_urdu',
        'meta_description_urdu',
    ];

    protected $casts = [
        'tags' => 'array',
        'is_breaking' => 'boolean',
        'is_featured' => 'boolean',
        'is_trending' => 'boolean',
        'published_at' => 'datetime',
        'view_count' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                     ->where('published_at', '<=', now())
                     ->orderBy('published_at', 'desc');
    }

    public function scopeBreaking($query)
    {
        return $query->published()->where('is_breaking', true);
    }

    public function scopeFeatured($query)
    {
        return $query->published()->where('is_featured', true);
    }

    public function incrementViews()
    {
        $this->timestamps = false;
        $this->increment('view_count');
        $this->timestamps = true;
    }
}
