<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialties extends Model
{
    protected $fillable = [
        'name',
    ];

    public function clinics()
    {
        return $this->belongsToMany(Clinic::class);
    }
}
