<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\ApplicationGroup;
use Illuminate\Database\Seeder;

class ApplicationGroupSeeder extends Seeder
{
    public function run(): void
    {
        $access = [
            'siakad' => [
                '/Admin',
                '/Pimpinan',
                '/Users/Dosen',
                '/Users/Mahasiswa',
            ],

            'simpeg' => [
                '/Admin',
                '/Users/Pegawai',
                '/Users/Tendik',
            ],

            'cbt' => [
                '/Admin',
                '/Users/Dosen',
                '/Users/Mahasiswa',
            ],

            'inventaris' => [
                '/Admin',
                '/Users/Pegawai',
                '/Users/Tendik',
            ],

            'keuangan' => [
                '/Admin',
                '/Pimpinan',
                '/Users/Pegawai',
            ],

            'perpustakaan' => [
                '/Admin',
                '/Pimpinan',
                '/Users/Dosen',
                '/Users/Mahasiswa',
                '/Users/Pegawai',
                '/Users/Tendik',
            ],
        ];

        foreach ($access as $applicationCode => $groups) {
            $application = Application::where(
                'code',
                $applicationCode
            )->first();

            if (! $application) {
                continue;
            }

            foreach ($groups as $groupName) {
                ApplicationGroup::updateOrCreate([
                    'application_id' => $application->id,
                    'group_name' => $groupName,
                ]);
            }
        }
    }
}