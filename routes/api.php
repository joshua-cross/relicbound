<?php

// TODO: Should be authed to access.
Route::get('relic-effects/stack', [App\Http\Controllers\RelicEffectController::class, 'stack'])->name('relic-effects.batch');
