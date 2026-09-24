<script setup>
defineProps({
    application: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <a
        :href="application.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
    >
        <!-- Top -->
        <div class="flex items-start justify-between">

            <!-- Icon -->
            <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-600"
            >
                <!-- SIAKAD -->
                <svg
                    v-if="application.code === 'siakad'"
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
                        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11a2 2 0 0 1 2 2v16a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 1 4 16.5v-11Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13a2 2 0 0 0-2 2v16a2 2 0 0 1 2-2h4.5a2.5 2.5 0 0 0 2.5-2.5v-11Z"
                    />
                </svg>

                <!-- SIMPEG -->
                <svg
                    v-else-if="application.code === 'simpeg'"
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
                        d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 20a7.5 7.5 0 0 1 15 0"
                    />
                </svg>

                <!-- CBT -->
                <svg
                    v-else-if="application.code === 'cbt'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="currentColor"
                    class="h-6 w-6"
                >
                    <rect
                        x="6"
                        y="3"
                        width="12"
                        height="18"
                        rx="2"
                    />
                    <path
                        stroke-linecap="round"
                        d="M9 17h6"
                    />
                </svg>

                <!-- Inventaris -->
                <svg
                    v-else-if="application.code === 'inventaris'"
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
                        d="m12 3 8 4-8 4-8-4 8-4Z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4 12 8 4 8-4"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4 17 8 4 8-4"
                    />
                </svg>

                <!-- Keuangan -->
                <svg
                    v-else-if="application.code === 'keuangan'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="currentColor"
                    class="h-6 w-6"
                >
                    <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                    />
                    <path
                        stroke-linecap="round"
                        d="M3 9h18"
                    />
                    <path
                        stroke-linecap="round"
                        d="M7 14h3"
                    />
                </svg>

                <!-- Perpustakaan -->
                <svg
                    v-else-if="application.code === 'perpustakaan'"
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
                        d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z"
                    />
                    <path
                        stroke-linecap="round"
                        d="M5 17a3 3 0 0 1 3-3h11"
                    />
                </svg>

                <!-- Fallback -->
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="currentColor"
                    class="h-6 w-6"
                >
                    <rect
                        x="3"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                    />
                    <rect
                        x="14"
                        y="3"
                        width="7"
                        height="7"
                        rx="1"
                    />
                    <rect
                        x="3"
                        y="14"
                        width="7"
                        height="7"
                        rx="1"
                    />
                    <rect
                        x="14"
                        y="14"
                        width="7"
                        height="7"
                        rx="1"
                    />
                </svg>
            </div>

            <!-- Arrow -->
            <div
                class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-300 transition group-hover:bg-emerald-50 group-hover:text-emerald-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.8"
                    stroke="currentColor"
                    class="h-5 w-5 transition group-hover:translate-x-0.5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m9 5 7 7-7 7"
                    />
                </svg>
            </div>
        </div>

        <!-- Name -->
        <h3
            class="mt-4 text-base font-semibold text-gray-800 transition group-hover:text-emerald-600"
        >
            {{ application.name }}
        </h3>

        <!-- Description -->
        <p
            v-if="application.description"
            class="mt-1 text-sm leading-relaxed text-gray-500"
        >
            {{ application.description }}
        </p>

        <!-- Action -->
        <div
            class="mt-4 text-xs font-medium text-emerald-600"
        >
            Buka aplikasi →
        </div>
    </a>
</template>