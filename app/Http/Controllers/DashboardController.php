<?php

namespace App\Http\Controllers;

use App\Models\Application;
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

        return Inertia::render('Dashboard', [
            'user' => $user,
            'applications' => $applications->values()->toArray(),
        ]);
    }
}