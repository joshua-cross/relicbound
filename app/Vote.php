<?php

namespace App;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = [
        'value',
        'user_id',
        'relic_effect_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function relicEffect()
    {
        return $this->belongsTo(RelicEffect::class);
    }
}
