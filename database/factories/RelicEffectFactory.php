<?php

namespace Database\Factories;

use App\RelicEffect;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RelicEffectFactory extends Factory
{
    protected $model = RelicEffect::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'details' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
