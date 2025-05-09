<?php

namespace App\Http\Controllers;

use App\Models\Clinic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClinicController extends Controller
{
    public function index()
    {
        return Clinic::with(['regional', 'specialties'])->get();
    }
    public function show($id)
    {
        return Clinic::with(['regional', 'specialties'])->where('id', $id)->first();;
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $clinicExist = Clinic::where('CNPJ', $data['cnpj'])->first();

        if ($clinicExist) {
            return response()->json([
                'errors' => [
                    'cnpj' => ['Este CNPJ já está cadastrado.']
                ]
            ], 422);
        }
        

        $clinic = Clinic::create([
            'corporate_name' => $data['corporate_name'],
            'fantasy_name'   => $data['fantasy_name'],
            'cnpj' => $data['cnpj'],
            'regional_id' => $data['regional_id'],
            'opening_date' => $data['opening_date'],
            'is_active' => $data['is_active'],
        ]);

        if($clinic){
            foreach ($data['specialties'] as $specialty) {
                $clinic->specialties()->attach($specialty);

            }
        }

        return response()->json($clinic->load(['regional', 'specialties']), 201);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
    
        $clinic = Clinic::find($id);
    
        if (!$clinic) {
            return response()->json(['message' => 'Clínica não encontrada.'], 404);
        }
    
        $clinic->corporate_name = $data['corporate_name'];
        $clinic->fantasy_name   = $data['fantasy_name'];
        $clinic->cnpj           = $data['cnpj'];
        $clinic->regional_id    = $data['regional_id'];
        $clinic->opening_date   = $data['opening_date'];
        $clinic->is_active      = $data['is_active'];
        $clinic->save();
    
        if (isset($data['specialties']) && is_array($data['specialties'])) {
            $clinic->specialties()->sync($data['specialties']);
        }
    
        return response()->json($clinic->load(['regional', 'specialties']), 200);
    }

    public function destroy($id)
{
    $clinic = Clinic::find($id);

    if (!$clinic) {
        return response()->json(['message' => 'Entidade não encontrada.'], 404);
    }

    $clinic->specialties()->detach();

    $clinic->delete();

    return response()->json(['message' => 'Entidade excluída com sucesso.'], 200);
}

}
