<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Homepage');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('dashboard', DashboardController::class);
    Route::resource('schedules', ScheduleController::class);
    Route::post('/schedules/import', [ScheduleController::class, 'import'])->name('schedules.import');
    Route::post('/schedules/{schedule}/confirm', [ScheduleController::class, 'confirm'])->name('schedules.confirm');
    Route::resource('setting', SettingController::class);
});

require __DIR__.'/auth.php';
