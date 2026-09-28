<?php

namespace App\Http\Controllers;

use App\Services\KeycloakService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(): Response|RedirectResponse
    {
        if (! session()->has('keycloak_user')) {
            return redirect()->route('login');
        }

        return Inertia::render('Account/Index', [
            'user' => session('keycloak_user'),
        ]);
    }

    public function update(
        Request $request,
        KeycloakService $keycloakService
    ): JsonResponse {
        $user = session('keycloak_user');

        if (! $user) {
            return response()->json([
                'message' => 'Sesi pengguna tidak ditemukan.',
            ], 401);
        }

        $validated = $request->validate([
            'firstName' => ['required', 'string', 'max:100'],
            'lastName' => ['nullable', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'nickname' => ['nullable', 'string', 'max:100'],
        ]);

        $updatedUser = $keycloakService->updateUser(
            $user['id'],
            $validated
        );

        $firstName = $updatedUser['firstName']
            ?? $validated['firstName'];

        $lastName = $updatedUser['lastName']
            ?? $validated['lastName']
            ?? '';

        $nickname = $updatedUser['attributes']['nickname'][0]
            ?? $validated['nickname']
            ?? null;

        $updatedSessionUser = array_merge(
            $user,
            [
                'name' => trim($firstName . ' ' . $lastName),
                'email' => $updatedUser['email']
                    ?? $validated['email'],
                'given_name' => $firstName,
                'family_name' => $lastName ?: null,
                'nickname' => $nickname,
            ]
        );

        session([
            'keycloak_user' => $updatedSessionUser,
        ]);

        return response()->json([
            'message' => 'Profil berhasil diperbarui.',
            'user' => $updatedSessionUser,
        ]);
    }
}
