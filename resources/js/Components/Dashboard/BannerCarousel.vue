<script setup>
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
} from 'vue'

const props = defineProps({
    banners: {
        type: Array,
        default: () => [],
    },
})

const currentIndex = ref(0)
const isClosed = ref(false)
const isImageLoaded = ref(false)

const touchStartX = ref(0)
const touchEndX = ref(0)

let autoplayTimer = null

const bannerCount = computed(() => {
    return props.banners.length
})

const currentBanner = computed(() => {
    return props.banners[currentIndex.value] ?? null
})

const next = () => {
    if (bannerCount.value <= 1) {
        return
    }

    currentIndex.value =
        (currentIndex.value + 1) %
        bannerCount.value
}

const previous = () => {
    if (bannerCount.value <= 1) {
        return
    }

    currentIndex.value =
        (currentIndex.value -
            1 +
            bannerCount.value) %
        bannerCount.value
}

const goTo = (index) => {
    if (
        index < 0 ||
        index >= bannerCount.value
    ) {
        return
    }

    if (index === currentIndex.value) {
        return
    }

    isImageLoaded.value = false
    currentIndex.value = index
}

const closeBanner = () => {
    isClosed.value = true
    stopAutoplay()
}

const handleImageLoad = () => {
    isImageLoaded.value = true
}

const handleImageError = () => {
    isImageLoaded.value = true
}

const startAutoplay = () => {
    stopAutoplay()

    if (
        bannerCount.value <= 1 ||
        isClosed.value
    ) {
        return
    }

    autoplayTimer = setInterval(() => {
        next()
    }, 5000)
}

const stopAutoplay = () => {
    if (autoplayTimer !== null) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
    }
}

const handleTouchStart = (event) => {
    if (!event.touches.length) {
        return
    }

    touchStartX.value =
        event.touches[0].clientX

    stopAutoplay()
}

const handleTouchEnd = (event) => {
    if (!event.changedTouches.length) {
        startAutoplay()
        return
    }

    touchEndX.value =
        event.changedTouches[0].clientX

    const difference =
        touchStartX.value -
        touchEndX.value

    if (Math.abs(difference) < 50) {
        startAutoplay()
        return
    }

    if (difference > 0) {
        next()
    } else {
        previous()
    }

    startAutoplay()
}

watch(
    () => props.banners,
    () => {
        currentIndex.value = 0
        isImageLoaded.value = false

        if (
            currentIndex.value >=
            props.banners.length
        ) {
            currentIndex.value = 0
        }

        nextTick(() => {
            startAutoplay()
        })
    },
    {
        deep: true,
    }
)

watch(
    currentIndex,
    () => {
        isImageLoaded.value = false
    }
)

onMounted(() => {
    startAutoplay()
})

onBeforeUnmount(() => {
    stopAutoplay()
})
</script>

