<script setup>
import { Head, Link } from '@inertiajs/vue3'

const logoUrl = '/images/logo.png'
</script>

<template>
    <Head title="Halaman Tidak Ditemukan" />

    <div
        class="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style="
            background-image:
                linear-gradient(
                    rgba(6, 78, 59, 0.72),
                    rgba(6, 78, 59, 0.72)
                ),
                url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85');
        "
    >

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/10"></div>

        <!-- Content -->
        <div
            class="relative z-10 flex min-h-screen
                   items-center justify-center
                   px-4 py-8"
        >

            <!-- Card -->
            <div
                class="w-full max-w-md
                       rounded-2xl
                       bg-white
                       px-6 py-8
                       text-center
                       shadow-2xl
                       sm:px-8 sm:py-10"
            >

                <!-- Logo -->
                <div class="flex justify-center">
                    <img
                        :src="logoUrl"
                        alt="Universitas Bhamada Slawi"
                        class="h-20 w-20 object-contain"
                    />
                </div>

                <!-- 404 -->
                <div class="mt-6">

                    <h1
                        class="text-7xl font-bold
                               tracking-tight
                               text-green-700
                               sm:text-8xl"
                    >
                        404
                    </h1>

                    <h2
                        class="mt-3 text-xl
                               font-semibold
                               text-gray-900"
                    >
                        Halaman Tidak Ditemukan
                    </h2>

                    <p
                        class="mx-auto mt-3 max-w-sm
                               text-sm leading-6
                               text-gray-500"
                    >
                        Halaman yang Anda cari tidak tersedia,
                        mungkin telah dipindahkan atau alamat
                        yang digunakan tidak benar.
                    </p>

                </div>

                <!-- Back Button -->
                <div class="mt-7">

                    <Link
                        href="/"
                        class="group inline-flex
                               items-center justify-center
                               gap-2
                               rounded-lg
                               bg-green-700
                               px-5 py-3
                               text-sm font-semibold
                               text-white
                               shadow-sm
                               transition-all
                               duration-200
                               hover:bg-green-800
                               hover:shadow-md
                               focus:outline-none
                               focus:ring-2
                               focus:ring-green-600
                               focus:ring-offset-2"
                    >

                        <!-- Home Icon -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            class="h-5 w-5
                                   transition-transform
                                   duration-200
                                   group-hover:-translate-x-0.5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m3 10 9-7 9 7"
                            />

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 9.5V21h14V9.5"
                            />

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 21v-6h6v6"
                            />
                        </svg>

                        <span>
                            Kembali ke Beranda
                        </span>

                    </Link>

                </div>

                <!-- Footer -->
                <div
                    class="mt-8
                           border-t border-gray-100
                           pt-5"
                >

                    <p class="text-xs text-gray-400">
                        © {{ new Date().getFullYear() }}
                        Universitas Bhamada Slawi
                    </p>

                    <p
                        class="mt-1 text-xs
                               font-medium
                               text-gray-400"
                    >
                        UPT Sistem Informasi dan Teknologi
                    </p>

                </div>

            </div>

        </div>

    </div>
</template>