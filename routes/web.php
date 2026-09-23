<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

// Sementara untuk tombol SSO
Route::get('/auth/login', function () {
    // Nanti di sini kita redirect ke Keycloak
    return redirect()->route('login');
})->name('auth.login');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');