<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['middleware' => 'api'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('signup', 'AuthController@signup');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


