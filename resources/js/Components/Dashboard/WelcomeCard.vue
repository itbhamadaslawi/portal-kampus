<script setup>
import { onMounted, ref } from 'vue'

defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
})

const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 500)
})

const formatName = (name) => {
    if (!name) {
        return 'User'
    }

    return name
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
}
</script>

<template>

    <!-- ========================= -->
    <!-- Skeleton -->
    <!-- ========================= -->

    <section
        v-if="loading"
        class="relative overflow-hidden rounded-2xl
               bg-gray-200 p-6 shadow-sm
               sm:p-8 animate-pulse"
    >

        <div class="relative z-10 max-w-2xl">

            <!-- Small text -->
            <div
                class="h-4 w-40 rounded
                       bg-gray-300"
            ></div>

            <!-- Name -->
            <div
                class="mt-3 h-9 w-64 rounded
                       bg-gray-300 sm:h-10"
            ></div>

            <!-- Description -->
            <div class="mt-4 space-y-2">

                <div
                    class="h-3 w-full max-w-xl
                           rounded bg-gray-300"
                ></div>

                <div
                    class="h-3 w-4/5 max-w-md
                           rounded bg-gray-300"
                ></div>

            </div>

        </div>

    </section>


    <!-- ========================= -->
    <!-- Content -->
    <!-- ========================= -->

    <section
        v-else
        class="relative overflow-hidden rounded-2xl
               bg-gradient-to-r from-emerald-600
               to-emerald-500 p-6 text-white
               shadow-sm sm:p-8"
    >

        <div class="relative z-10 max-w-2xl">

            <p class="text-sm font-medium text-emerald-100">
                Selamat datang kembali,
            </p>

            <h2
                class="mt-1 text-2xl font-bold
                       tracking-tight sm:text-3xl"
            >
                {{ formatName(user.name) }}
            </h2>

            <p
                class="mt-3 max-w-xl text-sm
                       leading-relaxed text-emerald-50"
            >
                Akses berbagai aplikasi Universitas
                Bhamada melalui satu akun SSO.
            </p>

        </div>


        <!-- Decorative -->
        <div
            class="absolute -right-10 -top-10
                   h-40 w-40 rounded-full
                   bg-white/10"
        ></div>

        <div
            class="absolute -bottom-16 right-20
                   h-44 w-44 rounded-full
                   bg-white/5"
        ></div>

    </section>

</template>