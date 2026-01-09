<?php

namespace App\Console\Commands;

use App\RelicEffect;
use Illuminate\Console\Command;

class RelicEffectRandomOrderCommand extends Command
{
    protected $signature = 'relic_effects:order';

    protected $description = 'Sets a random order for all relic effects';

    public function handle(): void
    {
        // Get all relic effects in a random order
        $relicEffects = RelicEffect::inRandomOrder()->get();

        $updateRelics = [];

        foreach ($relicEffects as $idx => $relicEffect) {
            $relicEffect->order = $idx + 1;
            $updateRelics[$idx] = $relicEffect;
            $relicEffect->save();
        }
    }
}
