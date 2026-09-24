<script setup>
import { onMounted, ref } from 'vue'

import ApplicationCard from './ApplicationCard.vue'

defineProps({
    applications: {
        type: Array,
        default: () => [],
    },
})

const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 700)
})
</script>

<template>
    <section class="mt-8">

        <!-- ========================= -->
        <!-- Header -->
        <!-- ========================= -->

        <div class="mb-5 flex items-start gap-3">

            <!-- Icon -->
            <div
                class="flex h-10 w-10 shrink-0 items-center
                       justify-center rounded-xl
                       bg-emerald-50 text-emerald-600"
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
                        d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h4.5a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 10.5 13.5H6a2.25 2.25 0 0 1-2.25-2.25v-4.5ZM13.5 13.5A2.25 2.25 0 0 1 15.75 11.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-4.5A2.25 2.25 0 0 1 11.25 18v-2.25a2.25 2.25 0 0 1 2.25-2.25Z"
                    />
                </svg>
            </div>

            <div>
                <h2 class="text-lg font-semibold text-gray-800">
                    Aplikasi Saya
                </h2>

                <p class="mt-0.5 text-sm text-gray-500">
                    Aplikasi yang dapat Anda akses
                </p>
            </div>

        </div>


        <!-- ========================= -->
        <!-- Skeleton -->
        <!-- ========================= -->

        <div
            v-if="loading"
            class="grid grid-cols-1 gap-4
                   sm:grid-cols-2 xl:grid-cols-3"
        >

            <div
                v-for="item in 6"
                :key="item"
                class="animate-pulse rounded-xl
                       border border-gray-200
                       bg-white p-5 shadow-sm"
            >

                <!-- Top -->
                <div class="flex items-start justify-between">

                    <!-- Icon -->
                    <div
                        class="flex h-11 w-11
                               items-center justify-center
                               rounded-xl bg-gray-200"
                    >
                        <div
                            class="h-5 w-5 rounded-md bg-gray-300"
                        ></div>
                    </div>

                    <!-- Arrow -->
                    <div
                        class="flex h-7 w-7 items-center
                               justify-center rounded-lg
                               bg-gray-100"
                    >
                        <div
                            class="h-3 w-3 rounded bg-gray-300"
                        ></div>
                    </div>

                </div>


                <!-- Title -->
                <div
                    class="mt-4 h-5 w-28 rounded-md
                           bg-gray-200"
                ></div>


                <!-- Description -->
                <div class="mt-2 space-y-2">

                    <div
                        class="h-3 w-full rounded
                               bg-gray-200"
                    ></div>

                    <div
                        class="h-3 w-3/4 rounded
                               bg-gray-200"
                    ></div>

                </div>


                <!-- Action -->
                <div
                    class="mt-5 h-3 w-24 rounded
                           bg-gray-200"
                ></div>

            </div>

        </div>


        <!-- ========================= -->
        <!-- Applications -->
        <!-- ========================= -->

        <div
            v-else-if="applications.length"
            class="grid grid-cols-1 gap-4
                   sm:grid-cols-2 xl:grid-cols-3"
        >

            <ApplicationCard
                v-for="application in applications"
                :key="application.id"
                :application="application"
            />

        </div>


        <!-- ========================= -->
        <!-- Empty State -->
        <!-- ========================= -->

        <div
            v-else
            class="rounded-xl border border-dashed
                   border-gray-300 bg-white
                   px-6 py-14 text-center"
        >

            <!-- Icon -->
            <div
                class="mx-auto flex h-14 w-14
                       items-center justify-center
                       rounded-2xl bg-gray-100
                       text-gray-400"
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
                        d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h4.5a2.25 2.25 0 0 1 2.25 2.25v4.5A2.25 2.25 0 0 1 10.5 13.5H6a2.25 2.25 0 0 1-2.25-2.25v-4.5ZM13.5 13.5A2.25 2.25 0 0 1 15.75 11.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-4.5A2.25 2.25 0 0 1 11.25 18v-2.25a2.25 2.25 0 0 1 2.25-2.25Z"
                    />
                </svg>
            </div>


            <!-- Text -->
            <h3
                class="mt-4 text-sm font-semibold
                       text-gray-800"
            >
                Belum ada aplikasi
            </h3>

            <p
                class="mx-auto mt-1 max-w-sm
                       text-sm leading-relaxed
                       text-gray-500"
            >
                Saat ini belum ada aplikasi yang tersedia
                untuk akun Anda.
            </p>

        </div>

    </section>
</template>