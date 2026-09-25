<script setup>
import { Head } from '@inertiajs/vue3'
import { onMounted, onUnmounted, ref } from 'vue'

const logoUrl = '/images/logo.png'

let loginWindow = null

const activeModal = ref(null)

const login = () => {
    const width = 500
    const height = 700

    const left = (window.screen.width - width) / 2
    const top = (window.screen.height - height) / 2

    loginWindow = window.open(
        '/auth/login?popup=1',
        'keycloakLogin',
        [
            `width=${width}`,
            `height=${height}`,
            `left=${left}`,
            `top=${top}`,
            'resizable=yes',
            'scrollbars=yes',
            'toolbar=no',
            'menubar=no',
            'location=yes',
            'status=no'
        ].join(',')
    )

    if (!loginWindow) {
        alert(
            'Popup login diblokir oleh browser. Silakan izinkan popup untuk website ini.'
        )
    }
}

const openModal = (modal) => {
    activeModal.value = modal
}

const closeModal = () => {
    activeModal.value = null
}

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal()
    }
}

const handleMessage = (event) => {
    if (event.origin !== window.location.origin) {
        return
    }

    if (event.data?.type !== 'sso-login-success') {
        return
    }

    if (loginWindow && !loginWindow.closed) {
        loginWindow.close()
    }

    window.location.reload()
}

