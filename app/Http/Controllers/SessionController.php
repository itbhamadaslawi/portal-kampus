<?php

namespace App\Http\Controllers;

use App\Services\KeycloakService;
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
                $devices = $keycloak->getUserDevices(
                    $user['access_token']
                );
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
                        ->map(function ($client) {
                            return $client;
                        })
                        ->filter()
                        ->unique()
                        ->values();

                    $application = $clientNames->isEmpty()
                        ? 'Keycloak'
                        : $clientNames->implode(', ');

                    $deviceData = $devicesBySession->get(
                        $session['id'],
                        []
                    );

                    $device = $deviceData['device'] ?? [];
                    $deviceSession = $deviceData['session'] ?? [];

                    return [
                        'id' => $session['id'] ?? null,

                        'application' => $application,

                        'clients' => $clientNames->values()->toArray(),

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
}