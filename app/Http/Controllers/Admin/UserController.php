<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\KeycloakService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index');
    }

    public function data(
        Request $request,
        KeycloakService $keycloakService
    ): JsonResponse {
        $start = $request->integer('start', 0);
        $length = $request->integer('length', 10);

        if ($length < 1) {
            $length = 10;
        }

        if ($length > 100) {
            $length = 100;
        }

        $search = $request->input('search.value');

        $columns = [
            0 => 'firstName',
            1 => 'username',
            2 => 'email',
            3 => 'enabled',
        ];

        $orderColumn = $request->integer(
            'order.0.column',
            1
        );

        $orderDirection = $request->input(
            'order.0.dir',
            'asc'
        );

        $sortBy = $columns[$orderColumn] ?? 'username';

        $result = $keycloakService->getUsersForDataTable(
            $start,
            $length,
            $search,
            $sortBy,
            $orderDirection
        );

        return response()->json([
            'draw' => $request->integer('draw'),
            'recordsTotal' => $result['recordsTotal'],
            'recordsFiltered' => $result['recordsFiltered'],
            'data' => $result['data'],
        ]);
    }

    public function show(
        string $userId,
        KeycloakService $keycloakService
    ): Response {
        $user = $keycloakService->getUser($userId);
        $sessions = $keycloakService->getUserSessions($userId);
        $groups = $keycloakService->getUserGroups($userId);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'sessions' => $sessions,
            'groups' => $groups,
        ]);
    }

    public function store(
        Request $request,
        KeycloakService $keycloakService
    ): JsonResponse {
        $validated = $request->validate([
            'username' => [
                'required',
                'string',
                'max:100',
            ],
            'firstName' => [
                'required',
                'string',
                'max:100',
            ],
            'lastName' => [
                'nullable',
                'string',
                'max:100',
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
            ],
            'enabled' => [
                'boolean',
            ],
            'emailVerified' => [
                'boolean',
            ],
        ]);

        $user = $keycloakService->createUser(
            $validated
        );

        return response()->json([
            'message' => 'User berhasil dibuat.',
            'user' => $user,
        ]);
    }

    public function update(
        Request $request,
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $validated = $request->validate([
            'firstName' => [
                'required',
                'string',
                'max:100',
            ],
            'lastName' => [
                'nullable',
                'string',
                'max:100',
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
            ],
            'nickname' => [
                'nullable',
                'string',
                'max:100',
            ],
        ]);

        $user = $keycloakService->updateUser(
            $userId,
            $validated
        );

        return response()->json([
            'message' => 'User berhasil diperbarui.',
            'user' => $user,
        ]);
    }

    public function toggleStatus(
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $user = $keycloakService->getUser($userId);

        $updatedUser =
            $keycloakService->updateUserStatus(
                $userId,
                ! ($user['enabled'] ?? false)
            );

        return response()->json([
            'message' =>
                ($updatedUser['enabled'] ?? false)
                    ? 'User berhasil diaktifkan.'
                    : 'User berhasil dinonaktifkan.',
            'user' => $updatedUser,
        ]);
    }

    public function resetPassword(
        Request $request,
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $validated = $request->validate([
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ]);

        $keycloakService->resetUserPassword(
            $userId,
            $validated['password']
        );

        return response()->json([
            'message' => 'Password user berhasil direset.',
        ]);
    }

    public function destroy(
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $keycloakService->deleteUser($userId);

        return response()->json([
            'message' => 'User berhasil dihapus.',
        ]);
    }

    public function logoutSessions(
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $keycloakService->logoutAllUserSessions(
            $userId
        );

        return response()->json([
            'message' =>
                'Semua sesi user berhasil dikeluarkan.',
        ]);
    }

    public function groups(
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        return response()->json([
            'groups' =>
                $keycloakService->getUserGroups(
                    $userId
                ),
        ]);
    }

    public function addGroup(
        Request $request,
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $validated = $request->validate([
            'groupId' => [
                'required',
                'string',
            ],
        ]);

        $keycloakService->addUserToGroup(
            $userId,
            $validated['groupId']
        );

        return response()->json([
            'message' =>
                'User berhasil ditambahkan ke group.',
        ]);
    }

    public function removeGroup(
        string $userId,
        string $groupId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $keycloakService->removeUserFromGroup(
            $userId,
            $groupId
        );

        return response()->json([
            'message' =>
                'User berhasil dikeluarkan dari group.',
        ]);
    }

    public function create(): Response
    {
        return Inertia::render(
            'Admin/Users/Create'
        );
    }

    public function edit(
        string $userId,
        KeycloakService $keycloakService
    ): Response {
        $user = $keycloakService->getUser(
            $userId
        );

        return Inertia::render(
            'Admin/Users/Edit',
            [
                'user' => $user,
            ]
        );
    }
}

