<script setup>
import { ref } from 'vue'

import Sidebar from '@/Components/Dashboard/Sidebar.vue'
import Topbar from '@/Components/Dashboard/Topbar.vue'

defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
})

const sidebarOpen = ref(false)
const sidebarMinimized = ref(false)
</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <!-- Sidebar -->
        <Sidebar
            :sidebar-open="sidebarOpen"
            :sidebar-minimized="sidebarMinimized"
            @close="sidebarOpen = false"
        />

        <!-- Main Area -->
        <div
            class="min-h-screen transition-all duration-300"
            :class="sidebarMinimized
                ? 'lg:pl-20'
                : 'lg:pl-64'"
        >

            <!-- Topbar -->
            <Topbar
                :user="user"
                :sidebar-minimized="sidebarMinimized"
                @open-sidebar="sidebarOpen = true"
                @toggle-sidebar="sidebarMinimized = !sidebarMinimized"
            />

            <!-- Page Content -->
            <main
                class="mx-auto max-w-7xl
                       px-4 py-6
                       sm:px-6 lg:px-8"
            >
                <slot />
            </main>

        </div>
    </div>
</template>