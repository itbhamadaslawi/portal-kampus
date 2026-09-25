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
const killingSession = ref(null)
const confirmSession = ref(null)

const getDeviceType = (session) => {
    const os = (session.os || '').toLowerCase()
    const device = (session.device || '').toLowerCase()

    if (
        session.mobile ||
        os.includes('android') ||
        os.includes('ios') ||
        device.includes('phone') ||
        device.includes('mobile')
    ) {
        return 'mobile'
    }

    if (
        device.includes('tablet') ||
        device.includes('ipad')
    ) {
        return 'tablet'
    }

    if (
        os.includes('windows') ||
        os.includes('mac') ||
        os.includes('linux') ||
        os.includes('ubuntu') ||
        device.includes('desktop') ||
        device.includes('computer') ||
        device.includes('other')
    ) {
        return 'desktop'
    }

    return 'device'
}

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
        const status = err?.response?.status

        if (status === 401) {
            error.value =
                'Sesi Anda sudah berakhir. Silakan masuk kembali untuk melihat sesi aktif.'
        } else if (status === 403) {
            error.value =
                'Anda tidak memiliki izin untuk melihat sesi aktif.'
        } else if (status >= 500) {
            error.value =
                'Sistem sedang mengalami kendala saat mengambil informasi sesi. Silakan coba beberapa saat lagi.'
        } else {
            error.value =
                'Informasi sesi aktif belum dapat ditampilkan. Silakan coba lagi.'
        }

        sessions.value = []
    } finally {
        loading.value = false
    }
}

const confirmKillSession = (session) => {
    confirmSession.value = session
}

