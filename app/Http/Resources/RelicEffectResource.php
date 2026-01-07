<?php

namespace App\Http\Resources;

use App\RelicEffect;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin RelicEffect */
class RelicEffectResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'details' => $this->details,
        ];
    }
}
