<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Poetry extends Model
{
    use HasFactory;

    protected $table = 'poetry';

    protected $fillable = [
        'poet_name_urdu',
        'poet_name_english',
        'title_urdu',
        'slug',
        'type',
        'stanzas',
        'category_id',
        'views',
        'is_featured',
    ];

    protected $casts = [
        'stanzas' => 'array',
        'is_featured' => 'boolean',
        'views' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
