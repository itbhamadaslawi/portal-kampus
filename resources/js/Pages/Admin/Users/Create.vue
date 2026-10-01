<script setup>
import { Head, router } from '@inertiajs/vue3'
import axios from 'axios'
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

import SiakadUserSync from '@/Components/Admin/Users/SiakadUserSync.vue'

const form = ref({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    enabled: true,
    emailVerified: false,
})


const processing = ref(false)
const errorMessage = ref('')
const errors = ref({})

const skeletonLoading = ref(true)

const availableGroups = ref([])
const selectedGroups = ref([])
const loadingGroups = ref(false)

const showGroupSelect = ref(false)
const showSubmitConfirm = ref(false)


const fillFromSiakad = (user) => {
    form.value.username =
        user.username ?? ''

    form.value.firstName =
        user.firstName ?? ''

    form.value.lastName =
        user.lastName ?? ''

    form.value.email =
        user.email ?? ''

    errors.value = {}
    errorMessage.value = ''
}


const getGroupLevel = (path) => {
    const normalizedPath = String(path || '')
        .trim()
        .replace(/^\/+|\/+$/g, '')

    if (!normalizedPath) {
        return 0
    }

    return Math.max(
        0,
        normalizedPath
            .split('/')
            .filter(Boolean)
            .length - 1
    )
}

const normalizeGroups = (
    items,
    result = []
) => {
    if (!Array.isArray(items)) {
        return result
    }

    items.forEach((group) => {
        if (!group) {
            return
        }

        const path = String(
            group.path ?? ''
        ).trim()

        const name = String(
            group.name ?? ''
        ).trim()

        if (path && name) {
            const existing = result.find(
                (item) => item.path === path
            )

            if (!existing) {
                result.push({
                    id: group.id ?? path,
                    name,
                    path,
                    level: Number.isFinite(
                        Number(group.level)
                    )
                        ? Number(group.level)
                        : getGroupLevel(path),
                })
            }
        }

        const children =
            group.subGroups ??
            group.subgroups ??
            group.children ??
            []

        if (Array.isArray(children)) {
            normalizeGroups(
                children,
                result
            )
        }
    })

    return result
}

