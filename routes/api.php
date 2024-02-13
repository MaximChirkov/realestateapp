<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [LoginController::class, 'login']);
Route::post('register', [RegisterController::class, 'register']);
Route::post('logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('static_data', [App\Http\Controllers\StaticDataController::class, 'index']);
Route::apiResource('/property', \App\Http\Controllers\PropertyController::class);
Route::get('/user_properties', [\App\Http\Controllers\PropertyController::class, 'userProperties'])->middleware('auth:sanctum');
Route::get('/user_properties', [\App\Http\Controllers\PropertyController::class, 'userProperties']);
Route::get('/latest_properties', [\App\Http\Controllers\HomeController::class, 'getLatestProperties']);
Route::get('/search', [\App\Http\Controllers\SearchPropertyController::class, 'index']);
