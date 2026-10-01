<script setup>
import { computed } from 'vue'

const props = defineProps({
    groups: {
        type: Array,
        default: () => [],
    },
    modelValue: {
        type: Array,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits([
    'update:modelValue',
])

const selectedGroups = computed({
    get() {
        return props.modelValue
    },

    set(value) {
        emit(
            'update:modelValue',
            value
        )
    },
})

const getGroupLevel = (path) => {
    const normalizedPath = String(path || '')
        .trim()
        .replace(/^\/+|\/+$/g, '')

    if (!normalizedPath) {
        return 0
    }

    return Math.max(
        0,
        normalizedPath
            .split('/')
            .filter(Boolean)
            .length - 1
    )
}

const normalizeGroup = (group) => {
    const path = String(
        group?.path ?? ''
    ).trim()

    return {
        ...group,
        id: String(
            group?.id ?? path
        ),
        name: String(
            group?.name ?? ''
        ).trim(),
        path,
        level: Number.isFinite(
            Number(group?.level)
        )
            ? Number(group.level)
            : getGroupLevel(path),
    }
}

const normalizedGroups = computed(() => {
    return props.groups
        .map(normalizeGroup)
        .filter(group =>
            group.id &&
            group.name &&
            group.path
        )
})

const isSelected = (groupId) => {
    return selectedGroups.value.some(
        id =>
            String(id) ===
            String(groupId)
    )
}

const toggleGroup = (groupId) => {
    const id = String(groupId)

    if (isSelected(id)) {
        selectedGroups.value =
            selectedGroups.value.filter(
                selectedId =>
                    String(selectedId) !== id
            )

        return
    }

    selectedGroups.value = [
        ...selectedGroups.value,
        id,
    ]
}
</script>

<template>
    <div
        class="rounded-xl border border-gray-200 bg-white"
    >
        <div
            class="border-b border-gray-200 px-5 py-4"
        >
            <h3
                class="text-base font-semibold text-gray-900"
            >
                Group Pengguna
            </h3>

            <p
                class="mt-1 text-sm text-gray-500"
            >
                Pilih group yang akan diberikan kepada pengguna.
            </p>
        </div>

        <div class="p-5">
            <div
                v-if="loading"
                class="space-y-2"
            >
                <div
                    v-for="index in 6"
                    :key="index"
                    class="h-10 animate-pulse rounded-lg bg-gray-100"
                ></div>
            </div>

            <div
                v-else-if="!normalizedGroups.length"
                class="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500"
            >
                Group tidak tersedia.
            </div>

            <div
                v-else
                class="max-h-[420px] overflow-y-auto"
            >
                <label
                    v-for="group in normalizedGroups"
                    :key="group.id"
                    class="flex cursor-pointer items-center gap-3 rounded-lg py-2.5 pr-3 transition hover:bg-gray-50"
                    :style="{
                        paddingLeft:
                            `${12 + ((group.level || 0) * 24)}px`
                    }"
                >
                    <input
                        type="checkbox"
                        :checked="
                            isSelected(group.id)
                        "
                        class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        @change="
                            toggleGroup(group.id)
                        "
                    />

                    <div class="min-w-0">
                        <div
                            class="text-sm font-medium text-gray-800"
                        >
                            {{ group.name }}
                        </div>

                        <div
                            class="text-xs text-gray-500"
                        >
                            {{ group.path }}
                        </div>
                    </div>
                </label>
            </div>

            <div
                v-if="normalizedGroups.length"
                class="mt-4 border-t border-gray-200 pt-4"
            >
                <span
                    class="text-sm text-gray-500"
                >
                    {{ selectedGroups.length }}
                    group dipilih
                </span>
            </div>
        </div>
    </div>
</template>