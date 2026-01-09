<?php

namespace App\Http\Controllers;

use App\Http\Resources\RelicEffectResource;
use App\RelicEffect;
use Illuminate\Http\Request;
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

    public function randomBatch()
    {
        return RelicEffectResource::collection(RelicEffect::randomBatch(10)->get());
    }

    public function random(Request $request)
    {
        $relicEffects = RelicEffect::randomBatch(10)->get();

        return Inertia::render('vote', [
            'relicEffects' => RelicEffectResource::collection($relicEffects),
        ]);
    }
}
