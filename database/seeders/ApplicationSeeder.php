<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $applications = [
            [
                'name' => 'SIAKAD',
                'code' => 'siakad',
                'description' => 'Sistem Informasi Akademik',
                'url' => 'https://siakad.bhamada.ac.id',
                'icon' => 'siakad',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'SIMPEG',
                'code' => 'simpeg',
                'description' => 'Sistem Informasi Kepegawaian',
                'url' => 'https://simpeg.bhamada.ac.id',
                'icon' => 'simpeg',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'CBT',
                'code' => 'cbt',
                'description' => 'Computer Based Test',
                'url' => 'https://cbt.bhamada.ac.id',
                'icon' => 'cbt',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Inventaris',
                'code' => 'inventaris',
                'description' => 'Sistem Informasi Inventaris',
                'url' => 'https://inventaris.bhamada.ac.id',
                'icon' => 'inventaris',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Keuangan',
                'code' => 'keuangan',
                'description' => 'Sistem Informasi Keuangan',
                'url' => 'https://keuangan.bhamada.ac.id',
                'icon' => 'keuangan',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Perpustakaan',
                'code' => 'perpustakaan',
                'description' => 'Sistem Informasi Perpustakaan',
                'url' => 'https://perpustakaan.bhamada.ac.id',
                'icon' => 'perpustakaan',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($applications as $application) {
            Application::updateOrCreate(
                [
                    'code' => $application['code'],
                ],
                $application
            );
        }
    }
}