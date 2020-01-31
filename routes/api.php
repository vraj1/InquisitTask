<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('register','UserController@getUser');
Route::get('profile', 'UserController@getUser');
Route::post('connectedUserInfo', 'UserController@getConnectedUser');
Route::get('allUsers', 'UserController@retriveallUsers');
Route::post('profile', 'UserController@connectUser');
Route::post('scheduleCall','UserController@schedulePhoneCall');
Route::post('cancelCall','UserController@cancelCall');