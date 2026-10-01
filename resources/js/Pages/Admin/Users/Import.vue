<script setup>
import { Head, router } from '@inertiajs/vue3'
import axios from 'axios'
import * as XLSX from 'xlsx'
import {
    computed,
    onBeforeUnmount,
    ref,
} from 'vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const fileInput = ref(null)

const selectedFile = ref(null)
const previewData = ref([])

const loadingPreview = ref(false)
const loadingSync = ref(false)
const loadingSubmit = ref(false)

const dragOver = ref(false)

const successMessage = ref('')
const errorMessage = ref('')

const currentPage = ref(1)
const perPage = ref(10)

const syncDateFrom = ref('')
const syncDateTo = ref('')

/*
|--------------------------------------------------------------------------
| Submit Confirmation
|--------------------------------------------------------------------------
*/

const showSubmitConfirm = ref(false)
const showGroupSelect = ref(false)
const loadingGroups = ref(false)
const availableGroups = ref([])
const selectedGroups = ref([])

const submitResult = ref({
    total: 0,
    success: 0,
    error: 0,
    existing: 0,
})

/*
|--------------------------------------------------------------------------
| Messages
|--------------------------------------------------------------------------
*/

const closeMessages = () => {
    successMessage.value = ''
    errorMessage.value = ''
}

/*
|--------------------------------------------------------------------------
| File
|--------------------------------------------------------------------------
*/

const openFilePicker = () => {
    fileInput.value?.click()
}

const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
        return
    }

    handleFile(file)
}

const handleFile = (file) => {
    closeMessages()

    const allowedExtensions = [
        'xlsx',
        'xls',
        'csv',
    ]

    const extension = file.name
        .split('.')
        .pop()
        ?.toLowerCase()

    if (
        !extension ||
        !allowedExtensions.includes(extension)
    ) {
        errorMessage.value =
            'File harus berformat XLSX, XLS atau CSV.'

        return
    }

    if (file.size > 5 * 1024 * 1024) {
        errorMessage.value =
            'Ukuran file maksimal 5 MB.'

        return
    }

    selectedFile.value = file
    previewData.value = []
    currentPage.value = 1
}

