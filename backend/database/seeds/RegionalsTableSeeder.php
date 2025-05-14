<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Regionals;

class RegionalsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $regionals = [
            'Alto tietê',
            'Interior',
            'ES',
            'SP Interior',
            'SP',
            'SP2',
            'MG',
            'Nacional',
            'SP CAV',
            'RJ',
            'SP2',
            'SP1',
            'NE1',
            'NE2',
            'SUL',
            'Norte',
        ];

        foreach ($regionals as $name) {

            do {
                $uuid = $this->generateUuidV4();
                $idExist = DB::table('regionals')->where('id', $uuid)->exists();
            } while ($idExist);

            DB::table('regionals')->insert([
                'id' => $uuid,
                'name' => $name,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]);
        }
    }

    private function generateUuidV4()
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
