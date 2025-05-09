<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regionals extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name'
    ];

    public function clinics()
    {
        return $this->hasMany(Clinic::class);
    }
}
