<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected $fillable = [
        'corporate_name',
        'fantasy_name',
        'cnpj',
        'regional_id',
        'opening_date',
        'is_active',
    ];

    public function regional()
    {
        return $this->belongsTo(Regionals::class);
    }

    public function specialties()
    {
        return $this->belongsToMany(Specialties::class, 'clinic_specialties', 'clinic_id', 'specialty_id');
    }
}
