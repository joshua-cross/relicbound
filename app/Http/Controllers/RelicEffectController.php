<?php

namespace App\Http\Controllers;

use App\RelicEffect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class RelicEffectController extends Controller
{
    public function index()
    {
        return RelicEffect::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'details' => ['required'],
        ]);

        return RelicEffect::create($data);
    }

    public function show(RelicEffect $relicEffect)
    {
        return $relicEffect;
    }

    public function update(Request $request, RelicEffect $relicEffect)
    {
        $data = $request->validate([
            'name' => ['required'],
            'details' => ['required'],
        ]);

        $relicEffect->update($data);

        return $relicEffect;
    }

    public function destroy(RelicEffect $relicEffect)
    {
        $relicEffect->delete();

        return response()->json();
    }

    public function stack(Request $request)
    {
        $request->validate([
            'cursor' => ['nullable', 'string'],
        ]);

        return RelicEffect::randomStack()->cursorPaginate(10);
    }

    public function random(Request $request)
    {
        $seed = Session::remember('seed', fn() => rand(0, PHP_INT_MAX));

        $relicEffects = RelicEffect::randomStack()->cursorPaginate(10);

        return Inertia::render('vote', [
            'data' => $relicEffects,
        ]);
    }
}