const removeFile = () => {
    if (loadingPreview.value) {
        return
    }

    selectedFile.value = null
    previewData.value = []
    currentPage.value = 1

    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleDragOver = (event) => {
    event.preventDefault()
    dragOver.value = true
}

const handleDragLeave = () => {
    dragOver.value = false
}

const handleDrop = (event) => {
    event.preventDefault()
    dragOver.value = false

    const file = event.dataTransfer?.files?.[0]

    if (!file) {
        return
    }

    handleFile(file)
}

const downloadTemplate = () => {
    window.location.href =
        '/admin/users/import/template'
}

/*
|--------------------------------------------------------------------------
| Excel Helpers
|--------------------------------------------------------------------------
*/

const normalizeHeader = (header) => {
    return String(header ?? '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/-/g, '_')
}

const normalizeValue = (value) => {
    if (
        value === null ||
        value === undefined
    ) {
        return ''
    }

    return String(value).trim()
}

/*
|--------------------------------------------------------------------------
| Preview Excel
|--------------------------------------------------------------------------
*/

const previewExcel = async () => {
    closeMessages()

    if (!selectedFile.value) {
        errorMessage.value =
            'Silakan pilih file Excel terlebih dahulu.'

        return
    }

    loadingPreview.value = true
    previewData.value = []

    try {
        const arrayBuffer =
            await selectedFile.value.arrayBuffer()

        const workbook = XLSX.read(
            arrayBuffer,
            {
                type: 'array',
                cellDates: true,
            }
        )

        const firstSheetName =
            workbook.SheetNames[0]

        if (!firstSheetName) {
            throw new Error(
                'Sheet Excel tidak ditemukan.'
            )
        }

        const worksheet =
            workbook.Sheets[firstSheetName]

        const rawData =
            XLSX.utils.sheet_to_json(
                worksheet,
                {
                    defval: '',
                    raw: false,
                }
            )

        if (!rawData.length) {
            throw new Error(
                'File Excel tidak memiliki data.'
            )
        }

        const requiredColumns = [
            'nim',
            'username',
            'nama',
            'first_name',
            'last_name',
        ]

        const firstRow = rawData[0]

        const originalHeaders =
            Object.keys(firstRow)

        const normalizedHeaders =
            originalHeaders.map(
                (header) =>
                    normalizeHeader(header)
            )

        const missingColumns =
            requiredColumns.filter(
                (requiredColumn) =>
                    !normalizedHeaders.includes(
                        requiredColumn
                    )
            )

        if (missingColumns.length) {
            throw new Error(
                `Kolom wajib tidak ditemukan: ${missingColumns.join(', ')}`
            )
        }

        const columnMap = {}

        originalHeaders.forEach(
            (originalHeader) => {
                const normalized =
                    normalizeHeader(
                        originalHeader
                    )

                columnMap[normalized] =
                    originalHeader
            }
        )

        const mappedData =
            rawData.map(
                (row, index) => {
                    const nim =
                        normalizeValue(
                            row[
                            columnMap.nim
                            ]
                        )

                    const username =
                        normalizeValue(
                            row[
                            columnMap.username
                            ]
                        )

                    const nama =
                        normalizeValue(
                            row[
                            columnMap.nama
                            ]
                        )

                    const email =
                        columnMap.email
                            ? normalizeValue(
                                row[
                                columnMap.email
                                ]
                            )
                            : ''

                    const firstName =
                        normalizeValue(
                            row[
                            columnMap.first_name
                            ]
                        )

                    const lastName =
                        normalizeValue(
                            row[
                            columnMap.last_name
                            ]
                        )

                    const errors = []

                    if (!nim) {
                        errors.push(
                            'NIM wajib diisi'
                        )
                    }

                    if (!username) {
                        errors.push(
                            'Username wajib diisi'
                        )
                    }

                    if (!nama) {
                        errors.push(
                            'Nama wajib diisi'
                        )
                    }

                    if (!firstName) {
                        errors.push(
                            'First Name wajib diisi'
                        )
                    }

                    if (!lastName) {
                        errors.push(
                            'Last Name wajib diisi'
                        )
                    }

                    return {
                        id: `${Date.now()}-${index}`,
                        row: index + 2,
                        nim,
                        username,
                        nama,
                        email,
                        first_name:
                            firstName,
                        last_name:
                            lastName,
                        status: errors.length
                            ? 'error'
                            : 'valid',
                        message:
                            errors.length
                                ? errors.join(
                                    ', '
                                )
                                : 'Data valid',
                    }
                }
            )

        previewData.value = mappedData
        currentPage.value = 1

        successMessage.value =
            `Berhasil membaca ${mappedData.length} data dari Excel.`
    } catch (error) {
        console.error(error)

        errorMessage.value =
            error?.message ||
            'File Excel gagal diproses.'

        previewData.value = []
    } finally {
        loadingPreview.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Sinkronisasi SIAKAD
|--------------------------------------------------------------------------
*/

const syncSiakad = async () => {
    closeMessages()

    if (!syncDateFrom.value || !syncDateTo.value) {
        errorMessage.value =
            'Tanggal dari dan tanggal sampai wajib diisi.'

        return
    }

    if (syncDateFrom.value > syncDateTo.value) {
        errorMessage.value =
            'Tanggal dari tidak boleh lebih besar dari tanggal sampai.'

        return
    }

    loadingSync.value = true
    previewData.value = []

    try {
        const response = await axios.post(
            '/admin/users/import/sync',
            {
                date_from: syncDateFrom.value,
                date_to: syncDateTo.value,
            }
        )

        const data =
            Array.isArray(response.data?.data)
                ? response.data.data
                : []

        previewData.value =
            data.map((item, index) => ({
                id:
                    item.id ??
                    `${Date.now()}-${index}`,
                row:
                    item.row ??
                    index + 1,
                nim:
                    item.nim ?? '',
                username:
                    item.username ?? '',
                nama:
                    item.nama ?? '',
                email:
                    item.email ?? '',
                first_name:
                    item.first_name ?? '',
                last_name:
                    item.last_name ?? '',
                status:
                    item.status ?? 'valid',
                message:
                    item.message ??
                    'Data valid',
            }))

        currentPage.value = 1

        successMessage.value =
            response.data?.message ||
            `Berhasil mengambil ${previewData.value.length} data dari SIAKAD.`
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Sinkronisasi SIAKAD gagal.'

        previewData.value = []
    } finally {
        loadingSync.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Row Actions
|--------------------------------------------------------------------------
*/

const removeRow = (item) => {
    const index =
        previewData.value.findIndex(
            (row) =>
                row.id === item.id
        )

    if (index === -1) {
        return
    }

    previewData.value.splice(index, 1)

    if (
        currentPage.value >
        totalPages.value
    ) {
        currentPage.value =
            totalPages.value
    }

    if (!previewData.value.length) {
        currentPage.value = 1
    }
}

const removeInvalidRows = () => {
    const removableCount =
        previewData.value.filter(
            (item) => {
                const status =
                    String(
                        item.status || ''
                    ).toLowerCase()

                return (
                    status === 'error' ||
                    status === 'invalid' ||
                    status === 'existing' ||
                    status === 'duplicate'
                )
            }
        ).length

    if (!removableCount) {
        return
    }

    const confirmed =
        window.confirm(
            `Hapus ${removableCount} data Error/Existing dari preview?`
        )

    if (!confirmed) {
        return
    }

    previewData.value =
        previewData.value.filter(
            (item) => {
                const status =
                    String(
                        item.status || ''
                    ).toLowerCase()

                return ![
                    'error',
                    'invalid',
                    'existing',
                    'duplicate',
                ].includes(status)
            }
        )

    if (
        currentPage.value >
        totalPages.value
    ) {
        currentPage.value =
            totalPages.value
    }

    successMessage.value =
        `${removableCount} data tidak digunakan telah dihapus dari preview.`
}

/*
|--------------------------------------------------------------------------
| Submit Confirmation
|--------------------------------------------------------------------------
*/

const getGroupLevel = (path) => {
    const normalizedPath = String(path || '')
        .trim()
        .replace(/^\/+|\/+$/g, '')

    if (!normalizedPath) {
        return 0
    }

    return Math.max(
        0,
        normalizedPath.split('/').filter(Boolean).length - 1
    )
}

const normalizeGroups = (items, result = []) => {
    if (!Array.isArray(items)) {
        return result
    }

    items.forEach((group) => {
        if (!group) {
            return
        }

        const path = String(group.path ?? '').trim()
        const name = String(group.name ?? '').trim()

        if (path && name) {
            const existing = result.find(
                (item) => item.path === path
            )

            if (!existing) {
                result.push({
                    id: group.id ?? path,
                    name,
                    path,
                    level: Number.isFinite(Number(group.level))
                        ? Number(group.level)
                        : getGroupLevel(path),
                })
            }
        }

        const children =
            group.subGroups ??
            group.subgroups ??
            group.children ??
            []

        if (Array.isArray(children)) {
            normalizeGroups(children, result)
        }
    })

    return result
}

const loadAvailableGroups = async () => {
    loadingGroups.value = true

    try {
        const response = await axios.get(
            '/admin/applications/groups',
            {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            }
        )

        availableGroups.value = normalizeGroups(
            response.data?.data
        )
    } catch (error) {
        availableGroups.value = []

        errorMessage.value =
            error.response?.data?.message ||
            'Group SSO gagal dimuat.'
    } finally {
        loadingGroups.value = false
    }
}

const openSubmitConfirm = async () => {
    closeMessages()

    if (!previewData.value.length) {
        errorMessage.value =
            'Belum ada data yang dapat dikirim ke SSO.'

        return
    }

    const validData =
        previewData.value.filter(
            (item) =>
                String(
                    item.status || ''
                ).toLowerCase() === 'valid'
        )

    if (!validData.length) {
        errorMessage.value =
            'Tidak ada data valid yang dapat dikirim ke SSO.'

        return
    }

    selectedGroups.value = []
    showGroupSelect.value = true

    await loadAvailableGroups()
}

const cancelGroupSelect = () => {
    if (loadingSubmit.value) {
        return
    }

    showGroupSelect.value = false
    selectedGroups.value = []
}

const continueToSubmitConfirm = () => {
    if (!selectedGroups.value.length) {
        errorMessage.value =
            'Silakan pilih minimal satu group terlebih dahulu.'

        return
    }

    showGroupSelect.value = false
    showSubmitConfirm.value = true
}

const cancelSubmit = () => {
    if (loadingSubmit.value) {
        return
    }

    showSubmitConfirm.value = false
}

const confirmSubmit = async () => {
    if (loadingSubmit.value) {
        return
    }

    const validData =
        previewData.value.filter(
            (item) =>
                String(
                    item.status || ''
                ).toLowerCase() === 'valid'
        )

    if (!validData.length) {
        showSubmitConfirm.value = false

        errorMessage.value =
            'Tidak ada data valid yang dapat dikirim ke SSO.'

        return
    }

    loadingSubmit.value = true

    submitResult.value = {
        total: validData.length,
        success: 0,
        error: 0,
        existing: 0,
    }

    try {
        const response =
            await axios.post(
                '/admin/users/import/submit',
                {
                    data: validData,
                    group_ids: selectedGroups.value,
                }
            )

        const result =
            response.data?.summary || {}

        submitResult.value = {
            total:
                Number(
                    result.total
                ) ||
                validData.length,

            success:
                Number(
                    result.success
                ) || 0,

            error:
                Number(
                    result.error
                ) || 0,

            existing:
                Number(
                    result.existing
                ) ||
                Number(
                    result.duplicate
                ) ||
                0,
        }

        if (
            Array.isArray(
                response.data?.data
            )
        ) {
            previewData.value =
                response.data.data.map(
                    (item, index) => ({
                        id:
                            item.id ??
                            `${Date.now()}-${index}`,
                        row:
                            item.row ??
                            index + 1,
                        nim:
                            item.nim ?? '',
                        username:
                            item.username ?? '',
                        nama:
                            item.nama ?? '',
                        email:
                            item.email ?? '',
                        first_name:
                            item.first_name ?? '',
                        last_name:
                            item.last_name ?? '',
                        status:
                            item.status ??
                            'valid',
                        message:
                            item.message ??
                            'Data valid',
                    })
                )
        }

        showSubmitConfirm.value = false

        successMessage.value =
            response.data?.message ||
            `Submit selesai. ${submitResult.value.success} data berhasil dibuat.`

    } catch (error) {
        console.error(error)

        const responseData =
            error.response?.data

        if (responseData?.summary) {
            const result =
                responseData.summary

            submitResult.value = {
                total:
                    Number(
                        result.total
                    ) ||
                    validData.length,

                success:
                    Number(
                        result.success
                    ) || 0,

                error:
                    Number(
                        result.error
                    ) || 0,

                existing:
                    Number(
                        result.existing
                    ) ||
                    Number(
                        result.duplicate
                    ) ||
                    0,
            }
        }

        errorMessage.value =
            responseData?.message ||
            'Data gagal dikirim ke SSO.'

        showSubmitConfirm.value = false
    } finally {
        loadingSubmit.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Computed
|--------------------------------------------------------------------------
*/

const totalData = computed(() => {
    return previewData.value.length
})

const validCount = computed(() => {
    return previewData.value.filter(
        (item) =>
            String(
                item.status || ''
            ).toLowerCase() === 'valid'
    ).length
})

const errorCount = computed(() => {
    return previewData.value.filter(
        (item) => {
            const status =
                String(
                    item.status || ''
                ).toLowerCase()

            return (
                status === 'error' ||
                status === 'invalid'
            )
        }
    ).length
})

const existingCount = computed(() => {
    return previewData.value.filter(
        (item) => {
            const status =
                String(
                    item.status || ''
                ).toLowerCase()

            return (
                status === 'existing' ||
                status === 'duplicate'
            )
        }
    ).length
})

const totalPages = computed(() => {
    return Math.max(
        1,
        Math.ceil(
            totalData.value /
            perPage.value
        )
    )
})

const paginatedData = computed(() => {
    const start =
        (currentPage.value - 1) *
        perPage.value

    return previewData.value.slice(
        start,
        start + perPage.value
    )
})

const startData = computed(() => {
    if (!totalData.value) {
        return 0
    }

    return (
        (currentPage.value - 1) *
        perPage.value +
        1
    )
})

const endData = computed(() => {
    return Math.min(
        currentPage.value *
        perPage.value,
        totalData.value
    )
})

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const goToPage = (page) => {
    if (
        page < 1 ||
        page > totalPages.value
    ) {
        return
    }

    currentPage.value = page
}

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

const statusClass = (status) => {
    const value =
        String(status || '')
            .toLowerCase()

    if (value === 'valid') {
        return 'bg-green-50 text-green-700'
    }

    if (
        value === 'existing' ||
        value === 'duplicate'
    ) {
        return 'bg-amber-50 text-amber-700'
    }

    return 'bg-red-50 text-red-700'
}

const statusLabel = (status) => {
    const value =
        String(status || '')
            .toLowerCase()

    if (value === 'valid') {
        return 'Valid'
    }

    if (value === 'existing') {
        return 'Sudah Ada'
    }

    if (value === 'duplicate') {
        return 'Duplikat'
    }

    if (value === 'invalid') {
        return 'Invalid'
    }

    if (value === 'error') {
        return 'Error'
    }

    return status || '-'
}

/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
*/

const goBack = () => {
    router.visit('/admin/users')
}

/*
|--------------------------------------------------------------------------
| Cleanup
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {
    if (fileInput.value) {
        fileInput.value.value = ''
    }
})
</script>

<template>

    <Head title="Import User" />

    <DashboardLayout>
        <div class="w-full min-w-0 space-y-6">

            <!-- ========================================================= -->
            <!-- Messages -->
            <!-- ========================================================= -->

            <div v-if="successMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <div>
                    {{ successMessage }}
                </div>

                <button type="button" class="cursor-pointer text-green-600 hover:text-green-800"
                    @click="successMessage = ''">
                    ×
                </button>
            </div>

            <div v-if="errorMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <div>
                    {{ errorMessage }}
                </div>

                <button type="button" class="cursor-pointer text-red-600 hover:text-red-800" @click="errorMessage = ''">
                    ×
                </button>
            </div>

            <!-- ========================================================= -->
            <!-- Header -->
            <!-- ========================================================= -->

            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-2xl font-semibold text-gray-900">
                        Import User
                    </h1>

                    <p class="mt-1 text-sm text-gray-500">
                        Import pengguna melalui Excel atau sinkronisasi SIAKAD.
                    </p>
                </div>

                <button type="button"
                    class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    @click="goBack">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg>

                    Kembali
                </button>
            </div>

            <!-- ========================================================= -->
            <!-- Import Options -->
            <!-- ========================================================= -->

            <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">

                <!-- Excel -->

                <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div class="flex items-start gap-4">

                        <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                                <path d="M14 2v6h6" />
                            </svg>
                        </div>

                        <div>
                            <h2 class="text-base font-semibold text-gray-900">
                                Import dari Excel
                            </h2>

                            <p class="mt-1 text-sm leading-5 text-gray-500">
                                Upload file Excel sesuai template untuk melihat data sebelum dikirim.
                            </p>
                        </div>
                    </div>

                    <div class="mt-5 flex flex-wrap gap-2">
                        <button type="button"
                            class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            @click="downloadTemplate">
                            Download Template
                        </button>
                    </div>

                    <input ref="fileInput" type="file" class="hidden" accept=".xlsx,.xls,.csv"
                        @change="handleFileChange" />

                    <div class="mt-4 rounded-xl border-2 border-dashed p-5 transition" :class="dragOver
                        ? 'border-gray-500 bg-gray-50'
                        : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                        " @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop">
                        <div v-if="!selectedFile" class="flex flex-col items-center justify-center py-5 text-center">
                            <div
                                class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 3v12" />
                                    <path d="m7 10 5 5 5-5" />
                                    <path d="M5 21h14" />
                                </svg>
                            </div>

                            <div class="mt-3 text-sm font-medium text-gray-700">
                                Pilih file Excel
                            </div>

                            <div class="mt-1 text-xs text-gray-500">
                                XLSX, XLS atau CSV. Maksimal 5 MB.
                            </div>

                            <button type="button"
                                class="mt-4 cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                                @click="openFilePicker">
                                Pilih File
                            </button>
                        </div>

                        <div v-else class="flex items-center justify-between gap-4">
                            <div class="flex min-w-0 items-center gap-3">

                                <div
                                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-xs font-semibold text-green-600">
                                    XLS
                                </div>

                                <div class="min-w-0">
                                    <div class="truncate text-sm font-medium text-gray-900">
                                        {{ selectedFile.name }}
                                    </div>

                                    <div class="mt-0.5 text-xs text-gray-500">
                                        {{
                                            (
                                                selectedFile.size /
                                                1024
                                            ).toFixed(1)
                                        }}
                                        KB
                                    </div>
                                </div>
                            </div>

                            <button type="button"
                                class="shrink-0 cursor-pointer rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                                @click="removeFile">
                                ×
                            </button>
                        </div>
                    </div>

                    <button v-if="selectedFile" type="button"
                        class="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="loadingPreview ||
                            loadingSync ||
                            loadingSubmit
                            " @click="previewExcel">
                        <span v-if="loadingPreview"
                            class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                        {{
                            loadingPreview
                                ? 'Membaca Excel...'
                                : 'Preview File'
                        }}
                    </button>
                </div>

                <!-- SIAKAD -->

                <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div class="flex items-start gap-4">

                        <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 10.5 12 5l9 5.5" />
                                <path d="M5 10v8" />
                                <path d="M9 12v6" />
                                <path d="M15 12v6" />
                                <path d="M19 10v8" />
                                <path d="M3 18h18" />
                                <path d="M12 5v1" />
                            </svg>
                        </div>

                        <div>
                            <h2 class="text-base font-semibold text-gray-900">
                                Sinkronisasi SIAKAD
                            </h2>

                            <p class="mt-1 text-sm leading-5 text-gray-500">
                                Ambil data pengguna terbaru dari SIAKAD berdasarkan rentang tanggal.
                            </p>
                        </div>
                    </div>

                    <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div>
                            <label for="sync-date-from" class="mb-1.5 block text-sm font-medium text-gray-700">
                                Tanggal Dari
                            </label>

                            <input id="sync-date-from" v-model="syncDateFrom" type="date"
                                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                                :disabled="loadingSync ||
                                    loadingPreview ||
                                    loadingSubmit
                                    " />
                        </div>

                        <div>
                            <label for="sync-date-to" class="mb-1.5 block text-sm font-medium text-gray-700">
                                Tanggal Sampai
                            </label>

                            <input id="sync-date-to" v-model="syncDateTo" type="date" :min="syncDateFrom"
                                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                                :disabled="loadingSync ||
                                    loadingPreview ||
                                    loadingSubmit
                                    " />
                        </div>
                    </div>

                    <div class="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
                        <div class="flex gap-3">

                            <svg class="mt-0.5 shrink-0 text-blue-500" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="12" cy="12" r="9" />

                                <path d="M12 11v5" />
                                <path d="M12 8h.01" />
                            </svg>

                            <p class="text-xs leading-5 text-blue-700">
                                Pilih rentang tanggal data yang ingin diambil dari SIAKAD.
                                Data hanya ditampilkan sebagai preview dan belum dibuat di
                                SSO sampai tombol Submit ditekan.
                            </p>
                        </div>
                    </div>

                    <button type="button"
                        class="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="loadingSync ||
                            loadingPreview ||
                            loadingSubmit ||
                            !syncDateFrom ||
                            !syncDateTo
                            " @click="syncSiakad">
                        <span v-if="loadingSync"
                            class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                        {{
                            loadingSync
                                ? 'Menyinkronkan...'
                                : 'Sinkronisasi SIAKAD'
                        }}
                    </button>
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- Preview -->
            <!-- ========================================================= -->

            <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                <div class="border-b border-gray-200 px-5 py-4">
                    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                            <h2 class="text-base font-semibold text-gray-900">
                                Preview Data
                            </h2>

                            <p class="mt-1 text-sm text-gray-500">
                                Periksa data sebelum dikirim ke SSO.
                                Data yang tidak diperlukan dapat dihapus dari preview.
                            </p>
                        </div>

                        <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">

                            <div class="rounded-lg bg-gray-50 px-4 py-2.5">
                                <div class="text-xs text-gray-500">
                                    Total
                                </div>

                                <div class="mt-0.5 text-lg font-semibold text-gray-900">
                                    {{ totalData }}
                                </div>
                            </div>

                            <div class="rounded-lg bg-green-50 px-4 py-2.5">
                                <div class="text-xs text-green-600">
                                    Valid
                                </div>

                                <div class="mt-0.5 text-lg font-semibold text-green-700">
                                    {{ validCount }}
                                </div>
                            </div>

                            <div class="rounded-lg bg-red-50 px-4 py-2.5">
                                <div class="text-xs text-red-600">
                                    Error
                                </div>

                                <div class="mt-0.5 text-lg font-semibold text-red-700">
                                    {{ errorCount }}
                                </div>
                            </div>

                            <div class="rounded-lg bg-amber-50 px-4 py-2.5">
                                <div class="text-xs text-amber-600">
                                    Existing
                                </div>

                                <div class="mt-0.5 text-lg font-semibold text-amber-700">
                                    {{ existingCount }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="previewData.length"
                        class="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div class="text-xs text-gray-500">
                            Data yang dihapus hanya dihilangkan dari preview.
                        </div>

                        <button v-if="errorCount || existingCount" type="button"
                            class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                            @click="removeInvalidRows">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 6h18" />
                                <path d="M8 6V4h8v2" />
                                <path d="m19 6-1 15H6L5 6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                            </svg>

                            Hapus Error & Existing
                        </button>
                    </div>
                </div>

                <!-- Empty -->

                <div v-if="!previewData.length"
                    class="flex flex-col items-center justify-center px-5 py-20 text-center">
                    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 5h18" />
                            <path d="M3 12h18" />
                            <path d="M3 19h18" />
                        </svg>
                    </div>

                    <div class="mt-4 text-sm font-medium text-gray-700">
                        Belum ada data preview
                    </div>

                    <p class="mt-1 max-w-md text-xs leading-5 text-gray-500">
                        Upload file Excel lalu tekan Preview File atau lakukan
                        sinkronisasi SIAKAD untuk menampilkan datanya.
                    </p>
                </div>

                <!-- Table -->

                <div v-else class="overflow-x-auto">
                    <table class="w-full min-w-[1320px]">

                        <thead>
                            <tr class="border-b border-gray-200 bg-gray-50">
                                <th
                                    class="w-16 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    No
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    NIM
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Username
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Nama
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Email
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    First Name
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Last Name
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Status
                                </th>

                                <th
                                    class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Keterangan
                                </th>

                                <th
                                    class="w-20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="(
item,
    index
                                ) in paginatedData" :key="item.id"
                                class="border-b border-gray-100 transition hover:bg-gray-50">

                                <td class="px-5 py-3.5 text-sm text-gray-500">
                                    {{
                                        startData +
                                        index
                                    }}
                                </td>

                                <td class="px-5 py-3.5 text-sm font-medium text-gray-900">
                                    {{ item.nim || '-' }}
                                </td>

                                <td class="px-5 py-3.5 text-sm font-medium text-gray-900">
                                    {{ item.username || '-' }}
                                </td>

                                <td class="px-5 py-3.5 text-sm text-gray-700">
                                    {{ item.nama || '-' }}
                                </td>

                                <td class="px-5 py-3.5 text-sm text-gray-600">
                                    {{ item.email || '-' }}
                                </td>

                                <td class="px-5 py-3.5 text-sm text-gray-700">
                                    {{ item.first_name || '-' }}
                                </td>

                                <td class="px-5 py-3.5 text-sm text-gray-700">
                                    {{ item.last_name || '-' }}
                                </td>

                                <td class="px-5 py-3.5">
                                    <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium" :class="statusClass(
                                        item.status
                                    )
                                        ">
                                        {{
                                            statusLabel(
                                                item.status
                                            )
                                        }}
                                    </span>
                                </td>

                                <td class="max-w-[280px] px-5 py-3.5">
                                    <span class="block truncate text-sm text-gray-500" :title="item.message ??
                                        ''
                                        ">
                                        {{
                                            item.message ||
                                            '-'
                                        }}
                                    </span>
                                </td>

                                <td class="px-5 py-3.5 text-center">
                                    <button type="button"
                                        class="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                                        title="Hapus dari preview" @click="removeRow(item)">
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M3 6h18" />
                                            <path d="M8 6V4h8v2" />
                                            <path d="m19 6-1 15H6L5 6" />
                                            <path d="M10 11v6" />
                                            <path d="M14 11v6" />
                                        </svg>
                                    </button>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->

                <div v-if="previewData.length"
                    class="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                    <div class="text-sm text-gray-500">
                        Menampilkan

                        <span class="font-medium text-gray-700">
                            {{ startData }}
                        </span>

                        –

                        <span class="font-medium text-gray-700">
                            {{ endData }}
                        </span>

                        dari

                        <span class="font-medium text-gray-700">
                            {{ totalData }}
                        </span>

                        data
                    </div>

                    <div class="flex items-center gap-1">

                        <button type="button"
                            class="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            :disabled="currentPage === 1" @click="
                                goToPage(
                                    currentPage - 1
                                )
                                ">
                            ‹
                        </button>

                        <button v-for="page in totalPages" :key="page" type="button"
                            class="min-w-9 cursor-pointer rounded-lg px-3 py-2 text-sm transition" :class="currentPage === page
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                " @click="
                                    goToPage(page)
                                    ">
                            {{ page }}
                        </button>

                        <button type="button"
                            class="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                            :disabled="currentPage === totalPages
                                " @click="
                                    goToPage(
                                        currentPage + 1
                                    )
                                    ">
                            ›
                        </button>

                    </div>
                </div>
            </div>

            <!-- ========================================================= -->
            <!-- Submit -->
            <!-- ========================================================= -->

            <div v-if="previewData.length"
                class="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div class="text-sm font-semibold text-gray-900">
                        Siap dikirim ke SSO?
                    </div>

                    <p class="mt-1 text-xs leading-5 text-gray-500">
                        Hanya data dengan status Valid yang akan diproses.
                        Data Existing dan Error tidak akan dikirim.
                    </p>
                </div>

                <button type="button"
                    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="!validCount ||
                        loadingSubmit ||
                        loadingPreview ||
                        loadingSync
                        " @click="openSubmitConfirm">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 2 11 13" />
                        <path d="m22 2-7 20-4-9-9-4Z" />
                    </svg>

                    Submit ke SSO ({{ validCount }})
                </button>

            </div>

        </div>

        <!-- ============================================================= -->
        <!-- Group Select Modal -->
        <!-- ============================================================= -->

        <Teleport to="body">
            <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="showGroupSelect"
                    class="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-gray-900/50 px-4 py-4 backdrop-blur-[2px] sm:py-6"
                    @click.self="cancelGroupSelect">

                    <Transition appear enter-active-class="transition duration-200 ease-out"
                        enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                        leave-active-class="transition duration-150 ease-in" leave-from-class="scale-100 opacity-100"
                        leave-to-class="scale-95 opacity-0">

                        <div v-if="showGroupSelect"
                            class="flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100vh-3rem)]">

                            <div class="px-6 pt-6">

                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>

                                <h3 class="mt-4 text-lg font-semibold text-gray-900">
                                    Pilih Group SSO
                                </h3>



                            </div>

                            <div class="px-6 py-5">

                                <div class="mb-3 flex items-center justify-between gap-3">
                                    <label class="block text-sm font-medium text-gray-700">
                                        Group SSO
                                    </label>

                                    <span v-if="selectedGroups.length"
                                        class="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                        {{ selectedGroups.length }} dipilih
                                    </span>
                                </div>

                                <div v-if="loadingGroups"
                                    class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-500">
                                    Memuat group SSO...
                                </div>

                                <div v-else-if="!availableGroups.length"
                                    class="rounded-xl border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600">
                                    Group SSO tidak tersedia.
                                </div>

                                <div v-else
                                    class="max-h-[40vh] min-h-0 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 sm:max-h-[45vh]">
                                    <label v-for="group in availableGroups" :key="group.id || group.path"
                                        class="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-gray-50"
                                        :class="selectedGroups.includes(group.path) ? 'bg-green-50' : ''"
                                        :style="{ paddingLeft: `${12 + ((group.level || 0) * 24)}px` }">
                                        <input v-model="selectedGroups" type="checkbox" :value="group.id"
                                            :disabled="loadingGroups"
                                            class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />

                                        <span class="min-w-0 flex-1">
                                            <span class="block truncate text-sm font-medium text-gray-800">
                                                {{ group.name }}
                                            </span>

                                            <div class="text-sm font-medium text-gray-800">
                                                {{ group.path }}
                                            </div>
                                        </span>
                                    </label>
                                </div>

                                <div v-if="availableGroups.length" class="mt-2 text-xs text-gray-500">
                                    Pilih satu atau lebih group. Semua group nested ditampilkan sesuai hierarkinya.
                                </div>

                            </div>

                            <div class="flex shrink-0 justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4">
                                <button type="button"
                                    class="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="loadingSubmit" @click="cancelGroupSelect">
                                    Batal
                                </button>

                                <button type="button"
                                    class="inline-flex cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="loadingGroups ||
                                        !selectedGroups.length ||
                                        loadingSubmit
                                        " @click="continueToSubmitConfirm">
                                    Lanjutkan
                                </button>
                            </div>

                        </div>
                    </Transition>

                </div>
            </Transition>
        </Teleport>

        <!-- ============================================================= -->
        <!-- Submit Confirmation Modal -->
        <!-- ============================================================= -->

        <Teleport to="body">
            <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="showSubmitConfirm"
                    class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/50 px-4 backdrop-blur-[2px]"
                    @click.self="cancelSubmit">

                    <Transition appear enter-active-class="transition duration-200 ease-out"
                        enter-from-class="scale-95 opacity-0" enter-to-class="scale-100 opacity-100"
                        leave-active-class="transition duration-150 ease-in" leave-from-class="scale-100 opacity-100"
                        leave-to-class="scale-95 opacity-0">

                        <div v-if="showSubmitConfirm"
                            class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

                            <!-- Icon -->

                            <div class="px-6 pt-6">

                                <div
                                    class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M22 2 11 13" />
                                        <path d="m22 2-7 20-4-9-9-4Z" />
                                    </svg>
                                </div>

                                <h3 class="mt-4 text-lg font-semibold text-gray-900">
                                    Submit data ke SSO?
                                </h3>

                                <p class="mt-2 text-sm leading-6 text-gray-500">
                                    Anda akan mengirim
                                    <span class="font-semibold text-gray-900">
                                        {{ validCount }} data valid
                                    </span>
                                    ke SSO.
                                    Data yang berhasil dibuat akan langsung
                                    menjadi user di SSO.
                                </p>

                                <div class="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                                    <div class="text-xs text-blue-600">
                                        Group SSO
                                    </div>

                                    <div class="mt-2 space-y-1">
                                        <div v-for="groupId in selectedGroups" :key="groupId"
                                            class="text-sm font-semibold text-blue-800">
                                            {{
                                                availableGroups.find(
                                                    group => group.id === groupId
                                                )?.path
                                                ||
                                            availableGroups.find(
                                            group => group.id === groupId
                                            )?.name
                                            ||
                                            groupId
                                            }}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!-- Summary -->

                            <div class="mx-6 mt-5 grid grid-cols-3 gap-2">

                                <div class="rounded-xl border border-green-100 bg-green-50 px-3 py-3 text-center">
                                    <div class="text-xl font-bold text-green-700">
                                        {{ validCount }}
                                    </div>

                                    <div class="mt-0.5 text-xs text-green-600">
                                        Akan Submit
                                    </div>
                                </div>

                                <div class="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-center">
                                    <div class="text-xl font-bold text-amber-700">
                                        {{ existingCount }}
                                    </div>

                                    <div class="mt-0.5 text-xs text-amber-600">
                                        Existing
                                    </div>
                                </div>

                                <div class="rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-center">
                                    <div class="text-xl font-bold text-red-700">
                                        {{ errorCount }}
                                    </div>

                                    <div class="mt-0.5 text-xs text-red-600">
                                        Error
                                    </div>
                                </div>

                            </div>

                            <!-- Warning -->

                            <div class="mx-6 mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                <div class="flex gap-3">

                                    <svg class="mt-0.5 shrink-0 text-gray-500" width="18" height="18"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="9" />

                                        <path d="M12 11v5" />

                                        <path d="M12 8h.01" />
                                    </svg>

                                    <p class="text-xs leading-5 text-gray-600">
                                        Pastikan data sudah diperiksa.
                                        Proses submit akan membuat user baru
                                        dan tidak dapat dibatalkan secara otomatis.
                                    </p>

                                </div>
                            </div>

                            <!-- Buttons -->

                            <div
                                class="mt-6 flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">

                                <button type="button"
                                    class="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="loadingSubmit" @click="cancelSubmit">
                                    Batal
                                </button>

                                <button type="button"
                                    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    :disabled="loadingSubmit" @click="confirmSubmit">

                                    <span v-if="loadingSubmit"
                                        class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                                    <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <path d="M22 2 11 13" />
                                        <path d="m22 2-7 20-4-9-9-4Z" />
                                    </svg>

                                    {{
                                        loadingSubmit
                                            ? 'Memproses...'
                                            : 'Ya, Submit Sekarang'
                                    }}

                                </button>

                            </div>

                        </div>

                    </Transition>

                </div>
            </Transition>
        </Teleport>

        <!-- ============================================================= -->
        <!-- Result Modal -->
        <!-- ============================================================= -->

        <Teleport to="body">
            <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="
                    !showSubmitConfirm &&
                    submitResult.total > 0 &&
                    (
                        submitResult.success > 0 ||
                        submitResult.error > 0 ||
                        submitResult.existing > 0
                    )
                " class="fixed inset-0 z-[9998] flex items-center justify-center bg-gray-900/50 px-4 backdrop-blur-[2px]"
                    @click.self="
                        submitResult.total = 0
                        ">

                    <div class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

                        <!-- Header -->

                        <div class="px-6 pt-6">

                            <div
                                class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m5 12 4 4L19 6" />
                                </svg>
                            </div>

                            <h3 class="mt-4 text-lg font-semibold text-gray-900">
                                Proses Submit Selesai
                            </h3>

                            <p class="mt-2 text-sm text-gray-500">
                                Berikut hasil proses import user ke SSO.
                            </p>

                        </div>

                        <!-- Result -->

                        <div class="mx-6 mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                            <div class="rounded-xl border border-gray-200 bg-gray-50 px-3 py-4 text-center">
                                <div class="text-2xl font-bold text-gray-900">
                                    {{ submitResult.total }}
                                </div>

                                <div class="mt-1 text-xs text-gray-500">
                                    Total
                                </div>
                            </div>

                            <div class="rounded-xl border border-green-100 bg-green-50 px-3 py-4 text-center">
                                <div class="text-2xl font-bold text-green-700">
                                    {{ submitResult.success }}
                                </div>

                                <div class="mt-1 text-xs text-green-600">
                                    Sukses
                                </div>
                            </div>

                            <div class="rounded-xl border border-amber-100 bg-amber-50 px-3 py-4 text-center">
                                <div class="text-2xl font-bold text-amber-700">
                                    {{ submitResult.existing }}
                                </div>

                                <div class="mt-1 text-xs text-amber-600">
                                    Sudah Ada
                                </div>
                            </div>

                            <div class="rounded-xl border border-red-100 bg-red-50 px-3 py-4 text-center">
                                <div class="text-2xl font-bold text-red-700">
                                    {{ submitResult.error }}
                                </div>

                                <div class="mt-1 text-xs text-red-600">
                                    Error
                                </div>
                            </div>

                        </div>

                        <!-- Detail -->

                        <div class="mx-6 mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                            <div class="text-sm leading-6 text-gray-600">
                                <span class="font-medium text-gray-900">
                                    Sukses:
                                </span>
                                {{ submitResult.success }} user berhasil dibuat.

                                <br />

                                <span class="font-medium text-gray-900">
                                    Sudah ada:
                                </span>
                                {{ submitResult.existing }} user dilewati karena sudah terdaftar.

                                <br />

                                <span class="font-medium text-gray-900">
                                    Error:
                                </span>
                                {{ submitResult.error }} user gagal diproses.
                            </div>
                        </div>

                        <!-- Close -->

                        <div class="mt-6 flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-4">
                            <button type="button"
                                class="inline-flex cursor-pointer items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                                @click="
                                    submitResult.total = 0
                                    ">
                                Tutup
                            </button>
                        </div>

                    </div>

                </div>
            </Transition>
        </Teleport>

    </DashboardLayout>
</template>
