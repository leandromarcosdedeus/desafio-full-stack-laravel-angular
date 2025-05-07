<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\RegionalsController;



Route::post('login', 'AuthController@login');

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

    //Regionais
    Route::get('regionals', 'RegionalsController@index');

    //ClinicSpecialty
    Route::get('clinic-specialty', 'ClinicSpecialtyController@index');


});


