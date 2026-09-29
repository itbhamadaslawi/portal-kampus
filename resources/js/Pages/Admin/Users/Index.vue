<script setup>
import { Head, router } from '@inertiajs/vue3'
import axios from 'axios'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const table = ref(null)

let dataTable = null

const showPasswordModal = ref(false)
const showDetailModal = ref(false)
const showConfirmModal = ref(false)

const selectedUser = ref(null)

const password = ref('')
const passwordConfirmation = ref('')

const loadingDetail = ref(false)
const loadingPassword = ref(false)
const loadingDelete = ref(false)
const loadingStatus = ref(false)
const confirmLoading = ref(false)

/* Skeleton loading */
const skeletonLoading = ref(true)

const errorMessage = ref('')
const successMessage = ref('')

const userDetail = ref(null)

const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmActionText = ref('')
const confirmActionType = ref('')
const confirmUserId = ref(null)
const confirmCurrentStatus = ref(false)

const closeMessages = () => {
    errorMessage.value = ''
    successMessage.value = ''
}

const loadTable = async () => {
    await nextTick()

    if (!table.value) {
        return
    }

    if (dataTable) {
        dataTable.destroy()
        dataTable = null
    }

    skeletonLoading.value = true

    dataTable = new window.DataTable(table.value, {
        processing: true,
        serverSide: true,

        searching: true,
        ordering: true,
        paging: true,
        info: true,

        autoWidth: false,

        pageLength: 10,

        lengthMenu: [
            [10, 25, 50, 100],
            [10, 25, 50, 100],
        ],

        ajax: {
            url: '/admin/users/data',
            type: 'GET',

            dataSrc: function (json) {
                skeletonLoading.value = false

                return Array.isArray(json?.data)
                    ? json.data
                    : []
            },

            error: function (xhr) {
                skeletonLoading.value = false

                console.error(
                    'DataTables error:',
                    xhr.responseText
                )
            },
        },

        initComplete: function () {
            skeletonLoading.value = false
        },

        drawCallback: function () {
            skeletonLoading.value = false
        },

        columns: [
            {
                data: null,
                title: 'Pengguna',
                orderable: true,
                searchable: true,

                render: (data, type, row) => {
                    const fullName = [
                        row.firstName,
                        row.lastName,
                    ]
                        .filter(Boolean)
                        .join(' ')
                        .trim()

                    const name =
                        fullName ||
                        row.name ||
                        row.username ||
                        'User'

                    const username =
                        row.username || '-'

                    const initial = name
                        .trim()
                        .charAt(0)
                        .toUpperCase()

                    return `
                        <div class="flex items-center gap-3">
                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                                ${initial}
                            </div>

                            <div class="min-w-0">
                                <div class="truncate text-sm font-semibold text-gray-900">
                                    ${name}
                                </div>

                                <div class="mt-0.5 truncate text-xs text-gray-500">
                                    @${username}
                                </div>
                            </div>
                        </div>
                    `
                },
            },

            {
                data: 'email',
                title: 'Email',
                orderable: true,
                searchable: true,

                render: (data) => {
                    return `
                        <span class="text-sm text-gray-600">
                            ${data || '-'}
                        </span>
                    `
                },
            },

            {
                data: 'enabled',
                title: 'Status',
                orderable: true,
                searchable: false,

                render: (data) => {
                    if (data) {
                        return `
                            <span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                Aktif
                            </span>
                        `
                    }

                    return `
                        <span class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                            <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                            Nonaktif
                        </span>
                    `
                },
            },

            {
                data: null,
                title: 'Aksi',
                orderable: false,
                searchable: false,

                render: (data, type, row) => {
                    return `
                        <div class="flex items-center justify-end gap-1">
                            <button
                                type="button"
                                data-action="detail"
                                data-id="${row.id}"
                                class="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                title="Detail"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="12" cy="12" r="9"/>
                                    <path d="M12 11v5"/>
                                    <path d="M12 8h.01"/>
                                </svg>
                            </button>

                            <button
                                type="button"
                                data-action="edit"
                                data-id="${row.id}"
                                class="cursor-pointer rounded-lg p-2 text-blue-500 transition hover:bg-blue-50 hover:text-blue-700"
                                title="Edit"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M12 20h9"/>
                                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                                </svg>
                            </button>

                            <button
                                type="button"
                                data-action="password"
                                data-id="${row.id}"
                                class="cursor-pointer rounded-lg p-2 text-amber-500 transition hover:bg-amber-50 hover:text-amber-700"
                                title="Reset Password"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <circle cx="7.5" cy="15.5" r="5.5"/>
                                    <path d="m21 2-9.6 9.6"/>
                                    <path d="m15.5 7.5 3 3"/>
                                    <path d="m18 5 3 3"/>
                                </svg>
                            </button>

                            <button
                                type="button"
                                data-action="status"
                                data-id="${row.id}"
                                data-enabled="${row.enabled ? '1' : '0'}"
                                class="cursor-pointer rounded-lg p-2 ${
                                    row.enabled
                                        ? 'text-red-500 hover:bg-red-50 hover:text-red-700'
                                        : 'text-green-500 hover:bg-green-50 hover:text-green-700'
                                } transition"
                                title="${row.enabled ? 'Nonaktifkan' : 'Aktifkan'}"
                            >
                                ${
                                    row.enabled
                                        ? `
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="9"/>
                                                <path d="M8 12h8"/>
                                            </svg>
                                        `
                                        : `
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="9"/>
                                                <path d="M12 8v8"/>
                                                <path d="M8 12h8"/>
                                            </svg>
                                        `
                                }
                            </button>

                            <button
                                type="button"
                                data-action="delete"
                                data-id="${row.id}"
                                class="cursor-pointer rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                                title="Hapus"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4h8v2"/>
                                    <path d="M19 6l-1 14H6L5 6"/>
                                    <path d="M10 11v5"/>
                                    <path d="M14 11v5"/>
                                </svg>
                            </button>
                        </div>
                    `
                },
            },
        ],

        layout: {
            topStart: 'pageLength',
            topEnd: 'search',
            bottomStart: 'info',
            bottomEnd: 'paging',
        },

        language: {
            processing: `
                <div class="datatable-loading">
                    <div class="datatable-spinner"></div>
                    <span>Memuat data...</span>
                </div>
            `,

            search: '',
            searchPlaceholder: 'Cari pengguna...',

            lengthMenu: '_MENU_',

            info: 'Menampilkan _START_–_END_ dari _TOTAL_ pengguna',

            infoEmpty: 'Tidak ada pengguna',

            infoFiltered: '',

            zeroRecords: 'Pengguna tidak ditemukan',

            emptyTable: 'Belum ada data pengguna',

            paginate: {
                first: '«',
                previous: '‹',
                next: '›',
                last: '»',
            },
        },

        order: [
            [0, 'asc'],
        ],
    })

    table.value.addEventListener(
        'click',
        handleTableClick
    )
}

