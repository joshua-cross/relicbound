<?php

use App\Http\Controllers\RelicEffectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::get('vote', function () {
    return Inertia::render('vote');
})->name('vote');
Route::get('vote', [RelicEffectController::class, 'random'])->name('vote');

require __DIR__.'/settings.php';
