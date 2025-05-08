<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClinicSpecialty;

class ClinicSpecialtyController extends Controller
{
    public function index()
    {
        return $specialty = ClinicSpecialty::with('spe')->all();
    }
}