const handleTableClick = async (event) => {
    const button = event.target.closest(
        'button[data-action]'
    )

    if (!button) {
        return
    }

    const action = button.dataset.action
    const id = button.dataset.id

    if (!id) {
        return
    }

    if (action === 'detail') {
        await showDetail(id)
        return
    }

    if (action === 'edit') {
        editUser(id)
        return
    }

    if (action === 'password') {
        openPasswordModal(id)
        return
    }

    if (action === 'status') {
        const enabled =
            button.dataset.enabled === '1'

        openConfirmModal(
            'status',
            id,
            enabled
        )

        return
    }

    if (action === 'delete') {
        openConfirmModal(
            'delete',
            id
        )
    }
}

const showDetail = async (id) => {
    closeMessages()

    loadingDetail.value = true
    showDetailModal.value = true
    userDetail.value = null

    try {
        const response = await axios.get(
            `/admin/users/${id}/json`
        )

        userDetail.value =
            response.data.user ??
            response.data
    } catch (error) {
        showDetailModal.value = false

        errorMessage.value =
            error.response?.data?.message ||
            'Data pengguna gagal dimuat.'
    } finally {
        loadingDetail.value = false
    }
}

const editUser = (id) => {
    router.visit(
        `/admin/users/${id}/edit`
    )
}

