<script setup>
import { Head } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
})

const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 500)
})

const formatName = (name) => {
    if (!name) return '-'

    return name
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

const userInitial = () => {
    const name = props.user?.name || props.user?.username || 'U'

    return name.charAt(0).toUpperCase()
}

/*
|--------------------------------------------------------------------------
| Format Group
|--------------------------------------------------------------------------
| Contoh:
|
| /users/mahasiswa  -> Mahasiswa
| /users/dosen      -> Dosen
| /admin            -> Admin
| /pimpinan         -> Pimpinan
|
*/
const formatGroup = (group) => {
    if (!group) return '-'

    const parts = group
        .split('/')
        .filter(Boolean)

    const last = parts.at(-1)

    if (!last) return '-'

    return last
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}
</script>

<template>

    <Head title="Profil Saya" />

    <DashboardLayout :user="user">

        <!-- =====================================================
             SKELETON
        ====================================================== -->
        <div v-if="loading" class="grid grid-cols-1 gap-4 lg:grid-cols-2">

            <!-- =================================================
                 PROFILE SKELETON
            ================================================== -->
            <div class="rounded-xl border border-gray-200
                       bg-white p-5 shadow-sm">

                <div class="flex items-center gap-4">

                    <!-- Avatar -->
                    <div class="h-16 w-16 shrink-0 animate-pulse
                               rounded-full bg-gray-200"></div>

                    <!-- Basic Info -->
                    <div class="flex-1 space-y-2">

                        <div class="h-5 w-44 animate-pulse
                                   rounded bg-gray-200"></div>

                        <div class="h-3.5 w-28 animate-pulse
                                   rounded bg-gray-200"></div>

                        <div class="h-3.5 w-56 animate-pulse
                                   rounded bg-gray-200"></div>

                    </div>

                </div>

                <!-- Email Status -->
                <div class="mt-5 h-7 w-32 animate-pulse
                           rounded-full bg-gray-200"></div>

            </div>


            <!-- =================================================
                 ACCOUNT SKELETON
            ================================================== -->
            <div class="rounded-xl border border-gray-200
                       bg-white p-5 shadow-sm">

                <div class="mb-5 space-y-2">

                    <div class="h-4 w-36 animate-pulse
                               rounded bg-gray-200"></div>

                    <div class="h-3.5 w-64 animate-pulse
                               rounded bg-gray-200"></div>

                </div>

                <div class="grid grid-cols-2
                           gap-x-6 gap-y-5">

                    <div v-for="item in 8" :key="item" class="space-y-2">

                        <div class="h-3 w-20 animate-pulse
                                   rounded bg-gray-200"></div>

                        <div class="h-4 w-full animate-pulse
                                   rounded bg-gray-200"></div>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================================
             DATA USER
        ====================================================== -->
        <div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-2">

            <!-- =================================================
                 PROFILE
            ================================================== -->
            <div class="rounded-xl border border-gray-200
                       bg-white p-5 shadow-sm">

                <!-- Header -->
                <div class="mb-5">

                    <h1 class="text-base font-semibold
                               text-gray-800">
                        Profil Saya
                    </h1>

                    <p class="mt-0.5 text-xs
                               text-gray-500">
                        Informasi profil akun Anda.
                    </p>

                </div>


                <!-- User -->
                <div class="flex items-center gap-4">

                    <!-- Avatar -->
                    <div class="flex h-16 w-16 shrink-0
                               items-center justify-center
                               overflow-hidden rounded-full
                               bg-emerald-100">

                        <img v-if="user.avatar" :src="user.avatar" :alt="formatName(user.name)"
                            class="h-full w-full object-cover" />

                        <span v-else class="text-xl font-bold
                                   text-emerald-700">
                            {{ userInitial() }}
                        </span>

                    </div>


                    <!-- Basic Info -->
                    <div class="min-w-0 flex-1">

                        <h2 class="truncate text-lg font-semibold
                                   text-gray-900">
                            {{ formatName(user.name) }}
                        </h2>

                        <p v-if="user.username" class="mt-0.5 truncate
                                   text-sm text-gray-500">
                            @{{ user.username }}
                        </p>

                        <p v-if="user.email" class="mt-0.5 truncate
                                   text-sm text-gray-500">
                            {{ user.email }}
                        </p>

                    </div>

                </div>


                <!-- Email Status -->
                <div class="mt-5">

                    <span v-if="user.email_verified" class="inline-flex items-center
                               gap-1.5 rounded-full
                               bg-emerald-50 px-3 py-1.5
                               text-xs font-medium
                               text-emerald-700">

                        <span class="h-1.5 w-1.5 rounded-full
                                   bg-emerald-500"></span>

                        Email terverifikasi

                    </span>

                    <span v-else class="inline-flex items-center
                               gap-1.5 rounded-full
                               bg-amber-50 px-3 py-1.5
                               text-xs font-medium
                               text-amber-700">

                        <span class="h-1.5 w-1.5 rounded-full
                                   bg-amber-500"></span>

                        Email belum terverifikasi

                    </span>

                </div>

            </div>


            <!-- =================================================
                 INFORMASI AKUN
            ================================================== -->
            <div class="rounded-xl border border-gray-200
                       bg-white p-5 shadow-sm">

                <!-- Header -->
                <div class="mb-5">

                    <h2 class="text-base font-semibold
                               text-gray-800">
                        Informasi Akun
                    </h2>

                    <p class="mt-0.5 text-xs
                               text-gray-500">
                        Informasi akun dari Keycloak SSO.
                    </p>

                </div>


                <div class="grid grid-cols-1
                           gap-x-6 gap-y-5
                           sm:grid-cols-2">

                    <!-- =================================================
                         USERNAME
                    ================================================== -->
                    <div>

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Username
                        </p>

                        <p class="mt-1 text-sm font-medium
                                   text-gray-700">
                            {{ user.username || '-' }}
                        </p>

                    </div>


                    <!-- =================================================
                         EMAIL
                    ================================================== -->
                    <div class="min-w-0">

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Email
                        </p>

                        <p class="mt-1 break-all
                                   text-sm font-medium
                                   text-gray-700">
                            {{ user.email || '-' }}
                        </p>

                    </div>


                    <!-- =================================================
                         NAMA LENGKAP
                    ================================================== -->
                    <div>

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Nama Lengkap
                        </p>

                        <p class="mt-1 text-sm font-medium
                                   text-gray-700">
                            {{ formatName(user.name) }}
                        </p>

                    </div>


                    <!-- =================================================
                         NAMA DEPAN
                    ================================================== -->
                    <div>

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Nama Depan
                        </p>

                        <p class="mt-1 text-sm font-medium
                                   text-gray-700">
                            {{ formatName(user.given_name) }}
                        </p>

                    </div>


                    <!-- =================================================
                         NAMA BELAKANG
                    ================================================== -->
                    <div>

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Nama Belakang
                        </p>

                        <p class="mt-1 text-sm font-medium
                                   text-gray-700">
                            {{ formatName(user.family_name) }}
                        </p>

                    </div>


                    <!-- =================================================
                         NICKNAME
                    ================================================== -->
                    <div>

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Nickname
                        </p>

                        <p class="mt-1 text-sm font-medium
                                   text-gray-700">
                            {{ user.nickname || '-' }}
                        </p>

                    </div>


                    <!-- =================================================
                         STATUS EMAIL
                    ================================================== -->
                    <div>

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Status Email
                        </p>

                        <div class="mt-1">

                            <span v-if="user.email_verified" class="inline-flex items-center
                                       rounded-full
                                       bg-emerald-50 px-2.5 py-1
                                       text-xs font-medium
                                       text-emerald-700">
                                Terverifikasi
                            </span>

                            <span v-else class="inline-flex items-center
                                       rounded-full
                                       bg-gray-100 px-2.5 py-1
                                       text-xs font-medium
                                       text-gray-600">
                                Belum terverifikasi
                            </span>

                        </div>

                    </div>


                    <!-- =================================================
                         GROUP
                    ================================================== -->
                    <div class="sm:col-span-2">

                        <p class="text-[11px] font-medium
                                   uppercase tracking-wide
                                   text-gray-400">
                            Group
                        </p>

                        <div class="mt-2 flex flex-wrap gap-2">

                            <!-- Group Badges -->
                            <span v-for="group in user.groups || []" :key="group" class="inline-flex items-center
                                       rounded-full
                                       bg-emerald-50 px-2.5 py-1
                                       text-xs font-medium
                                       text-emerald-700">
                                {{ formatGroup(group) }}
                            </span>


                            <!-- Empty -->
                            <span v-if="
                                !user.groups ||
                                user.groups.length === 0
                            " class="text-sm font-medium
                                       text-gray-500">
                                -
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </DashboardLayout>

</template>