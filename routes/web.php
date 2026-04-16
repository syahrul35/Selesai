<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectInviteController;
use App\Http\Controllers\ProjectMemberController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Homepage');
});

Route::middleware('auth')->group(function () {
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // core
    Route::resource('dashboard', DashboardController::class);
    Route::resource('projects', ProjectController::class);
    Route::resource('tasks', TaskController::class);
    Route::resource('setting', SettingController::class);

    // import
    Route::post('/tasks/import', [TaskController::class, 'import'])->name('tasks.import');
    Route::post('/tasks/{task}/confirm', [TaskController::class, 'confirm'])->name('tasks.confirm');

    // collaboration
    Route::post('/projects/{project}/invite', [ProjectMemberController::class, 'invite'])->name('projects.invite');
    Route::get('/projects/{project}/members', [ProjectMemberController::class, 'index'])->name('projects.members.index');
    Route::delete('/projects/{project}/members/{user}', [ProjectMemberController::class, 'remove'])->name('projects.members.remove');

    // invitation
    Route::get('/invites', [ProjectInviteController::class, 'index'])->name('invites.index');
    Route::post('/invites/{invite}/accept', [ProjectInviteController::class, 'accept'])->name('invites.accept');
    Route::post('/invites/{invite}/reject', [ProjectInviteController::class, 'reject'])->name('invites.reject');
});

require __DIR__.'/auth.php';