const openPasswordModal = (id) => {
    closeMessages()

    selectedUser.value = {
        id,
    }

    password.value = ''
    passwordConfirmation.value = ''

    showPasswordModal.value = true
}

const closePasswordModal = () => {
    if (loadingPassword.value) {
        return
    }

    showPasswordModal.value = false

    selectedUser.value = null

    password.value = ''
    passwordConfirmation.value = ''
}

const resetPassword = async () => {
    closeMessages()

    if (!selectedUser.value?.id) {
        return
    }

    if (!password.value) {
        errorMessage.value =
            'Password wajib diisi.'

        return
    }

    if (password.value.length < 8) {
        errorMessage.value =
            'Password minimal 8 karakter.'

        return
    }

    if (
        password.value !==
        passwordConfirmation.value
    ) {
        errorMessage.value =
            'Konfirmasi password tidak sesuai.'

        return
    }

    loadingPassword.value = true

    try {
        const response = await axios.post(
            `/admin/users/${selectedUser.value.id}/reset-password`,
            {
                password: password.value,
                password_confirmation:
                    passwordConfirmation.value,
            }
        )

        showPasswordModal.value = false

        selectedUser.value = null

        password.value = ''
        passwordConfirmation.value = ''

        successMessage.value =
            response.data?.message ||
            'Password berhasil direset.'
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            'Password gagal direset.'
    } finally {
        loadingPassword.value = false
    }
}

const openConfirmModal = (
    type,
    id,
    currentStatus = false
) => {
    closeMessages()

    confirmUserId.value = id
    confirmActionType.value = type
    confirmCurrentStatus.value = currentStatus

    if (type === 'status') {
        if (currentStatus) {
            confirmTitle.value =
                'Nonaktifkan Pengguna'

            confirmMessage.value =
                'Pengguna ini akan dinonaktifkan dan tidak dapat masuk ke sistem sampai diaktifkan kembali.'

            confirmActionText.value =
                'Nonaktifkan'
        } else {
            confirmTitle.value =
                'Aktifkan Pengguna'

            confirmMessage.value =
                'Pengguna ini akan diaktifkan dan dapat masuk kembali ke sistem.'

            confirmActionText.value =
                'Aktifkan'
        }
    }

    if (type === 'delete') {
        confirmTitle.value =
            'Hapus Pengguna'

        confirmMessage.value =
            'Pengguna akan dihapus secara permanen dari Keycloak. Tindakan ini tidak dapat dibatalkan.'

        confirmActionText.value =
            'Hapus'
    }

    showConfirmModal.value = true
}

const closeConfirmModal = () => {
    if (confirmLoading.value) {
        return
    }

    showConfirmModal.value = false

    confirmUserId.value = null
    confirmActionType.value = ''
    confirmCurrentStatus.value = false

    confirmTitle.value = ''
    confirmMessage.value = ''
    confirmActionText.value = ''
}

const executeConfirmAction = async () => {
    if (!confirmUserId.value) {
        return
    }

    const id = confirmUserId.value
    const type = confirmActionType.value

    confirmLoading.value = true

    if (type === 'status') {
        loadingStatus.value = true
    }

    if (type === 'delete') {
        loadingDelete.value = true
    }

    try {
        if (type === 'status') {
            const response = await axios.patch(
                `/admin/users/${id}/status`,
                {
                    enabled:
                        !confirmCurrentStatus.value,
                }
            )

            successMessage.value =
                response.data?.message ||
                'Status pengguna berhasil diperbarui.'
        }

        if (type === 'delete') {
            const response = await axios.delete(
                `/admin/users/${id}`
            )

            successMessage.value =
                response.data?.message ||
                'Pengguna berhasil dihapus.'
        }

        closeConfirmModal()

        if (dataTable) {
            dataTable.ajax.reload(
                null,
                false
            )
        }
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message ||
            (
                type === 'delete'
                    ? 'Pengguna gagal dihapus.'
                    : 'Status pengguna gagal diperbarui.'
            )

        showConfirmModal.value = false
    } finally {
        confirmLoading.value = false
        loadingStatus.value = false
        loadingDelete.value = false
    }
}

