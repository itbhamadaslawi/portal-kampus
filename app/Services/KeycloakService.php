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

    public function logoutUserSession(string $userId, string $sessionId): void
    {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->delete(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/sessions/'
                .urlencode($sessionId)
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak logout session error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }
    }

    public function getUser(string $userId): array
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
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak user error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $response->json() ?? [];
    }

    public function updateUser(
        string $userId,
        array $data
    ): array {
        $token = $this->getAdminToken();

        $user = $this->getUser($userId);

        $attributes = $user['attributes'] ?? [];

        if (array_key_exists('nickname', $data)) {
            $nickname = trim(
                (string) ($data['nickname'] ?? '')
            );

            if ($nickname === '') {
                unset($attributes['nickname']);
            } else {
                $attributes['nickname'] = [
                    $nickname,
                ];
            }
        }

        $payload = [
            'firstName' => trim(
                (string) $data['firstName']
            ),
            'lastName' => trim(
                (string) ($data['lastName'] ?? '')
            ),
            'email' => trim(
                (string) $data['email']
            ),
            'attributes' => $attributes,
        ];

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->put(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId),
                $payload
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak update user error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $this->getUser($userId);
    }

    public function getUsers(
        ?string $search = null,
        int $page = 1,
        int $perPage = 20
    ): array {
        $token = $this->getAdminToken();

        $query = [
            'first' => max(0, ($page - 1) * $perPage),
            'max' => $perPage,
        ];

        if ($search !== null && trim($search) !== '') {
            $query['search'] = trim($search);
        }

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users',
                $query
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak users error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $response->json() ?? [];
    }

    public function createUser(array $data): array
    {
        $token = $this->getAdminToken();

        $payload = [
            'username' => trim($data['username']),
            'firstName' => trim($data['firstName']),
            'lastName' => trim($data['lastName'] ?? ''),
            'email' => trim($data['email'] ?? ''),
            'enabled' => $data['enabled'] ?? true,
            'emailVerified' => $data['emailVerified'] ?? false,

            'credentials' => [
                [
                    'type' => 'password',
                    'value' => $data['password'],
                    'temporary' => true,
                ],
            ],

            'requiredActions' => [
                'UPDATE_PASSWORD',
            ],
        ];

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->post(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users',
                $payload
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak create user error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $location = $response->header('Location');

        if (! $location) {
            throw new RuntimeException(
                'User berhasil dibuat tetapi ID user tidak ditemukan.'
            );
        }

        $userId = basename(
            parse_url($location, PHP_URL_PATH)
        );

        return $this->getUser($userId);
    }

    public function updateUserStatus(
        string $userId,
        bool $enabled
    ): array {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->put(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId),
                [
                    'enabled' => $enabled,
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak update user status error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $this->getUser($userId);
    }

    public function resetUserPassword(
        string $userId,
        string $password
    ): void {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->put(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId)
                .'/reset-password',
                [
                    'type' => 'password',
                    'value' => $password,
                    'temporary' => false,
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak reset password error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }
    }

    public function deleteUser(string $userId): void
    {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->delete(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId)
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak delete user error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }
    }

    public function logoutAllUserSessions(
        string $userId
    ): void {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->post(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId)
                .'/logout'
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak logout user sessions error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }
    }

    public function getUserGroups(
        string $userId
    ): array {
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
                .'/groups'
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak user groups error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        return $response->json() ?? [];
    }

    public function addUserToGroup(
        string $userId,
        string $groupId
    ): void {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->put(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId)
                .'/groups/'
                .urlencode($groupId)
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak add user group error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }
    }

    public function removeUserFromGroup(
        string $userId,
        string $groupId
    ): void {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->delete(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/'
                .urlencode($userId)
                .'/groups/'
                .urlencode($groupId)
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak remove user group error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }
    }

    public function getUsersForDataTable(
        int $start = 0,
        int $length = 10,
        ?string $search = null,
        string $sortBy = 'username',
        string $sortDirection = 'asc'
    ): array {
        $token = $this->getAdminToken();

        $currentUserId = session('keycloak_user.id');

        $allowedSorts = [
            'username' => 'username',
            'firstName' => 'firstName',
            'lastName' => 'lastName',
            'email' => 'email',
            'enabled' => 'enabled',
        ];

        $sortBy = $allowedSorts[$sortBy] ?? 'username';

        $sortDirection = strtolower($sortDirection) === 'desc'
            ? 'desc'
            : 'asc';

        $searchValue = $search !== null
            ? trim($search)
            : '';

        $params = [
            'first' => 0,
            'max' => 1000,
        ];

        if ($searchValue !== '') {
            $params['search'] = $searchValue;
        }

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users',
                $params
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak users error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $users = $response->json() ?? [];

        if ($currentUserId) {
            $users = array_values(
                array_filter(
                    $users,
                    function ($user) use ($currentUserId) {
                        return (string) ($user['id'] ?? '')
                            !== (string) $currentUserId;
                    }
                )
            );
        }

        usort(
            $users,
            function ($a, $b) use (
                $sortBy,
                $sortDirection
            ) {
                $valueA = strtolower(
                    (string) ($a[$sortBy] ?? '')
                );

                $valueB = strtolower(
                    (string) ($b[$sortBy] ?? '')
                );

                $result = $valueA <=> $valueB;

                return $sortDirection === 'desc'
                    ? -$result
                    : $result;
            }
        );

        $recordsFiltered = count($users);

        $countResponse = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/count',
                $searchValue !== ''
                    ? [
                        'search' => $searchValue,
                    ]
                    : []
            );

        if ($countResponse->failed()) {
            throw new RuntimeException(
                'Keycloak users count error: '
                .$countResponse->status()
                .' - '
                .$countResponse->body()
            );
        }

        $recordsFiltered = (int) (
            $countResponse->json('count') ?? 0
        );

        $totalResponse = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users/count'
            );

        if ($totalResponse->failed()) {
            throw new RuntimeException(
                'Keycloak total users count error: '
                .$totalResponse->status()
                .' - '
                .$totalResponse->body()
            );
        }

        $recordsTotal = (int) (
            $totalResponse->json('count') ?? 0
        );

        if ($currentUserId) {
            $recordsTotal = max(
                0,
                $recordsTotal - 1
            );

            if ($recordsFiltered > 0) {
                $currentUserMatchesSearch = false;

                $currentUserResponse = Http::withToken($token)
                    ->acceptJson()
                    ->timeout(10)
                    ->get(
                        $this->baseUrl
                        .'/admin/realms/'
                        .$this->realm
                        .'/users/'
                        .urlencode($currentUserId)
                    );

                if ($currentUserResponse->successful()) {
                    $currentUser = $currentUserResponse->json() ?? [];

                    if ($searchValue !== '') {
                        $searchLower = strtolower(
                            $searchValue
                        );

                        $currentUserValues = [
                            strtolower(
                                (string) ($currentUser['username'] ?? '')
                            ),
                            strtolower(
                                (string) ($currentUser['firstName'] ?? '')
                            ),
                            strtolower(
                                (string) ($currentUser['lastName'] ?? '')
                            ),
                            strtolower(
                                (string) ($currentUser['email'] ?? '')
                            ),
                        ];

                        foreach ($currentUserValues as $value) {
                            if (
                                $value !== ''
                                && str_contains(
                                    $value,
                                    $searchLower
                                )
                            ) {
                                $currentUserMatchesSearch = true;
                                break;
                            }
                        }
                    } else {
                        $currentUserMatchesSearch = true;
                    }
                }

                if ($currentUserMatchesSearch) {
                    $recordsFiltered = max(
                        0,
                        $recordsFiltered - 1
                    );
                }
            }
        }

        $users = array_slice(
            $users,
            $start,
            $length
        );

        return [
            'data' => $users,
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
        ];
    }

    public function getGroups(): array
    {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/groups'
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak groups error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $groups = $response->json() ?? [];

        return $this->getAllGroupsRecursive(
            $token,
            $groups
        );
    }

    private function getAllGroupsRecursive(
        string $token,
        array $groups,
        string $parentPath = ''
    ): array {
        $result = [];

        foreach ($groups as $group) {
            $groupId = $group['id'] ?? null;
            $name = $group['name'] ?? '';

            if (! $groupId || $name === '') {
                continue;
            }

            $path = $parentPath === ''
                ? '/'.$name
                : $parentPath.'/'.$name;

            $result[] = [
                'id' => $groupId,
                'name' => $name,
                'path' => $path,
            ];

            $childrenResponse = Http::withToken($token)
                ->acceptJson()
                ->timeout(10)
                ->get(
                    $this->baseUrl
                    .'/admin/realms/'
                    .$this->realm
                    .'/groups/'
                    .$groupId
                    .'/children'
                );

            if ($childrenResponse->failed()) {
                throw new RuntimeException(
                    'Keycloak child groups error: '
                    .$childrenResponse->status()
                    .' - '
                    .$childrenResponse->body()
                );
            }

            $children = $childrenResponse->json() ?? [];

            if (! empty($children)) {
                $result = array_merge(
                    $result,
                    $this->getAllGroupsRecursive(
                        $token,
                        $children,
                        $path
                    )
                );
            }
        }

        return $result;
    }

    public function getAllGroups(): array
    {
        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/groups',
                [
                    'briefRepresentation' => 'false',
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak groups error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $groups = $response->json() ?? [];

        $result = [];

        $flatten = function (
            array $items
        ) use (&$flatten, &$result) {
            foreach ($items as $group) {
                $name = trim(
                    (string) ($group['name'] ?? '')
                );

                if ($name === '') {
                    continue;
                }

                $path = trim(
                    (string) ($group['path'] ?? '')
                );

                if ($path === '') {
                    $path = '/'.$name;
                }

                $result[] = [
                    'id' => $group['id'] ?? null,
                    'name' => $name,
                    'path' => $path,
                ];

                $subGroups =
                    $group['subGroups']
                    ?? $group['subgroups']
                    ?? [];

                if (
                    is_array($subGroups)
                    && ! empty($subGroups)
                ) {
                    $flatten($subGroups);
                }
            }
        };

        $flatten($groups);

        return $result;
    }

    public function findUserByUsername(
        string $username
    ): ?array {
        $username = trim($username);

        if ($username === '') {
            return null;
        }

        $token = $this->getAdminToken();

        $response = Http::withToken($token)
            ->acceptJson()
            ->timeout(10)
            ->get(
                $this->baseUrl
                .'/admin/realms/'
                .$this->realm
                .'/users',
                [
                    'username' => $username,
                    'exact' => 'true',
                    'max' => 10,
                ]
            );

        if ($response->failed()) {
            throw new RuntimeException(
                'Keycloak find user error: '
                .$response->status()
                .' - '
                .$response->body()
            );
        }

        $users = $response->json() ?? [];

        foreach ($users as $user) {
            if (
                strtolower(
                    trim((string) ($user['username'] ?? ''))
                ) === strtolower($username)
            ) {
                return $user;
            }
        }

        return null;
    }
}
