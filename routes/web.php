<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::post('/auth/backchannel-logout', [
    AuthController::class,
    'backchannelLogout',
])->name('auth.backchannel-logout');

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

    Route::delete('/api/sesi/{sessionId}', [
        SessionController::class,
        'destroy',
    ])->name('sessions.destroy');

    Route::put('/account/profile', [
        AccountController::class,
        'update',
    ])->name('account.profile.update');

    // admin
    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {
            Route::get('/users', [
                UserController::class,
                'index',
            ])->name('users.index');

            Route::get('/users/data', [
                UserController::class,
                'data',
            ])->name('users.data');

            Route::get('/users/create', [
                UserController::class,
                'create',
            ])->name('users.create');

            Route::post('/users', [
                UserController::class,
                'store',
            ])->name('users.store');

            Route::get('/users/{userId}', [
                UserController::class,
                'show',
            ])->name('users.show');

            Route::get('/users/{userId}/edit', [
                UserController::class,
                'edit',
            ])->name('users.edit');

            Route::put('/users/{userId}', [
                UserController::class,
                'update',
            ])->name('users.update');

            Route::patch('/users/{userId}/status', [
                UserController::class,
                'toggleStatus',
            ])->name('users.status');

            Route::post('/users/{userId}/reset-password', [
                UserController::class,
                'resetPassword',
            ])->name('users.reset-password');

            Route::delete('/users/{userId}', [
                UserController::class,
                'destroy',
            ])->name('users.destroy');

            Route::post('/users/{userId}/logout-sessions', [
                UserController::class,
                'logoutSessions',
            ])->name('users.logout-sessions');

            Route::get('/users/{userId}/groups', [
                UserController::class,
                'groups',
            ])->name('users.groups');

            Route::post('/users/{userId}/groups', [
                UserController::class,
                'addGroup',
            ])->name('users.groups.add');

            Route::delete('/users/{userId}/groups/{groupId}', [
                UserController::class,
                'removeGroup',
            ])->name('users.groups.remove');
        });

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::get('/applications', [
                ApplicationController::class,
                'index',
            ])->name('applications.index');

            Route::get('/applications/data', [
                ApplicationController::class,
                'data',
            ])->name('applications.data');

            Route::get('/applications/groups', [
                ApplicationController::class,
                'groups',
            ])->name('applications.groups');

            Route::get('/applications/{application}/groups', [
                ApplicationController::class,
                'applicationGroups',
            ])->name('applications.groups.show');

            Route::put('/applications/{application}/groups', [
                ApplicationController::class,
                'updateGroups',
            ])->name('applications.groups.update');

            Route::post('/applications', [
                ApplicationController::class,
                'store',
            ])->name('applications.store');

            Route::get('/applications/{application}', [
                ApplicationController::class,
                'show',
            ])->name('applications.show');

            Route::put('/applications/{application}', [
                ApplicationController::class,
                'update',
            ])->name('applications.update');

            Route::patch('/applications/{application}/status', [
                ApplicationController::class,
                'updateStatus',
            ])->name('applications.status');

            Route::delete('/applications/{application}', [
                ApplicationController::class,
                'destroy',
            ])->name('applications.destroy');
        });

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
