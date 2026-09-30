<script setup>
import { Head } from '@inertiajs/vue3'
import { ref } from 'vue'

import Sidebar from '@/Components/Dashboard/Sidebar.vue'
import Topbar from '@/Components/Dashboard/Topbar.vue'
import WelcomeCard from '@/Components/Dashboard/WelcomeCard.vue'
import BannerCarousel from '@/Components/Dashboard/BannerCarousel.vue'
import ApplicationsGrid from '@/Components/Dashboard/ApplicationsGrid.vue'

const sidebarOpen = ref(false)
const sidebarMinimized = ref(false)

defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },

    applications: {
        type: Array,
        default: () => [],
    },

    banners: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <Head title="Dashboard" />

    <div class="min-h-screen bg-gray-50">

        <!-- Sidebar -->
        <Sidebar
            :sidebar-open="sidebarOpen"
            :sidebar-minimized="sidebarMinimized"
            @close="sidebarOpen = false"
        />

        <!-- Main -->
        <div
            class="min-h-screen transition-all duration-300"
            :class="
                sidebarMinimized
                    ? 'lg:pl-20'
                    : 'lg:pl-64'
            "
        >

            <!-- Topbar -->
            <Topbar
                :user="user"
                :sidebar-minimized="sidebarMinimized"
                @open-sidebar="sidebarOpen = true"
                @toggle-sidebar="
                    sidebarMinimized = !sidebarMinimized
                "
            />

            <!-- Content -->
            <main
                class="mx-auto max-w-7xl
                       px-4 py-6
                       sm:px-6 lg:px-8"
            >

                <!-- Welcome -->
                <WelcomeCard
                    :user="user"
                />

                <!-- Banner -->
                <BannerCarousel
                    :banners="banners"
                />

                <!-- Applications -->
                <ApplicationsGrid
                    :applications="applications"
                />

            </main>

        </div>

    </div>
</template>