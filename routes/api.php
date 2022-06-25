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

Route::get('/', function (Request $request) {
    return response()->json([
        'message' => 'Olá mundo',
        'php_version' => phpversion(),
        'laravel_version' => App::VERSION(),
        'mysql_version' => DB::connection()->getPdo()->getAttribute(PDO::ATTR_SERVER_VERSION)
    ]);
});
