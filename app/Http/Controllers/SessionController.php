<?php

namespace App\Http\Controllers;

use App\Models\Application;
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

            $applications = Application::query()
                ->where('is_active', true)
                ->get([
                    'code',
                    'name',
                ])
                ->keyBy('code');

            $data = collect($sessions)
                ->map(function ($session) use ($applications) {
                    $clients = $session['clients'] ?? [];

                    $clientIds = collect($clients)
                        ->values()
                        ->filter()
                        ->unique()
                        ->values();

                    $applicationNames = $clientIds
                        ->map(function ($clientId) use ($applications) {
                            if ($clientId === 'portal-bhamada') {
                                return 'Portal Bhamada';
                            }

                            if ($applications->has($clientId)) {
                                return $applications
                                    ->get($clientId)
                                    ->name;
                            }

                            return null;
                        })
                        ->filter()
                        ->unique()
                        ->values();

                    $application = $applicationNames->isEmpty()
                        ? 'Portal Bhamada'
                        : $applicationNames->implode(', ');

                    return [
                        'id' => $session['id'] ?? null,

                        'application' => $application,

                        'ip' => $session['ipAddress'] ?? null,

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
                'message' => 'Gagal mengambil sesi aktif.',
                'data' => [],
            ], 500);
        }
    }
}