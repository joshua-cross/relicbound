<?php

namespace App;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelicEffect extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'details',
    ];

    /**
     * Get 10 random RelicEffects
     *
     * TODO: We will need to filter out relic effects that the user has already voted on.
     *
     * @param $query
     * @param int $count
     * @return \LaravelIdea\Helper\App\_IH_RelicEffect_QB
     */
    #[Scope]
    protected function randomBatch(Builder $query, int $count = 10)
    {
        return $query->inRandomOrder()->limit($count);
    }
}