const loadAvailableGroups = async () => {
    loadingGroups.value = true

    try {
        const response = await axios.get(
            '/admin/applications/groups',
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        availableGroups.value =
            normalizeGroups(
                response.data?.data ?? []
            )
    } catch (error) {
        availableGroups.value = []

        errorMessage.value =
            error.response?.data?.message ||
            'Group Keycloak gagal dimuat.'
    } finally {
        loadingGroups.value = false
    }
}

const openSubmitConfirm = async () => {
    errorMessage.value = ''
    errors.value = {}

    selectedGroups.value = []
    showGroupSelect.value = true

    await loadAvailableGroups()
}

const cancelGroupSelect = () => {
    if (processing.value) {
        return
    }

    showGroupSelect.value = false
    selectedGroups.value = []
}

const continueToSubmitConfirm = () => {
    if (!selectedGroups.value.length) {
        errorMessage.value =
            'Silakan pilih minimal satu group terlebih dahulu.'

        return
    }

    errorMessage.value = ''

    showGroupSelect.value = false
    showSubmitConfirm.value = true
}

const cancelSubmitConfirm = () => {
    if (processing.value) {
        return
    }

    showSubmitConfirm.value = false
    showGroupSelect.value = true
}

const getSelectedGroupName = (groupId) => {
    const group = availableGroups.value.find(
        (item) =>
            String(item.id) === String(groupId)
    )

    return group?.path || group?.name || groupId
}

const submit = async () => {
    processing.value = true
    errorMessage.value = ''
    errors.value = {}

    try {
        const response = await axios.post(
            '/admin/users',
            {
                ...form.value,
                group_ids: selectedGroups.value,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        router.visit(
            `/admin/users/${response.data.user.id}`
        )
    } catch (error) {
        if (error.response?.status === 422) {
            errors.value =
                error.response?.data?.errors || {}

            errorMessage.value =
                error.response?.data?.message ||
                'Data user belum valid.'

            showSubmitConfirm.value = false
        } else {
            errorMessage.value =
                error.response?.data?.message ||
                'User gagal dibuat.'
        }
    } finally {
        processing.value = false
    }
}

const cancel = () => {
    router.visit('/admin/users')
}

onMounted(() => {
    requestAnimationFrame(() => {
        skeletonLoading.value = false
    })
})
</script>

<template>

    <Head title="Tambah User" />

    <DashboardLayout>
        <div class="space-y-6">

            <template v-if="skeletonLoading">
                <div>
                    <div class="skeleton-shimmer h-7 w-32 rounded"></div>

                    <div class="skeleton-shimmer mt-2 h-4 w-72 rounded"></div>
                </div>

                <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <div class="skeleton-shimmer mb-2 h-4 w-20 rounded"></div>

                            <div class="skeleton-shimmer h-[42px] w-full rounded-lg"></div>
                        </div>

                        <div>
                            <div class="skeleton-shimmer mb-2 h-4 w-14 rounded"></div>

                            <div class="skeleton-shimmer h-[42px] w-full rounded-lg"></div>
                        </div>

                        <div>
                            <div class="skeleton-shimmer mb-2 h-4 w-24 rounded"></div>

                            <div class="skeleton-shimmer h-[42px] w-full rounded-lg"></div>
                        </div>

                        <div>
                            <div class="skeleton-shimmer mb-2 h-4 w-28 rounded"></div>

                            <div class="skeleton-shimmer h-[42px] w-full rounded-lg"></div>
                        </div>
                    </div>

                    <div class="mt-6 space-y-4 border-t border-gray-200 pt-5">
                        <div class="flex items-center gap-3">
                            <div class="skeleton-shimmer h-4 w-4 rounded"></div>

                            <div class="skeleton-shimmer h-4 w-24 rounded"></div>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="skeleton-shimmer h-4 w-4 rounded"></div>

                            <div class="skeleton-shimmer h-4 w-40 rounded"></div>
                        </div>
                    </div>

                    <div class="mt-5 flex justify-end gap-3 border-t border-gray-200 pt-5">
                        <div class="skeleton-shimmer h-[42px] w-20 rounded-lg"></div>

                        <div class="skeleton-shimmer h-[42px] w-32 rounded-lg"></div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div>
                    <h1 class="text-xl font-semibold text-gray-800">
                        Tambah User
                    </h1>

                    <p class="mt-1 text-sm text-gray-500">
                        Tambahkan akun pengguna baru ke SSO.
                    </p>
                </div>

                <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div v-if="errorMessage"
                        class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {{ errorMessage }}
                    </div>

                    <form class="space-y-6" @submit.prevent="openSubmitConfirm">
                        <SiakadUserSync @user-found="fillFromSiakad" />
                        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                                    Username
                                </label>

                                <input v-model="form.username" type="text" required autocomplete="username"
                                    placeholder="Username"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    :class="{
                                        'border-red-400':
                                            errors.username,
                                    }" />

                                <p v-if="errors.username" class="mt-1 text-xs text-red-600">
                                    {{ errors.username[0] }}
                                </p>
                            </div>

                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                                    Email
                                </label>

                                <input v-model="form.email" type="email" autocomplete="email"
                                    placeholder="email@bhamada.ac.id"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    :class="{
                                        'border-red-400':
                                            errors.email,
                                    }" />

                                <p v-if="errors.email" class="mt-1 text-xs text-red-600">
                                    {{ errors.email[0] }}
                                </p>
                            </div>

                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                                    Nama Depan
                                </label>

                                <input v-model="form.firstName" type="text" required placeholder="Nama depan"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    :class="{
                                        'border-red-400':
                                            errors.firstName,
                                    }" />

                                <p v-if="errors.firstName" class="mt-1 text-xs text-red-600">
                                    {{ errors.firstName[0] }}
                                </p>
                            </div>

                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                                    Nama Belakang
                                </label>

                                <input v-model="form.lastName" type="text" required placeholder="Nama belakang"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    :class="{
                                        'border-red-400':
                                            errors.lastName,
                                    }" />

                                <p v-if="errors.lastName" class="mt-1 text-xs text-red-600">
                                    {{ errors.lastName[0] }}
                                </p>
                            </div>
                        </div>

                        <div class="space-y-4 border-t border-gray-200 pt-5">
                            <label class="flex cursor-pointer items-center gap-3">
                                <input v-model="form.enabled" type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />

                                <span class="text-sm text-gray-700">
                                    User aktif
                                </span>
                            </label>

                            <label class="flex cursor-pointer items-center gap-3">
                                <input v-model="form.emailVerified" type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />

                                <span class="text-sm text-gray-700">
                                    Email sudah terverifikasi
                                </span>
                            </label>
                        </div>

                        <div class="flex justify-end gap-3 border-t border-gray-200 pt-5">
                            <button type="button"
                                class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                :disabled="processing" @click="cancel">
                                Batal
                            </button>

                            <button type="submit"
                                class="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="processing">
                                Simpan User
                            </button>
                        </div>
                    </form>
                </div>
            </template>

            <div v-if="showGroupSelect"
                class="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-gray-900/50 px-4 py-4 backdrop-blur-[2px] sm:items-center sm:py-6">
                <div
                    class="my-auto max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">
                    <div class="border-b border-gray-200 px-5 py-4">
                        <h2 class="text-lg font-semibold text-gray-800">
                            Pilih Group
                        </h2>

                        <p class="mt-1 text-sm text-gray-500">
                            Pilih group Keycloak untuk user ini.
                        </p>
                    </div>

                    <div class="p-5">
                        <div v-if="loadingGroups" class="space-y-3">
                            <div v-for="i in 5" :key="i" class="skeleton-shimmer h-10 w-full rounded-lg"></div>
                        </div>

                        <div v-else-if="availableGroups.length" class="space-y-1">
                            <label v-for="group in availableGroups" :key="group.id"
                                class="flex cursor-pointer items-center gap-3 rounded-lg py-2 pr-3 transition hover:bg-gray-50"
                                :style="{
                                    paddingLeft:
                                        `${12 + ((group.level || 0) * 24)}px`
                                }">
                                <input v-model="selectedGroups" type="checkbox" :value="group.id"
                                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />

                                <div class="min-w-0">
                                    <div class="text-sm font-medium text-gray-800">
                                        {{ group.name }}
                                    </div>

                                    <div class="text-xs text-gray-500">
                                        {{ group.path }}
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div v-else
                            class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                            Group Keycloak tidak ditemukan.
                        </div>

                        <div v-if="selectedGroups.length"
                            class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
                            <p class="text-sm font-medium text-emerald-800">
                                {{ selectedGroups.length }}
                                group dipilih
                            </p>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
                        <button type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            :disabled="processing" @click="cancelGroupSelect">
                            Batal
                        </button>

                        <button type="button"
                            class="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="processing ||
                                loadingGroups ||
                                !selectedGroups.length
                                " @click="continueToSubmitConfirm">
                            Lanjutkan
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="showSubmitConfirm"
                class="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/50 px-4 backdrop-blur-[2px]">
                <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                    <div class="border-b border-gray-200 px-5 py-4">
                        <h2 class="text-lg font-semibold text-gray-800">
                            Konfirmasi User
                        </h2>

                        <p class="mt-1 text-sm text-gray-500">
                            User akan dibuat dan dimasukkan ke group berikut.
                        </p>
                    </div>

                    <div class="p-5">
                        <div class="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
                            <p class="text-sm font-medium text-blue-800">
                                Group yang dipilih
                            </p>

                            <div class="mt-2 space-y-1">
                                <div v-for="groupId in selectedGroups" :key="groupId"
                                    class="text-sm font-semibold text-blue-800">
                                    {{ getSelectedGroupName(groupId) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
                        <button type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            :disabled="processing" @click="cancelSubmitConfirm">
                            Kembali
                        </button>

                        <button type="button"
                            class="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="processing" @click="submit">
                            {{
                                processing
                                    ? 'Menyimpan...'
                                    : 'Ya, Simpan User'
                            }}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </DashboardLayout>
</template>

<style scoped>
.skeleton-shimmer {
    position: relative;

    overflow: hidden;

    background: #f1f3f5;
}

.skeleton-shimmer::after {
    position: absolute;

    inset: 0;

    content: '';

    transform: translateX(-100%);

    background: linear-gradient(90deg,
            transparent 0%,
            rgb(255 255 255 / 45%) 40%,
            rgb(255 255 255 / 80%) 50%,
            rgb(255 255 255 / 45%) 60%,
            transparent 100%);

    animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>
