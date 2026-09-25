<?php

namespace App\Services;

use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class KeycloakLogoutService
{
    protected string $baseUrl;

    protected string $realm;

    protected string $issuer;

    public function __construct()
    {
        $this->baseUrl = rtrim(
            config('services.keycloak.base_url'),
            '/'
        );

        $this->realm = config(
            'services.keycloak.realms'
        );

        $this->issuer =
            $this->baseUrl
            . '/realms/'
            . $this->realm;
    }

    public function decodeAndValidateLogoutToken(
        string $logoutToken
    ): array {
        $jwksUrl =
            $this->issuer
            . '/protocol/openid-connect/certs';

        $response = Http::timeout(10)
            ->get($jwksUrl);

        if ($response->failed()) {
            throw new RuntimeException(
                'Tidak dapat mengambil public key Keycloak.'
            );
        }

        $keys = JWK::parseKeySet(
            $response->json()
        );

        if (empty($keys)) {
            throw new RuntimeException(
                'Public key Keycloak tidak ditemukan.'
            );
        }

        $decoded = JWT::decode(
            $logoutToken,
            $keys
        );

        $claims = json_decode(
            json_encode($decoded),
            true
        );

        if (
            ($claims['iss'] ?? null)
            !== $this->issuer
        ) {
            throw new RuntimeException(
                'Issuer Logout Token tidak valid.'
            );
        }

        $clientId = config(
            'services.keycloak.client_id'
        );

        $audience = $claims['aud'] ?? null;

        if (is_array($audience)) {
            if (! in_array(
                $clientId,
                $audience,
                true
            )) {
                throw new RuntimeException(
                    'Audience Logout Token tidak valid.'
                );
            }
        } elseif (
            is_string($audience)
            && $audience !== $clientId
        ) {
            throw new RuntimeException(
                'Audience Logout Token tidak valid.'
            );
        } elseif ($audience === null) {
            throw new RuntimeException(
                'Audience Logout Token tidak ditemukan.'
            );
        }

        $events =
            $claims['events'] ?? [];

        $backchannelLogoutEvent =
            'http://schemas.openid.net/event/backchannel-logout';

        if (
            ! array_key_exists(
                $backchannelLogoutEvent,
                $events
            )
        ) {
            throw new RuntimeException(
                'Logout Token bukan Backchannel Logout Token.'
            );
        }

        if (empty($claims['sid'])) {
            throw new RuntimeException(
                'SID Logout Token tidak ditemukan.'
            );
        }

        if (isset($claims['nonce'])) {
            throw new RuntimeException(
                'Logout Token tidak boleh memiliki nonce.'
            );
        }

        return $claims;
    }
}