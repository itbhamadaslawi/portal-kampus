<script setup>
import { Head, Link } from '@inertiajs/vue3'
import { ref } from 'vue'

const sidebarOpen = ref(false)

const logoUrl = '/images/logo.png'

const user = {
    name: 'Masruhin',
    username: 'masruhin',
    email: 'masruhin@bhamada.ac.id',
    role: 'Administrator',
}

// Nanti data ini berasal dari Laravel berdasarkan
// aplikasi yang memang boleh diakses oleh user.
const applications = [
    {
        name: 'SIAKAD',
        description: 'Sistem Informasi Akademik',
        url: '#',
        color: 'emerald',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.8" stroke="currentColor"
                class="h-6 w-6">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.75V19.5m0-12.75
                    A2.25 2.25 0 0 0 9.75 4.5H5.25
                    A2.25 2.25 0 0 0 3 6.75v10.5
                    A2.25 2.25 0 0 0 5.25 19.5H12
                    m0-12.75A2.25 2.25 0 0 1 14.25 4.5h4.5
                    A2.25 2.25 0 0 1 21 6.75v10.5
                    A2.25 2.25 0 0 1 18.75 19.5H12"/>
            </svg>
        `,
    },
    {
        name: 'SIMPEG',
        description: 'Sistem Informasi Kepegawaian',
        url: '#',
        color: 'blue',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.8" stroke="currentColor"
                class="h-6 w-6">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                    3.75 3.75 0 0 1 7.5 0ZM4.5 20.25
                    a8.25 8.25 0 0 1 15 0"/>
            </svg>
        `,
    },
    {
        name: 'CBT',
        description: 'Computer Based Test',
        url: '#',
        color: 'purple',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.8" stroke="currentColor"
                class="h-6 w-6">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 17.25h6M9.75 4.5h4.5
                    A2.25 2.25 0 0 1 16.5 6.75v10.5
                    A2.25 2.25 0 0 1 14.25 19.5h-4.5
                    A2.25 2.25 0 0 1 7.5 17.25V6.75
                    A2.25 2.25 0 0 1 9.75 4.5Z"/>
            </svg>
        `,
    },
    {
        name: 'Inventaris',
        description: 'Sistem Informasi Inventaris',
        url: '#',
        color: 'orange',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.8" stroke="currentColor"
                class="h-6 w-6">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 7.5-9-4.5-9 4.5m18 0-9 4.5m9-4.5v9
                    l-9 4.5m0-9L3 7.5m9 4.5v9M3 7.5v9l9 4.5"/>
            </svg>
        `,
    },
    {
        name: 'Keuangan',
        description: 'Sistem Informasi Keuangan',
        url: '#',
        color: 'rose',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.8" stroke="currentColor"
                class="h-6 w-6">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M3.75 5.25h16.5
                    A1.5 1.5 0 0 1 21.75 6.75v10.5
                    A1.5 1.5 0 0 1 20.25 18.75H3.75
                    A1.5 1.5 0 0 1 2.25 17.25V6.75
                    A1.5 1.5 0 0 1 3.75 5.25Z"/>
            </svg>
        `,
    },
    {
        name: 'Perpustakaan',
        description: 'Sistem Informasi Perpustakaan',
        url: '#',
        color: 'cyan',
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke-width="1.8" stroke="currentColor"
                class="h-6 w-6">
                <path stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 19.5h15M6 4.5h12
                    A1.5 1.5 0 0 1 19.5 6v10.5
                    A1.5 1.5 0 0 1 18 18H6
                    A1.5 1.5 0 0 1 4.5 16.5V6
                    A1.5 1.5 0 0 1 6 4.5Z"/>
            </svg>
        `,
    },
]
</script>

