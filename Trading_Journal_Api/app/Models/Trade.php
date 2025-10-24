<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trade extends Model
{
    protected $fillable = [
        'user_id',
        'symbol',
        'session',
        'type',
        'entry',
        'exit',
        'pnl',
        'status',
        'position_size',
        'risk_percentage',
        'stop_loss',
        'take_profit',
        'entry_notes',
        'management_notes',
        'exit_notes',
        'lessons_learned',
        'entry_time',
        'exit_time'
    ];

    protected $casts = [
        'entry_time' => 'datetime',
        'exit_time' => 'datetime',
        'entry' => 'decimal:5',
        'exit' => 'decimal:5',
        'pnl' => 'decimal:2',
        'position_size' => 'decimal:2',
        'risk_percentage' => 'decimal:2',
        'stop_loss' => 'decimal:5',
        'take_profit' => 'decimal:5'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function screenshots()
    {
        return $this->hasMany(TradeScreenshot::class);
    }
}