const closeDetailModal = () => {
    if (loadingDetail.value) {
        return
    }

    showDetailModal.value = false

    userDetail.value = null
}

const addUser = () => {
    router.visit(
        '/admin/users/create'
    )
}

onMounted(() => {
    loadTable()
})

onBeforeUnmount(() => {
    if (table.value) {
        table.value.removeEventListener(
            'click',
            handleTableClick
        )
    }

    if (dataTable) {
        dataTable.destroy()

        dataTable = null
    }
})
</script>

<template>
    <Head title="Users" />

    <DashboardLayout>
        <div
            class="w-full min-w-0 space-y-6"
        >
            <div
                v-if="successMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
                <div>
                    {{ successMessage }}
                </div>

                <button
                    type="button"
                    class="cursor-pointer text-green-600 hover:text-green-800"
                    @click="
                        successMessage = ''
                    "
                >
                    ×
                </button>
            </div>

            <div
                v-if="errorMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
                <div>
                    {{ errorMessage }}
                </div>

                <button
                    type="button"
                    class="cursor-pointer text-red-600 hover:text-red-800"
                    @click="
                        errorMessage = ''
                    "
                >
                    ×
                </button>
            </div>

            <div
                class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div>
                    <h1
                        class="text-2xl font-semibold text-gray-900"
                    >
                        Users
                    </h1>

                    <p
                        class="mt-1 text-sm text-gray-500"
                    >
                        Kelola pengguna yang terdaftar pada Keycloak.
                    </p>
                </div>

                <button
                    type="button"
                    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                    @click="addUser"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                    </svg>

                    Tambah User
                </button>
            </div>

            <div
                class="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
                <div
                    class="w-full min-w-0 px-4 py-4 sm:px-6"
                >
                    <div
                        class="users-table-wrapper relative w-full min-w-0"
                    >
                        <table
                            ref="table"
                            id="users-table"
                            class="w-full"
                        >
                            <thead>
                                <tr>
                                    <th>
                                        Pengguna
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody></tbody>
                        </table>

                        <!-- Skeleton Loading -->
                        <!-- Skeleton Loading -->
<div
    v-if="skeletonLoading"
    class="pointer-events-none absolute inset-x-0 top-[56px] z-30 min-h-[520px] overflow-hidden bg-white"
>
    <div
        v-for="row in 8"
        :key="row"
        class="h-[68px] border-b border-gray-100 px-4"
    >
        <div class="flex h-full items-center gap-4">

            <!-- Pengguna -->
            <div class="flex min-w-0 flex-1 items-center gap-3">
                <div
                    class="skeleton-shimmer h-10 w-10 shrink-0 rounded-full"
                ></div>

                <div class="min-w-0 flex-1 space-y-2">
                    <div
                        class="skeleton-shimmer h-3.5 w-36 rounded"
                    ></div>

                    <div
                        class="skeleton-shimmer h-3 w-24 rounded"
                    ></div>
                </div>
            </div>

            <!-- Email -->
            <div class="hidden flex-[0.65] md:block">
                <div
                    class="skeleton-shimmer h-3.5 w-48 rounded"
                ></div>
            </div>

            <!-- Status -->
            <div class="hidden w-[110px] sm:block">
                <div
                    class="skeleton-shimmer h-6 w-20 rounded-full"
                ></div>
            </div>

            <!-- Aksi -->
            <div class="flex w-[190px] shrink-0 justify-end gap-1">
                <div
                    class="skeleton-shimmer h-8 w-8 rounded-lg"
                ></div>

                <div
                    class="skeleton-shimmer h-8 w-8 rounded-lg"
                ></div>

                <div
                    class="skeleton-shimmer h-8 w-8 rounded-lg"
                ></div>

                <div
                    class="skeleton-shimmer h-8 w-8 rounded-lg"
                ></div>

                <div
                    class="skeleton-shimmer h-8 w-8 rounded-lg"
                ></div>
            </div>
        </div>
    </div>
