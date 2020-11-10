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

###################      login        ##################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins'], function () {
    Route::post('login'   , 'AdminsController@adminsLogin');
    
});

###################    getauthadmin    ##############  
Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::get('authadmin', 'AdminsController@getAuthenticatedAdmin');
    
});

###################       items        ######################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post('add/items/{id}'        , 'ItemsController@addItem');
    Route::get('get/items'              , 'ItemsController@getItem');
    Route::get('edit/items/{id}'        , 'ItemsController@editItem');
    Route::post('update/items/{id}'     , 'ItemsController@updateItem');
    Route::delete('delete/items/{id}'   , 'ItemsController@deleteItem');
});

###################       users        ######################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post('add/users', 'MembersController@addUser');
    Route::get('get/users', 'MembersController@getUser');
    Route::delete('delete/users/{id}'   , 'MembersController@deleteUser');
    
});