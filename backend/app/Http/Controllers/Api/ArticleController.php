<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ArticleController extends Controller
{
    /**
     * Get breaking news ticker articles.
     */
    public function breaking(): JsonResponse
    {
        $articles = Cache::remember('articles_breaking', 120, function () {
            return Article::with('category:id,name_urdu,slug')
                ->breaking()
                ->take(8)
                ->get(['id', 'category_id', 'title_urdu', 'slug_urdu', 'slug_roman', 'published_at']);
        });

        return response()->json([
            'success' => true,
            'data' => $articles,
        ]);
    }

    /**
     * Get homepage hero grid articles (1 main + 4 sub-featured).
     */
    public function hero(): JsonResponse
    {
        $heroArticles = Cache::remember('articles_hero', 300, function () {
            return Article::with('category:id,name_urdu,slug,color')
                ->featured()
                ->take(5)
                ->get();
        });

        return response()->json([
            'success' => true,
            'data' => $heroArticles,
        ]);
    }

    /**
     * Get articles listing by category slug with pagination.
     */
    public function byCategory(Request $request, string $slug): JsonResponse
    {
        $articles = Article::whereHas('category', function ($q) use ($slug) {
            $q->where('slug', $slug);
        })
        ->published()
        ->with('category:id,name_urdu,slug,color')
        ->paginate($request->get('per_page', 12));

        return response()->json([
            'success' => true,
            'data' => $articles,
        ]);
    }

    /**
     * Single article view by slug (Urdu or Roman slug).
     */
    public function show(string $slug): JsonResponse
    {
        $article = Article::with(['category', 'author:id,name'])
            ->where(function ($q) use ($slug) {
                $q->where('slug_urdu', $slug)
                  ->orWhere('slug_roman', $slug);
            })
            ->where('status', 'published')
            ->firstOrFail();

        // Increment view count asynchronously
        $article->incrementViews();

        // Related articles in same category
        $related = Article::where('category_id', $article->category_id)
            ->where('id', '!=', $article->id)
            ->published()
            ->take(4)
            ->get(['id', 'title_urdu', 'slug_urdu', 'slug_roman', 'featured_image', 'published_at']);

        return response()->json([
            'success' => true,
            'data' => $article,
            'related' => $related,
        ]);
    }
}
