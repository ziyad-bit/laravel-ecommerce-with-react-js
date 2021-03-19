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

###################      login         ####################################################

Route::group(['prefix' => 'admins', 'namespace' => 'Admins'], function () {
    Route::post('login'   , 'AdminsController@adminsLogin');
    
});

###################      admins          ###################################################  a
Route::group(['prefix' => 'admins', 'namespace' => 'Admins' , 'middleware'=>['jwt.auth','adminsRoutes'] ], function () {
    Route::get   ('getauth'    , 'AdminsController@getAuthenticatedAdmin');
    Route::post  ('add'        , 'AdminsController@addAdmins');
    Route::post  ('update/{id}', 'AdminsController@updateAdmin');
    Route::post  ('get'        , 'AdminsController@getAdmin');
    Route::post  ('logout'     , 'AdminsController@adminsLogout');
    Route::get   ('get/count'  , 'AdminsController@getCount');
    Route::delete('delete/{id}', 'AdminsController@deleteAdmin');
});

###################       items         ##############################################
Route::group(['prefix' => 'admins/items', 'namespace' => 'Admins' , 'middleware'=>['jwt.auth','adminsRoutes'] ], function () {
    Route::post  ('add/{id}'         , 'ItemsController@addItem');
    Route::get   ('get'              , 'ItemsController@getItem');
    Route::post  ('edit{id}'         , 'ItemsController@editItem');
    Route::get   ('get/count'        , 'ItemsController@getCount');
    Route::post  ('update/{id}'      , 'ItemsController@updateItem');
    Route::delete('delete/{id}'      , 'ItemsController@deleteItem');
});

###################       users         #############################################

Route::group(['prefix' => 'admins/users', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post  ('add'              , 'MembersController@addUser');
    Route::get   ('get'              , 'MembersController@getUser');
    Route::get   ('get/count'        , 'MembersController@getCount');
    Route::delete('delete{id}'       , 'MembersController@deleteUser');
    Route::get   ('edit/{id}'        , 'MembersController@editUser');
    Route::post  ('update/{id}'      , 'MembersController@updateUser');
    
});

###################       category        #############################################

Route::group(['prefix' => 'admins/category', 'namespace' => 'Admins' , 'middleware'=>['adminsRoutes' , 'jwt.auth'] ], function () {
    Route::post  ('add/'             , 'CategoryController@addCategory');
    Route::get   ('get/'             , 'CategoryController@getCategory');
    Route::delete('delete/{id}'      , 'CategoryController@deleteCategory');
    Route::get   ('edit/{id}'        , 'CategoryController@editCategory');
    Route::post  ('update/{id}'      , 'CategoryController@updateCategory');
    Route::post  ('update/photo/{id}', 'CategoryController@updatePhoto');
});