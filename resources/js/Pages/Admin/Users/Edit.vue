<script setup>
import { Head } from '@inertiajs/vue3'
import axios from 'axios'
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
})

const form = ref({
    firstName: props.user.firstName || '',
    lastName: props.user.lastName || '',
    email: props.user.email || '',
})

const processing = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const errors = ref({})

const updatedUser = ref({
    ...props.user,
})

const skeletonLoading = ref(true)

const submit = async () => {
    processing.value = true

    errorMessage.value = ''
    successMessage.value = ''
    errors.value = {}

    try {
        const response = await axios.put(
            `/admin/users/${props.user.id}`,
            form.value,
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        const user =
            response.data?.user ||
            response.data

        updatedUser.value = {
            ...updatedUser.value,
            ...user,
        }

        form.value = {
            firstName:
                user.firstName ??
                form.value.firstName,

            lastName:
                user.lastName ??
                form.value.lastName,

            email:
                user.email ??
                form.value.email,
        }

        successMessage.value =
            response.data?.message ||
            'Data user berhasil diperbarui.'

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } catch (error) {
        if (error.response?.status === 422) {
            errors.value =
                error.response?.data?.errors || {}

            errorMessage.value =
                error.response?.data?.message ||
                'Data user belum valid.'
        } else {
            errorMessage.value =
                error.response?.data?.message ||
                'User gagal diperbarui.'
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } finally {
        processing.value = false
    }
}

const cancel = () => {
    window.history.back()
}

const getFullName = () => {
    const firstName =
        updatedUser.value.firstName || ''

    const lastName =
        updatedUser.value.lastName || ''

    const fullName = [
        firstName,
        lastName,
    ]
        .filter(Boolean)
        .join(' ')
        .trim()

    return (
        fullName ||
        updatedUser.value.username ||
        'User'
    )
}

const getInitial = () => {
    return getFullName()
        .charAt(0)
        .toUpperCase()
}

onMounted(() => {
    requestAnimationFrame(() => {
        skeletonLoading.value = false
    })
})
</script>

<template>
    <Head title="Edit User" />

    <DashboardLayout>
        <div class="space-y-6">

            <!-- Skeleton -->

            <template v-if="skeletonLoading">

                <!-- Header Skeleton -->

                <div>
                    <div
                        class="skeleton-shimmer h-7 w-28 rounded"
                    ></div>

                    <div
                        class="skeleton-shimmer mt-2 h-4 w-64 rounded"
                    ></div>
                </div>

                <!-- Card Skeleton -->

                <div
                    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >

                    <!-- Profile Header -->

                    <div
                        class="mb-6 flex items-center gap-4 border-b border-gray-200 pb-6"
                    >
                        <div
                            class="skeleton-shimmer h-14 w-14 shrink-0 rounded-full"
                        ></div>

                        <div class="min-w-0 flex-1 space-y-2">
                            <div
                                class="skeleton-shimmer h-5 w-40 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-4 w-28 rounded"
                            ></div>
                        </div>
                    </div>

                    <!-- Form Skeleton -->

                    <div
                        class="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >

                        <!-- Username -->

                        <div>
                            <div
                                class="skeleton-shimmer mb-2 h-4 w-20 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-[42px] w-full rounded-lg"
                            ></div>

                            <div
                                class="skeleton-shimmer mt-2 h-3 w-44 rounded"
                            ></div>
                        </div>

                        <!-- Email -->

                        <div>
                            <div
                                class="skeleton-shimmer mb-2 h-4 w-14 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-[42px] w-full rounded-lg"
                            ></div>
                        </div>

                        <!-- Nama Depan -->

                        <div>
                            <div
                                class="skeleton-shimmer mb-2 h-4 w-24 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-[42px] w-full rounded-lg"
                            ></div>
                        </div>

                        <!-- Nama Belakang -->

                        <div>
                            <div
                                class="skeleton-shimmer mb-2 h-4 w-28 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-[42px] w-full rounded-lg"
                            ></div>
                        </div>

                    </div>

                    <!-- Buttons Skeleton -->

                    <div
                        class="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-5"
                    >
                        <div
                            class="skeleton-shimmer h-[42px] w-24 rounded-lg"
                        ></div>

                        <div
                            class="skeleton-shimmer h-[42px] w-36 rounded-lg"
                        ></div>
                    </div>

                </div>

            </template>

            <!-- Actual Content -->

            <template v-else>

                <div>
                    <h1
                        class="text-xl font-semibold text-gray-800"
                    >
                        Edit User
                    </h1>

                    <p
                        class="mt-1 text-sm text-gray-500"
                    >
                        Perbarui informasi akun pengguna.
                    </p>
                </div>

                <div
                    v-if="successMessage"
                    class="flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                    <div class="flex items-start gap-3">
                        <svg
                            class="mt-0.5 shrink-0"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path
                                d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                            />

                            <path d="m9 11 3 3L22 4" />
                        </svg>

                        <span>
                            {{ successMessage }}
                        </span>
                    </div>

                    <button
                        type="button"
                        class="cursor-pointer text-green-600 transition hover:text-green-800"
                        @click="successMessage = ''"
                    >
                        ×
                    </button>
                </div>

                <div
                    v-if="errorMessage"
                    class="flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    <div class="flex items-start gap-3">
                        <svg
                            class="mt-0.5 shrink-0"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                            />

                            <path d="M12 8v4" />

                            <path d="M12 16h.01" />
                        </svg>

                        <span>
                            {{ errorMessage }}
                        </span>
                    </div>

                    <button
                        type="button"
                        class="cursor-pointer text-red-600 transition hover:text-red-800"
                        @click="errorMessage = ''"
                    >
                        ×
                    </button>
                </div>

                <div
                    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                    <div
                        class="mb-6 flex items-center gap-4 border-b border-gray-200 pb-6"
                    >
                        <div
                            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg font-semibold text-emerald-700"
                        >
                            {{ getInitial() }}
                        </div>

                        <div class="min-w-0">
                            <h2
                                class="truncate text-base font-semibold text-gray-800"
                            >
                                {{ getFullName() }}
                            </h2>

                            <p
                                class="mt-1 text-sm text-gray-500"
                            >
                                @{{ updatedUser.username }}
                            </p>
                        </div>
                    </div>

                    <form
                        class="space-y-6"
                        @submit.prevent="submit"
                    >
                        <div
                            class="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >
                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>

                                <input
                                    :value="updatedUser.username"
                                    type="text"
                                    disabled
                                    class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
                                />

                                <p
                                    class="mt-1 text-xs text-gray-400"
                                >
                                    Username tidak dapat diubah.
                                </p>
                            </div>

                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    v-model="form.email"
                                    type="email"
                                    autocomplete="email"
                                    placeholder="email@bhamada.ac.id"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                <p
                                    v-if="errors.email"
                                    class="mt-1 text-xs text-red-600"
                                >
                                    {{ errors.email[0] }}
                                </p>
                            </div>

                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Nama Depan
                                </label>

                                <input
                                    v-model="form.firstName"
                                    type="text"
                                    placeholder="Nama depan"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                <p
                                    v-if="errors.firstName"
                                    class="mt-1 text-xs text-red-600"
                                >
                                    {{ errors.firstName[0] }}
                                </p>
                            </div>

                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Nama Belakang
                                </label>

                                <input
                                    v-model="form.lastName"
                                    type="text"
                                    placeholder="Nama belakang"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />

                                <p
                                    v-if="errors.lastName"
                                    class="mt-1 text-xs text-red-600"
                                >
                                    {{ errors.lastName[0] }}
                                </p>
                            </div>
                        </div>

                        <div
                            class="flex justify-end gap-3 border-t border-gray-200 pt-5"
                        >
                            <button
                                type="button"
                                class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="processing"
                                @click="cancel"
                            >
                                Kembali
                            </button>

                            <button
                                type="submit"
                                class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="processing"
                            >
                                <span
                                    v-if="processing"
                                    class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                ></span>

                                {{
                                    processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'
                                }}
                            </button>
                        </div>
                    </form>
                </div>

            </template>

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

    background: linear-gradient(
        90deg,
        transparent 0%,
        rgb(255 255 255 / 45%) 40%,
        rgb(255 255 255 / 80%) 50%,
        rgb(255 255 255 / 45%) 60%,
        transparent 100%
    );

    animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>