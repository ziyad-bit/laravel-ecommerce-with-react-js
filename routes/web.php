<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\users\UsersController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/change-password/{email}', function () {
    return view('auth.reset_password');
});

Route::get('/verify/{email}', [UsersController::class, 'verify']);


Route::get('/{path}', function () {
    return view('welcome');
})->where('path','.*');



