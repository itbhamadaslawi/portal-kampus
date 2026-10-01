<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'

const emit = defineEmits([
    'user-found',
])

const type = ref('mahasiswa')
const identifier = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const identifierLabel = computed(() => {
    return type.value === 'mahasiswa'
        ? 'NIM'
        : 'Kode Dosen'
})

const identifierPlaceholder = computed(() => {
    return type.value === 'mahasiswa'
        ? 'Masukkan NIM'
        : 'Masukkan kode dosen'
})

const changeType = () => {
    identifier.value = ''
    errorMessage.value = ''
    successMessage.value = ''
}

const search = async () => {
    errorMessage.value = ''
    successMessage.value = ''

    const value = String(
        identifier.value || ''
    )
        .trim()
        .toUpperCase()

    if (!value) {
        errorMessage.value =
            `${identifierLabel.value} wajib diisi.`

        return
    }

    loading.value = true

    try {
        const response = await axios.get(
            '/admin/users/import/siakad-identifier',
            {
                params: {
                    type: type.value,
                    identifier: value,
                },
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        const user =
            response.data?.data ?? null

        if (!user) {
            errorMessage.value =
                'Data tidak ditemukan di SIAKAD.'

            return
        }

        emit('user-found', user)

        successMessage.value =
            type.value === 'mahasiswa'
                ? 'Data mahasiswa berhasil diambil dari SIAKAD.'
                : 'Data dosen berhasil diambil dari SIAKAD.'
    } catch (error) {
        console.error(
            'SIAKAD IDENTIFIER ERROR:',
            error.response?.data || error
        )

        errorMessage.value =
            error.response?.data?.message ||
            'Data gagal diambil dari SIAKAD.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <div>
            <h3 class="text-sm font-semibold text-blue-900">
                Sinkronisasi SIAKAD
            </h3>

            <p class="mt-1 text-xs leading-5 text-blue-700">
                Pilih jenis pengguna kemudian masukkan
                identitas untuk mengambil data dari SIAKAD.
            </p>
        </div>

        <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr_auto]">
            <div>
                <label class="mb-1.5 block text-xs font-medium text-gray-700">
                    Jenis Pengguna
                </label>

                <select v-model="type"
                    class="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    :disabled="loading" @change="changeType">
                    <option value="mahasiswa">
                        Mahasiswa
                    </option>

                    <option value="dosen">
                        Dosen
                    </option>
                </select>
            </div>

            <div>
                <label class="mb-1.5 block text-xs font-medium text-gray-700">
                    {{ identifierLabel }}
                </label>

                <input v-model="identifier" type="text" autocomplete="off" :placeholder="identifierPlaceholder"
                    class="w-full rounded-lg border border-blue-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    :disabled="loading" @keyup.enter="search" />
            </div>

            <div class="flex items-end">
                <button type="button"
                    class="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    :disabled="loading" @click="search">
                    <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor">
                        <circle cx="12" cy="12" r="9" stroke-width="2" class="opacity-30" />

                        <path d="M21 12a9 9 0 0 0-9-9" stroke-width="2" stroke-linecap="round" />
                    </svg>

                    <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="7" />

                        <path d="m20 20-4-4" />
                    </svg>

                    {{
                        loading
                            ? 'Mengambil...'
                            : 'Ambil Data'
                    }}
                </button>
            </div>
        </div>

        <div v-if="errorMessage" class="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {{ errorMessage }}
        </div>

        <div v-if="successMessage"
            class="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700">
            {{ successMessage }}
        </div>
    </div>
</template>