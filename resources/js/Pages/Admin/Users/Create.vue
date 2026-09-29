<script setup>
import { Head, router } from '@inertiajs/vue3'
import axios from 'axios'
import { onMounted, ref } from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

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

const submit = async () => {
    processing.value = true
    errorMessage.value = ''
    errors.value = {}

    try {
        const response = await axios.post(
            '/admin/users',
            form.value,
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

            <!-- Skeleton -->

            <template v-if="skeletonLoading">
                <div>
                    <div
                        class="skeleton-shimmer h-7 w-32 rounded"
                    ></div>

                    <div
                        class="skeleton-shimmer mt-2 h-4 w-72 rounded"
                    ></div>
                </div>

                <div
                    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
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

                    <!-- Checkbox -->

                    <div
                        class="mt-6 space-y-4 border-t border-gray-200 pt-5"
                    >
                        <div
                            class="flex items-center gap-3"
                        >
                            <div
                                class="skeleton-shimmer h-4 w-4 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-4 w-24 rounded"
                            ></div>
                        </div>

                        <div
                            class="flex items-center gap-3"
                        >
                            <div
                                class="skeleton-shimmer h-4 w-4 rounded"
                            ></div>

                            <div
                                class="skeleton-shimmer h-4 w-40 rounded"
                            ></div>
                        </div>
                    </div>

                    <!-- Buttons -->

                    <div
                        class="flex justify-end gap-3 border-t border-gray-200 pt-5 mt-5"
                    >
                        <div
                            class="skeleton-shimmer h-[42px] w-20 rounded-lg"
                        ></div>

                        <div
                            class="skeleton-shimmer h-[42px] w-32 rounded-lg"
                        ></div>
                    </div>
                </div>
            </template>

            <!-- Form -->

            <template v-else>
                <div>
                    <h1 class="text-xl font-semibold text-gray-800">
                        Tambah User
                    </h1>

                    <p class="mt-1 text-sm text-gray-500">
                        Tambahkan akun pengguna baru ke Keycloak.
                    </p>
                </div>

                <div
                    class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                    <div
                        v-if="errorMessage"
                        class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {{ errorMessage }}
                    </div>

                    <form
                        class="space-y-6"
                        @submit.prevent="submit"
                    >
                        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>

                                <input
                                    v-model="form.username"
                                    type="text"
                                    autocomplete="username"
                                    placeholder="Username"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    :class="{
                                        'border-red-400':
                                            errors.username,
                                    }"
                                />

                                <p
                                    v-if="errors.username"
                                    class="mt-1 text-xs text-red-600"
                                >
                                    {{ errors.username[0] }}
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
                                    :class="{
                                        'border-red-400':
                                            errors.email,
                                    }"
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
                                    :class="{
                                        'border-red-400':
                                            errors.firstName,
                                    }"
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
                                    :class="{
                                        'border-red-400':
                                            errors.lastName,
                                    }"
                                />

                                <p
                                    v-if="errors.lastName"
                                    class="mt-1 text-xs text-red-600"
                                >
                                    {{ errors.lastName[0] }}
                                </p>
                            </div>

                        </div>

                        <div class="space-y-4 border-t border-gray-200 pt-5">

                            <label
                                class="flex cursor-pointer items-center gap-3"
                            >
                                <input
                                    v-model="form.enabled"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />

                                <span class="text-sm text-gray-700">
                                    User aktif
                                </span>
                            </label>

                            <label
                                class="flex cursor-pointer items-center gap-3"
                            >
                                <input
                                    v-model="form.emailVerified"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                />

                                <span class="text-sm text-gray-700">
                                    Email sudah terverifikasi
                                </span>
                            </label>

                        </div>

                        <div
                            class="flex justify-end gap-3 border-t border-gray-200 pt-5"
                        >
                            <button
                                type="button"
                                class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                :disabled="processing"
                                @click="cancel"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                class="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                :disabled="processing"
                            >
                                {{
                                    processing
                                        ? 'Menyimpan...'
                                        : 'Simpan User'
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