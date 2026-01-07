<?php

namespace App\Http\Controllers;

use App\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function index()
    {
        return Vote::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'value' => ['required', 'integer'],
            'user_id' => ['required', 'exists:users'],
            'relic_effect_id' => ['required', 'exists:relic_effects'],
        ]);

        return Vote::create($data);
    }

    public function show(Vote $vote)
    {
        return $vote;
    }

    public function update(Request $request, Vote $vote)
    {
        $data = $request->validate([
            'value' => ['required', 'integer'],
            'user_id' => ['required', 'exists:users'],
            'relic_effect_id' => ['required', 'exists:relic_effects'],
        ]);

        $vote->update($data);

        return $vote;
    }

    public function destroy(Vote $vote)
    {
        $vote->delete();

        return response()->json();
    }
}
