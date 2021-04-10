<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

###################      login and sign up       ##################
Route::group(['prefix' => 'users', 'namespace' => 'users'], function () {
    Route::post('login'           , 'UsersController@userLogin');
    Route::post('signup'          , 'UsersController@add');
    Route::post('forget/password' , 'UsersController@forgetPassword');
    Route::post('reset/password'  , 'UsersController@resetPassword');
});

###################      users      ##################
Route::group(['prefix' => 'users', 'namespace' => 'users', 'middleware'=>['usersRoutes' , 'jwt.auth','verify']], function () {
    Route::get ('get/authuser'   , 'UsersController@getAuthenticatedUser');
});


