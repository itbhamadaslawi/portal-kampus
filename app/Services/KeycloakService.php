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
            ->post(
                $this->baseUrl
                . '/realms/'
                . $this->realm
                . '/protocol/openid-connect/token',
                [
                    'grant_type' => 'client_credentials',

                    'client_id' => config(
                        'services.keycloak.client_id'
                    ),

                    'client_secret' => config(
                        'services.keycloak.client_secret'
                    ),
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak token error: '
                . $response->status()
                . ' - '
                . $response->body()
            );
        }

        $token = $response->json('access_token');

        if (! $token) {
            throw new RuntimeException(
                'Access token tidak ditemukan dari Keycloak: '
                . $response->body()
            );
        }

        return $token;
    }

    public function getUserSessions(string $userId): array
    {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->get(
                $this->baseUrl
                . '/admin/realms/'
                . $this->realm
                . '/users/'
                . urlencode($userId)
                . '/sessions'
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak session error: '
                . $response->status()
                . ' - '
                . $response->body()
            );
        }

        return $response->json() ?? [];
    }
}