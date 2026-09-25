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

        $devices = [];

        if (! empty($user['access_token'])) {
            $devices = $keycloak->getUserDevices(
                $user['access_token']
            );
        }

        return response()->json([
            'user_id' => $user['id'],
            'sessions' => $sessions,
            'devices' => $devices,
        ]);
    } catch (\Throwable $e) {
        report($e);

        return response()->json([
            'message' => $e->getMessage(),
        ], 500);
    }
}
}