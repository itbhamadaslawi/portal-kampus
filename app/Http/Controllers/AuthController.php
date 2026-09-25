<?php

namespace App\Http\Controllers;

use App\Models\KeycloakSession;
use App\Services\KeycloakLogoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    /**
     * Redirect user ke halaman login Keycloak.
     */
    public function login(Request $request): RedirectResponse
    {
        // Jika masih memiliki session Laravel,
        // jangan login ulang.
        if (session()->has('keycloak_user')) {
            return redirect()->route('dashboard');
        }

        // Tandai bahwa login dilakukan melalui popup.
        if ($request->query('popup') === '1') {
            session(['sso_popup' => true]);
        }

        return Socialite::driver('keycloak')
            ->scopes([
                'openid',
                'profile',
                'email',
            ])
            ->redirect();
    }

    /**
     * Callback dari Keycloak setelah login berhasil.
     */
    public function callback(Request $request): Response|RedirectResponse
    {
        $keycloakUser = Socialite::driver('keycloak')->user();

        $accessTokenResponse = $keycloakUser->accessTokenResponseBody ?? [];

        $idToken = $accessTokenResponse['id_token'] ?? null;

        $accessToken = $accessTokenResponse['access_token'] ?? null;

        $refreshToken = $accessTokenResponse['refresh_token'] ?? null;

        $keycloakSid = $accessTokenResponse['session_state'] ?? null;

        $username = $keycloakUser->user['preferred_username']
            ?? $keycloakUser->getNickname();

        session([
            'keycloak_user' => [
                'id' => $keycloakUser->getId(),
                'name' => $keycloakUser->getName(),
                'username' => $username,
                'email' => $keycloakUser->getEmail(),
                'nickname' => $keycloakUser->getNickname(),
                'avatar' => $keycloakUser->getAvatar(),
                'given_name' => $keycloakUser->user['given_name'] ?? null,
                'family_name' => $keycloakUser->user['family_name'] ?? null,
                'email_verified' => $keycloakUser->user['email_verified'] ?? false,
                'groups' => $keycloakUser->user['groups'] ?? [],
                'id_token' => $idToken,
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
            ],
        ]);

        $request->session()->regenerate();

        if ($keycloakSid) {
            KeycloakSession::updateOrCreate(
                [
                    'keycloak_sid' => $keycloakSid,
                ],
                [
                    'laravel_session_id' => $request->session()->getId(),
                    'user_id' => $keycloakUser->getId(),
                ]
            );
        }

        if (session()->pull('sso_popup')) {
            return Inertia::render('Auth/SsoCallback');
        }

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Logout Laravel + Keycloak SSO.
     */
    public function logout(Request $request): RedirectResponse
    {
        /*
        |--------------------------------------------------------------------------
        | Ambil data Keycloak
        |--------------------------------------------------------------------------
        */

        $keycloakUser = $request->session()->get('keycloak_user', []);

        $idToken = $keycloakUser['id_token'] ?? null;

        /*
        |--------------------------------------------------------------------------
        | Logout Keycloak
        |--------------------------------------------------------------------------
        */

        if ($idToken) {
            $logoutUrl = rtrim(
                config('services.keycloak.base_url'),
                '/'
            )
                .'/realms/'
                .config('services.keycloak.realms')
                .'/protocol/openid-connect/logout';

            try {
                Http::timeout(10)->get($logoutUrl, [
                    'id_token_hint' => $idToken,
                    'client_id' => config('services.keycloak.client_id'),
                ]);
            } catch (\Throwable $e) {
                report($e);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Logout Laravel
        |--------------------------------------------------------------------------
        */

        $request->session()->forget('keycloak_user');

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        /*
        |--------------------------------------------------------------------------
        | Kembali ke halaman login
        |--------------------------------------------------------------------------
        */

        return redirect()->route('login');
    }

    public function backchannelLogout(
        Request $request,
        KeycloakLogoutService $keycloakLogoutService
    ) {
        try {
            $logoutToken = $request->input('logout_token');

            if (! $logoutToken) {
                return response()->json([
                    'message' => 'Logout token tidak ditemukan.',
                ], 400);
            }

            $claims = $keycloakLogoutService
                ->decodeAndValidateLogoutToken($logoutToken);

            $sid = $claims['sid'] ?? null;

            if (! $sid) {
                return response()->noContent();
            }

            $keycloakSession = KeycloakSession::where(
                'keycloak_sid',
                $sid
            )->first();

            if (! $keycloakSession) {
                return response()->noContent();
            }

            $laravelSessionId = $keycloakSession->laravel_session_id;

            $keycloakSession->delete();

            DB::table('sessions')
                ->where('id', $laravelSessionId)
                ->delete();

            return response()->noContent();
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Backchannel logout gagal.',
            ], 400);
        }
    }
}
