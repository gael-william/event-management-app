<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'location',
        'starts_at',
        'capacity',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'capacity' => 'integer',
    ];

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    protected function remainingCapacity(): Attribute
    {
        return Attribute::get(fn () => max(0, $this->capacity - $this->registrations()->count()));
    }
}
