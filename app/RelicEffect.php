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
     * Get relic effects sorted by the order field, defined hourly by the relic_effects:order command.
     *
     * TODO: We will need to filter out relic effects that the user has already voted on.
     *
     * @param $query
     * @param int $count
     * @return \LaravelIdea\Helper\App\_IH_RelicEffect_QB
     */
    #[Scope]
    protected function randomStack(Builder $query)
    {
        return $query->orderBy('order');
    }
}
