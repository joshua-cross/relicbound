<?php

// TODO: Should be authed to access.
Route::get('relic-effects/random-batch', [App\Http\Controllers\RelicEffectController::class, 'randomBatch'])->name('relic-effects.batch');
