<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/api', function (Request $request) {
    return response()->json([
        'message' => 'Olá mundo',
        'php_version' => phpversion(),
        'laravel_version' => App::VERSION(),
        'mysql_version' => DB::connection()->getPdo()->getAttribute(PDO::ATTR_SERVER_VERSION)
    ]);
});

Route::apiResource('registro', 'api/register_controller' );
