<script setup>
import { onMounted } from 'vue'
import { Head } from '@inertiajs/vue3'

onMounted(() => {
    /*
    |--------------------------------------------------------------------------
    | Pastikan halaman ini dibuka sebagai popup
    |--------------------------------------------------------------------------
    */

    if (window.opener && !window.opener.closed) {

        /*
        |--------------------------------------------------------------------------
        | Kirim informasi login berhasil ke parent
        |--------------------------------------------------------------------------
        */

        window.opener.postMessage(
            {
                type: 'sso-login-success',
            },
            window.location.origin
        )

        /*
        |--------------------------------------------------------------------------
        | Tutup popup
        |--------------------------------------------------------------------------
        */

        window.close()

    } else {

        /*
        |--------------------------------------------------------------------------
        | Jika tidak dibuka melalui popup
        |--------------------------------------------------------------------------
        */

        window.location.href = '/dashboard'
    }
})
</script>

<template>
    <Head title="Login Berhasil" />

    <div
        class="flex min-h-screen items-center justify-center bg-gray-50 px-4"
    >
        <div class="text-center">

            <div
                class="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"
            ></div>

            <h1 class="text-lg font-semibold text-gray-800">
                Login berhasil
            </h1>

            <p class="mt-2 text-sm text-gray-500">
                Menutup jendela login...
            </p>

        </div>
    </div>
</template>