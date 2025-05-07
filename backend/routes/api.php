<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('login', 'AuthController@login');

Route::middleware('auth:api')->group(function () {
    Route::get('clinic', 'ClinicController@index');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('signup', 'AuthController@signup');
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});


