<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(): Response
    {
        if (!session()->has('keycloak_user')) {
            return redirect()->route('login');
        }

        return Inertia::render('Account/Index', [
            'user' => session('keycloak_user'),
        ]);
    }
}