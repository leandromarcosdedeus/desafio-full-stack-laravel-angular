<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClinicSpecialtiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clinic_specialties', function (Blueprint $table) {
            $table->unsignedInteger('clinic_id');
            $table->unsignedInteger('specialty_id');
            $table->foreign('clinic_id')->references('id')->on('clinics')->onDelete('cascade');
            $table->foreign('specialty_id')->references('id')->on('specialties')->onDelete('cascade');
            $table->primary(['clinic_id', 'specialty_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clinic_specialties');
    }
}
