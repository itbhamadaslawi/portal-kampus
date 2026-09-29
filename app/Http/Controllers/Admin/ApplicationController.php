<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\KeycloakService;
use App\Models\ApplicationGroup;

class ApplicationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render(
            'Admin/Applications/Index'
        );
    }

    public function data(Request $request): JsonResponse
    {
        $start = (int) $request->input('start', 0);
        $length = (int) $request->input('length', 10);

        $search = trim(
            (string) $request->input(
                'search.value',
                ''
            )
        );

        $orderColumn = (int) $request->input(
            'order.0.column',
            0
        );

        $orderDirection = strtolower(
            (string) $request->input(
                'order.0.dir',
                'asc'
            )
        ) === 'desc'
            ? 'desc'
            : 'asc';

        $columns = [
            0 => 'name',
            1 => 'code',
            2 => 'url',
            3 => 'sort_order',
            4 => 'is_active',
        ];

        $sortBy = $columns[$orderColumn] ?? 'sort_order';

        $query = Application::query();

        $recordsTotal = Application::count();

        if ($search !== '') {
            $query->where(function ($query) use ($search) {
                $query
                    ->where(
                        'name',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'code',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'description',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'url',
                        'like',
                        "%{$search}%"
                    );
            });
        }

        $recordsFiltered = $query->count();

        $applications = $query
            ->orderBy(
                $sortBy,
                $orderDirection
            )
            ->offset($start)
            ->limit($length)
            ->get([
                'id',
                'name',
                'code',
                'description',
                'url',
                'icon',
                'sort_order',
                'is_active',
                'created_at',
                'updated_at',
            ]);

        return response()->json([
            'draw' => (int) $request->input('draw'),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $applications,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'code' => [
                'required',
                'string',
                'max:100',
                'unique:applications,code',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'url' => [
                'required',
                'url',
                'max:255',
            ],
            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],
            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],
            'is_active' => [
                'nullable',
                'boolean',
            ],
        ]);

        $application = Application::create([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'description' => $validated['description'] ?? null,
            'url' => $validated['url'],
            'icon' => $validated['icon'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Aplikasi berhasil ditambahkan.',
            'data' => $application,
        ], 201);
    }

    public function show(
        Application $application
    ): JsonResponse {
        return response()->json([
            'data' => $application,
        ]);
    }

    public function update(
        Request $request,
        Application $application
    ): JsonResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'code' => [
                'required',
                'string',
                'max:100',
                'unique:applications,code,'
                . $application->id,
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'url' => [
                'required',
                'url',
                'max:255',
            ],
            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],
            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],
            'is_active' => [
                'nullable',
                'boolean',
            ],
        ]);

        $application->update([
            'name' => $validated['name'],
            'code' => $validated['code'],
            'description' => $validated['description'] ?? null,
            'url' => $validated['url'],
            'icon' => $validated['icon'] ?? null,
            'sort_order' => $validated['sort_order'] ?? 0,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json([
            'message' => 'Aplikasi berhasil diperbarui.',
            'data' => $application->fresh(),
        ]);
    }

    public function updateStatus(
        Request $request,
        Application $application
    ): JsonResponse {
        $validated = $request->validate([
            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $application->update([
            'is_active' => $validated['is_active'],
        ]);

        return response()->json([
            'message' => 'Status aplikasi berhasil diperbarui.',
            'data' => $application->fresh(),
        ]);
    }

    public function destroy(
        Application $application
    ): JsonResponse {
        $application->delete();

        return response()->json([
            'message' => 'Aplikasi berhasil dihapus.',
        ]);
    }

  public function groups(
    KeycloakService $keycloakService
): JsonResponse {
    $groups = $keycloakService->getGroups();

    return response()->json([
        'data' => $this->buildGroupTree($groups),
    ]);
}

private function buildGroupTree(array $groups): array
{
    $tree = [];

    foreach ($groups as $group) {
        $path = trim(
            (string) ($group['path'] ?? ''),
            '/'
        );

        if ($path === '') {
            continue;
        }

        $parts = explode('/', $path);

        $current = &$tree;

        foreach ($parts as $index => $part) {
            $currentPath = '/' . implode(
                '/',
                array_slice($parts, 0, $index + 1)
            );

            $found = null;

            foreach ($current as $key => $item) {
                if ($item['path'] === $currentPath) {
                    $found = $key;
                    break;
                }
            }

            if ($found === null) {
                $current[] = [
                    'id' => $index === count($parts) - 1
                        ? ($group['id'] ?? null)
                        : null,
                    'name' => $part,
                    'path' => $currentPath,
                    'children' => [],
                ];

                $found = array_key_last($current);
            }

            $current = &$current[$found]['children'];
        }

        unset($current);
    }

    return $tree;
}


public function applicationGroups(
    Application $application
): JsonResponse {
    $groups = $application->groups()
        ->orderBy('group_name')
        ->get([
            'id',
            'application_id',
            'group_name',
        ]);

    return response()->json([
        'data' => $groups,
    ]);
}

public function updateGroups(
    Request $request,
    Application $application
): JsonResponse {
    $validated = $request->validate([
        'groups' => [
            'array',
        ],

        'groups.*' => [
            'required',
            'string',
            'max:255',
        ],
    ]);

    $groups = collect(
        $validated['groups'] ?? []
    )
        ->map(function ($group) {
            return trim($group);
        })
        ->filter()
        ->unique()
        ->values();

    $application->groups()->delete();

    foreach ($groups as $groupName) {
        $application->groups()->create([
            'group_name' => $groupName,
        ]);
    }

    return response()->json([
        'message' => 'Group aplikasi berhasil diperbarui.',
        'data' => $application->groups()
            ->orderBy('group_name')
            ->get([
                'id',
                'application_id',
                'group_name',
            ]),
    ]);
}

}