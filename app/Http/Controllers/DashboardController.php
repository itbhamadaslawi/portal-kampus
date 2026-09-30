<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Banner;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = session('keycloak_user', []);

        $userGroups = $user['groups'] ?? [];

        $applications = Application::query()
            ->where('is_active', true)
            ->whereHas('groups', function ($query) use ($userGroups) {
                $query->whereIn('group_name', $userGroups);
            })
            ->orderBy('sort_order')
            ->get([
                'id',
                'name',
                'code',
                'description',
                'url',
                'icon',
            ]);

        $banners = $this->getDashboardBanners(
            $userGroups
        );

        return Inertia::render('Dashboard', [
            'user' => $user,
            'applications' => $applications->values()->toArray(),
            'banners' => $banners->values()->toArray(),
        ]);
    }

    private function getDashboardBanners(
        array $userGroups
    ): \Illuminate\Database\Eloquent\Collection {
        $groups = collect($userGroups)
            ->map(function ($group) {
                return trim($group);
            })
            ->filter()
            ->unique()
            ->values();

        $expandedGroups = collect();

        foreach ($groups as $group) {
            $parts = array_values(
                array_filter(
                    explode('/', trim($group, '/'))
                )
            );

            $path = '';

            foreach ($parts as $part) {
                $path .= '/' . $part;

                $expandedGroups->push($path);
            }
        }

        $expandedGroups = $expandedGroups
            ->unique()
            ->values();

        return Banner::query()
            ->where('is_active', true)
            ->whereHas('groups', function ($query) use (
                $expandedGroups
            ) {
                $query->whereIn(
                    'group_name',
                    $expandedGroups
                );
            })
            ->with([
                'groups:id,banner_id,group_name',
            ])
            ->orderByDesc('id')
            ->get([
                'id',
                'title',
                'image',
                'is_active',
            ]);
    }
}