<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\RegionalsController;
use App\Http\Controllers\SpecialtiesController;



Route::post('login', 'AuthController@login');
Route::post('/refresh', [AuthController::class, 'refresh']);


Route::middleware('auth:api')->group(function () {
    //Usuário
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('signup', 'AuthController@signup');
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //Clínicas
    Route::get('clinic', 'ClinicController@index');
    Route::post('clinic', 'ClinicController@store');
    Route::put('clinic/{id}', 'ClinicController@update');
    Route::get('clinic/show/{id}', 'ClinicController@show');
    Route::delete('clinic/{id}', 'ClinicController@destroy');

    //Regionais
    Route::get('regionals', 'RegionalsController@index');

    //ClinicSpecialty
    Route::get('clinic-specialty', 'ClinicSpecialtyController@index');

    //Specialty
    Route::get('specialty', 'SpecialtiesController@index');


});


