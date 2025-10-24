<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index()
    {
        $tags = Tag::withCount(['trades' => function ($query) {
            $query->where('user_id', auth()->id());
        }])->get();

        return response()->json($tags);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:tags,name'
        ]);

        $tag = Tag::create([
            'name' => $request->name
        ]);

        return response()->json($tag, 201);
    }

    public function destroy(Tag $tag)
    {
        // Only delete tags that are not used by other users
        if ($tag->trades()->where('user_id', '!=', auth()->id())->exists()) {
            return response()->json(['message' => 'Cannot delete tag as it is used by other users'], 403);
        }

        $tag->delete();
        return response()->json(null, 204);
    }
}
