<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;

class ClinicController extends Controller
{
    public function index()
    {
        return Clinic::all();
    }
    public function show($id)
    {
        return $clinic = Clinic::with(['regional', 'specialties'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'corporate_name' => 'required|string',
            'trade_name'     => 'required|string',
            'cnpj'           => 'required|string',
            'regional_id'    => 'required|uuid|exists:regionals,id',
            'opening_date'   => 'required|date',
            'is_active'      => 'boolean',
            'specialties'    => 'array',
            'specialties.*'  => 'exists:specialties,id',
        ]);

        $clinic = Clinic::create($data);

        if (isset($data['specialties'])) {
            $clinic->specialties()->sync($data['specialties']);
        }

        return response()->json($clinic->load(['regional', 'specialties']), 201);
    }
}
