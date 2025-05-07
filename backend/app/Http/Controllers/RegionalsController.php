<?php

namespace App\Http\Controllers;

use App\Models\Regionals;
use Illuminate\Http\Request;

class RegionalsController extends Controller
{
    public function index()
    {
        return $regionals = Regionals::all();
    }
}
