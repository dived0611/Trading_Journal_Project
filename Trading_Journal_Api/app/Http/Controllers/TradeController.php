<?php

namespace App\Http\Controllers;

use App\Models\Trade;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TradeController extends Controller
{
    public function index(Request $request)
    {
        $query = Trade::with(['tags', 'screenshots'])
            ->where('user_id', auth()->id());

        // Apply filters
        if ($request->symbol) {
            $query->where('symbol', $request->symbol);
        }
        if ($request->session) {
            $query->where('session', $request->session);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->dateFrom) {
            $query->where('entry_time', '>=', Carbon::parse($request->dateFrom));
        }
        if ($request->dateTo) {
            $query->where('entry_time', '<=', Carbon::parse($request->dateTo));
        }

        $trades = $query->orderBy('entry_time', 'desc')->get();

        // Calculate metrics
        $metrics = [
            [
                'icon' => "📊",
                'iconBg' => "bg-blue-100",
                'iconColor' => "text-blue-600",
                'value' => (string)$trades->count(),
                'label' => "Total Trades",
                'color' => "text-gray-900"
            ],
            [
                'icon' => "🏆",
                'iconBg' => "bg-green-100",
                'iconColor' => "text-green-600",
                'value' => $this->calculateWinRate($trades) . "%",
                'label' => "Win Rate",
                'color' => "text-gray-900"
            ],
            [
                'icon' => "💰",
                'iconBg' => "bg-green-100",
                'iconColor' => "text-green-600",
                'value' => $this->formatPnL($trades->sum('pnl')),
                'label' => "Total P&L",
                'color' => $trades->sum('pnl') >= 0 ? "text-green-600" : "text-red-600"
            ],
            [
                'icon' => "⚡",
                'iconBg' => "bg-orange-100",
                'iconColor' => "text-orange-600",
                'value' => number_format($trades->avg('risk_percentage'), 1) . "%",
                'label' => "Avg Risk",
                'color' => "text-gray-900"
            ]
        ];

        return response()->json([
            'trades' => $trades,
            'metrics' => $metrics
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'symbol' => 'required|string',
            'session' => 'required|string',
            'type' => 'required|in:Buy,Sell',
            'entry' => 'required|numeric',
            'exit' => 'nullable|numeric',
            'pnl' => 'required|numeric',
            'status' => 'required|in:Open,Closed',
            'position_size' => 'required|numeric',
            'risk_percentage' => 'required|numeric',
            'stop_loss' => 'required|numeric',
            'take_profit' => 'required|numeric',
            'entry_notes' => 'nullable|string',
            'management_notes' => 'nullable|string',
            'exit_notes' => 'nullable|string',
            'lessons_learned' => 'nullable|string',
            'entry_time' => 'required|date',
            'exit_time' => 'nullable|date',
            'tags' => 'array',
            'screenshots' => 'array'
        ]);

        $trade = Trade::create(array_merge(
            $validated,
            ['user_id' => auth()->id()]
        ));

        // Handle tags
        if (!empty($validated['tags'])) {
            $tags = collect($validated['tags'])->map(function ($tagName) {
                return Tag::firstOrCreate(['name' => $tagName]);
            });
            $trade->tags()->attach($tags->pluck('id'));
        }

        // Handle screenshots
        if ($request->hasFile('screenshots')) {
            foreach ($request->file('screenshots') as $file) {
                $path = $file->store('trade-screenshots', 'public');
                $trade->screenshots()->create([
                    'file_path' => $path
                ]);
            }
        }

        return response()->json($trade->load(['tags', 'screenshots']), 201);
    }

    public function show(Trade $trade)
    {
        $this->authorize('view', $trade);
        return response()->json($trade->load(['tags', 'screenshots']));
    }

    public function update(Request $request, Trade $trade)
    {
        $this->authorize('update', $trade);
        
        $validated = $request->validate([
            'symbol' => 'sometimes|string',
            'session' => 'sometimes|string',
            'type' => 'sometimes|in:Buy,Sell',
            'entry' => 'sometimes|numeric',
            'exit' => 'nullable|numeric',
            'pnl' => 'sometimes|numeric',
            'status' => 'sometimes|in:Open,Closed',
            'position_size' => 'sometimes|numeric',
            'risk_percentage' => 'sometimes|numeric',
            'stop_loss' => 'sometimes|numeric',
            'take_profit' => 'sometimes|numeric',
            'entry_notes' => 'nullable|string',
            'management_notes' => 'nullable|string',
            'exit_notes' => 'nullable|string',
            'lessons_learned' => 'nullable|string',
            'entry_time' => 'sometimes|date',
            'exit_time' => 'nullable|date',
            'tags' => 'array'
        ]);

        $trade->update($validated);

        // Update tags
        if (isset($validated['tags'])) {
            $tags = collect($validated['tags'])->map(function ($tagName) {
                return Tag::firstOrCreate(['name' => $tagName]);
            });
            $trade->tags()->sync($tags->pluck('id'));
        }

        // Handle new screenshots
        if ($request->hasFile('screenshots')) {
            foreach ($request->file('screenshots') as $file) {
                $path = $file->store('trade-screenshots', 'public');
                $trade->screenshots()->create([
                    'file_path' => $path
                ]);
            }
        }

        return response()->json($trade->load(['tags', 'screenshots']));
    }

    public function destroy(Trade $trade)
    {
        $this->authorize('delete', $trade);
        
        // Delete associated screenshots from storage
        foreach ($trade->screenshots as $screenshot) {
            Storage::disk('public')->delete($screenshot->file_path);
        }
        
        $trade->delete();
        return response()->json(null, 204);
    }

    private function calculateWinRate($trades)
    {
        if ($trades->isEmpty()) {
            return 0;
        }
        
        $winningTrades = $trades->filter(function ($trade) {
            return $trade->pnl > 0;
        })->count();
        
        return round(($winningTrades / $trades->count()) * 100);
    }

    private function formatPnL($pnl)
    {
        return ($pnl >= 0 ? '+' : '') . '$' . number_format($pnl, 2);
    }
}
