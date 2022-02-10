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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\DefaultChecklistController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RequestController;

Route::get('/',[HomeController::class,'index'])->name('home');

Route::get('/get_user/{id}',[RequestController::class,'getUser'])->name('getUser');
Route::post('/my_profile',[UserController::class,'myProfile'])->name('myProfile');
Route::get('/all_users',[UserController::class,'index'])->name('allUsers');
Route::post('/add_users',[UserController::class,'addUser'])->name('addUser');
Route::post('/edit_users',[UserController::class,'editUser'])->name('editUser');
Route::get('/delete_users/{id}',[UserController::class,'deleteUser'])->name('deleteUser');

Route::get('/get_address/{cep}',[RequestController::class,'getAddressByCep']);
Route::get('/see_client/{id}',[ClientsController::class,'seeClient'])->name('seeClient');
Route::get('/all_clients',[ClientsController::class,'index'])->name('allClients');
Route::get('/add_client_view/{checklistRegister?}',[ClientsController::class,'addClientView'])->name('addClientView');
Route::post('/add_client',[ClientsController::class,'addClient'])->name('addClient');
Route::get('/edit_client_view/{id}',[ClientsController::class,'editClientView'])->name('editClientView');
Route::post('/edit_client',[ClientsController::class,'editClient'])->name('editClient');
Route::get('/delete_client/{id}',[ClientsController::class,'deleteClient'])->name('deleteClient');

Route::get('/all_default_checklist',[DefaultChecklistController::class,'index'])->name('defaultChecklist');
Route::get('/add_default_checklist/{checklistRegister?}/{default_checklist_json_id?}',[DefaultChecklistController::class,'addView'])->name('addDefaultChecklist');
Route::post('/add_default_checklist',[DefaultChecklistController::class,'add'])->name('addDefaultChecklist');
Route::get('/get_default_checklist_request/{id}',[RequestController::class,'getAllDefaultChecklist'])->name('getAllDefaultChecklist');
Route::post('/save_default_checklist',[DefaultChecklistController::class,'save'])->name('saveDefaultChecklist');
Route::get('/delete_default_checklist_json/{id}',[DefaultChecklistController::class,'deleteDefaultCheckJson'])->name('deleteDefaultCheckJson');
Route::get('/get_default_checklist/{id}',[DefaultChecklistController::class,'getDefaultChecklistById'])->name('getDefaultChecklistById');
Route::get('/delete_default_checklist/{id}',[DefaultChecklistController::class,'delete'])->name('deleteDefaultChecklist');

Route::get('/all_checklists/{idClient?}',[ChecklistController::class,'index'])->name('allChecklists');
Route::get('/add_checklist/{idClient?}/{checklist_json_id?}',[ChecklistController::class,'add'])->name('addChecklistView');
Route::post('/add_checklist',[ChecklistController::class,'addChecklist'])->name('addChecklist');
Route::get('/get_checklist/{id}/{historic_checklist_idClient?}',[ChecklistController::class,'getChecklistById'])->name('getChecklistById');
Route::post('/upload_file',[RequestController::class,'uploadFile'])->name('uploadFile');
Route::get('/historic_checklist/{idClient}',[ChecklistController::class,'historicChecklist'])->name('historicChecklist');
Route::get('/historic_checklist_compare/{idChecklist1}/{idChecklist2}',[ChecklistController::class,'compareChecklist'])->name('compareChecklist');
Route::post('/add_checklist_json}',[ChecklistController::class,'save'])->name('addChecklistJson');
Route::get('/delete_checklist_json/{id}',[ChecklistController::class,'deleteCheckJson'])->name('deleteCheckJson');
Route::get('/delete_checklist/{id}',[ChecklistController::class,'delete'])->name('deleteChecklist');

Route::get('/logout',[LoginController::class,'logout'])->name('logout');
Auth::routes();
