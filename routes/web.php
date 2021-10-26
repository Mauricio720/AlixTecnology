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
use App\Http\Controllers\ClientsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RequestController;


Route::get('/',[HomeController::class,'index'])->name('home');

Route::get('/get_user/{id}',[RequestController::class,'getUser'])->name('getUser');
Route::post('/my_profile',[UserController::class,'myProfile'])->name('myProfile');
Route::get('/all_users',[UserController::class,'index'])->name('allUsers');
Route::post('/add_users',[UserController::class,'addUser'])->name('addUser');
Route::post('/edit_users',[UserController::class,'editUser'])->name('editUser');
Route::get('/delete_users/{id}',[UserController::class,'deleteUser'])->name('deleteUser');

Route::get('/get_address/{cep}',[RequestController::class,'getAddressByCep']);
Route::get('all_clients',[ClientsController::class,'index'])->name('allClients');
Route::get('add_client_view',[ClientsController::class,'addClientView'])->name('addClientView');
Route::post('add_client',[ClientsController::class,'addClient'])->name('addClient');
Route::get('edit_client_view/{id}',[ClientsController::class,'editClientView'])->name('editClientView');
Route::post('edit_client',[ClientsController::class,'editClient'])->name('editClient');
Route::get('delete_client/{id}',[ClientsController::class,'deleteClient'])->name('deleteClient');

Route::get('/logout',[LoginController::class,'logout'])->name('logout');
Auth::routes();
