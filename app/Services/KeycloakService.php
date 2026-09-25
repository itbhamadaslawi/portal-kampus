<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class KeycloakService
{
    protected string $baseUrl;

    protected string $realm;

    public function __construct()
    {
        $this->baseUrl = rtrim(
            config('services.keycloak.base_url'),
            '/'
        );

        $this->realm = config(
            'services.keycloak.realms'
        );
    }

    protected function getAdminToken(): string
    {
        $response = Http::asForm()
            ->timeout(10)
            ->post(
                $this->baseUrl
                .'/realms/'
                .$this->realm
                .'/protocol/openid-connect/token',
                [
                    'grant_type' => 'client_credentials',
                    'client_id' => config('services.keycloak.client_id'),
                    'client_secret' => config('services.keycloak.client_secret'),
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak token error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $token = $response->json('access_token');

        if (! $token) {
            throw new RuntimeException(
                'Access token tidak ditemukan dari Keycloak: '
                .$response->body()
            );
        }

        return $token;
    }

    public function getUserSessions(string $userId): array
    {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId)
                .'/sessions'
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak session error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $response->json() ?? [];
    }

    public function getUserDevices(string $accessToken): array
    {
        $response = Http::withToken($accessToken)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/realms/'
                .$this->realm
                .'/account/sessions/devices'
            );

        if ($response->status() === 401) {
            throw new KeycloakUnauthorizedException(
                'Access token Keycloak sudah tidak valid.'
            );
        }

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak device error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $response->json() ?? [];
    }

    public function refreshUserToken(string $refreshToken): array
    {
        $response = Http::asForm()
            ->timeout(10)
            ->post(
                $this->baseUrl
                .'/realms/'
                .$this->realm
                .'/protocol/openid-connect/token',
                [
                    'grant_type' => 'refresh_token',
                    'client_id' => config('services.keycloak.client_id'),
                    'client_secret' => config('services.keycloak.client_secret'),
                    'refresh_token' => $refreshToken,
                ]
            );

        if ($response->status() === 400) {
            throw new RuntimeException(
                'Refresh token Keycloak sudah tidak valid atau sudah expired.'
            );
        }

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak refresh token error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $accessToken = $response->json('access_token');

        if (! $accessToken) {
            throw new RuntimeException(
                'Access token baru tidak ditemukan dari Keycloak: '
                .$response->body()
            );
        }

        return $response->json() ?? [];
    }
}
