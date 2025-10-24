<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeScreenshot extends Model
{
    protected $fillable = [
        'trade_id',
        'file_path',
        'caption'
    ];

    public function trade()
    {
        return $this->belongsTo(Trade::class);
    }
}
