<script setup>
import { router } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },

    sidebarMinimized: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits([
    'open-sidebar',
    'toggle-sidebar',
])

const userMenuOpen = ref(false)
const logoutModalOpen = ref(false)
const logoutLoading = ref(false)

const openLogoutModal = () => {
    userMenuOpen.value = false
    logoutModalOpen.value = true
}

const closeLogoutModal = () => {
    if (logoutLoading.value) return

    logoutModalOpen.value = false
}

const logout = () => {
    if (logoutLoading.value) return

    logoutLoading.value = true

    router.post('/logout', {}, {
        onFinish: () => {
            logoutLoading.value = false
            logoutModalOpen.value = false
        },
    })
}

const userName = () => {
    const name =
        props.user?.name ||
        props.user?.username ||
        'User'

    return name
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase())
}

const userInitial = () => {
    return userName()
        .charAt(0)
        .toUpperCase()
}
</script>

<template>

    <header class="sticky top-0 z-30
               h-20 border-b
               border-gray-200
               bg-white">

        <div class="flex h-full items-center
                   justify-between
                   px-4 sm:px-6 lg:px-8">

            <!-- LEFT -->
            <div class="flex items-center gap-2">

                <!-- Mobile -->
                <button type="button" class="flex h-10 w-10
                           items-center justify-center
                           rounded-lg text-gray-600
                           hover:bg-gray-100
                           lg:hidden" @click="emit('open-sidebar')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <!-- Desktop -->
                <button type="button" class="hidden h-10 w-10
                           items-center justify-center
                           rounded-lg text-gray-600
                           hover:bg-gray-100
                           lg:flex" :title="sidebarMinimized
                                ? 'Tampilkan sidebar'
                                : 'Minimalkan sidebar'
                            " @click="emit('toggle-sidebar')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="h-5 w-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <!-- Title -->
                <div class="ml-1">
                    <p class="text-sm font-semibold
                               text-gray-800">
                        Portal Bhamada
                    </p>

                    <p class="text-xs text-gray-400">
                        Universitas Bhamada Slawi
                    </p>
                </div>

            </div>


            <!-- RIGHT USER -->
            <div class="relative">

                <button type="button" class="flex items-center gap-3
                           rounded-xl px-2 py-1.5
                           hover:bg-gray-50" @click="
                            userMenuOpen = !userMenuOpen
                            ">

                    <!-- Avatar -->
                    <div class="flex h-10 w-10
                               shrink-0
                               items-center justify-center
                               overflow-hidden rounded-full
                               bg-emerald-100
                               text-sm font-semibold
                               text-emerald-700">
                        <img v-if="user?.avatar" :src="user.avatar" alt="Avatar" class="h-full w-full object-cover" />

                        <span v-else>
                            {{ userInitial() }}
                        </span>
                    </div>

                    <!-- User -->
                    <div class="hidden text-left sm:block">
                        <p class="max-w-40 truncate
                                   text-sm font-semibold
                                   text-gray-800">
                            {{ userName() }}
                        </p>

                        <p class="max-w-40 truncate
                                   text-xs text-gray-400">
                            {{
                                user?.email ||
                                user?.username ||
                                '-'
                            }}
                        </p>
                    </div>

                    <!-- Chevron -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                        stroke="currentColor" class="hidden h-4 w-4
                               text-gray-400 sm:block">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
                    </svg>

                </button>


                <!-- DROPDOWN -->
                <div v-if="userMenuOpen" class="absolute right-0 top-full
                           mt-2 w-56
                           overflow-hidden rounded-xl
                           border border-gray-200
                           bg-white shadow-lg">

                    <div class="border-b border-gray-100
                               px-4 py-3">
                        <p class="truncate text-sm
                                   font-semibold
                                   text-gray-800">
                            {{ userName() }}
                        </p>

                        <p class="mt-1 truncate
                                   text-xs text-gray-400">
                            {{
                                user?.email ||
                                user?.username ||
                                '-'
                            }}
                        </p>
                    </div>


                    <!-- PROFILE -->
                    <a href="/akun" class="flex items-center
                               gap-3 px-4 py-3
                               text-sm text-gray-600
                               hover:bg-gray-50" @click="userMenuOpen = false">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5
                                   0 3.75 3.75 0 0 1 7.5 0ZM4.5
                                   20.118a7.5 7.5 0 0 1 15 0" />
                        </svg>

                        Profil Saya
                    </a>


                    <!-- LOGOUT -->
                    <button type="button" class="flex w-full items-center
                               gap-3 px-4 py-3
                               text-left text-sm
                               text-red-600
                               hover:bg-red-50" @click="openLogoutModal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0
                                   13.5 3h-6a2.25 2.25 0 0 0
                                   -2.25 2.25v13.5A2.25 2.25 0 0 0
                                   7.5 21h6a2.25 2.25 0 0 0
                                   2.25-2.25V15m3-3h-6m0 0
                                   2.25-2.25M18.75 12 16.5 9.75" />
                        </svg>

                        Logout
                    </button>

                </div>

            </div>

        </div>
    </header>


    <!-- =========================================
         LOGOUT CONFIRMATION MODAL
    ========================================== -->

    <Teleport to="body">

        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">

            <div v-if="logoutModalOpen" class="fixed inset-0 z-[100]
                       flex items-center justify-center
                       bg-black/50 px-4" @click.self="closeLogoutModal">

                <div class="w-full max-w-md
                           overflow-hidden rounded-2xl
                           bg-white shadow-2xl">

                    <!-- Icon -->
                    <div class="flex justify-center pt-7">

                        <div class="flex h-14 w-14
                                   items-center justify-center
                                   rounded-full
                                   bg-red-100
                                   text-red-600">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                                stroke="currentColor" class="h-7 w-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3h.008v.008H12v-.008ZM10.29
                                       3.86l-7.2 12.5A1.5 1.5 0 0 0
                                       4.39 18.6h15.22a1.5 1.5 0 0 0
                                       1.3-2.24l-7.2-12.5a1.5 1.5 0 0 0
                                       -2.6 0Z" />
                            </svg>

                        </div>

                    </div>


                    <!-- Content -->
                    <div class="px-6 pb-6 pt-5 text-center">

                        <h2 class="text-lg font-semibold
           text-gray-900">
                            Konfirmasi Keluar
                        </h2>


                        <p class="mt-3 text-sm
           leading-6 text-gray-500">
                            Apakah Anda yakin ingin keluar dari Portal Bhamada?
                            Anda akan mengakhiri sesi SSO, sehingga akses ke aplikasi
                            lain yang terhubung dengan akun ini juga akan dihentikan.
                        </p>


                    </div>


                    <!-- Actions -->
                    <div class="flex gap-3
                               border-t border-gray-100
                               bg-gray-50
                               px-6 py-4">

                        <button type="button" class="flex-1 rounded-lg
                                   border border-gray-300
                                   bg-white px-4 py-2.5
                                   text-sm font-medium
                                   text-gray-700
                                   hover:bg-gray-100
                                   disabled:cursor-not-allowed
                                   disabled:opacity-50" :disabled="logoutLoading" @click="closeLogoutModal">
                            Batal
                        </button>

                        <button type="button" class="flex-1 rounded-lg
                                   bg-red-600 px-4 py-2.5
                                   text-sm font-semibold
                                   text-white
                                   hover:bg-red-700
                                   disabled:cursor-not-allowed
                                   disabled:opacity-50" :disabled="logoutLoading" @click="logout">
                            <span v-if="logoutLoading">
                                Keluar...
                            </span>

                            <span v-else>
                                Ya, Keluar
                            </span>
                        </button>

                    </div>

                </div>

            </div>

        </Transition>

    </Teleport>

</template>
