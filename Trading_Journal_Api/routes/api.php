<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TradeController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\TradeScreenshotController;

// Sanctum routes are automatically registered

// Authentication Routes (No auth required)
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [RegisterController::class, 'login']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [RegisterController::class, 'logout']);
    // Add other protected routes here
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::post('/logout', [RegisterController::class, 'logout']);
    
    // Trade routes
    Route::get('/trades', [TradeController::class, 'index']);
    Route::post('/trades', [TradeController::class, 'store']);
    Route::get('/trades/{trade}', [TradeController::class, 'show']);
    Route::put('/trades/{trade}', [TradeController::class, 'update']);
    Route::delete('/trades/{trade}', [TradeController::class, 'destroy']);
    Route::post('/trades/bulk-delete', [TradeController::class, 'bulkDelete']);
    Route::post('/trades/bulk-tag', [TradeController::class, 'bulkTag']);
    Route::post('/trades/export', [TradeController::class, 'export']);
    
    // Tags routes
    Route::get('/tags', [TagController::class, 'index']);
    Route::post('/tags', [TagController::class, 'store']);
    Route::delete('/tags/{tag}', [TagController::class, 'destroy']);
    
    // Analytics routes
    Route::get('/analytics', [AnalyticsController::class, 'index']);
    Route::get('/analytics/performance', [AnalyticsController::class, 'performance']);
    Route::get('/analytics/risk-metrics', [AnalyticsController::class, 'riskMetrics']);
    
    // Screenshots routes
    Route::post('/screenshots/upload', [TradeScreenshotController::class, 'store']);
    Route::delete('/screenshots/{screenshot}', [TradeScreenshotController::class, 'destroy']);
});
