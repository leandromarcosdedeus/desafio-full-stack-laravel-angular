<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClinicsTableSeeder extends Seeder
{
    public function run()
    {
        $regionalId = DB::table('regionals')->value('id');
        if (!$regionalId) {
            echo "Nenhuma regional encontrada. Rode o RegionalsTableSeeder primeiro.\n";
            return;
        }

        $specialties = DB::table('specialties')->pluck('id')->toArray();
        if (count($specialties) < 5) {
            echo "São necessárias pelo menos 5 especialidades. Rode o SpecialtiesTableSeeder.\n";
            return;
        }

        // Exemplo com 2 clínicas
        $clinics = [
            [
                'corporate_name' => 'Clínica Vida Saudável LTDA',
                'fantasy_name'   => 'Vida Saudável',
                'cnpj'           => '78442251000113',
                'opening_date'   => '2022-02-10',
                'is_active'      => true,
            ],
            [
                'corporate_name' => 'Clínica Bem Estar ME',
                'fantasy_name'   => 'Bem Estar',
                'cnpj'           => '73347830000163',
                'opening_date'   => '2021-07-25',
                'is_active'      => true,
            ],
        ];

        foreach ($clinics as $clinicData) {
            $clinicId = DB::table('clinics')->insertGetId([
                'corporate_name' => $clinicData['corporate_name'],
                'fantasy_name'   => $clinicData['fantasy_name'],
                'cnpj'           => $clinicData['cnpj'],
                'regional_id'    => $regionalId,
                'opening_date'   => $clinicData['opening_date'],
                'is_active'      => $clinicData['is_active'],
                'created_at'     => date('Y-m-d H:i:s'),
                'updated_at'     => date('Y-m-d H:i:s'),
            ]);

            // Pegar 5 especialidades aleatórias
            $selectedSpecialties = collect($specialties)->shuffle()->take(5)->toArray();

            foreach ($selectedSpecialties as $specialtyId) {
                DB::table('clinic_specialties')->insert([
                    'clinic_id'    => $clinicId,
                    'specialty_id' => $specialtyId,
                ]);
            }
        }
    }
}