<template>
    <section
        v-if="
            banners.length &&
            !isClosed
        "
        class="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            w-full
            px-3
            sm:px-5
            pointer-events-none
        "
    >
        <div
            class="
                pointer-events-auto
                w-[92%]
                sm:w-[85%]
                md:w-3/4
                lg:w-3/4
            "
        >
            <div
                class="
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-gray-100
                    shadow-2xl
                    ring-1
                    ring-black/5
                "
                @mouseenter="stopAutoplay"
                @mouseleave="startAutoplay"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
            >
                <div
                    class="
                        relative
                        aspect-[16/9]
                        w-full
                        overflow-hidden
                        bg-gray-200
                    "
                >
                    <!-- SKELETON -->
                    <div
                        v-if="!isImageLoaded"
                        class="
                            absolute
                            inset-0
                            z-10
                            overflow-hidden
                            bg-gray-200
                        "
                    >
                        <div
                            class="
                                absolute
                                inset-0
                                -translate-x-full
                                animate-[shimmer_1.5s_infinite]
                                bg-gradient-to-r
                                from-transparent
                                via-white/40
                                to-transparent
                            "
                        ></div>

                        <div
                            class="
                                absolute
                                bottom-0
                                left-0
                                right-0
                                p-5
                                sm:p-6
                            "
                        >
                            <div
                                class="
                                    h-5
                                    w-1/3
                                    rounded-md
                                    bg-gray-300
                                "
                            ></div>

                            <div
                                class="
                                    mt-2
                                    h-3
                                    w-1/5
                                    rounded-md
                                    bg-gray-300
                                "
                            ></div>
                        </div>
                    </div>

                    <transition
                        name="banner-fade"
                        mode="out-in"
                    >
                        <div
                            v-if="currentBanner"
                            :key="currentBanner.id"
                            class="
                                absolute
                                inset-0
                            "
                        >
                            <img
                                :src="
                                    `/banners/${currentBanner.image}`
                                "
                                :alt="
                                    currentBanner.title
                                "
                                :loading="
                                    currentIndex === 0
                                        ? 'eager'
                                        : 'lazy'
                                "
                                decoding="async"
                                class="
                                    h-full
                                    w-full
                                    object-cover
                                "
                                @load="handleImageLoad"
                                @error="handleImageError"
                            />

                            <div
                                class="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/50
                                    via-black/10
                                    to-transparent
                                "
                            ></div>

                            <div
                                class="
                                    absolute
                                    bottom-0
                                    left-0
                                    right-0
                                    p-5
                                    pr-14
                                    sm:p-6
                                    sm:pr-16
                                "
                            >
                                <h2
                                    class="
                                        text-lg
                                        font-semibold
                                        text-white
                                        drop-shadow
                                        sm:text-xl
                                    "
                                >
                                    {{
                                        currentBanner.title
                                    }}
                                </h2>
                            </div>
                        </div>
                    </transition>

                    <!-- CLOSE -->
                    <button
                        type="button"
                        class="
                            absolute
                            right-3
                            top-3
                            z-30
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-black/40
                            text-white
                            shadow-lg
                            backdrop-blur-md
                            transition
                            hover:bg-black/60
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                            sm:h-10
                            sm:w-10
                        "
                        aria-label="Tutup banner"
                        title="Tutup banner"
                        @click="closeBanner"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="h-5 w-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <!-- PREVIOUS -->
                    <button
                        v-if="bannerCount > 1"
                        type="button"
                        class="
                            absolute
                            left-3
                            top-1/2
                            z-20
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white/80
                            text-gray-700
                            shadow
                            backdrop-blur
                            transition
                            hover:bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                        aria-label="Banner sebelumnya"
                        @click="previous"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="h-5 w-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    <!-- NEXT -->
                    <button
                        v-if="bannerCount > 1"
                        type="button"
                        class="
                            absolute
                            right-3
                            top-1/2
                            z-20
                            flex
                            h-9
                            w-9
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            bg-white/80
                            text-gray-700
                            shadow
                            backdrop-blur
                            transition
                            hover:bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                        aria-label="Banner berikutnya"
                        @click="next"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            class="h-5 w-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>

                    <!-- INDICATORS -->
                    <div
                        v-if="bannerCount > 1"
                        class="
                            absolute
                            bottom-3
                            left-1/2
                            z-20
                            flex
                            -translate-x-1/2
                            items-center
                            gap-1.5
                        "
                    >
                        <button
                            v-for="(
                                banner,
                                index
                            ) in banners"
                            :key="banner.id"
                            type="button"
                            class="
                                h-1.5
                                rounded-full
                                transition-all
                                duration-300
                            "
                            :class="
                                currentIndex === index
                                    ? 'w-6 bg-white'
                                    : 'w-1.5 bg-white/60 hover:bg-white/80'
                            "
                            :aria-label="
                                `Tampilkan banner ${index + 1}`
                            "
                            @click="goTo(index)"
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.banner-fade-enter-active,
.banner-fade-leave-active {
    transition: opacity 0.3s ease;
}

.banner-fade-enter-from,
.banner-fade-leave-to {
    opacity: 0;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>