<template>

    <Head title="Dashboard" />

    <div class="min-h-screen bg-gray-50">

        <!-- ================= SIDEBAR ================= -->
        <aside class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col
                border-r border-gray-200 bg-white
                transition-transform duration-300" :class="sidebarOpen
                    ? 'translate-x-0'
                    : '-translate-x-full lg:translate-x-0'">
            <!-- Logo -->
            <div class="flex h-20 items-center gap-3 border-b border-gray-100 px-5">
                <img :src="logoUrl" alt="Logo Universitas Bhamada" class="h-10 w-10 object-contain" />

                <div>
                    <p class="text-sm font-bold text-gray-800">
                        Portal Bhamada
                    </p>

                    <p class="text-[11px] text-gray-400">
                        Universitas Bhamada
                    </p>
                </div>
            </div>

            <!-- Menu -->
            <nav class="flex-1 space-y-1 overflow-y-auto p-4">

                <Link href="/dashboard" class="flex items-center gap-3 rounded-lg
                        bg-emerald-50 px-4 py-3 text-sm font-medium
                        text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.954a1.125 1.125
                            0 0 1 1.592 0L21.75 12M4.5 9.75v9.75
                            A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0
                            1.5-1.5V9.75" />
                    </svg>

                    Dashboard
                </Link>

                <Link href="/akun" class="flex items-center gap-3 rounded-lg px-4 py-3
                        text-sm font-medium text-gray-600
                        transition hover:bg-gray-50 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                            3.75 3.75 0 0 1 7.5 0ZM4.5 20.25
                            a8.25 8.25 0 0 1 15 0" />
                    </svg>

                    Akun Saya
                </Link>

            </nav>

            <!-- Sidebar Footer -->
            
            <div class="border-t border-gray-100 px-4 py-4">
                <p class="text-center text-[11px] leading-relaxed text-gray-400">
                    © {{ new Date().getFullYear() }} Universitas Bhamada Slawi
                </p>

                <p class="mt-1 text-center text-[10px] text-gray-400">
                    UPT Sistem Informasi dan Teknologi
                </p>
            </div>
        </aside>

        <!-- Mobile overlay -->
        <div v-if="sidebarOpen" class="fixed inset-0 z-40 bg-black/30 lg:hidden" @click="sidebarOpen = false"></div>

        <!-- ================= MAIN ================= -->
        <div class="lg:pl-64">

            <!-- Topbar -->
            <header class="sticky top-0 z-30 flex h-20 items-center
                    justify-between border-b border-gray-200
                    bg-white/95 px-4 backdrop-blur sm:px-6">
                <div class="flex items-center gap-3">

                    <button type="button" class="rounded-lg p-2 text-gray-600
                            hover:bg-gray-100 lg:hidden" @click="sidebarOpen = true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5
                                M3.75 17.25h16.5" />
                        </svg>
                    </button>

                    <div>
                        <h1 class="text-lg font-semibold text-gray-800">
                            Dashboard
                        </h1>

                        <p class="hidden text-xs text-gray-400 sm:block">
                            Portal SSO Universitas Bhamada
                        </p>
                    </div>
                </div>

                <!-- User -->
                <div class="flex items-center gap-3">
                    <div class="hidden text-right sm:block">
                        <p class="text-sm font-semibold text-gray-800">
                            {{ user.name }}
                        </p>

                        <p class="text-xs text-gray-400">
                            {{ user.role }}
                        </p>
                    </div>

                    <div class="flex h-10 w-10 items-center justify-center
                            rounded-full bg-emerald-100 text-sm font-bold
                            text-emerald-700">
                        {{ user.name.charAt(0) }}
                    </div>
                </div>
            </header>

            <!-- Content -->
            <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                <!-- ================= WELCOME ================= -->
                <section class="relative overflow-hidden rounded-2xl
                        bg-gradient-to-r from-emerald-600 to-emerald-500
                        p-6 text-white shadow-sm sm:p-8">
                    <div class="relative z-10 max-w-2xl">

                        <p class="text-sm font-medium text-emerald-100">
                            Selamat datang kembali,
                        </p>

                        <h2 class="mt-1 text-2xl font-bold tracking-tight
                                sm:text-3xl">
                            {{ user.name }}
                        </h2>

                        <p class="mt-3 max-w-xl text-sm leading-relaxed
                                text-emerald-50">
                            Akses berbagai aplikasi Universitas Bhamada
                            melalui satu akun SSO.
                        </p>
                    </div>

                    <!-- Decorative -->
                    <div class="absolute -right-10 -top-10 h-40 w-40
                            rounded-full bg-white/10"></div>

                    <div class="absolute -bottom-16 right-20 h-44 w-44
                            rounded-full bg-white/5"></div>
                </section>

                <!-- ================= APPLICATIONS ================= -->
                <section class="mt-8">

                    <div class="mb-4 flex items-center justify-between">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">
                                Aplikasi Saya
                            </h2>

                            <p class="mt-1 text-sm text-gray-500">
                                Aplikasi yang dapat Anda akses
                            </p>
                        </div>
                    </div>

                    <div v-if="applications.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2
                            xl:grid-cols-3">
                        <a v-for="application in applications" :key="application.name" :href="application.url" class="group rounded-xl border border-gray-200
                                bg-white p-5 shadow-sm transition duration-200
                                hover:-translate-y-1 hover:border-emerald-200
                                hover:shadow-md">
                            <div class="flex items-start justify-between">

                                <div class="flex h-11 w-11 items-center
                                        justify-center rounded-xl
                                        bg-gray-50 text-gray-700
                                        transition group-hover:bg-emerald-50
                                        group-hover:text-emerald-600" v-html="application.icon"></div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.8" stroke="currentColor" class="h-5 w-5 text-gray-300
                                        transition group-hover:text-emerald-500">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>

                            <h3 class="mt-4 text-base font-semibold
                                    text-gray-800">
                                {{ application.name }}
                            </h3>

                            <p class="mt-1 text-sm leading-relaxed
                                    text-gray-500">
                                {{ application.description }}
                            </p>

                            <div class="mt-4 text-xs font-medium
                                    text-emerald-600">
                                Buka aplikasi →
                            </div>
                        </a>
                    </div>

                    <!-- Empty -->
                    <div v-else class="rounded-xl border border-dashed
                            border-gray-300 bg-white p-10 text-center">
                        <div class="mx-auto flex h-12 w-12 items-center
                                justify-center rounded-full bg-gray-100
                                text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                                stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5h6m-6 3h3M9 3.75h6
                                    A2.25 2.25 0 0 1 17.25 6v12
                                    A2.25 2.25 0 0 1 15 20.25H9
                                    A2.25 2.25 0 0 1 6.75 18V6
                                    A2.25 2.25 0 0 1 9 3.75Z" />
                            </svg>
                        </div>

                        <h3 class="mt-4 text-sm font-semibold
                                text-gray-800">
                            Belum ada aplikasi
                        </h3>

                        <p class="mt-1 text-sm text-gray-500">
                            Anda belum memiliki akses ke aplikasi.
                        </p>
                    </div>

                </section>

            </main>

            

        </div>
    </div>
</template>