<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('teste', \App\Http\Controllers\Api\registerController::class);

