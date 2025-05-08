<?php

namespace App\Http\Controllers;

use App\Models\Specialties;
use Illuminate\Http\Request;

class SpecialtiesController extends Controller
{
    public function index(){
        return Specialties::all();
    }
}