</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm Modal -->

        <div
            v-if="showConfirmModal"
            class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
            @click.self="closeConfirmModal"
        >
            <div
                class="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
            >
                <div
                    class="px-6 pt-6"
                >
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-full"
                        :class="
                            confirmActionType === 'delete'
                                ? 'bg-red-50 text-red-600'
                                : confirmCurrentStatus
                                    ? 'bg-amber-50 text-amber-600'
                                    : 'bg-green-50 text-green-600'
                        "
                    >
                        <svg
                            v-if="
                                confirmActionType === 'delete'
                            "
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v5" />
                            <path d="M14 11v5" />
                        </svg>

                        <svg
                            v-else-if="
                                confirmCurrentStatus
                            "
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                            />

                            <path d="M8 12h8" />
                        </svg>

                        <svg
                            v-else
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                            />

                            <path d="M12 8v8" />

                            <path d="M8 12h8" />
                        </svg>
                    </div>

                    <h2
                        class="mt-4 text-lg font-semibold text-gray-900"
                    >
                        {{ confirmTitle }}
                    </h2>

                    <p
                        class="mt-2 text-sm leading-6 text-gray-500"
                    >
                        {{ confirmMessage }}
                    </p>
                </div>

                <div
                    class="flex justify-end gap-2 px-6 py-5"
                >
                    <button
                        type="button"
                        class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="
                            confirmLoading
                        "
                        @click="
                            closeConfirmModal
                        "
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        class="inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                        :class="
                            confirmActionType === 'delete'
                                ? 'bg-red-600 hover:bg-red-700'
                                : confirmCurrentStatus
                                    ? 'bg-amber-600 hover:bg-amber-700'
                                    : 'bg-green-600 hover:bg-green-700'
                        "
                        :disabled="
                            confirmLoading
                        "
                        @click="
                            executeConfirmAction
                        "
                    >
                        <span
                            v-if="
                                confirmLoading
                            "
                            class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        ></span>

                        {{
                            confirmLoading
                                ? 'Memproses...'
                                : confirmActionText
                        }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Detail Modal -->

        <div
            v-if="showDetailModal"
            class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
            @click.self="
                closeDetailModal
            "
        >
            <div
                class="w-full max-w-lg rounded-xl bg-white shadow-xl"
            >
                <div
                    class="flex items-center justify-between border-b border-gray-200 px-5 py-4"
                >
                    <div>
                        <h2
                            class="text-lg font-semibold text-gray-900"
                        >
                            Detail Pengguna
                        </h2>

                        <p
                            class="mt-1 text-sm text-gray-500"
                        >
                            Informasi pengguna dari SSO.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        @click="
                            closeDetailModal
                        "
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <div
                    class="px-5 py-5"
                >
                    <div
                        v-if="loadingDetail"
                        class="flex items-center justify-center py-10"
                    >
                        <div
                            class="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800"
                        ></div>
                    </div>

                    <div
                        v-else-if="userDetail"
                        class="space-y-4"
                    >
                        <div
                            class="flex items-center gap-4"
                        >
                            <div
                                class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-lg font-semibold text-gray-600"
                            >
                                {{
                                    (
                                        [
                                            userDetail.firstName,
                                            userDetail.lastName,
                                        ]
                                            .filter(
                                                Boolean
                                            )
                                            .join(
                                                ' '
                                            ) ||
                                        userDetail.name ||
                                        userDetail.username ||
                                        'U'
                                    )
                                        .charAt(0)
                                        .toUpperCase()
                                }}
                            </div>

                            <div
                                class="min-w-0"
                            >
                                <div
                                    class="truncate text-base font-semibold text-gray-900"
                                >
                                    {{
                                        [
                                            userDetail.firstName,
                                            userDetail.lastName,
                                        ]
                                            .filter(
                                                Boolean
                                            )
                                            .join(
                                                ' '
                                            ) ||
                                        userDetail.name ||
                                        userDetail.username ||
                                        '-'
                                    }}
                                </div>

                                <div
                                    class="mt-1 text-sm text-gray-500"
                                >
                                    @{{
                                        userDetail.username ||
                                        '-'
                                    }}
                                </div>
                            </div>
                        </div>

                        <div
                            class="grid grid-cols-1 gap-4 sm:grid-cols-2"
                        >
                            <div>
                                <div
                                    class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                >
                                    Username
                                </div>

                                <div
                                    class="mt-1 text-sm text-gray-900"
                                >
                                    {{
                                        userDetail.username ||
                                        '-'
                                    }}
                                </div>
                            </div>

                            <div>
                                <div
                                    class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                >
                                    Email
                                </div>

                                <div
                                    class="mt-1 break-all text-sm text-gray-900"
                                >
                                    {{
                                        userDetail.email ||
                                        '-'
                                    }}
                                </div>
                            </div>

                            <div>
                                <div
                                    class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                >
                                    Nama Depan
                                </div>

                                <div
                                    class="mt-1 text-sm text-gray-900"
                                >
                                    {{
                                        userDetail.firstName ||
                                        '-'
                                    }}
                                </div>
                            </div>

                            <div>
                                <div
                                    class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                >
                                    Nama Belakang
                                </div>

                                <div
                                    class="mt-1 text-sm text-gray-900"
                                >
                                    {{
                                        userDetail.lastName ||
                                        '-'
                                    }}
                                </div>
                            </div>

                            <div>
                                <div
                                    class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                >
                                    Status
                                </div>

                                <div class="mt-1">
                                    <span
                                        v-if="
                                            userDetail.enabled
                                        "
                                        class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
                                    >
                                        <span
                                            class="h-1.5 w-1.5 rounded-full bg-green-500"
                                        ></span>

                                        Aktif
                                    </span>

                                    <span
                                        v-else
                                        class="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
                                    >
                                        <span
                                            class="h-1.5 w-1.5 rounded-full bg-red-500"
                                        ></span>

                                        Nonaktif
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div
                                    class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                >
                                    Email Terverifikasi
                                </div>

                                <div
                                    class="mt-1 text-sm text-gray-900"
                                >
                                    {{
                                        userDetail.emailVerified
                                            ? 'Ya'
                                            : 'Tidak'
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="flex justify-end border-t border-gray-200 px-5 py-4"
                >
                    <button
                        type="button"
                        class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        @click="
                            closeDetailModal
                        "
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>

        <!-- Password Modal -->

        <div
            v-if="showPasswordModal"
            class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
            @click.self="
                closePasswordModal
            "
        >
            <div
                class="w-full max-w-md rounded-xl bg-white shadow-xl"
            >
                <div
                    class="flex items-center justify-between border-b border-gray-200 px-5 py-4"
                >
                    <div>
                        <h2
                            class="text-lg font-semibold text-gray-900"
                        >
                            Reset Password
                        </h2>

                        <p
                            class="mt-1 text-sm text-gray-500"
                        >
                            Masukkan password baru pengguna.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        @click="
                            closePasswordModal
                        "
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <form
                    class="space-y-4 px-5 py-5"
                    @submit.prevent="
                        resetPassword
                    "
                >
                    <div>
                        <label
                            class="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Password Baru
                        </label>

                        <input
                            v-model="password"
                            type="password"
                            autocomplete="new-password"
                            class="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10"
                            placeholder="Minimal 8 karakter"
                        />
                    </div>

                    <div>
                        <label
                            class="mb-1.5 block text-sm font-medium text-gray-700"
                        >
                            Konfirmasi Password
                        </label>

                        <input
                            v-model="
                                passwordConfirmation
                            "
                            type="password"
                            autocomplete="new-password"
                            class="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-500/10"
                            placeholder="Ulangi password baru"
                        />
                    </div>

                    <div
                        v-if="errorMessage"
                        class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                    >
                        {{ errorMessage }}
                    </div>

                    <div
                        class="flex justify-end gap-2 pt-2"
                    >
                        <button
                            type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="
                                loadingPassword
                            "
                            @click="
                                closePasswordModal
                            "
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="
                                loadingPassword
                            "
                        >
                            <span
                                v-if="
                                    loadingPassword
                                "
                                class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            ></span>

                            {{
                                loadingPassword
                                    ? 'Menyimpan...'
                                    : 'Reset Password'
                            }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
</template>

<style scoped>
:deep(.dt-container) {
    width: 100% !important;
    max-width: none !important;
}

:deep(.dt-layout-row) {
    display: flex !important;

    width: 100% !important;

    align-items: center;
    justify-content: space-between;

    gap: 1rem;

    margin: 0 !important;
    padding: 0 0 1rem !important;
}

:deep(.dt-layout-row:last-child) {
    padding: 1rem 0 0 !important;
}

:deep(.dt-layout-cell) {
    min-width: 0 !important;
}

:deep(.dt-layout-table) {
    position: relative !important;

    display: block !important;

    width: 100% !important;
    max-width: none !important;

    margin: 0 !important;
    padding: 0 !important;
}

:deep(.dt-layout-table > table) {
    width: 100% !important;
    max-width: none !important;

    margin: 0 !important;
}

:deep(#users-table) {
    width: 100% !important;
    max-width: none !important;

    margin: 0 !important;

    border-collapse: separate !important;
    border-spacing: 0 !important;

    table-layout: auto !important;
}

:deep(#users-table thead th) {
    height: 44px;

    padding: 0 1rem !important;

    border-bottom: 1px solid #e5e7eb !important;

    background: #f9fafb !important;

    color: #6b7280 !important;

    font-size: 0.75rem !important;
    font-weight: 600 !important;

    text-align: left !important;

    text-transform: uppercase;

    letter-spacing: 0.025em;

    white-space: nowrap;
}

:deep(#users-table thead th:last-child) {
    text-align: right !important;
}

:deep(#users-table tbody td) {
    height: 68px;

    padding: 0 1rem !important;

    border-bottom: 1px solid #f3f4f6 !important;

    vertical-align: middle !important;
}

:deep(#users-table tbody tr:last-child td) {
    border-bottom: 0 !important;
}

:deep(#users-table tbody tr:hover) {
    background: #fafafa !important;
}

:deep(#users-table tbody td:last-child) {
    text-align: right !important;
}

/* Skeleton */

.skeleton-shimmer {
    position: relative;

    overflow: hidden;

    background: #f1f3f5;
}

.skeleton-shimmer::after {
    position: absolute;

    inset: 0;

    content: '';

    transform: translateX(-100%);

    background: linear-gradient(
        90deg,
        transparent,
        rgb(255 255 255 / 70%),
        transparent
    );

    animation: skeleton-shimmer 1.4s infinite;
}

@keyframes skeleton-shimmer {
    100% {
        transform: translateX(100%);
    }
}

/* Processing */

:deep(.dt-processing) {
    position: absolute !important;

    inset: 0 !important;

    z-index: 20 !important;

    width: 100% !important;
    height: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    border: 0 !important;

    background: rgb(255 255 255 / 65%) !important;

    pointer-events: none !important;
}

:deep(.datatable-loading) {
    position: absolute;

    top: 50%;
    left: 50%;

    display: flex;

    transform: translate(
        -50%,
        -50%
    );

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 0.5rem;

    min-width: 140px;

    padding: 0.875rem 1rem;

    border: 1px solid #e5e7eb;

    border-radius: 0.75rem;

    background: rgb(255 255 255 / 96%);

    box-shadow:
        0 8px 20px
        rgb(0 0 0 / 8%);

    color: #6b7280;

    font-size: 0.8125rem;
}

:deep(.datatable-spinner) {
    width: 26px;
    height: 26px;

    border: 3px solid #e5e7eb;

    border-top-color: #374151;

    border-radius: 9999px;

    animation: datatable-spin 0.7s linear infinite;
}

@keyframes datatable-spin {
    to {
        transform: rotate(360deg);
    }
}

/* Empty */

:deep(#users-table tbody tr td.dataTables_empty),
:deep(#users-table tbody tr td.dt-empty) {
    height: 220px !important;

    padding: 2rem !important;

    text-align: center !important;

    vertical-align: middle !important;

    color: #9ca3af !important;

    font-size: 0.875rem !important;
}

/* Search */

:deep(.dt-search) {
    display: flex !important;

    align-items: center;
}

:deep(.dt-search label) {
    display: none !important;
}

:deep(.dt-search input) {
    width: 260px !important;
    height: 40px !important;

    margin: 0 !important;
    padding: 0 0.875rem !important;

    border: 1px solid #d1d5db !important;

    border-radius: 0.5rem !important;

    background: white !important;

    color: #111827 !important;

    font-size: 0.875rem !important;

    outline: none !important;

    box-shadow: none !important;
}

:deep(.dt-search input::placeholder) {
    color: #9ca3af !important;
}

:deep(.dt-search input:focus) {
    border-color: #9ca3af !important;

    box-shadow:
        0 0 0 3px
        rgb(156 163 175 / 10%) !important;
}

/* Length */

:deep(.dt-length) {
    display: flex !important;

    align-items: center;
}

:deep(.dt-length select) {
    width: 88px !important;
    height: 40px !important;

    margin: 0 !important;
    padding: 0 0.75rem !important;

    border: 1px solid #d1d5db !important;

    border-radius: 0.5rem !important;

    background: white !important;

    color: #374151 !important;

    font-size: 0.875rem !important;

    outline: none !important;

    cursor: pointer;
}

/* Info */

:deep(.dt-info) {
    padding: 0 !important;

    color: #6b7280 !important;

    font-size: 0.8125rem !important;
}

/* Pagination */

:deep(.dt-paging) {
    display: flex !important;

    align-items: center;

    gap: 0.25rem;
}

:deep(.dt-paging .dt-paging-button) {
    min-width: 34px !important;
    height: 34px !important;

    margin: 0 !important;
    padding: 0 0.5rem !important;

    border: 0 !important;

    border-radius: 0.5rem !important;

    background: transparent !important;

    color: #6b7280 !important;

    cursor: pointer !important;

    box-shadow: none !important;
}

:deep(.dt-paging .dt-paging-button:hover) {
    background: #f3f4f6 !important;

    color: #111827 !important;
}

:deep(.dt-paging .dt-paging-button.current) {
    background: #111827 !important;

    color: white !important;
}

:deep(.dt-paging .dt-paging-button.disabled) {
    cursor: not-allowed !important;

    opacity: 0.4;
}

/* Mobile */

@media (max-width: 768px) {
    :deep(.dt-layout-row) {
        flex-direction: column !important;

        align-items: stretch !important;
    }

    :deep(.dt-layout-cell) {
        width: 100% !important;
    }

    :deep(.dt-search),
    :deep(.dt-search input) {
        width: 100% !important;
    }

    :deep(.dt-layout-table) {
        overflow-x: auto !important;
        overflow-y: hidden !important;

        -webkit-overflow-scrolling: touch;
    }

    :deep(#users-table) {
        min-width: 760px !important;
    }
}
</style>