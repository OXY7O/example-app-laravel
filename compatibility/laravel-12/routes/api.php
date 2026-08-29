<?php

use App\Http\Controllers\ExampleController;
use App\Http\Controllers\HealthController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);
Route::get('/examples/{id}', [ExampleController::class, 'show'])->whereNumber('id');
