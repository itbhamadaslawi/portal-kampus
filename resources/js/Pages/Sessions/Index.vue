<script setup>
import { Head } from '@inertiajs/vue3'
import axios from 'axios'
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
})

const loading = ref(true)
const sessions = ref([])
const error = ref(null)

const fetchSessions = async () => {
    loading.value = true
    error.value = null

    try {
        const response = await axios.get('/api/sesi', {
            headers: {
                Accept: 'application/json',
            },
        })

        sessions.value = response.data?.data || []
    } catch (err) {
        console.error('Gagal mengambil sesi aktif:', err)

        error.value =
            'Sesi aktif belum dapat dimuat. Silakan coba lagi.'

        sessions.value = []
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSessions()
})
</script>

<template>

    <Head title="Sesi Aktif" />

    <DashboardLayout :user="user">

        <div class="mb-6 flex items-start gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                    stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25h6
                           M6.75 3.75h10.5
                           A2.25 2.25 0 0 1 19.5 6v7.5
                           A2.25 2.25 0 0 1 17.25 15.75H6.75
                           A2.25 2.25 0 0 1 4.5 13.5V6
                           A2.25 2.25 0 0 1 6.75 3.75Z
                           M8.25 20.25h7.5" />
                </svg>
            </div>

            <div>
                <h1 class="text-xl font-semibold text-gray-800">
                    Sesi Aktif
                </h1>

                <p class="mt-1 text-sm text-gray-500">
                    Lihat aplikasi yang sedang terhubung dengan akun SSO Anda.
                </p>
            </div>
        </div>

        <div v-if="!loading && error" class="mb-4 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div class="flex items-start gap-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75
                               M12 16.5h.0075
                               M10.29 3.86 2.82 17.25
                               A1.5 1.5 0 0 0 4.12 19.5h15.76
                               a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86
                               a1.5 1.5 0 0 0-2.62 0Z" />
                    </svg>
                </div>

                <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-red-700">
                        Sesi tidak dapat dimuat
                    </p>

                    <p class="mt-1 text-sm text-red-600">
                        {{ error }}
                    </p>

                    <button type="button"
                        class="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
                        @click="fetchSessions">
                        Coba lagi
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loading" class="space-y-4">
            <div class="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex items-center gap-4">
                    <div class="h-11 w-11 rounded-xl bg-gray-200"></div>

                    <div class="space-y-2">
                        <div class="h-4 w-28 rounded bg-gray-200"></div>
                        <div class="h-3 w-48 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>

            <div v-for="item in 2" :key="item"
                class="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex items-start gap-4">
                    <div class="h-12 w-12 shrink-0 rounded-xl bg-gray-200"></div>

                    <div class="min-w-0 flex-1 space-y-3">
                        <div class="h-4 w-44 rounded bg-gray-200"></div>
                        <div class="h-3 w-56 rounded bg-gray-200"></div>
                        <div class="h-3 w-40 rounded bg-gray-200"></div>
                    </div>

                    <div class="h-6 w-16 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>

        <div v-else-if="!error" class="space-y-4">
            <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div class="flex items-center gap-4">
                    <div
                        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a2.25 2.25 0 1 1 0 4.5
                                   2.25 2.25 0 0 1 0-4.5ZM4.5
                                   19.25a7.5 7.5 0 0 1 15 0" />
                        </svg>
                    </div>

                    <div>
                        <p class="text-sm font-semibold text-gray-800">
                            {{ sessions.length }} sesi aktif
                        </p>

                        <p class="mt-0.5 text-xs text-gray-500">
                            Aplikasi yang sedang terhubung dengan akun Anda
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="sessions.length" class="space-y-3">
                <div v-for="session in sessions" :key="session.id"
                    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
                    <div class="flex items-start gap-4">

                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                                stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 5.25A1.5 1.5 0 0 1 5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-9ZM8.25 20.25h7.5M12 15.75v4.5" />
                            </svg>
                        </div>

                        <div class="min-w-0 flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    Sedang mengakses
                                    {{ session.application }}
                                </h3>

                                <span
                                    class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                                    Aktif
                                </span>
                            </div>

                            <p class="mt-1 text-sm text-gray-500">
                                Sesi login melalui Portal Bhamada
                            </p>

                            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div v-if="session.ip">
                                    <p class="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Alamat IP
                                    </p>

                                    <p class="mt-1 text-sm font-medium text-gray-700">
                                        {{ session.ip }}
                                    </p>
                                </div>

                                <div v-if="session.started_at">
                                    <p class="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Mulai sesi
                                    </p>

                                    <p class="mt-1 text-sm font-medium text-gray-700">
                                        {{ session.started_at }}
                                    </p>
                                </div>

                                <div v-if="session.last_active">
                                    <p class="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Terakhir aktif
                                    </p>

                                    <p class="mt-1 text-sm font-medium text-gray-700">
                                        {{ session.last_active }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-7 w-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25h6
                               M6.75 3.75h10.5
                               A2.25 2.25 0 0 1 19.5 6v7.5
                               A2.25 2.25 0 0 1 17.25 15.75H6.75
                               A2.25 2.25 0 0 1 4.5 13.5V6
                               A2.25 2.25 0 0 1 6.75 3.75Z
                               M8.25 20.25h7.5" />
                    </svg>
                </div>

                <h3 class="mt-4 text-sm font-semibold text-gray-800">
                    Tidak ada sesi aktif
                </h3>

                <p class="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-gray-500">
                    Saat ini tidak ada aplikasi yang terhubung
                    dengan akun Anda.
                </p>
            </div>
        </div>

    </DashboardLayout>
</template>