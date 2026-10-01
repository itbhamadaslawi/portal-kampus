<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\KeycloakService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{

public function __construct(
        protected KeycloakService $keycloakService
    ) {
    }

    
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
        'group_ids' => [
            'nullable',
            'array',
        ],
        'group_ids.*' => [
            'string',
            'max:255',
        ],
    ]);

    $groupIds = $validated['group_ids'] ?? [];

    unset($validated['group_ids']);

    $user = $keycloakService->updateUser(
        $userId,
        $validated
    );

    $currentGroups =
        $keycloakService->getUserGroups(
            $userId
        );

    $currentGroupIds = collect($currentGroups)
        ->pluck('id')
        ->map(fn ($id) => (string) $id)
        ->values()
        ->all();

    $selectedGroupIds = collect($groupIds)
        ->map(fn ($id) => (string) $id)
        ->unique()
        ->values()
        ->all();

    $groupsToAdd = array_diff(
        $selectedGroupIds,
        $currentGroupIds
    );

    $groupsToRemove = array_diff(
        $currentGroupIds,
        $selectedGroupIds
    );

    foreach ($groupsToAdd as $groupId) {
        $keycloakService->addUserToGroup(
            $userId,
            $groupId
        );
    }

    foreach ($groupsToRemove as $groupId) {
        $keycloakService->removeUserFromGroup(
            $userId,
            $groupId
        );
    }

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
            'message' => ($updatedUser['enabled'] ?? false)
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
            'message' => 'Semua sesi user berhasil dikeluarkan.',
        ]);
    }

    public function groups(
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        return response()->json([
            'groups' => $keycloakService->getUserGroups(
                $userId
            ),
        ]);
    }

   public function editGroups(
    string $userId,
    KeycloakService $keycloakService
): JsonResponse {
    $groups = $keycloakService->getAllGroups();

    $userGroups = $keycloakService->getUserGroups(
        $userId
    );

    return response()->json([
        'groups' => $groups,
        'selected_group_ids' => collect($userGroups)
            ->pluck('id')
            ->map(
                fn ($id) => (string) $id
            )
            ->values()
            ->all(),
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
            'message' => 'User berhasil ditambahkan ke group.',
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
            'message' => 'User berhasil dikeluarkan dari group.',
        ]);
    }

    public function json(
        string $userId,
        KeycloakService $keycloakService
    ): JsonResponse {
        $user = $keycloakService->getUser($userId);
        $sessions = $keycloakService->getUserSessions($userId);
        $groups = $keycloakService->getUserGroups($userId);

        return response()->json([
            'user' => $user,
            'sessions' => $sessions,
            'groups' => $groups,
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

    public function import(
        KeycloakService $keycloakService
    ): Response {
        $groups =
            $keycloakService->getAllGroups();

        return Inertia::render(
            'Admin/Users/Import',
            [
                'groups' => $groups,
            ]
        );
    }

    public function downloadTemplate()
    {
        $path = public_path(
            'templates/template_users.xlsx'
        );

        abort_unless(
            File::exists($path),
            404,
            'Template Excel tidak ditemukan.'
        );

        return response()->download(
            $path,
            'template_users.xlsx'
        );
    }

    public function importPreview(
        Request $request
    ): JsonResponse {
        $validated = $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:xlsx,xls',
                'max:10240',
            ],
        ]);

        $file = $validated['file'];

        $filename = Str::uuid()
            .'.'
            .$file->getClientOriginalExtension();

        $path = $file->storeAs(
            'imports',
            $filename
        );

        return response()->json([
            'message' => 'File berhasil diupload.',
            'data' => [
                'filename' => $filename,
                'path' => $path,
            ],
        ]);
    }

    public function importSubmit(
        Request $request,
        KeycloakService $keycloakService
    ): JsonResponse {
        $validated = $request->validate([
            'group_ids' => [
                'required',
                'array',
                'min:1',
            ],

            'group_ids.*' => [
                'required',
                'string',
                'max:255',
            ],

            'data' => [
                'required',
                'array',
                'min:1',
            ],

            'data.*.nim' => [
                'required',
                'string',
                'max:100',
            ],

            'data.*.username' => [
                'required',
                'string',
                'max:150',
            ],

            'data.*.nama' => [
                'required',
                'string',
                'max:255',
            ],

            'data.*.email' => [
                'nullable',
                'string',
                'max:255',
            ],

            'data.*.first_name' => [
                'required',
                'string',
                'max:255',
            ],

            'data.*.last_name' => [
                'required',
                'string',
                'max:255',
            ],

            'data.*.status' => [
                'nullable',
                'string',
            ],
        ]);

        $data = $validated['data'];

        $groupIds = collect(
            $validated['group_ids']
        )
            ->map(
                fn ($groupId) => trim((string) $groupId)
            )
            ->filter()
            ->unique()
            ->values();

        /*
         * Pastikan semua group benar-benar ada
         * di Keycloak.
         */
        $groups = $keycloakService->getAllGroups();

        $selectedGroups = collect($groups)
            ->filter(
                fn ($group) => $groupIds->contains(
                    (string) (
                        $group['id'] ?? ''
                    )
                )
            )
            ->values();

        /*
         * Pastikan jumlah group yang ditemukan
         * sama dengan jumlah group yang dipilih.
         */
        if (
            $selectedGroups->count()
            !== $groupIds->count()
        ) {
            return response()->json([
                'success' => false,

                'message' => 'Salah satu group yang dipilih '
                    .'tidak ditemukan di Keycloak.',
            ], 422);
        }

        $results = [];

        $successCount = 0;
        $duplicateCount = 0;
        $errorCount = 0;

        foreach ($data as $index => $item) {
            $username = trim(
                (string) (
                    $item['username']
                    ?? ''
                )
            );

            $rowNumber = $item['row']
                ?? ($index + 2);

            try {
                /*
                 * Hanya data valid yang diproses.
                 */
                $status = strtolower(
                    trim(
                        (string) (
                            $item['status']
                            ?? 'valid'
                        )
                    )
                );

                if ($status !== 'valid') {
                    $results[] = [
                        ...$item,

                        'row' => $rowNumber,

                        'status' => 'error',

                        'message' => 'Data tidak berstatus valid.',
                    ];

                    $errorCount++;

                    continue;
                }

                /*
                 * Username wajib ada.
                 */
                if ($username === '') {
                    $results[] = [
                        ...$item,

                        'row' => $rowNumber,

                        'status' => 'error',

                        'message' => 'Username tidak boleh kosong.',
                    ];

                    $errorCount++;

                    continue;
                }

                /*
                 * Password awal = username.
                 */
                $defaultPassword = $username;

                /*
                 * Cek username di Keycloak.
                 */
                $existingUser =
                    $keycloakService
                        ->findUserByUsername(
                            $username
                        );

                if ($existingUser) {
                    $results[] = [
                        ...$item,

                        'row' => $rowNumber,

                        'status' => 'existing',

                        'message' => 'Username sudah ada di Keycloak.',

                        'keycloak_id' => $existingUser['id']
                            ?? null,
                    ];

                    $duplicateCount++;

                    continue;
                }

                /*
                 * ==========================================================
                 * CREATE USER
                 * ==========================================================
                 */
                $createdUser =
                    $keycloakService->createUser([
                        'username' => $username,

                        'firstName' => trim(
                            (string) (
                                $item['first_name']
                                ?? ''
                            )
                        ),

                        'lastName' => trim(
                            (string) (
                                $item['last_name']
                                ?? ''
                            )
                        ),

                        'email' => trim(
                            (string) (
                                $item['email']
                                ?? ''
                            )
                        ),

                        'enabled' => true,

                        'emailVerified' => false,

                        /*
                     * Password awal sama dengan username.
                     */
                        'password' => $defaultPassword,

                        /*
                     * User wajib mengganti password
                     * saat login pertama.
                     */
                        'requiredActions' => [
                            'UPDATE_PASSWORD',
                        ],
                    ]);

                $createdUserId =
                    $createdUser['id']
                    ?? null;

                if (! $createdUserId) {
                    throw new \RuntimeException(
                        'User berhasil dibuat tetapi ID user tidak ditemukan.'
                    );
                }

                /*
                 * ==========================================================
                 * ADD USER TO ALL SELECTED GROUPS
                 * ==========================================================
                 */
                $userGroups = [];

                foreach ($selectedGroups as $selectedGroup) {
                    $selectedGroupId =
                        (string) (
                            $selectedGroup['id']
                            ?? ''
                        );

                    if ($selectedGroupId === '') {
                        continue;
                    }

                    $keycloakService->addUserToGroup(
                        $createdUserId,
                        $selectedGroupId
                    );

                    $userGroups[] = [
                        'id' => $selectedGroupId,

                        'name' => $selectedGroup['name']
                            ?? null,

                        'path' => $selectedGroup['path']
                            ?? null,
                    ];
                }

                /*
                 * Pastikan minimal satu group berhasil
                 * diterapkan.
                 */
                if (! count($userGroups)) {
                    throw new \RuntimeException(
                        'User berhasil dibuat tetapi tidak ada group yang berhasil diterapkan.'
                    );
                }

                /*
                 * User berhasil dibuat dan
                 * dimasukkan ke seluruh group.
                 */
                $results[] = [
                    ...$item,

                    'row' => $rowNumber,

                    'status' => 'success',

                    'message' => 'User berhasil dibuat dan '
                        .'dimasukkan ke '
                        .count($userGroups)
                        .' group.',

                    'keycloak_id' => $createdUserId,

                    'groups' => $userGroups,
                ];

                $successCount++;
            } catch (\Throwable $e) {
                report($e);

                $results[] = [
                    ...$item,

                    'row' => $rowNumber,

                    'status' => 'error',

                    'message' => $e->getMessage()
                        ?: 'Gagal membuat user di Keycloak.',
                ];

                $errorCount++;
            }
        }

        $total = count($data);

        return response()->json([
            'success' => true,

            'message' => 'Submit selesai. '
                ."{$successCount} sukses, "
                ."{$duplicateCount} sudah ada, "
                ."{$errorCount} error.",

            'summary' => [
                'total' => $total,

                'success' => $successCount,

                'duplicate' => $duplicateCount,

                'error' => $errorCount,
            ],

            'groups' => $selectedGroups
                ->map(
                    fn ($group) => [
                        'id' => $group['id']
                            ?? null,

                        'name' => $group['name']
                            ?? null,

                        'path' => $group['path']
                            ?? null,
                    ]
                )
                ->values()
                ->all(),

            'data' => $results,
        ]);
    }

    public function summary(): JsonResponse
    {
        $users = $this->keycloakService->getAllUsers();

        $groups = $this->keycloakService->getAllGroups();

        $total = count($users);

        $active = collect($users)
            ->filter(
                fn ($user) => ($user['enabled'] ?? false) === true
            )
            ->count();

        $inactive = $total - $active;

        $groupSummary = collect($groups)
            ->map(function ($group) {
                $groupId = (string) (
                    $group['id'] ?? ''
                );

                if ($groupId === '') {
                    return null;
                }

                $members =
                    $this->keycloakService
                        ->getGroupMembers($groupId);

                return [
                    'id' => $groupId,
                    'name' => $group['name'] ?? '',
                    'path' => $group['path'] ?? '',
                    'total' => count($members),
                ];
            })
            ->filter()
            ->values()
            ->all();

        return response()->json([
            'total' => $total,
            'active' => $active,
            'inactive' => $inactive,
            'groups' => $groupSummary,
        ]);
    }
}
