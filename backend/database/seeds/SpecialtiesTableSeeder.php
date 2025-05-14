<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecialtiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $specialties = [
            'Cardiologia',
            'Dermatologia',
            'Endocrinologia',
            'Gastroenterologia',
            'Geriatria',
            'Ginecologia',
            'Hematologia',
            'Infectologia',
            'Nefrologia',
            'Neurologia',
            'Obstetrícia',
            'Oftalmologia',
            'Oncologia',
            'Ortopedia',
            'Otorrinolaringologia',
            'Pediatria',
            'Pneumologia',
            'Psiquiatria',
            'Reumatologia',
            'Urologia',
            'Clínica Geral',
            'Anestesiologia',
            'Radiologia',
            'Patologia',
        ];

        foreach ($specialties as $name) {
            DB::table('specialties')->insert([
                'name' => $name,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
        }
    }
}
