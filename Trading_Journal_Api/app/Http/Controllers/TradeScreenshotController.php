<?php

namespace App\Http\Controllers;

use App\Models\Trade;
use App\Models\TradeScreenshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TradeScreenshotController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'trade_id' => 'required|exists:trades,id',
            'screenshots.*' => 'required|image|max:10240', // 10MB max
            'captions.*' => 'nullable|string'
        ]);

        $trade = Trade::findOrFail($request->trade_id);
        
        // Authorization check
        if ($trade->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $screenshots = [];
        
        if ($request->hasFile('screenshots')) {
            foreach ($request->file('screenshots') as $index => $file) {
                $path = $file->store('trade-screenshots', 'public');
                
                $screenshot = $trade->screenshots()->create([
                    'file_path' => $path,
                    'caption' => $request->captions[$index] ?? null
                ]);
                
                $screenshots[] = $screenshot;
            }
        }

        return response()->json($screenshots, 201);
    }

    public function destroy(TradeScreenshot $screenshot)
    {
        // Authorization check
        if ($screenshot->trade->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the file
        Storage::disk('public')->delete($screenshot->file_path);
        
        // Delete the record
        $screenshot->delete();

        return response()->json(null, 204);
    }
}