onMounted(() => {
    window.addEventListener('message', handleMessage)
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('message', handleMessage)
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>

    <Head title="Login" />

    <div class="relative min-h-screen overflow-hidden
               bg-cover bg-center bg-no-repeat" style="
            background-image:
                linear-gradient(
                    rgba(6, 78, 59, 0.55),
                    rgba(6, 78, 59, 0.55)
                ),
                url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85');
        ">

        <div class="absolute inset-0 bg-black/10"></div>

        <div class="relative z-10 flex min-h-screen
                   items-center justify-center
                   px-4 py-6 sm:px-6">

            <div class="w-full max-w-md
                       rounded-2xl
                       bg-white
                       p-6
                       shadow-2xl
                       sm:p-7">

                <div class="flex justify-center">

                    <img :src="logoUrl" alt="Logo Universitas Bhamada Slawi" class="h-20 w-20 object-contain
                               sm:h-24 sm:w-24" />

                </div>

                <div class="mt-4 text-center">

                    <h1 class="text-2xl font-semibold
                               tracking-tight text-gray-900">
                        Portal Bhamada
                    </h1>

                    <p class="mt-1 text-sm
                               text-gray-500">
                        Universitas Bhamada Slawi
                    </p>

                </div>

                <div class="mt-6">

                    <p class="text-center
                               text-sm
                               leading-5
                               text-gray-600">
                        Silakan masuk menggunakan akun SSO
                    </p>

                    <button type="button" @click="login" class="group mt-4 flex w-full
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
                               focus:ring-offset-2">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.8" class="h-5 w-5
                                   transition-transform
                                   duration-200
                                   group-hover:translate-x-0.5">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25
                                   A2.25 2.25 0 0 0 13.5 3h-9
                                   A2.25 2.25 0 0 0 2.25 5.25v13.5
                                   A2.25 2.25 0 0 0 4.5 21h9
                                   A2.25 2.25 0 0 0 15.75 18.75V15" />

                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h12" />

                            <path stroke-linecap="round" stroke-linejoin="round" d="m18 9 3 3-3 3" />

                        </svg>

                        <span>
                            Login dengan SSO
                        </span>

                    </button>

                    <div class="mt-4 overflow-hidden
                               rounded-lg
                               border border-gray-200
                               bg-white">

                        <button type="button" @click="openModal('account')" class="group flex w-full
                                   min-h-[38px]
                                   items-center
                                   justify-between
                                   border-b border-gray-200
                                   px-4 py-2
                                   text-left
                                   text-sm font-medium
                                   text-blue-700
                                   transition-colors
                                   hover:bg-gray-50">

                            <span>
                                Cek Akun SSO / Lupa Password?
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0
                                       transition-transform
                                       duration-200
                                       group-hover:translate-x-1">

                                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />

                            </svg>

                        </button>

                        <button type="button" @click="openModal('sso')" class="group flex w-full
                                   min-h-[38px]
                                   items-center
                                   justify-between
                                   border-b border-gray-200
                                   px-4 py-2
                                   text-left
                                   text-sm font-medium
                                   text-blue-700
                                   transition-colors
                                   hover:bg-gray-50">

                            <span>
                                Apa itu SSO?
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0
                                       transition-transform
                                       duration-200
                                       group-hover:translate-x-1">

                                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />

                            </svg>

                        </button>

                        <button type="button" @click="openModal('login')" class="group flex w-full
                                   min-h-[38px]
                                   items-center
                                   justify-between
                                   px-4 py-2
                                   text-left
                                   text-sm font-medium
                                   text-blue-700
                                   transition-colors
                                   hover:bg-gray-50">

                            <span>
                                Cara masuk menggunakan SSO?
                            </span>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" class="h-4 w-4 shrink-0
                                       transition-transform
                                       duration-200
                                       group-hover:translate-x-1">

                                <path stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6" />

                            </svg>

                        </button>

                    </div>

                </div>

                <div class="mt-5
                           border-t border-gray-100
                           pt-4 text-center">

                    <p class="text-xs italic
                               text-gray-400">
                        "Unggul, Berkarakter, dan Berdaya Saing"
                    </p>

                </div>

                <div class="mt-4 text-center">

                    <p class="text-[11px] text-gray-400">
                        © {{ new Date().getFullYear() }}
                        Universitas Bhamada Slawi
                    </p>

                    <p class="mt-0.5 text-[11px]
                               font-medium text-gray-400">
                        UPT Sistem Informasi dan Teknologi
                    </p>

                </div>

            </div>

        </div>

        <div v-if="activeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
            @click.self="closeModal">

            <div class="w-full max-w-lg overflow-hidden
                       rounded-2xl bg-white shadow-2xl">

                <div class="flex items-center justify-between
                           border-b border-gray-100
                           px-5 py-4">

                    <div class="flex items-center gap-3">

                        <div class="flex h-10 w-10
                                   items-center justify-center
                                   rounded-xl
                                   bg-emerald-50
                                   text-emerald-600">

                            <svg v-if="activeModal === 'account'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="h-5 w-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" />
                            </svg>

                            <svg v-else-if="activeModal === 'sso'" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="h-5 w-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z" />

                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v4.5M12 8.25h.0075" />
                            </svg>

                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.8" stroke="currentColor" class="h-5 w-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15" />

                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 12h8.25m0 0-3-3m3 3-3 3" />
                            </svg>

                        </div>

                        <h2 class="text-base font-semibold
                                   text-gray-900">
                            <span v-if="activeModal === 'account'">
                                Cek Akun SSO / Lupa Password?
                            </span>

                            <span v-else-if="activeModal === 'sso'">
                                Apa itu SSO?
                            </span>

                            <span v-else>
                                Cara masuk menggunakan SSO?
                            </span>
                        </h2>

                    </div>

                    <button type="button" @click="closeModal" class="flex h-9 w-9
                               items-center justify-center
                               rounded-lg
                               text-gray-400
                               transition
                               hover:bg-gray-100
                               hover:text-gray-600" aria-label="Tutup">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6 6 18" />
                        </svg>

                    </button>

                </div>

                <div class="px-5 py-5">

                    <template v-if="activeModal === 'account'">

                        <p class="text-sm leading-6
                                   text-gray-600">
                            Jika Anda belum memiliki akun SSO atau lupa
                            password, silakan menghubungi UPT Sistem Informasi
                            dan Teknologi Universitas Bhamada Slawi.
                        </p>

                        <div class="mt-4 rounded-xl
                                   bg-emerald-50
                                   p-4">

                            <p class="text-sm font-semibold
                                       text-emerald-800">
                                Bantuan akun SSO
                            </p>

                            <p class="mt-1 text-sm
                                       leading-5
                                       text-emerald-700">
                                Siapkan identitas Anda agar proses pengecekan
                                akun dapat dilakukan dengan lebih cepat.
                            </p>

                        </div>

                    </template>

                    <template v-else-if="activeModal === 'sso'">

                        <p class="text-sm leading-6
                                   text-gray-600">
                            SSO atau
                            <strong>Single Sign-On</strong>
                            adalah sistem yang memungkinkan Anda menggunakan
                            satu akun untuk mengakses berbagai aplikasi
                            Universitas Bhamada yang terintegrasi.
                        </p>

                        <div class="mt-4 space-y-3">

                            <div class="flex gap-3 rounded-xl
                                       bg-gray-50 p-4">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-lg
                                           bg-emerald-100
                                           text-sm font-semibold
                                           text-emerald-700">
                                    1
                                </div>

                                <div>
                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Satu akun
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Gunakan akun SSO Universitas Bhamada
                                        untuk proses autentikasi.
                                    </p>
                                </div>

                            </div>

                            <div class="flex gap-3 rounded-xl
                                       bg-gray-50 p-4">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-lg
                                           bg-emerald-100
                                           text-sm font-semibold
                                           text-emerald-700">
                                    2
                                </div>

                                <div>
                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Banyak aplikasi
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Setelah login, Anda dapat mengakses
                                        aplikasi yang tersedia sesuai hak
                                        akses akun.
                                    </p>
                                </div>

                            </div>

                            <div class="flex gap-3 rounded-xl
                                       bg-gray-50 p-4">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-lg
                                           bg-emerald-100
                                           text-sm font-semibold
                                           text-emerald-700">
                                    3
                                </div>

                                <div>
                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Lebih praktis
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Anda tidak perlu memasukkan kredensial
                                        berulang kali pada setiap aplikasi yang
                                        terintegrasi dengan SSO.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </template>

                    <template v-else>

                        <p class="text-sm leading-6
                                   text-gray-600">
                            Untuk masuk ke Portal Bhamada, ikuti langkah
                            berikut:
                        </p>

                        <div class="mt-4 space-y-3">

                            <div class="flex gap-3">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-full
                                           bg-emerald-600
                                           text-sm font-semibold
                                           text-white">
                                    1
                                </div>

                                <div class="pt-1">

                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Klik tombol Login dengan SSO
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Tekan tombol login pada halaman ini
                                        untuk memulai proses autentikasi.
                                    </p>

                                </div>

                            </div>

                            <div class="flex gap-3">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-full
                                           bg-emerald-600
                                           text-sm font-semibold
                                           text-white">
                                    2
                                </div>

                                <div class="pt-1">

                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Masukkan akun SSO
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Masukkan username dan password akun
                                        SSO Anda pada halaman login.
                                    </p>

                                </div>

                            </div>

                            <div class="flex gap-3">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-full
                                           bg-emerald-600
                                           text-sm font-semibold
                                           text-white">
                                    3
                                </div>

                                <div class="pt-1">

                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Berhasil login
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Setelah autentikasi berhasil, Anda akan
                                        kembali ke Portal Bhamada.
                                    </p>

                                </div>

                            </div>

                            <div class="flex gap-3">

                                <div class="flex h-8 w-8 shrink-0
                                           items-center justify-center
                                           rounded-full
                                           bg-emerald-600
                                           text-sm font-semibold
                                           text-white">
                                    4
                                </div>

                                <div class="pt-1">

                                    <p class="text-sm font-semibold
                                               text-gray-800">
                                        Akses aplikasi
                                    </p>

                                    <p class="mt-1 text-sm
                                               leading-5
                                               text-gray-500">
                                        Pilih aplikasi yang tersedia sesuai
                                        dengan hak akses akun Anda.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </template>

                </div>

                <div class="flex justify-end
                           border-t border-gray-100
                           px-5 py-4">

                    <button type="button" @click="closeModal" class="rounded-lg
                               bg-emerald-600
                               px-4 py-2
                               text-sm font-medium
                               text-white
                               transition
                               hover:bg-emerald-700">
                        Tutup
                    </button>

                </div>

            </div>

        </div>

    </div>

</template>