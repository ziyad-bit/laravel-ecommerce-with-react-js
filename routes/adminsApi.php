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

###################     admins    ##############  
Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::get ('authadmin' , 'AdminsController@getAuthenticatedAdmin');
    Route::post('add/admins', 'AdminsController@addAdmins');
    Route::get ('get/admins' , 'AdminsController@getAdmin');
    Route::delete('delete/admins/{id}', 'AdminsController@deleteAdmin');
});

###################       items        ######################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post  ('add/items/{id}'         , 'ItemsController@addItem');
    Route::get   ('get/items'              , 'ItemsController@getItem');
    Route::get   ('edit/items/{id}'        , 'ItemsController@editItem');
    Route::post  ('update/items/{id}'      , 'ItemsController@updateItem');
    Route::delete('delete/items/{id}'      , 'ItemsController@deleteItem');
});

###################       users        ######################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post  ('add/users'              , 'MembersController@addUser');
    Route::get   ('get/users'              , 'MembersController@getUser');
    Route::delete('delete/users/{id}'      , 'MembersController@deleteUser');
    Route::get   ('edit/users/{id}'        , 'MembersController@editUser');
    Route::post  ('update/users/{id}'      , 'MembersController@updateUser');
    
});

###################       category        ######################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post  ('add/category'              , 'CategoryController@addCategory');
    Route::get   ('get/category'              , 'CategoryController@getCategory');
    Route::delete('delete/category/{id}'      , 'CategoryController@deleteCategory');
    Route::get   ('edit/category/{id}'        , 'CategoryController@editCategory');
    Route::post  ('update/category/{id}'      , 'CategoryController@updateCategory');
    Route::post  ('update/photo/{id}'         , 'CategoryController@updatePhoto');
});