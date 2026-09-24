<script setup>
import { Link, usePage } from '@inertiajs/vue3'

const logoUrl = '/images/logo.png'

const page = usePage()

defineProps({
    sidebarOpen: {
        type: Boolean,
        default: false,
    },

    sidebarMinimized: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits([
    'close',
])

const isActive = (url) => {
    return page.url === url
}
</script>

<template>

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-50
               flex flex-col
               border-r border-gray-200
               bg-white
               transition-all duration-300" :class="[
                sidebarOpen
                    ? 'translate-x-0'
                    : '-translate-x-full lg:translate-x-0',

                sidebarMinimized
                    ? 'w-20'
                    : 'w-64',
            ]">

        <!-- =========================
             LOGO
        ========================== -->
        <div class="flex h-20 shrink-0 items-center
                   border-b border-gray-100" :class="sidebarMinimized
                    ? 'justify-center px-3'
                    : 'gap-3 px-5'">

            <img :src="logoUrl" alt="Logo Universitas Bhamada" class="h-10 w-10 shrink-0 object-contain" />

            <div v-if="!sidebarMinimized" class="min-w-0">
                <p class="truncate text-sm
                           font-bold text-gray-800">
                    Portal Bhamada
                </p>

                <p class="truncate text-[11px]
                           text-gray-400">
                    Universitas Bhamada
                </p>
            </div>

        </div>


        <!-- =========================
             NAVIGATION
        ========================== -->
        <nav class="flex-1 space-y-1
                   overflow-y-auto p-3">

            <!-- Dashboard -->
            <Link href="/dashboard" class="group flex h-11
                       items-center rounded-lg
                       text-sm font-medium
                       transition-colors" :class="[
                        sidebarMinimized
                            ? 'justify-center'
                            : 'gap-3 px-3',

                        isActive('/dashboard')
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    ]" :title="sidebarMinimized
                        ? 'Dashboard'
                        : ''
                    " @click="emit('close')">

                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor" class="h-5 w-5 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75h6.5v6.5h-6.5v-6.5ZM13.75
                           3.75h6.5v6.5h-6.5v-6.5ZM3.75
                           13.75h6.5v6.5h-6.5v-6.5ZM13.75
                           13.75h6.5v6.5h-6.5v-6.5Z" />
                </svg>

                <span v-if="!sidebarMinimized" class="truncate">
                    Dashboard
                </span>

            </Link>


            <!-- Profil -->
            <Link href="/akun" class="group flex h-11
                       items-center rounded-lg
                       text-sm font-medium
                       transition-colors" :class="[
                        sidebarMinimized
                            ? 'justify-center'
                            : 'gap-3 px-3',

                        isActive('/akun')
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    ]" :title="sidebarMinimized
                        ? 'Profil Saya'
                        : ''
                    " @click="emit('close')">

                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor" class="h-5 w-5 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5
                           0 3.75 3.75 0 0 1 7.5 0ZM4.5
                           20.118a7.5 7.5 0 0 1 15 0" />
                </svg>

                <span v-if="!sidebarMinimized" class="truncate">
                    Profil Saya
                </span>

            </Link>


            <!-- Sesi Aktif -->
            <Link href="/sesi" class="group flex h-11
                       items-center rounded-lg
                       text-sm font-medium
                       transition-colors" :class="[
                        sidebarMinimized
                            ? 'justify-center'
                            : 'gap-3 px-3',

                        isActive('/sesi')
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                    ]" :title="sidebarMinimized
                        ? 'Sesi Aktif'
                        : ''
                    " @click="emit('close')">

                <!-- Icon -->
                <!-- Icon Sesi Aktif -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor" class="h-5 w-5 shrink-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25h6
           M6.75 3.75h10.5
           A2.25 2.25 0 0 1 19.5 6v7.5
           A2.25 2.25 0 0 1 17.25 15.75H6.75
           A2.25 2.25 0 0 1 4.5 13.5V6
           A2.25 2.25 0 0 1 6.75 3.75Z
           M8.25 20.25h7.5" />
                </svg>

                <span v-if="!sidebarMinimized" class="truncate">
                    Sesi Aktif
                </span>

            </Link>

        </nav>


        <!-- =========================
             FOOTER
        ========================== -->
        <div v-if="!sidebarMinimized" class="shrink-0 border-t
                   border-gray-100 px-4 py-4">
            <p class="text-center text-[11px]
                       leading-relaxed text-gray-400">
                © {{ new Date().getFullYear() }}
                Universitas Bhamada Slawi
            </p>

            <p class="mt-1 text-center text-[10px]
                       text-gray-400">
                UPT Sistem Informasi dan Teknologi
            </p>
        </div>

    </aside>


    <!-- Mobile Overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40
               bg-black/30 lg:hidden" @click="emit('close')"></div>

</template>