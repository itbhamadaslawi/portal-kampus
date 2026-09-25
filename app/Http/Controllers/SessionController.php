<?php

namespace App\Http\Controllers;

use App\Services\KeycloakService;
use App\Services\KeycloakUnauthorizedException;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index(
        Request $request,
        KeycloakService $keycloak
    ): JsonResponse {
        $user = session('keycloak_user');

        if (! $user || empty($user['id'])) {
            return response()->json([
                'message' => 'User belum login.',
                'data' => [],
            ], 401);
        }

        try {
            $sessions = $keycloak->getUserSessions(
                $user['id']
            );

            $devices = [];

            if (! empty($user['access_token'])) {
                try {
                    $devices = $keycloak->getUserDevices(
                        $user['access_token']
                    );
                } catch (KeycloakUnauthorizedException $e) {
                    if (! empty($user['refresh_token'])) {
                        try {
                            $tokenResponse = $keycloak->refreshUserToken(
                                $user['refresh_token']
                            );

                            $newAccessToken =
                                $tokenResponse['access_token']
                                ?? null;

                            $newRefreshToken =
                                $tokenResponse['refresh_token']
                                ?? $user['refresh_token'];

                            if ($newAccessToken) {
                                $user['access_token'] =
                                    $newAccessToken;

                                $user['refresh_token'] =
                                    $newRefreshToken;

                                session([
                                    'keycloak_user' => $user,
                                ]);

                                $devices =
                                    $keycloak->getUserDevices(
                                        $newAccessToken
                                    );
                            }
                        } catch (\Throwable $refreshException) {
                            report($refreshException);
                            $devices = [];
                        }
                    }
                } catch (\Throwable $e) {
                    report($e);
                    $devices = [];
                }
            }

            $devicesBySession = collect($devices)
                ->flatMap(function ($device) {
                    return collect($device['sessions'] ?? [])
                        ->mapWithKeys(function ($deviceSession) use ($device) {
                            return [
                                $deviceSession['id'] => [
                                    'device' => $device,
                                    'session' => $deviceSession,
                                ],
                            ];
                        });
                });

            $data = collect($sessions)
                ->map(function ($session) use ($devicesBySession) {
                    $clients = $session['clients'] ?? [];

                    $clientNames = collect($clients)
                        ->filter()
                        ->values()
                        ->unique()
                        ->values();

                    $application = $clientNames->isEmpty()
                        ? 'Keycloak'
                        : $clientNames->implode(', ');

                    $deviceData = $devicesBySession->get(
                        $session['id'] ?? null,
                        []
                    );

                    $device = $deviceData['device'] ?? [];
                    $deviceSession = $deviceData['session'] ?? [];

                    return [
                        'id' => $session['id'] ?? null,
                        'application' => $application,
                        'clients' => $clientNames->toArray(),

                        'ip' => $session['ipAddress']
                            ?? $deviceSession['ipAddress']
                            ?? null,

                        'device' => $device['device'] ?? null,
                        'browser' => $deviceSession['browser'] ?? null,
                        'os' => $device['os'] ?? null,
                        'os_version' => $device['osVersion'] ?? null,
                        'mobile' => $device['mobile'] ?? false,

                        'current' => $deviceSession['current']
                            ?? $device['current']
                            ?? false,

                        'started_at' => ! empty($session['start'])
                            ? Carbon::createFromTimestampMs(
                                $session['start']
                            )
                                ->timezone(config('app.timezone'))
                                ->format('d M Y H:i')
                            : null,

                        'last_active' => ! empty($session['lastAccess'])
                            ? Carbon::createFromTimestampMs(
                                $session['lastAccess']
                            )
                                ->timezone(config('app.timezone'))
                                ->format('d M Y H:i')
                            : null,
                    ];
                })
                ->values()
                ->toArray();

            return response()->json([
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            report($e);

            return response()->json([
                'message' => 'Sistem sedang mengalami kendala saat mengambil informasi sesi. Silakan coba beberapa saat lagi.',
                'data' => [],
            ], 500);
        }
    }

    public function destroy(
    Request $request,
    KeycloakService $keycloak,
    string $sessionId
): JsonResponse {
    $user = session('keycloak_user');

    if (! $user || empty($user['id'])) {
        return response()->json([
            'message' => 'User belum login.',
        ], 401);
    }

    try {
        $sessions = $keycloak->getUserSessions(
            $user['id']
        );

        $session = collect($sessions)
            ->firstWhere('id', $sessionId);

        if (! $session) {
            return response()->json([
                'message' => 'Sesi tidak ditemukan atau sudah tidak aktif.',
            ], 404);
        }

        $keycloak->logoutUserSession(
            $user['id'],
            $sessionId
        );

        return response()->json([
            'message' => 'Sesi berhasil dihentikan.',
        ]);
    }  catch (\Throwable $e) {
    report($e);

    return response()->json([
        'message' => $e->getMessage(),
    ], 500);
}
}
}