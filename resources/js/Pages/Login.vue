<script setup>
const login = () => {
    // window.location.href = '/auth/login'
    window.location.href = '/dashboard'
}

const logoUrl = '/images/logo.png'
</script>

<template>
    <div
        class="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
        style="
            background-image:
                linear-gradient(
                    rgba(6, 78, 59, 0.55),
                    rgba(6, 78, 59, 0.55)
                ),
                url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85');
        "
    >

        <!-- Background Overlay -->
        <div class="absolute inset-0 bg-black/10"></div>

        <!-- Main Content -->
        <div
            class="relative z-10 flex min-h-screen
                   items-center justify-center
                   px-4 py-6 sm:px-6"
        >

            <!-- Login Card -->
            <div
                class="w-full max-w-md
                       rounded-2xl
                       bg-white
                       p-6
                       shadow-2xl
                       sm:p-7"
            >

                <!-- Logo -->
                <div class="flex justify-center">
                    <img
                        :src="logoUrl"
                        alt="Logo Universitas Bhamada Slawi"
                        class="h-20 w-20 object-contain sm:h-24 sm:w-24"
                    />
                </div>

                <!-- Header -->
                <div class="mt-4 text-center">

                    <h1
                        class="text-2xl font-semibold
                               tracking-tight text-gray-900"
                    >
                        Portal Akademik
                    </h1>

                    <p
                        class="mt-1 text-sm
                               text-gray-500"
                    >
                        Universitas Bhamada Slawi
                    </p>

                </div>

                <!-- Login Section -->
                <div class="mt-6">

                    <!-- Information -->
                    <p
                        class="text-center
                               text-sm
                               leading-5
                               text-gray-600"
                    >
                        Silakan masuk menggunakan akun SSO
                    </p>

                    <!-- Login Button -->
                    <button
                        type="button"
                        @click="login"
                        class="group mt-4 flex w-full
                               items-center justify-center
                               gap-2.5
                               rounded-lg
                               bg-green-700
                               px-5 py-3
                               text-sm font-semibold
                               text-white
                               shadow-sm
                               transition-all duration-200
                               hover:bg-green-800
                               hover:shadow-md
                               focus:outline-none
                               focus:ring-2
                               focus:ring-green-600
                               focus:ring-offset-2"
                    >

                        <!-- Login Icon -->
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            class="h-5 w-5
                                   transition-transform
                                   duration-200
                                   group-hover:translate-x-0.5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 9V5.25
                                   A2.25 2.25 0 0 0 13.5 3h-9
                                   A2.25 2.25 0 0 0 2.25 5.25v13.5
                                   A2.25 2.25 0 0 0 4.5 21h9
                                   A2.25 2.25 0 0 0 15.75 18.75V15"
                            />

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12h12"
                            />

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m18 9 3 3-3 3"
                            />
                        </svg>

                        <span>
                            Login dengan SSO
                        </span>

                    </button>

                    <!-- Information Menu -->
                    <div
                        class="mt-4 overflow-hidden
                               rounded-lg
                               border border-gray-200
                               bg-white"
                    >

                        <!-- Cek Akun -->
                        <a
                            href="#"
                            class="group flex
                                   min-h-[38px]
                                   items-center
                                   justify-between
                                   border-b border-gray-200
                                   px-4 py-2
                                   text-sm font-medium
                                   text-blue-700
                                   transition-colors
                                   hover:bg-gray-50"
                        >
                            <span>
                                Cek Akun SSO / Lupa Password?
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                class="h-4 w-4
                                       shrink-0
                                       transition-transform
                                       duration-200
                                       group-hover:translate-x-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m9 18 6-6-6-6"
                                />
                            </svg>
                        </a>

                        <!-- Apa itu SSO -->
                        <a
                            href="#"
                            class="group flex
                                   min-h-[38px]
                                   items-center
                                   justify-between
                                   border-b border-gray-200
                                   px-4 py-2
                                   text-sm font-medium
                                   text-blue-700
                                   transition-colors
                                   hover:bg-gray-50"
                        >
                            <span>
                                Apa itu SSO?
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                class="h-4 w-4
                                       shrink-0
                                       transition-transform
                                       duration-200
                                       group-hover:translate-x-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m9 18 6-6-6-6"
                                />
                            </svg>
                        </a>

                        <!-- Cara Login -->
                        <a
                            href="#"
                            class="group flex
                                   min-h-[38px]
                                   items-center
                                   justify-between
                                   px-4 py-2
                                   text-sm font-medium
                                   text-blue-700
                                   transition-colors
                                   hover:bg-gray-50"
                        >
                            <span>
                                Cara masuk menggunakan SSO?
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                class="h-4 w-4
                                       shrink-0
                                       transition-transform
                                       duration-200
                                       group-hover:translate-x-1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m9 18 6-6-6-6"
                                />
                            </svg>
                        </a>

                    </div>

                </div>

                <!-- Tagline -->
                <div
                    class="mt-5
                           border-t border-gray-100
                           pt-4 text-center"
                >
                    <p
                        class="text-xs italic
                               text-gray-400"
                    >
                        "Unggul, Berkarakter, dan Berdaya Saing"
                    </p>
                </div>

                <!-- Footer -->
                <div class="mt-4 text-center">

                    <p class="text-[11px] text-gray-400">
                        © {{ new Date().getFullYear() }}
                        Universitas Bhamada Slawi
                    </p>

                    <p
                        class="mt-0.5 text-[11px]
                               font-medium text-gray-400"
                    >
                        UPT Sistem Informasi dan Teknologi
                    </p>

                </div>

            </div>

        </div>

    </div>
</template>