<?php

namespace App\Http\Controllers;

use App\Models\Specialties;
use Illuminate\Http\Request;

class SpecialtiesController extends Controller
{
    public function index(){
        return Specialties::all();
    }

    public function store(Request $request)
    {

        $data = $request->all();

        $specialty = Specialties::create([
            'name' => $data['name'],
        ]);

        return response()->json($specialty, 201);
    }
}