const killSession = async () => {
    const session = confirmSession.value

    if (!session) {
        return
    }

    confirmSession.value = null
    killingSession.value = session.id
    error.value = null

    try {
        await axios.delete(
            `/api/sesi/${encodeURIComponent(session.id)}`,
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        )

        sessions.value = sessions.value.filter(
            (item) => item.id !== session.id
        )
    } catch (err) {
        const status = err?.response?.status

        if (status === 401) {
            error.value =
                'Sesi Anda sudah berakhir. Silakan masuk kembali.'
        } else if (status === 404) {
            error.value =
                'Sesi tersebut sudah tidak aktif atau tidak ditemukan.'
        } else if (status === 403) {
            error.value =
                'Anda tidak memiliki izin untuk menghentikan sesi ini.'
        } else {
            error.value =
                err?.response?.data?.message ||
                'Sesi tidak dapat dihentikan saat ini. Silakan coba lagi.'
        }
    } finally {
        killingSession.value = null
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
            <div
                class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="currentColor"
                    class="h-6 w-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 17.25h6
                           M6.75 3.75h10.5
                           A2.25 2.25 0 0 1 19.5 6v7.5
                           A2.25 2.25 0 0 1 17.25 15.75H6.75
                           A2.25 2.25 0 0 1 4.5 13.5V6
                           A2.25 2.25 0 0 1 6.75 3.75Z
                           M8.25 20.25h7.5"
                    />
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

        <div
            v-if="!loading && error"
            class="mb-4 rounded-2xl border border-red-200 bg-red-50 p-5"
        >
            <div class="flex items-start gap-3">
                <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.8"
                        stroke="currentColor"
                        class="h-5 w-5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75
                               M12 16.5h.0075
                               M10.29 3.86 2.82 17.25
                               A1.5 1.5 0 0 0 4.12 19.5h15.76
                               a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86
                               a1.5 1.5 0 0 0-2.62 0Z"
                        />
                    </svg>
                </div>

                <div class="min-w-0 flex-1">
                    <p class="text-sm font-semibold text-red-700">
                        Sesi tidak dapat diproses
                    </p>

                    <p class="mt-1 text-sm leading-relaxed text-red-600">
                        {{ error }}
                    </p>

                    <button
                        type="button"
                        class="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
                        @click="fetchSessions"
                    >
                        Coba lagi
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loading" class="space-y-4">
            <div
                class="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="flex items-center gap-4">
                    <div class="h-11 w-11 rounded-xl bg-gray-200"></div>

                    <div class="space-y-2">
                        <div class="h-4 w-28 rounded bg-gray-200"></div>
                        <div class="h-3 w-48 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>

            <div
                v-for="item in 2"
                :key="item"
                class="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="flex items-start gap-4">
                    <div class="h-12 w-12 shrink-0 rounded-xl bg-gray-200"></div>

                    <div class="min-w-0 flex-1 space-y-3">
                        <div class="h-4 w-44 rounded bg-gray-200"></div>
                        <div class="h-3 w-56 rounded bg-gray-200"></div>
                        <div class="h-3 w-40 rounded bg-gray-200"></div>
                    </div>

                    <div class="h-8 w-20 rounded-lg bg-gray-200"></div>
                </div>
            </div>
        </div>

        <div v-else-if="!error" class="space-y-4">
            <div
                class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.8"
                            stroke="currentColor"
                            class="h-5 w-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a2.25 2.25 0 1 1 0 4.5
                                   2.25 2.25 0 0 1 0-4.5ZM4.5
                                   19.25a7.5 7.5 0 0 1 15 0"
                            />
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

            <div
                v-if="sessions.length"
                class="space-y-3"
            >
                <div
                    v-for="session in sessions"
                    :key="session.id"
                    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div
                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
                        >
                            <svg
                                v-if="getDeviceType(session) === 'mobile'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.8"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M7.5 3.75h9A1.5 1.5 0 0 1 18 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.75V5.25a1.5 1.5 0 0 1 1.5-1.5ZM10.5 17.25h3"
                                />
                            </svg>

                            <svg
                                v-else-if="getDeviceType(session) === 'tablet'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.8"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6.75 3.75h10.5A1.5 1.5 0 0 1 18.75 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5ZM10.5 17.25h3"
                                />
                            </svg>

                            <svg
                                v-else-if="getDeviceType(session) === 'desktop'"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.8"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4.5 5.25A1.5 1.5 0 0 1 6 3.75h12a1.5 1.5 0 0 1 1.5 1.5v8.25A1.5 1.5 0 0 1 18 15H6a1.5 1.5 0 0 1-1.5-1.5V5.25ZM8.25 20.25h7.5M12 15v5.25"
                                />
                            </svg>

                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.8"
                                stroke="currentColor"
                                class="h-6 w-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Zm0 0v16.5M3.75 12h16.5"
                                />
                            </svg>
                        </div>

                        <div class="min-w-0 flex-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h3 class="text-sm font-semibold text-gray-800">
                                    Sedang mengakses
                                    {{ session.application }}
                                </h3>

                                <span
                                    class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700"
                                >
                                    <span
                                        class="h-1.5 w-1.5 rounded-full bg-emerald-500"
                                    ></span>

                                    Aktif
                                </span>
                            </div>

                            <p class="mt-1 text-sm text-gray-500">
                                Sesi aktif pada aplikasi SSO
                            </p>

                            <div
                                class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3"
                            >
                                <div v-if="session.ip">
                                    <p
                                        class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Alamat IP
                                    </p>

                                    <p
                                        class="mt-1 text-sm font-medium text-gray-700"
                                    >
                                        {{ session.ip }}
                                    </p>
                                </div>

                                <div v-if="session.started_at">
                                    <p
                                        class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Mulai sesi
                                    </p>

                                    <p
                                        class="mt-1 text-sm font-medium text-gray-700"
                                    >
                                        {{ session.started_at }}
                                    </p>
                                </div>

                                <div v-if="session.last_active">
                                    <p
                                        class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Terakhir aktif
                                    </p>

                                    <p
                                        class="mt-1 text-sm font-medium text-gray-700"
                                    >
                                        {{ session.last_active }}
                                    </p>
                                </div>
                            </div>

                            <div
                                v-if="
                                    session.browser ||
                                    session.os ||
                                    session.device
                                "
                                class="mt-4 flex flex-wrap gap-2"
                            >
                                <span
                                    v-if="session.device"
                                    class="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                                >
                                    {{ session.device }}
                                </span>

                                <span
                                    v-if="session.browser"
                                    class="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                                >
                                    {{ session.browser }}
                                </span>

                                <span
                                    v-if="session.os"
                                    class="rounded-lg bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                                >
                                    {{ session.os }}

                                    <span v-if="session.os_version">
                                        {{ session.os_version }}
                                    </span>
                                </span>

                                <span
                                    v-if="session.current"
                                    class="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                                >
                                    Perangkat ini
                                </span>
                            </div>
                        </div>

                        <div
                            v-if="!session.current"
                            class="shrink-0 sm:pt-0"
                        >
                            <button
                                type="button"
                                :disabled="killingSession === session.id"
                                class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                @click="confirmKillSession(session)"
                            >
                                <svg
                                    v-if="killingSession === session.id"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.8"
                                    stroke="currentColor"
                                    class="h-4 w-4 animate-spin"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 3v2.25M12 18.75V21M4.93 4.93l1.59 1.59M17.48 17.48l1.59 1.59M3 12h2.25M18.75 12H21M4.93 19.07l1.59-1.59M17.48 6.52l1.59-1.59"
                                    />
                                </svg>

                                <svg
                                    v-else
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.8"
                                    stroke="currentColor"
                                    class="h-4 w-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 12h7.5m0 0-3-3m3 3-3 3"
                                    />
                                </svg>

                                {{
                                    killingSession === session.id
                                        ? 'Menghentikan...'
                                        : 'Keluar'
                                }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-else
                class="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center"
            >
                <div
                    class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-7 w-7"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 17.25h6
                               M6.75 3.75h10.5
                               A2.25 2.25 0 0 1 19.5 6v7.5
                               A2.25 2.25 0 0 1 17.25 15.75H6.75
                               A2.25 2.25 0 0 1 4.5 13.5V6
                               A2.25 2.25 0 0 1 6.75 3.75Z
                               M8.25 20.25h7.5"
                        />
                    </svg>
                </div>

                <h3 class="mt-4 text-sm font-semibold text-gray-800">
                    Tidak ada sesi aktif
                </h3>

                <p
                    class="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-gray-500"
                >
                    Saat ini tidak ada aplikasi yang terhubung
                    dengan akun Anda.
                </p>
            </div>
        </div>

        <div
            v-if="confirmSession"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            <div
                class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            >
                <div class="flex items-start gap-4">
                    <div
                        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.8"
                            stroke="currentColor"
                            class="h-6 w-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v3.75
                                   M12 16.5h.0075
                                   M10.29 3.86 2.82 17.25
                                   A1.5 1.5 0 0 0 4.12 19.5h15.76
                                   a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86
                                   a1.5 1.5 0 0 0-2.62 0Z"
                            />
                        </svg>
                    </div>

                    <div class="min-w-0 flex-1">
                        <h3 class="text-base font-semibold text-gray-800">
                            Hentikan sesi?
                        </h3>

                        <p class="mt-2 text-sm leading-relaxed text-gray-500">
                            Anda akan mengeluarkan perangkat ini dari sesi SSO.
                            Perangkat tersebut harus login kembali untuk
                            mengakses aplikasi.
                        </p>

                        <div
                            class="mt-4 rounded-xl bg-gray-50 p-3"
                        >
                            <p class="text-sm font-medium text-gray-700">
                                {{ confirmSession.application }}
                            </p>

                            <p
                                v-if="confirmSession.browser"
                                class="mt-1 text-xs text-gray-500"
                            >
                                {{ confirmSession.browser }}
                            </p>

                            <p
                                v-if="confirmSession.os"
                                class="mt-1 text-xs text-gray-500"
                            >
                                {{ confirmSession.os }}

                                <span v-if="confirmSession.os_version">
                                    {{ confirmSession.os_version }}
                                </span>
                            </p>

                            <p
                                v-if="confirmSession.ip"
                                class="mt-1 text-xs text-gray-500"
                            >
                                IP: {{ confirmSession.ip }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        @click="confirmSession = null"
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        :disabled="killingSession !== null"
                        class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        @click="killSession"
                    >
                        {{
                            killingSession
                                ? 'Menghentikan...'
                                : 'Ya, hentikan sesi'
                        }}
                    </button>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>