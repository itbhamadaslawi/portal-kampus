<script setup>
import { Head } from '@inertiajs/vue3'
import axios from 'axios'
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
})

const loading = ref(true)

const showEditModal = ref(false)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    nickname: '',
})

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

const openEditModal = () => {
    successMessage.value = ''
    errorMessage.value = ''

    form.value = {
        firstName: props.user?.given_name || '',
        lastName: props.user?.family_name || '',
        email: props.user?.email || '',
        nickname: props.user?.nickname || '',
    }

    showEditModal.value = true
}

const closeEditModal = () => {
    if (saving.value) {
        return
    }

    showEditModal.value = false
    errorMessage.value = ''
}

const saveProfile = async () => {
    saving.value = true
    errorMessage.value = ''
    successMessage.value = ''

    try {
        const response = await axios.put(
            '/account/profile',
            {
                firstName: form.value.firstName,
                lastName: form.value.lastName,
                email: form.value.email,
                nickname: form.value.nickname,
            },
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        const updatedUser = response.data?.user

        if (updatedUser) {
            Object.assign(props.user, updatedUser)
        }

        successMessage.value =
            response.data?.message ||
            'Profil berhasil diperbarui.'

        showEditModal.value = false
    } catch (error) {
        if (error.response?.status === 422) {
            errorMessage.value =
                error.response?.data?.message ||
                'Data profil tidak valid.'
        } else if (error.response?.status === 403) {
            errorMessage.value =
                'Anda tidak memiliki izin untuk mengubah profil.'
        } else if (error.response?.status === 401) {
            errorMessage.value =
                'Sesi Anda sudah berakhir. Silakan login kembali.'
        } else {
            errorMessage.value =
                error.response?.data?.message ||
                'Profil gagal diperbarui. Silakan coba lagi.'
        }
    } finally {
        saving.value = false
    }
}
</script>

<template>
    <Head title="Profil Saya" />

    <DashboardLayout :user="user">
        <div
            v-if="successMessage"
            class="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
            <div class="flex items-center gap-3">
                <div
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"
                >
                    <svg
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
                            d="m5 12 4.5 4.5L19 7"
                        />
                    </svg>
                </div>

                <p class="text-sm font-medium text-emerald-700">
                    {{ successMessage }}
                </p>
            </div>
        </div>

        <div
            v-if="loading"
            class="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
            <div
                class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="flex items-center gap-4">
                    <div
                        class="h-16 w-16 shrink-0 animate-pulse rounded-full bg-gray-200"
                    ></div>

                    <div class="flex-1 space-y-2">
                        <div
                            class="h-5 w-44 animate-pulse rounded bg-gray-200"
                        ></div>

                        <div
                            class="h-3.5 w-28 animate-pulse rounded bg-gray-200"
                        ></div>

                        <div
                            class="h-3.5 w-56 animate-pulse rounded bg-gray-200"
                        ></div>
                    </div>
                </div>

                <div
                    class="mt-5 h-7 w-32 animate-pulse rounded-full bg-gray-200"
                ></div>
            </div>

            <div
                class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="mb-5 space-y-2">
                    <div
                        class="h-4 w-36 animate-pulse rounded bg-gray-200"
                    ></div>

                    <div
                        class="h-3.5 w-64 animate-pulse rounded bg-gray-200"
                    ></div>
                </div>

                <div
                    class="grid grid-cols-2 gap-x-6 gap-y-5"
                >
                    <div
                        v-for="item in 8"
                        :key="item"
                        class="space-y-2"
                    >
                        <div
                            class="h-3 w-20 animate-pulse rounded bg-gray-200"
                        ></div>

                        <div
                            class="h-4 w-full animate-pulse rounded bg-gray-200"
                        ></div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-else
            class="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
            <div
                class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h1
                            class="text-base font-semibold text-gray-800"
                        >
                            Profil Saya
                        </h1>

                        <p class="mt-0.5 text-xs text-gray-500">
                            Informasi profil akun Anda.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-700"
                        @click="openEditModal"
                    >
                        <svg
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
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652l-8.99 8.99a4.5 4.5 0 0 1-1.897 1.13l-2.42.726.726-2.42a4.5 4.5 0 0 1 1.13-1.897l8.99-8.99ZM16.862 4.487 19.5 7.125"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M18.75 12.75v5.625A2.625 2.625 0 0 1 16.125 21H5.625A2.625 2.625 0 0 1 3 18.375V7.875A2.625 2.625 0 0 1 5.625 5.25h5.625"
                            />
                        </svg>

                        Edit Profil
                    </button>
                </div>

                <div class="flex items-center gap-4">
                    <div
                        class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100"
                    >
                        <img
                            v-if="user.avatar"
                            :src="user.avatar"
                            :alt="formatName(user.name)"
                            class="h-full w-full object-cover"
                        />

                        <span
                            v-else
                            class="text-xl font-bold text-emerald-700"
                        >
                            {{ userInitial() }}
                        </span>
                    </div>

                    <div class="min-w-0 flex-1">
                        <h2
                            class="truncate text-lg font-semibold text-gray-900"
                        >
                            {{ formatName(user.name) }}
                        </h2>

                        <p
                            v-if="user.username"
                            class="mt-0.5 truncate text-sm text-gray-500"
                        >
                            @{{ user.username }}
                        </p>

                        <p
                            v-if="user.email"
                            class="mt-0.5 truncate text-sm text-gray-500"
                        >
                            {{ user.email }}
                        </p>
                    </div>
                </div>

                <div class="mt-5">
                    <span
                        v-if="user.email_verified"
                        class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                    >
                        <span
                            class="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        ></span>

                        Email terverifikasi
                    </span>

                    <span
                        v-else
                        class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                    >
                        <span
                            class="h-1.5 w-1.5 rounded-full bg-amber-500"
                        ></span>

                        Email belum terverifikasi
                    </span>
                </div>
            </div>

            <div
                class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div class="mb-5">
                    <h2
                        class="text-base font-semibold text-gray-800"
                    >
                        Informasi Akun
                    </h2>

                    <p class="mt-0.5 text-xs text-gray-500">
                        Informasi akun dari Keycloak SSO.
                    </p>
                </div>

                <div
                    class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"
                >
                    <div>
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Username
                        </p>

                        <p
                            class="mt-1 text-sm font-medium text-gray-700"
                        >
                            {{ user.username || '-' }}
                        </p>
                    </div>

                    <div class="min-w-0">
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Email
                        </p>

                        <p
                            class="mt-1 break-all text-sm font-medium text-gray-700"
                        >
                            {{ user.email || '-' }}
                        </p>
                    </div>

                    <div>
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Nama Lengkap
                        </p>

                        <p
                            class="mt-1 text-sm font-medium text-gray-700"
                        >
                            {{ formatName(user.name) }}
                        </p>
                    </div>

                    <div>
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Nama Depan
                        </p>

                        <p
                            class="mt-1 text-sm font-medium text-gray-700"
                        >
                            {{ formatName(user.given_name) }}
                        </p>
                    </div>

                    <div>
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Nama Belakang
                        </p>

                        <p
                            class="mt-1 text-sm font-medium text-gray-700"
                        >
                            {{ formatName(user.family_name) }}
                        </p>
                    </div>

                    <div>
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Nickname
                        </p>

                        <p
                            class="mt-1 text-sm font-medium text-gray-700"
                        >
                            {{ user.nickname || '-' }}
                        </p>
                    </div>

                    <div>
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Status Email
                        </p>

                        <div class="mt-1">
                            <span
                                v-if="user.email_verified"
                                class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                            >
                                Terverifikasi
                            </span>

                            <span
                                v-else
                                class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                            >
                                Belum terverifikasi
                            </span>
                        </div>
                    </div>

                    <div class="sm:col-span-2">
                        <p
                            class="text-[11px] font-medium uppercase tracking-wide text-gray-400"
                        >
                            Group
                        </p>

                        <div class="mt-2 flex flex-wrap gap-2">
                            <span
                                v-for="group in user.groups || []"
                                :key="group"
                                class="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                            >
                                {{ formatGroup(group) }}
                            </span>

                            <span
                                v-if="
                                    !user.groups ||
                                    user.groups.length === 0
                                "
                                class="text-sm font-medium text-gray-500"
                            >
                                -
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="showEditModal"
            class="fixed inset-0 z-[99999] flex items-center justify-center bg-gray-900/50 px-4 py-6"
            @click.self="closeEditModal"
        >
            <div
                class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
            >
                <div
                    class="flex items-center justify-between border-b border-gray-200 px-5 py-4"
                >
                    <div>
                        <h2
                            class="text-base font-semibold text-gray-800"
                        >
                            Edit Profil
                        </h2>

                        <p class="mt-0.5 text-xs text-gray-500">
                            Perbarui informasi akun Keycloak Anda.
                        </p>
                    </div>

                    <button
                        type="button"
                        :disabled="saving"
                        class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                        @click="closeEditModal"
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
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="saveProfile">
                    <div class="space-y-5 px-5 py-5">
                        <div
                            v-if="errorMessage"
                            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                        >
                            <p class="text-sm text-red-600">
                                {{ errorMessage }}
                            </p>
                        </div>

                        <div>
                            <label
                                class="mb-1.5 block text-xs font-medium text-gray-700"
                            >
                                Username
                            </label>

                            <input
                                :value="user.username || ''"
                                type="text"
                                disabled
                                class="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500 outline-none"
                            />

                            <p
                                class="mt-1.5 text-[11px] text-gray-400"
                            >
                                Username tidak dapat diubah.
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    for="firstName"
                                    class="mb-1.5 block text-xs font-medium text-gray-700"
                                >
                                    Nama Depan
                                </label>

                                <input
                                    id="firstName"
                                    v-model="form.firstName"
                                    type="text"
                                    autocomplete="given-name"
                                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                    placeholder="Nama depan"
                                    :disabled="saving"
                                />
                            </div>

                            <div>
                                <label
                                    for="lastName"
                                    class="mb-1.5 block text-xs font-medium text-gray-700"
                                >
                                    Nama Belakang
                                </label>

                                <input
                                    id="lastName"
                                    v-model="form.lastName"
                                    type="text"
                                    autocomplete="family-name"
                                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                    placeholder="Nama belakang"
                                    :disabled="saving"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                for="nickname"
                                class="mb-1.5 block text-xs font-medium text-gray-700"
                            >
                                Nickname
                            </label>

                            <input
                                id="nickname"
                                v-model="form.nickname"
                                type="text"
                                autocomplete="nickname"
                                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                placeholder="Nickname"
                                :disabled="saving"
                            />
                        </div>

                        <div>
                            <label
                                for="email"
                                class="mb-1.5 block text-xs font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                v-model="form.email"
                                type="email"
                                autocomplete="email"
                                class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                                placeholder="nama@bhamada.ac.id"
                                :disabled="saving"
                            />

                            <p
                                class="mt-1.5 text-[11px] text-gray-400"
                            >
                                Perubahan email dapat memengaruhi status verifikasi akun.
                            </p>
                        </div>
                    </div>

                    <div
                        class="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4"
                    >
                        <button
                            type="button"
                            :disabled="saving"
                            class="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                            @click="closeEditModal"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            :disabled="saving"
                            class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg
                                v-if="saving"
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
                                    d="M12 3v3m0 12v3M4.929 4.929l2.121 2.121m9.9 9.9 2.121 2.121M3 12h3m12 0h3M4.929 19.071l2.121-2.121m9.9-9.9 2.121-2.121"
                                />
                            </svg>

                            {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
</template>