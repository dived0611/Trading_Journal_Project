<?php

namespace App\Http\Controllers;

use App\Models\Trade;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function index()
    {
        $trades = Trade::where('user_id', auth()->id())
            ->orderBy('entry_time', 'desc')
            ->get();

        return response()->json([
            'metrics' => $this->calculateMetrics($trades),
            'profitLoss' => $this->calculateProfitLossSeries($trades),
            'monthlyPerformance' => $this->calculateMonthlyPerformance($trades),
            'strategyPerformance' => $this->calculateStrategyPerformance($trades),
            'riskReward' => $this->calculateRiskReward($trades),
            'drawdown' => $this->calculateDrawdown($trades),
            'sessionPerformance' => $this->calculateSessionPerformance($trades),
            'weeklyHeatmap' => $this->calculateWeeklyHeatmap($trades),
            'symbolPerformance' => $this->calculateSymbolPerformance($trades)
        ]);
    }

    private function calculateMetrics($trades)
    {
        $totalTrades = $trades->count();
        $winningTrades = $trades->where('pnl', '>', 0)->count();
        $totalPnL = $trades->sum('pnl');
        $avgRisk = $trades->avg('risk_percentage');

        return [
            [
                'title' => 'Total P&L',
                'value' => $totalPnL,
                'change' => $this->calculateDailyChange($trades, 'pnl'),
                'trend' => $totalPnL >= 0 ? 'up' : 'down'
            ],
            [
                'title' => 'Win Rate',
                'value' => $totalTrades > 0 ? round(($winningTrades / $totalTrades) * 100) : 0,
                'change' => $this->calculateWinRateChange($trades),
                'trend' => 'neutral'
            ],
            [
                'title' => 'Total Trades',
                'value' => $totalTrades,
                'change' => $this->calculateTodaysTrades($trades),
                'trend' => 'neutral'
            ],
            [
                'title' => 'Risk per Trade',
                'value' => round($avgRisk, 1),
                'change' => 'Avg',
                'trend' => 'neutral'
            ],
            [
                'title' => 'Win Streak',
                'value' => $this->calculateCurrentWinStreak($trades),
                'change' => 'Current',
                'trend' => 'up'
            ],
            [
                'title' => 'Max Drawdown',
                'value' => $this->calculateMaxDrawdown($trades),
                'change' => $this->calculateDrawdownChange($trades),
                'trend' => 'down'
            ]
        ];
    }

    private function calculateProfitLossSeries($trades)
    {
        return $trades->map(function ($trade) {
            return [
                'date' => $trade->entry_time->format('Y-m-d'),
                'value' => $trade->pnl
            ];
        })->values();
    }

    private function calculateMonthlyPerformance($trades)
    {
        return $trades->groupBy(function ($trade) {
                return $trade->entry_time->format('Y-m');
            })
            ->map(function ($monthTrades) {
                return [
                    'month' => $monthTrades->first()->entry_time->format('M Y'),
                    'value' => $monthTrades->sum('pnl')
                ];
            })
            ->values();
    }

    private function calculateStrategyPerformance($trades)
    {
        return $trades->groupBy('strategy')
            ->map(function ($strategyTrades, $strategy) {
                $totalTrades = $strategyTrades->count();
                $winningTrades = $strategyTrades->where('pnl', '>', 0)->count();
                $totalPnL = $strategyTrades->sum('pnl');
                $returns = $strategyTrades->pluck('pnl')->map(function ($pnl) use ($totalPnL) {
                    return $totalPnL != 0 ? $pnl / abs($totalPnL) : 0;
                });

                return [
                    'strategy' => $strategy,
                    'trades' => $totalTrades,
                    'winRate' => $totalTrades > 0 ? round(($winningTrades / $totalTrades) * 100, 1) : 0,
                    'pnl' => $totalPnL,
                    'avgPL' => $totalTrades > 0 ? $totalPnL / $totalTrades : 0,
                    'sharpe' => $this->calculateSharpeRatio($returns)
                ];
            })
            ->values();
    }

    private function calculateRiskReward($trades)
    {
        return $trades->map(function ($trade) {
            return [
                'risk' => $trade->risk_percentage,
                'reward' => $trade->pnl > 0 ? abs($trade->pnl / $trade->position_size * 100) : 0
            ];
        });
    }

    private function calculateDrawdown($trades)
    {
        $equity = 10000; // Starting equity
        $peak = $equity;
        $series = [];

        foreach ($trades as $trade) {
            $equity += $trade->pnl;
            $drawdown = ($peak - $equity) / $peak * 100;
            $peak = max($peak, $equity);

            $series[] = [
                'date' => $trade->entry_time->format('Y-m-d'),
                'value' => -round($drawdown, 2)
            ];
        }

        return $series;
    }

    private function calculateSessionPerformance($trades)
    {
        return $trades->groupBy('session')
            ->map(function ($sessionTrades, $session) {
                return [
                    'session' => $session,
                    'pnl' => $sessionTrades->sum('pnl')
                ];
            })
            ->values();
    }

    private function calculateWeeklyHeatmap($trades)
    {
        $weeks = [];
        $values = [];
        $currentDate = Carbon::now()->startOfWeek();
        
        for ($i = 0; $i < 4; $i++) {
            $weeks[] = $currentDate->copy()->subWeeks($i)->format('M d');
            $weekValues = [];
            
            for ($j = 0; $j < 5; $j++) {
                $date = $currentDate->copy()->subWeeks($i)->addDays($j)->format('Y-m-d');
                $dayTrades = $trades->where('entry_time', 'like', $date . '%');
                $value = $dayTrades->sum('pnl');
                $totalValue = abs($trades->sum('pnl'));
                
                $weekValues[] = $totalValue > 0 ? $value / $totalValue : 0;
            }
            
            $values[] = $weekValues;
        }

        return [
            'weeks' => array_reverse($weeks),
            'days' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            'values' => array_reverse($values)
        ];
    }

    private function calculateSymbolPerformance($trades)
    {
        return $trades->groupBy('symbol')
            ->map(function ($symbolTrades, $symbol) {
                $totalTrades = $symbolTrades->count();
                $winningTrades = $symbolTrades->where('pnl', '>', 0)->count();
                
                return [
                    'symbol' => $symbol,
                    'trades' => $totalTrades,
                    'winRate' => $totalTrades > 0 ? round(($winningTrades / $totalTrades) * 100, 1) : 0,
                    'pnl' => $symbolTrades->sum('pnl'),
                    'maxLoss' => abs($symbolTrades->min('pnl') ?? 0)
                ];
            })
            ->values();
    }

    private function calculateSharpeRatio($returns)
    {
        $mean = $returns->avg();
        $std = sqrt($returns->map(function ($x) use ($mean) {
            return pow($x - $mean, 2);
        })->avg());

        return $std != 0 ? round($mean / $std * sqrt(252), 2) : 0;
    }

    private function calculateDailyChange($trades, $field)
    {
        $today = $trades->where('entry_time', '>=', Carbon::today());
        $yesterday = $trades->where('entry_time', '>=', Carbon::yesterday())
            ->where('entry_time', '<', Carbon::today());

        $todayValue = $today->sum($field);
        $yesterdayValue = $yesterday->sum($field);

        if ($yesterdayValue == 0) {
            return $todayValue > 0 ? 100 : ($todayValue < 0 ? -100 : 0);
        }

        return round((($todayValue - $yesterdayValue) / abs($yesterdayValue)) * 100, 1);
    }

    private function calculateWinRateChange($trades)
    {
        $today = $trades->where('entry_time', '>=', Carbon::today());
        $yesterday = $trades->where('entry_time', '>=', Carbon::yesterday())
            ->where('entry_time', '<', Carbon::today());

        $todayWinRate = $today->count() > 0 
            ? ($today->where('pnl', '>', 0)->count() / $today->count()) * 100
            : 0;
        $yesterdayWinRate = $yesterday->count() > 0
            ? ($yesterday->where('pnl', '>', 0)->count() / $yesterday->count()) * 100
            : 0;

        return round($todayWinRate - $yesterdayWinRate, 1);
    }

    private function calculateTodaysTrades($trades)
    {
        return $trades->where('entry_time', '>=', Carbon::today())->count();
    }

    private function calculateCurrentWinStreak($trades)
    {
        $streak = 0;
        foreach ($trades->sortByDesc('entry_time') as $trade) {
            if ($trade->pnl > 0) {
                $streak++;
            } else {
                break;
            }
        }
        return $streak;
    }

    private function calculateMaxDrawdown($trades)
    {
        $equity = 10000; // Starting equity
        $peak = $equity;
        $maxDrawdown = 0;

        foreach ($trades as $trade) {
            $equity += $trade->pnl;
            $drawdown = ($peak - $equity) / $peak * 100;
            $maxDrawdown = max($maxDrawdown, $drawdown);
            $peak = max($peak, $equity);
        }

        return round($maxDrawdown, 1);
    }

    private function calculateDrawdownChange($trades)
    {
        $todayDrawdown = $this->calculateMaxDrawdown(
            $trades->where('entry_time', '>=', Carbon::today())
        );
        $yesterdayDrawdown = $this->calculateMaxDrawdown(
            $trades->where('entry_time', '>=', Carbon::yesterday())
                ->where('entry_time', '<', Carbon::today())
        );

        return round($todayDrawdown - $yesterdayDrawdown, 1);
    }
}
