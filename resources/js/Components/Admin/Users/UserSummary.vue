<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const errorMessage = ref('')

const summary = ref({
    total: 0,
    active: 0,
    inactive: 0,
    groups: [],
})

const loadSummary = async () => {
    loading.value = true
    errorMessage.value = ''

    try {
        const response = await axios.get(
            '/admin/users/summary',
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        summary.value = {
            total: response.data?.total ?? 0,
            active: response.data?.active ?? 0,
            inactive: response.data?.inactive ?? 0,
            groups: Array.isArray(
                response.data?.groups
            )
                ? response.data.groups
                : [],
        }
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Resume user gagal dimuat.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadSummary()
})
</script>

<template>
    <div class="space-y-4">

        <div
            v-if="errorMessage"
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
            {{ errorMessage }}
        </div>

        <template v-if="loading">
            <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                <div
                    v-for="i in 3"
                    :key="i"
                    class="skeleton-shimmer h-28 rounded-2xl"
                ></div>
            </div>

            <div
                class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div
                    class="skeleton-shimmer h-6 w-48 rounded"
                ></div>

                <div
                    class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                >
                    <div
                        v-for="i in 10"
                        :key="i"
                        class="skeleton-shimmer h-20 rounded-xl"
                    ></div>
                </div>
            </div>
        </template>

        <template v-else>

            <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                <div
                    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <div
                        class="flex items-center justify-between"
                    >
                        <div>
                            <p
                                class="text-sm font-medium text-gray-500"
                            >
                                Total User
                            </p>

                            <p
                                class="mt-2 text-3xl font-bold text-gray-800"
                            >
                                {{ summary.total }}
                            </p>
                        </div>

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 19a4 4 0 00-8 0m12-8a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <div
                        class="flex items-center justify-between"
                    >
                        <div>
                            <p
                                class="text-sm font-medium text-gray-500"
                            >
                                User Aktif
                            </p>

                            <p
                                class="mt-2 text-3xl font-bold text-emerald-600"
                            >
                                {{ summary.active }}
                            </p>
                        </div>

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                    <div
                        class="flex items-center justify-between"
                    >
                        <div>
                            <p
                                class="text-sm font-medium text-gray-500"
                            >
                                User Nonaktif
                            </p>

                            <p
                                class="mt-2 text-3xl font-bold text-red-600"
                            >
                                {{ summary.inactive }}
                            </p>
                        </div>

                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
                <div>
                    <h2
                        class="text-base font-semibold text-gray-800"
                    >
                        User Berdasarkan Group
                    </h2>

                    <p
                        class="mt-1 text-sm text-gray-500"
                    >
                        Jumlah user berdasarkan group Keycloak.
                    </p>
                </div>

                <div
                    v-if="summary.groups.length"
                    class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                >
                    <div
                        v-for="group in summary.groups"
                        :key="group.path"
                        class="rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                        <p
                            class="truncate text-xs font-medium text-gray-500"
                            :title="group.path"
                        >
                            {{ group.path }}
                        </p>

                        <p
                            class="mt-2 text-2xl font-bold text-gray-800"
                        >
                            {{ group.total }}
                        </p>

                        <p
                            class="mt-1 text-xs text-gray-500"
                        >
                            user
                        </p>
                    </div>
                </div>

                <div
                    v-else
                    class="mt-5 rounded-xl border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500"
                >
                    Belum ada data group.
                </div>
            </div>

        </template>
    </div>
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