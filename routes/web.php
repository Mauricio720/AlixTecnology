<?php

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

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

Route::get('/',[HomeController::class,'index'])->name('home');

Route::post('/my_profile',[UserController::class,'myProfile'])->name('myProfile');
Route::get('/all_users',[UserController::class,'index'])->name('allUsers');
Route::post('/add_users',[UserController::class,'addUser'])->name('addUser');
Route::post('/edit_users',[UserController::class,'editUser'])->name('editUser');
Route::get('/delete_users/{id}',[UserController::class,'deleteUser'])->name('deleteUser');

Route::get('/logout',[LoginController::class,'logout'])->name('logout');
Auth::routes();
