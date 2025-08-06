<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ScannerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $employees = \App\Models\Employee::all();
        $recentDistributions = \App\Models\GallonDistribution::with('employee')
            ->latest('distributed_at')
            ->take(10)
            ->get();

        return Inertia::render('dashboard', [
            'employees' => [
                'total' => $employees->count(),
                'active' => $employees->where('is_active', true)->count(),
                'totalQuota' => $employees->sum('monthly_quota'),
                'remainingQuota' => $employees->sum('current_quota'),
            ],
            'recentDistributions' => $recentDistributions
        ]);
    })->name('dashboard');

    // Scanner routes
    Route::controller(ScannerController::class)->group(function () {
        Route::get('/scanner', 'index')->name('scanner.index');
        Route::post('/scanner', 'store')->name('scanner.store');
    });

    // Employee management routes
    Route::resource('employees', EmployeeController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
