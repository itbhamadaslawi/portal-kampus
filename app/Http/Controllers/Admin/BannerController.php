<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Services\KeycloakService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render(
            'Admin/Banners/Index'
        );
    }

    public function data(Request $request): JsonResponse
    {
        $start = (int) $request->input(
            'start',
            0
        );

        $length = (int) $request->input(
            'length',
            10
        );

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
                'desc'
            )
        ) === 'asc'
            ? 'asc'
            : 'desc';

        $columns = [
            0 => 'title',
            1 => 'is_active',
            2 => 'created_at',
        ];

        $sortBy = $columns[$orderColumn]
            ?? 'created_at';

        $query = Banner::query()
            ->with([
                'groups:id,banner_id,group_name',
            ]);

        $recordsTotal = Banner::count();

        if ($search !== '') {
            $query->where(function ($query) use ($search) {
                $query
                    ->where(
                        'title',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhereHas(
                        'groups',
                        function ($groupQuery) use ($search) {
                            $groupQuery->where(
                                'group_name',
                                'like',
                                "%{$search}%"
                            );
                        }
                    );
            });
        }

        $recordsFiltered = $query->count();

        $banners = $query
            ->orderBy(
                $sortBy,
                $orderDirection
            )
            ->offset($start)
            ->limit($length)
            ->get([
                'id',
                'title',
                'image',
                'is_active',
                'created_at',
                'updated_at',
            ]);

        return response()->json([
            'draw' => (int) $request->input(
                'draw'
            ),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $banners,
        ]);
    }

    /**
     * Ambil semua group dari Keycloak
     * dan ubah menjadi nested tree berdasarkan path.
     */
    public function groups(
        KeycloakService $keycloakService
    ): JsonResponse {
        $groups = $keycloakService->getGroups();

        return response()->json([
            'data' => $this->buildGroupTree(
                $groups
            ),
        ]);
    }

    /**
     * Build nested group tree.
     *
     * Contoh data Keycloak:
     *
     * /company
     * /company/admin
     * /company/admin/superadmin
     * /company/user
     *
     * Menjadi:
     *
     * company
     * ├── admin
     * │   └── superadmin
     * └── user
     */
    private function buildGroupTree(
        array $groups
    ): array {
        $tree = [];

        foreach ($groups as $group) {
            $path = trim(
                (string) ($group['path'] ?? ''),
                '/'
            );

            if ($path === '') {
                continue;
            }

            $parts = explode(
                '/',
                $path
            );

            $current = &$tree;

            foreach (
                $parts as $index => $part
            ) {
                $currentPath = '/'
                    . implode(
                        '/',
                        array_slice(
                            $parts,
                            0,
                            $index + 1
                        )
                    );

                $found = null;

                foreach (
                    $current as $key => $item
                ) {
                    if (
                        $item['path']
                        === $currentPath
                    ) {
                        $found = $key;
                        break;
                    }
                }

                if ($found === null) {
                    $isLeaf =
                        $index
                        === count($parts) - 1;

                    $current[] = [
                        'id' => $isLeaf
                            ? (
                                $group['id']
                                ?? null
                            )
                            : null,

                        'name' => $part,

                        'path' => $currentPath,

                        'children' => [],
                    ];

                    $found =
                        array_key_last(
                            $current
                        );
                }

                $current =
                    &$current[$found]['children'];
            }

            unset($current);
        }

        return $tree;
    }

    /**
     * Ambil group yang sudah dipilih
     * untuk banner tertentu.
     */
    public function bannerGroups(
        Banner $banner
    ): JsonResponse {
        $groups = $banner
            ->groups()
            ->orderBy('group_name')
            ->get([
                'id',
                'banner_id',
                'group_name',
            ]);

        return response()->json([
            'data' => $groups,
        ]);
    }

    public function store(
        Request $request
    ): JsonResponse {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'image' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],

            'groups' => [
                'required',
                'array',
                'min:1',
            ],

            'groups.*' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        $directory = public_path(
            'banners'
        );

        if (! File::exists($directory)) {
            File::makeDirectory(
                $directory,
                0755,
                true
            );
        }

        $image = $request->file(
            'image'
        );

        $filename =
            Str::uuid()
            . '.'
            . $image->getClientOriginalExtension();

        $image->move(
            $directory,
            $filename
        );

        $banner = Banner::create([
            'title' =>
                $validated['title'],

            'image' =>
                $filename,

            'is_active' =>
                $validated['is_active']
                ?? true,
        ]);

        $this->syncGroups(
            $banner,
            $validated['groups']
        );

        return response()->json([
            'message' =>
                'Banner berhasil ditambahkan.',

            'data' =>
                $banner->load('groups'),
        ], 201);
    }

    public function show(
        Banner $banner
    ): JsonResponse {
        return response()->json([
            'data' => $banner->load('groups'),
        ]);
    }

    public function update(
        Request $request,
        Banner $banner
    ): JsonResponse {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],

            'groups' => [
                'required',
                'array',
                'min:1',
            ],

            'groups.*' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        if ($request->hasFile('image')) {
            $directory = public_path(
                'banners'
            );

            if (! File::exists($directory)) {
                File::makeDirectory(
                    $directory,
                    0755,
                    true
                );
            }

            if (
                $banner->image
                && File::exists(
                    $directory
                    . '/'
                    . $banner->image
                )
            ) {
                File::delete(
                    $directory
                    . '/'
                    . $banner->image
                );
            }

            $image = $request->file(
                'image'
            );

            $filename =
                Str::uuid()
                . '.'
                . $image->getClientOriginalExtension();

            $image->move(
                $directory,
                $filename
            );

            $banner->image =
                $filename;
        }

        $banner->title =
            $validated['title'];

        $banner->is_active =
            $validated['is_active']
            ?? false;

        $banner->save();

        $this->syncGroups(
            $banner,
            $validated['groups']
        );

        return response()->json([
            'message' =>
                'Banner berhasil diperbarui.',

            'data' =>
                $banner->load('groups'),
        ]);
    }

    /**
     * Sinkronisasi group banner.
     */
    private function syncGroups(
        Banner $banner,
        array $groups
    ): void {
        $groups = collect($groups)
            ->map(
                fn ($group) =>
                    trim($group)
            )
            ->filter()
            ->unique()
            ->values();

        $banner->groups()->delete();

        foreach ($groups as $groupName) {
            $banner->groups()->create([
                'group_name' =>
                    $groupName,
            ]);
        }
    }

    public function updateStatus(
        Request $request,
        Banner $banner
    ): JsonResponse {
        $validated = $request->validate([
            'is_active' => [
                'required',
                'boolean',
            ],
        ]);

        $banner->update([
            'is_active' =>
                $validated['is_active'],
        ]);

        return response()->json([
            'message' =>
                'Status banner berhasil diperbarui.',

            'data' =>
                $banner->fresh(),
        ]);
    }

    public function destroy(
        Banner $banner
    ): JsonResponse {
        $imagePath = public_path(
            'banners/'
            . $banner->image
        );

        if (
            $banner->image
            && File::exists($imagePath)
        ) {
            File::delete($imagePath);
        }

        $banner->delete();

        return response()->json([
            'message' =>
                'Banner berhasil dihapus.',
        ]);
    }
}
