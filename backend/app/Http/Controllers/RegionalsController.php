<?php

namespace App\Http\Controllers;

use App\Models\Regionals;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class RegionalsController extends Controller
{
    public function index()
    {
        return $regionals = Regionals::all();
    }

    public function store(Request $request)
{
    
    $data = $request->all();

    do {
        $uuid = $this->generateUuidV4();
        $idExist = Regionals::where('id', $uuid)->exists();
    } while ($idExist);

    $regional = new Regionals();
    $regional->id = $uuid;
    $regional->name = $data['name'];
    $regional->save();

    return response()->json($regional, 201);
}

    function generateUuidV4()
{
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

}

