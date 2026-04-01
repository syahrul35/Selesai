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
    Route::resource('tasks', ScheduleController::class);
    Route::post('/tasks/import', [ScheduleController::class, 'import'])->name('tasks.import');
    Route::post('/tasks/{schedule}/confirm', [ScheduleController::class, 'confirm'])->name('tasks.confirm');
    Route::resource('setting', SettingController::class);
});

require __DIR__.'/auth.php';
