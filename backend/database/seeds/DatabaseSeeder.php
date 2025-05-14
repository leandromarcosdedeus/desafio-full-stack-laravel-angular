<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(SpecialtiesTableSeeder::class);
        $this->call(RegionalsTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ClinicsTableSeeder::class);
       /*  $this->call([
            //RegionalsTableSeeder::class,
            SpecialtiesTableSeeder::class,
            //ClinicsTableSeeder::class,
            //UsersTableSeeder::class,
        ]); */
    }
}
