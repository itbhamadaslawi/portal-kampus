<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SessionController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('home');


// Login
Route::get('/login', function () {
    if (session()->has('keycloak_user')) {
        return redirect()->route('dashboard');
    }

    return Inertia::render('Login');
})->name('login');


/*
|--------------------------------------------------------------------------
| Keycloak SSO
|--------------------------------------------------------------------------
*/

Route::get('/auth/login', [
    AuthController::class,
    'login',
])->name('auth.login');

Route::get('/auth/callback', [
    AuthController::class,
    'callback',
])->name('auth.callback');


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('keycloak.auth')->group(function () {
    Route::get('/dashboard', [
        DashboardController::class,
        'index',
    ])->name('dashboard');

    Route::resource('akun', AccountController::class)
        ->only(['index']);

    Route::get('/sesi', function () {
        return Inertia::render('Sessions/Index', [
            'user' => session('keycloak_user'),
            'sessions' => [],
        ]);
    })->name('sessions.index');


     Route::get('/api/sesi', [
        SessionController::class,
        'index',
    ])->name('sessions.api');


});


/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

Route::post('/logout', [
    AuthController::class,
    'logout',
])->name('logout');