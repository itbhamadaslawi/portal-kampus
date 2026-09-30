<script setup>
import { Head } from '@inertiajs/vue3'
import axios from 'axios'

import {
    Image,
    Pencil,
    Trash2,
    UsersRound,
    Plus,
    X,
    Check,
    AlertCircle,
} from 'lucide-vue-next'

import {
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
} from 'vue'

import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const table = ref(null)

let dataTable = null

/*
|--------------------------------------------------------------------------
| Loading
|--------------------------------------------------------------------------
*/

const skeletonLoading = ref(true)
const loadingDetail = ref(false)
const loadingForm = ref(false)
const loadingDelete = ref(false)
const loadingStatus = ref(false)
const confirmLoading = ref(false)
const loadingGroups = ref(false)
const savingGroups = ref(false)

/*
|--------------------------------------------------------------------------
| Modal
|--------------------------------------------------------------------------
*/

const showFormModal = ref(false)
const showDetailModal = ref(false)
const showConfirmModal = ref(false)
const showGroupsModal = ref(false)

/*
|--------------------------------------------------------------------------
| Messages
|--------------------------------------------------------------------------
*/

const errorMessage = ref('')
const successMessage = ref('')

const closeMessages = () => {
    errorMessage.value = ''
    successMessage.value = ''
}

/*
|--------------------------------------------------------------------------
| Banner
|--------------------------------------------------------------------------
*/

const formMode = ref('create')

const selectedBanner = ref(null)
const bannerDetail = ref(null)
const groupBanner = ref(null)

/*
|--------------------------------------------------------------------------
| Groups
|--------------------------------------------------------------------------
*/

const availableGroups = ref([])
const selectedGroups = ref([])

/*
|--------------------------------------------------------------------------
| Image
|--------------------------------------------------------------------------
*/

const imagePreview = ref(null)
const imageInput = ref(null)

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const form = ref({
    id: null,
    title: '',
    image: null,
    is_active: true,
    groups: [],
})

/*
|--------------------------------------------------------------------------
| Confirm
|--------------------------------------------------------------------------
*/

const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmActionText = ref('')
const confirmActionType = ref('')
const confirmBannerId = ref(null)
const confirmCurrentStatus = ref(false)

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const normalizeGroupPath = (path) => {
    return String(path || '')
        .trim()
        .toLowerCase()
}

const getImageUrl = (image) => {
    if (!image) {
        return null
    }

    const value = String(image)

    if (
        value.startsWith('http://') ||
        value.startsWith('https://') ||
        value.startsWith('/')
    ) {
        return value
    }

    return `/banners/${value}`
}

const formatDate = (date) => {
    if (!date) {
        return '-'
    }

    const parsed = new Date(date)

    if (Number.isNaN(parsed.getTime())) {
        return '-'
    }

    return parsed.toLocaleString(
        'id-ID',
        {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
    )
}

const escapeHtml = (value) => {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

/*
|--------------------------------------------------------------------------
| Group Helpers
|--------------------------------------------------------------------------
*/

const getGroupLevel = (path) => {
    const normalized = String(path || '')
        .trim()
        .replace(/^\/+|\/+$/g, '')

    if (!normalized) {
        return 0
    }

    return Math.max(
        normalized.split('/').length - 1,
        0
    )
}

const flattenGroups = (
    groups,
    result = []
) => {
    if (!Array.isArray(groups)) {
        return result
    }

    groups.forEach((group) => {
        if (!group) {
            return
        }

        const path = String(
            group.path || ''
        ).trim()

        const name = String(
            group.name || ''
        ).trim()

        if (path && name) {
            result.push({
                id: group.id ?? path,
                name,
                path,
                level: getGroupLevel(path),
            })
        }

        const children =
            group.children ??
            group.subGroups ??
            group.subgroups ??
            []

        if (
            Array.isArray(children) &&
            children.length
        ) {
            flattenGroups(
                children,
                result
            )
        }
    })

    return result
}

const isGroupSelected = (path) => {
    const normalized =
        normalizeGroupPath(path)

    return selectedGroups.value.includes(
        normalized
    )
}

const toggleGroup = (path) => {
    const normalized =
        normalizeGroupPath(path)

    if (!normalized) {
        return
    }

    if (
        selectedGroups.value.includes(
            normalized
        )
    ) {
        selectedGroups.value =
            selectedGroups.value.filter(
                (group) =>
                    normalizeGroupPath(group) !==
                    normalized
            )
    } else {
        selectedGroups.value = [
            ...selectedGroups.value,
            normalized,
        ]
    }
}

const selectAllGroups = () => {
    selectedGroups.value =
        availableGroups.value
            .map((group) =>
                normalizeGroupPath(
                    group.path
                )
            )
            .filter(Boolean)
}

const clearAllGroups = () => {
    selectedGroups.value = []
}

const syncFormGroups = () => {
    form.value.groups = [
        ...selectedGroups.value,
    ]
}

/*
|--------------------------------------------------------------------------
| Image
|--------------------------------------------------------------------------
*/

const handleImageChange = (event) => {
    const file =
        event.target.files?.[0] || null

    form.value.image = file

    if (imagePreview.value) {
        if (
            imagePreview.value.startsWith(
                'blob:'
            )
        ) {
            URL.revokeObjectURL(
                imagePreview.value
            )
        }

        imagePreview.value = null
    }

    if (file) {
        imagePreview.value =
            URL.createObjectURL(file)
    }
}

const clearSelectedImage = () => {
    form.value.image = null

    if (imagePreview.value) {
        if (
            imagePreview.value.startsWith(
                'blob:'
            )
        ) {
            URL.revokeObjectURL(
                imagePreview.value
            )
        }

        imagePreview.value = null
    }

    if (imageInput.value) {
        imageInput.value.value = ''
    }
}

/*
|--------------------------------------------------------------------------
| Reset Form
|--------------------------------------------------------------------------
*/

const resetForm = () => {
    if (
        imagePreview.value &&
        imagePreview.value.startsWith(
            'blob:'
        )
    ) {
        URL.revokeObjectURL(
            imagePreview.value
        )
    }

    form.value = {
        id: null,
        title: '',
        image: null,
        is_active: true,
        groups: [],
    }

    selectedGroups.value = []

    imagePreview.value = null

    if (imageInput.value) {
        imageInput.value.value = ''
    }
}

/*
|--------------------------------------------------------------------------
| Load Groups
|--------------------------------------------------------------------------
*/

const loadAvailableGroups = async () => {
    loadingGroups.value = true

    try {
        const response =
            await axios.get(
                '/admin/banners/groups',
                {
                    headers: {
                        Accept:
                            'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            )

        const groups =
            Array.isArray(
                response.data?.data
            )
                ? response.data.data
                : []

        availableGroups.value =
            flattenGroups(groups)
    } catch (error) {
        availableGroups.value = []

        throw error
    } finally {
        loadingGroups.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Load Banner Groups
|--------------------------------------------------------------------------
*/

const loadBannerGroups = async (id) => {
    const response =
        await axios.get(
            `/admin/banners/${id}/groups`,
            {
                headers: {
                    Accept:
                        'application/json',
                    'X-Requested-With':
                        'XMLHttpRequest',
                },
            }
        )

    const groups =
        Array.isArray(
            response.data?.data
        )
            ? response.data.data
            : []

    selectedGroups.value =
        groups
            .map((group) =>
                normalizeGroupPath(
                    group.group_name
                )
            )
            .filter(Boolean)

    syncFormGroups()
}

/*
|--------------------------------------------------------------------------
| DataTable
|--------------------------------------------------------------------------
*/

const loadTable = async () => {
    await nextTick()

    if (!table.value) {
        skeletonLoading.value = false
        return
    }

    if (dataTable) {
        dataTable.destroy()
        dataTable = null
    }

    dataTable =
        new window.DataTable(
            table.value,
            {
                processing: true,

                /*
                 * Controller data() sudah mendukung
                 * start, length, search, order.
                 */
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
                    url: '/admin/banners/data',
                    type: 'GET',

                    beforeSend: function () {
                        skeletonLoading.value =
                            true
                    },

                    dataSrc: function (json) {
                        skeletonLoading.value =
                            false

                        return Array.isArray(
                            json?.data
                        )
                            ? json.data
                            : []
                    },

                    error: function (xhr) {
                        skeletonLoading.value =
                            false

                        console.error(
                            'DataTables error:',
                            xhr.responseText
                        )

                        errorMessage.value =
                            'Data banner gagal dimuat.'
                    },
                },

                columns: [
                    {
                        data: null,
                        name: 'title',

                        render: function (
                            data,
                            type,
                            row
                        ) {
                            const title =
                                escapeHtml(
                                    row.title ||
                                    '-'
                                )

                            const image =
                                getImageUrl(
                                    row.image
                                )

                            if (
                                type !==
                                'display'
                            ) {
                                return (
                                    row.title ||
                                    ''
                                )
                            }

                            return `
                                <div class="flex min-w-0 items-center gap-3">
                                    <div class="h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                                        ${image
                                    ? `
                                                    <img
                                                        src="${escapeHtml(image)}"
                                                        alt="${title}"
                                                        class="h-full w-full object-cover"
                                                    />
                                                `
                                    : `
                                                    <div class="flex h-full w-full items-center justify-center text-gray-400">
                                                        <svg
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            stroke-width="1.8"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        >
                                                            <rect
                                                                x="3"
                                                                y="3"
                                                                width="18"
                                                                height="18"
                                                                rx="2"
                                                            />
                                                            <circle
                                                                cx="8.5"
                                                                cy="8.5"
                                                                r="1.5"
                                                            />
                                                            <path d="m21 15-5-5L5 21"/>
                                                        </svg>
                                                    </div>
                                                `
                                }
                                    </div>

                                    <div class="min-w-0">
                                        <div class="truncate font-medium text-gray-900">
                                            ${title}
                                        </div>

                                        <div class="mt-0.5 max-w-[280px] truncate text-xs text-gray-500">
                                            ${escapeHtml(
                                    row.image ||
                                    '-'
                                )}
                                        </div>
                                    </div>
                                </div>
                            `
                        },
                    },

                    {
                        data: 'groups',
                        name: 'groups',

                        orderable: false,
                        searchable: false,

                        render: function (
                            data,
                            type
                        ) {
                            const groups =
                                Array.isArray(
                                    data
                                )
                                    ? data
                                    : []

                            if (
                                type !==
                                'display'
                            ) {
                                return groups
                                    .map(
                                        (
                                            group
                                        ) =>
                                            group.group_name
                                    )
                                    .join(
                                        ', '
                                    )
                            }

                            if (
                                !groups.length
                            ) {
                                return `
                                    <span class="text-sm text-gray-400">
                                        Tidak ada group
                                    </span>
                                `
                            }

                            const firstGroups =
                                groups.slice(
                                    0,
                                    2
                                )

                            const remaining =
                                groups.length -
                                2

                            return `
                                <div class="flex max-w-[300px] flex-wrap gap-1.5">
                                    ${firstGroups
                                    .map(
                                        (
                                            group
                                        ) => `
                                                <span class="inline-flex max-w-[180px] truncate rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                                                    ${escapeHtml(
                                            group.group_name
                                        )}
                                                </span>
                                            `
                                    )
                                    .join(
                                        ''
                                    )}

                                    ${remaining >
                                    0
                                    ? `
                                                <span class="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                    +${remaining}
                                                </span>
                                            `
                                    : ''
                                }
                                </div>
                            `
                        },
                    },

                    {
                        data: 'is_active',
                        name: 'is_active',

                        render: function (
                            data,
                            type
                        ) {
                            if (
                                type !==
                                'display'
                            ) {
                                return data
                                    ? 1
                                    : 0
                            }

                            return data
                                ? `
                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                        Aktif
                                    </span>
                                `
                                : `
                                    <span class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        <span class="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                                        Nonaktif
                                    </span>
                                `
                        },
                    },

                    {
                        data: 'created_at',
                        name: 'created_at',

                        render: function (
                            data,
                            type
                        ) {
                            if (
                                type !==
                                'display'
                            ) {
                                return (
                                    data || ''
                                )
                            }

                            return `
                                <span class="text-sm text-gray-500">
                                    ${escapeHtml(
                                formatDate(
                                    data
                                )
                            )}
                                </span>
                            `
                        },
                    },

                    {
                        data: null,

                        orderable: false,
                        searchable: false,

                        render: function (
                            data,
                            type,
                            row
                        ) {
                            if (
                                type !==
                                'display'
                            ) {
                                return ''
                            }

                            return `
                                <div class="flex items-center justify-end gap-1">

                                    <button
                                        type="button"
                                        data-action="detail"
                                        data-id="${row.id}"
                                        class="cursor-pointer rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
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
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                            />
                                            <path d="M12 16v-4"/>
                                            <path d="M12 8h.01"/>
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        data-action="groups"
                                        data-id="${row.id}"
                                        class="cursor-pointer rounded-lg p-2 text-purple-500 transition hover:bg-purple-50 hover:text-purple-700"
                                        title="Group Akses"
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
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                            <circle
                                                cx="9"
                                                cy="7"
                                                r="4"
                                            />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
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
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4Z"/>
                                        </svg>
                                    </button>

                                    <button
                                        type="button"
                                        data-action="status"
                                        data-id="${row.id}"
                                        data-status="${row.is_active ? 1 : 0}"
                                        class="cursor-pointer rounded-lg p-2 ${row.is_active
                                    ? 'text-orange-500 hover:bg-orange-50 hover:text-orange-700'
                                    : 'text-green-500 hover:bg-green-50 hover:text-green-700'
                                }"
                                        title="${row.is_active
                                    ? 'Nonaktifkan'
                                    : 'Aktifkan'
                                }"
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
                                            ${row.is_active
                                    ? `
                                                        <rect
                                                            x="3"
                                                            y="5"
                                                            width="18"
                                                            height="14"
                                                            rx="2"
                                                        />
                                                        <path d="M8 9h8"/>
                                                        <path d="M8 13h5"/>
                                                    `
                                    : `
                                                        <path d="M9 12l2 2 4-4"/>
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="9"
                                                        />
                                                    `
                                }
                                        </svg>
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
                    searchPlaceholder:
                        'Cari banner atau group...',
                    lengthMenu: '_MENU_',
                    info: 'Menampilkan _START_–_END_ dari _TOTAL_ banner',
                    infoEmpty:
                        'Tidak ada banner',
                    infoFiltered: '',
                    zeroRecords:
                        'Banner tidak ditemukan',
                    emptyTable:
                        'Belum ada data banner',

                    paginate: {
                        first: '«',
                        previous: '‹',
                        next: '›',
                        last: '»',
                    },
                },

                order: [
                    [3, 'desc'],
                ],

                initComplete:
                    function () {
                        skeletonLoading.value =
                            false
                    },

                drawCallback:
                    function () {
                        skeletonLoading.value =
                            false
                    },
            }
        )

    table.value.addEventListener(
        'click',
        handleTableClick
    )
}

/*
|--------------------------------------------------------------------------
| Table Actions
|--------------------------------------------------------------------------
*/

const handleTableClick = async (
    event
) => {
    const button =
        event.target.closest(
            '[data-action]'
        )

    if (!button) {
        return
    }

    const action =
        button.dataset.action

    const id =
        button.dataset.id

    if (!id) {
        return
    }

    if (action === 'detail') {
        await showDetail(id)
        return
    }

    if (action === 'groups') {
        await openGroupsModal(id)
        return
    }

    if (action === 'edit') {
        await editBanner(id)
        return
    }

    if (action === 'status') {
        const status =
            button.dataset.status === '1'

        openConfirmModal(
            id,
            status
                ? 'Nonaktifkan Banner'
                : 'Aktifkan Banner',
            status
                ? 'Apakah Anda yakin ingin menonaktifkan banner ini?'
                : 'Apakah Anda yakin ingin mengaktifkan banner ini?',
            status
                ? 'Nonaktifkan'
                : 'Aktifkan',
            'status',
            status
        )

        return
    }

    if (action === 'delete') {
        openConfirmModal(
            id,
            'Hapus Banner',
            'Apakah Anda yakin ingin menghapus banner ini? Gambar banner juga akan dihapus dari server.',
            'Hapus',
            'delete',
            false
        )
    }
}

/*
|--------------------------------------------------------------------------
| Detail
|--------------------------------------------------------------------------
*/

const showDetail = async (id) => {
    closeMessages()

    showDetailModal.value = true
    loadingDetail.value = true
    bannerDetail.value = null

    try {
        const response =
            await axios.get(
                `/admin/banners/${id}`,
                {
                    headers: {
                        Accept:
                            'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            )

        bannerDetail.value =
            response.data?.data ||
            null
    } catch (error) {
        showDetailModal.value = false

        errorMessage.value =
            error.response?.data?.message ||
            'Detail banner gagal dimuat.'
    } finally {
        loadingDetail.value = false
    }
}

const closeDetailModal = () => {
    if (loadingDetail.value) {
        return
    }

    showDetailModal.value = false
    bannerDetail.value = null
}

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const addBanner = async () => {
    closeMessages()

    formMode.value = 'create'

    resetForm()

    showFormModal.value = true
    loadingForm.value = true

    try {
        await loadAvailableGroups()
    } catch (error) {
        showFormModal.value = false

        errorMessage.value =
            error.response?.data?.message ||
            'Group SSO gagal dimuat.'
    } finally {
        loadingForm.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Edit
|--------------------------------------------------------------------------
*/

const editBanner = async (id) => {
    closeMessages()

    formMode.value = 'edit'
    loadingForm.value = true

    showFormModal.value = true

    try {
        const [
            bannerResponse,
        ] = await Promise.all([
            axios.get(
                `/admin/banners/${id}`,
                {
                    headers: {
                        Accept:
                            'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            ),

            loadAvailableGroups(),
        ])

        const banner =
            bannerResponse.data?.data ||
            null

        if (!banner) {
            throw new Error(
                'Data banner tidak ditemukan.'
            )
        }

        form.value = {
            id: banner.id,
            title: banner.title || '',
            image: null,
            is_active:
                banner.is_active ?? true,
            groups: [],
        }

        imagePreview.value =
            getImageUrl(
                banner.image
            )

        await loadBannerGroups(
            banner.id
        )
    } catch (error) {
        showFormModal.value = false

        errorMessage.value =
            error.response?.data?.message ||
            error.message ||
            'Data banner gagal dimuat.'
    } finally {
        loadingForm.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Close Form
|--------------------------------------------------------------------------
*/

const closeFormModal = (
    force = false
) => {
    if (
        loadingForm.value &&
        !force
    ) {
        return
    }

    showFormModal.value = false

    resetForm()
}

/*
|--------------------------------------------------------------------------
| Save Banner
|--------------------------------------------------------------------------
*/

const saveBanner = async () => {
    closeMessages()

    syncFormGroups()

    if (!form.value.title.trim()) {
        errorMessage.value =
            'Judul banner wajib diisi.'

        return
    }

    if (
        form.value.groups.length ===
        0
    ) {
        errorMessage.value =
            'Pilih minimal 1 group SSO.'

        return
    }

    if (
        formMode.value === 'create' &&
        !form.value.image
    ) {
        errorMessage.value =
            'Gambar banner wajib dipilih.'

        return
    }

    loadingForm.value = true

    try {
        const formData =
            new FormData()

        formData.append(
            'title',
            form.value.title.trim()
        )

        formData.append(
            'is_active',
            form.value.is_active
                ? '1'
                : '0'
        )

        form.value.groups.forEach(
            (group) => {
                formData.append(
                    'groups[]',
                    group
                )
            }
        )

        if (form.value.image) {
            formData.append(
                'image',
                form.value.image
            )
        }

        let response

        if (
            formMode.value === 'edit' &&
            form.value.id
        ) {
            response =
                await axios.post(
                    `/admin/banners/${form.value.id}`,
                    formData,
                    {
                        headers: {
                            Accept:
                                'application/json',
                            'X-Requested-With':
                                'XMLHttpRequest',
                            'Content-Type':
                                'multipart/form-data',
                        },
                    }
                )
        } else {
            response =
                await axios.post(
                    '/admin/banners',
                    formData,
                    {
                        headers: {
                            Accept:
                                'application/json',
                            'X-Requested-With':
                                'XMLHttpRequest',
                            'Content-Type':
                                'multipart/form-data',
                        },
                    }
                )
        }

        successMessage.value =
            response.data?.message ||
            'Banner berhasil disimpan.'

        closeFormModal(true)

        if (dataTable) {
            dataTable.ajax.reload(
                null,
                false
            )
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } catch (error) {
        if (
            error.response?.status ===
            422
        ) {
            const errors =
                error.response?.data
                    ?.errors || {}

            const firstError =
                Object.values(errors)[0]

            errorMessage.value =
                Array.isArray(firstError)
                    ? firstError[0]
                    : error.response?.data
                        ?.message ||
                    'Data banner belum valid.'
        } else {
            errorMessage.value =
                error.response?.data
                    ?.message ||
                error.message ||
                'Banner gagal disimpan.'
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } finally {
        loadingForm.value = false
    }
}

/*
|--------------------------------------------------------------------------
| Confirm
|--------------------------------------------------------------------------
*/

const openConfirmModal = (
    id,
    title,
    message,
    actionText,
    actionType,
    currentStatus
) => {
    closeMessages()

    confirmBannerId.value = id
    confirmTitle.value = title
    confirmMessage.value = message
    confirmActionText.value =
        actionText
    confirmActionType.value =
        actionType
    confirmCurrentStatus.value =
        currentStatus

    showConfirmModal.value = true
}

const closeConfirmModal = (
    force = false
) => {
    if (
        confirmLoading.value &&
        !force
    ) {
        return
    }

    showConfirmModal.value = false
    confirmBannerId.value = null
    confirmTitle.value = ''
    confirmMessage.value = ''
    confirmActionText.value = ''
    confirmActionType.value = ''
    confirmCurrentStatus.value = false
}

const executeConfirmAction =
    async () => {
        if (
            !confirmBannerId.value
        ) {
            return
        }

        confirmLoading.value = true

        try {
            if (
                confirmActionType.value ===
                'delete'
            ) {
                loadingDelete.value =
                    true

                const response =
                    await axios.delete(
                        `/admin/banners/${confirmBannerId.value}`,
                        {
                            headers: {
                                Accept:
                                    'application/json',
                                'X-Requested-With':
                                    'XMLHttpRequest',
                            },
                        }
                    )

                successMessage.value =
                    response.data
                        ?.message ||
                    'Banner berhasil dihapus.'
            }

            if (
                confirmActionType.value ===
                'status'
            ) {
                loadingStatus.value =
                    true

                const response =
                    await axios.patch(
                        `/admin/banners/${confirmBannerId.value}/status`,
                        {
                            is_active:
                                !confirmCurrentStatus.value,
                        },
                        {
                            headers: {
                                Accept:
                                    'application/json',
                                'X-Requested-With':
                                    'XMLHttpRequest',
                            },
                        }
                    )

                successMessage.value =
                    response.data
                        ?.message ||
                    'Status banner berhasil diperbarui.'
            }

            closeConfirmModal(
                true
            )

            if (dataTable) {
                dataTable.ajax.reload(
                    null,
                    false
                )
            }

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        } catch (error) {
            showConfirmModal.value =
                false

            errorMessage.value =
                error.response?.data
                    ?.message ||
                'Aksi gagal dilakukan.'
        } finally {
            confirmLoading.value =
                false

            loadingDelete.value =
                false

            loadingStatus.value =
                false
        }
    }

/*
|--------------------------------------------------------------------------
| Group Modal
|--------------------------------------------------------------------------
*/

const openGroupsModal = async (
    id
) => {
    closeMessages()

    groupBanner.value = null
    selectedGroups.value = []
    availableGroups.value = []

    showGroupsModal.value = true

    try {
        const [
            bannerResponse,
        ] = await Promise.all([
            axios.get(
                `/admin/banners/${id}`,
                {
                    headers: {
                        Accept:
                            'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            ),

            loadAvailableGroups(),
        ])

        groupBanner.value =
            bannerResponse.data?.data ||
            null

        await loadBannerGroups(
            id
        )
    } catch (error) {
        showGroupsModal.value = false

        errorMessage.value =
            error.response?.data
                ?.message ||
            'Data group banner gagal dimuat.'
    }
}

const closeGroupsModal = () => {
    if (savingGroups.value) {
        return
    }

    showGroupsModal.value = false
    groupBanner.value = null
    selectedGroups.value = []
    availableGroups.value = []
}

const saveBannerGroups =
    async () => {
        if (!groupBanner.value?.id) {
            return
        }

        if (
            selectedGroups.value
                .length === 0
        ) {
            errorMessage.value =
                'Pilih minimal 1 group SSO.'

            return
        }

        savingGroups.value = true

        try {
            const formData =
                new FormData()

            formData.append(
                'title',
                groupBanner.value.title ||
                ''
            )

            formData.append(
                'is_active',
                groupBanner.value.is_active
                    ? '1'
                    : '0'
            )

            selectedGroups.value.forEach(
                (group) => {
                    formData.append(
                        'groups[]',
                        group
                    )
                }
            )

            const response =
                await axios.post(
                    `/admin/banners/${groupBanner.value.id}`,
                    formData,
                    {
                        headers: {
                            Accept:
                                'application/json',
                            'X-Requested-With':
                                'XMLHttpRequest',
                            'Content-Type':
                                'multipart/form-data',
                        },
                    }
                )

            successMessage.value =
                response.data?.message ||
                'Group banner berhasil diperbarui.'

            closeGroupsModal()

            if (dataTable) {
                dataTable.ajax.reload(
                    null,
                    false
                )
            }

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        } catch (error) {
            errorMessage.value =
                error.response?.data
                    ?.message ||
                'Group banner gagal diperbarui.'
        } finally {
            savingGroups.value =
                false
        }
    }

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

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

    if (
        imagePreview.value &&
        imagePreview.value.startsWith(
            'blob:'
        )
    ) {
        URL.revokeObjectURL(
            imagePreview.value
        )
    }

    if (dataTable) {
        dataTable.destroy()
        dataTable = null
    }
})
</script>

<template>

    <Head title="Banners" />

    <DashboardLayout>
        <div class="w-full min-w-0 space-y-6">

            <!-- SUCCESS -->
            <div v-if="successMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <div class="flex items-start gap-3">
                    <Check class="mt-0.5 h-5 w-5 shrink-0" :stroke-width="2" />

                    <span>
                        {{ successMessage }}
                    </span>
                </div>

                <button type="button" class="cursor-pointer text-green-500 hover:text-green-700"
                    @click="successMessage = ''">
                    ×
                </button>
            </div>

            <!-- ERROR -->
            <div v-if="errorMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <div class="flex items-start gap-3">
                    <AlertCircle class="mt-0.5 h-5 w-5 shrink-0" :stroke-width="2" />

                    <span>
                        {{ errorMessage }}
                    </span>
                </div>

                <button type="button" class="cursor-pointer text-red-500 hover:text-red-700" @click="errorMessage = ''">
                    ×
                </button>
            </div>

            <!-- HEADER -->
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 class="text-xl font-semibold text-gray-800">
                        Banners
                    </h1>

                    <p class="mt-1 text-sm text-gray-500">
                        Kelola banner yang ditampilkan
                        di portal.
                    </p>
                </div>

                <button type="button"
                    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    @click="addBanner">
                    <Plus class="h-4 w-4" :stroke-width="2" />

                    Tambah Banner
                </button>
            </div>

            <!-- TABLE -->
            <div class="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div class="w-full min-w-0 px-4 py-4 sm:px-6">
                    <div class="banners-table-wrapper relative w-full min-w-0">
                        <table ref="table" id="banners-table" class="w-full">
                            <thead>
                                <tr>
                                    <th>
                                        Banner
                                    </th>

                                    <th>
                                        Group
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Dibuat
                                    </th>

                                    <th>
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody></tbody>
                        </table>

                        <!-- SKELETON -->
                        <div v-if="skeletonLoading"
                            class="pointer-events-none absolute inset-0 top-[44px] z-30 min-h-[520px] overflow-hidden bg-white/95">
                            <div class="absolute inset-x-0 top-4 z-20 flex items-center justify-center">
                                <div
                                    class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm">
                                    <span
                                        class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700"></span>

                                    Memuat data...
                                </div>
                            </div>

                            <div v-for="row in 8" :key="row" class="h-[72px] border-b border-gray-100 px-4">
                                <div class="flex h-full items-center gap-4">
                                    <div class="flex min-w-0 flex-[2] items-center gap-3">
                                        <div class="skeleton-shimmer h-12 w-20 shrink-0 rounded-lg"></div>

                                        <div class="min-w-0 flex-1 space-y-2">
                                            <div class="skeleton-shimmer h-3.5 w-36 rounded"></div>

                                            <div class="skeleton-shimmer h-3 w-28 rounded"></div>
                                        </div>
                                    </div>

                                    <div class="hidden flex-[1.5] md:block">
                                        <div class="flex gap-1">
                                            <div class="skeleton-shimmer h-6 w-16 rounded-md"></div>

                                            <div class="skeleton-shimmer h-6 w-12 rounded-md"></div>
                                        </div>
                                    </div>

                                    <div class="hidden w-[100px] sm:block">
                                        <div class="skeleton-shimmer h-6 w-16 rounded-full"></div>
                                    </div>

                                    <div class="hidden flex-[1.2] lg:block">
                                        <div class="skeleton-shimmer h-3.5 w-28 rounded"></div>
                                    </div>

                                    <div class="flex w-[190px] shrink-0 justify-end gap-1">
                                        <div class="skeleton-shimmer h-8 w-8 rounded-lg"></div>

                                        <div class="skeleton-shimmer h-8 w-8 rounded-lg"></div>

                                        <div class="skeleton-shimmer h-8 w-8 rounded-lg"></div>

                                        <div class="skeleton-shimmer h-8 w-8 rounded-lg"></div>

                                        <div class="skeleton-shimmer h-8 w-8 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- FORM MODAL -->
            <div v-if="showFormModal" class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="closeFormModal">
                <div class="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                    <!-- HEADER -->
                    <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">
                                {{
                                    formMode === 'edit'
                                        ? 'Edit Banner'
                                        : 'Tambah Banner'
                                }}
                            </h2>

                            <p class="mt-1 text-sm text-gray-500">
                                {{
                                    formMode === 'edit'
                                        ? 'Perbarui informasi dan group akses banner.'
                                        : 'Tambahkan banner baru beserta group aksesnya.'
                                }}
                            </p>
                        </div>

                        <button type="button"
                            class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            @click="closeFormModal">
                            <X class="h-5 w-5" :stroke-width="1.8" />
                        </button>
                    </div>

                    <!-- BODY -->
                    <div class="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                        <!-- LOADING -->
                        <div v-if="loadingForm" class="space-y-5">
                            <div v-for="item in 5" :key="item" class="space-y-2">
                                <div class="skeleton-shimmer h-3.5 w-28 rounded"></div>

                                <div class="skeleton-shimmer h-10 w-full rounded-lg"></div>
                            </div>
                        </div>

                        <!-- FORM -->
                        <form v-else class="space-y-6" @submit.prevent="
                            saveBanner
                        ">
                            <!-- TITLE -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                                    Judul Banner
                                </label>

                                <input v-model="form.title
                                    " type="text" required maxlength="255"
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                    placeholder="Contoh: Pendaftaran Mahasiswa Baru" />
                            </div>

                            <!-- IMAGE -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-700">
                                    Gambar Banner
                                </label>

                                <input ref="imageInput" type="file"
                                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" class="hidden"
                                    @change="
                                        handleImageChange
                                    " />

                                <div v-if="
                                    imagePreview
                                " class="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                    <div class="relative aspect-[16/6] w-full overflow-hidden bg-gray-100">
                                        <img :src="imagePreview
                                            " alt="Preview banner" class="h-full w-full object-cover" />

                                        <button type="button"
                                            class="absolute right-3 top-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-black/75"
                                            @click="
                                                clearSelectedImage
                                            ">
                                            <X class="h-3.5 w-3.5" />

                                            Hapus
                                        </button>
                                    </div>
                                </div>

                                <button v-else type="button"
                                    class="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-gray-400 hover:bg-gray-100"
                                    @click="
                                        imageInput?.click()
                                        ">
                                    <div
                                        class="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                                        <Image class="h-6 w-6" :stroke-width="1.8" />
                                    </div>

                                    <div class="mt-3 text-sm font-medium text-gray-800">
                                        Pilih gambar banner
                                    </div>

                                    <div class="mt-1 text-xs text-gray-500">
                                        JPG, JPEG, PNG atau WEBP · Maks. 2 MB
                                    </div>

                                    <div class="mt-1 text-xs text-gray-500">
                                        Rasio <span class="font-medium">16:9</span>
                                        · Rekomendasi <span class="font-medium">1920 × 1080 px</span>
                                    </div>

                                </button>

                                <button v-if="
                                    imagePreview
                                " type="button"
                                    class="mt-2 cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-800"
                                    @click="
                                        imageInput?.click()
                                        ">
                                    Ganti gambar
                                </button>

                                <p v-if="
                                    formMode ===
                                    'edit'
                                " class="mt-2 text-xs text-gray-500">
                                    Kosongkan jika ingin
                                    menggunakan gambar
                                    yang sekarang.
                                </p>
                            </div>

                            <!-- GROUP -->
                            <div>
                                <div class="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">
                                            Group Akses
                                        </label>

                                        <p class="mt-0.5 text-xs text-gray-500">
                                            Pilih minimal satu
                                            group SSO yang
                                            dapat melihat
                                            banner.
                                        </p>
                                    </div>

                                    <div class="flex gap-2">
                                        <button type="button"
                                            class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            @click="
                                                selectAllGroups
                                            ">
                                            Pilih Semua
                                        </button>

                                        <button type="button"
                                            class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            @click="
                                                clearAllGroups
                                            ">
                                            Hapus Semua
                                        </button>
                                    </div>
                                </div>

                                <div v-if="
                                    loadingGroups
                                " class="space-y-2">
                                    <div v-for="item in 6" :key="item"
                                        class="h-12 animate-pulse rounded-lg bg-gray-100"></div>
                                </div>

                                <div v-else-if="
                                    availableGroups.length
                                " class="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-gray-200 p-2">
                                    <label v-for="group in availableGroups" :key="group.path
                                        "
                                        class="flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 transition"
                                        :class="isGroupSelected(
                                            group.path
                                        )
                                                ? 'border-emerald-300 bg-emerald-50'
                                                : 'border-transparent hover:bg-gray-50'
                                            " :style="{
                                            paddingLeft:
                                                `${0.75 + ((group.level || 0) * 1.25)}rem`,
                                        }">
                                        <input type="checkbox" :checked="isGroupSelected(
                                            group.path
                                        )
                                            "
                                            class="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                            @change="
                                                toggleGroup(
                                                    group.path
                                                )
                                                " />

                                        <div class="min-w-0 flex-1">
                                            <div class="flex items-center gap-2 text-sm font-medium text-gray-900">
                                                <span v-if="
                                                    group.level >
                                                    0
                                                " class="text-gray-400">
                                                    ↳
                                                </span>

                                                {{
                                                    group.name
                                                }}
                                            </div>

                                            <div class="mt-0.5 truncate text-xs text-gray-500">
                                                {{
                                                    group.path
                                                }}
                                            </div>
                                        </div>

                                        <UsersRound class="h-4 w-4 shrink-0 text-gray-400" :stroke-width="1.8" />
                                    </label>
                                </div>

                                <div v-else
                                    class="rounded-xl border border-gray-200 px-4 py-8 text-center text-sm text-gray-500">
                                    Tidak ada group SSO.
                                </div>

                                <div class="mt-2 flex items-center justify-between">
                                    <span class="text-xs text-gray-500">
                                        {{
                                            selectedGroups.length
                                        }}
                                        group dipilih
                                    </span>

                                    <span v-if="
                                        selectedGroups.length ===
                                        0
                                    " class="text-xs font-medium text-red-500">
                                        Minimal 1 group
                                    </span>
                                </div>
                            </div>

                            <!-- STATUS -->
                            <label
                                class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                                <input v-model="form.is_active
                                    " type="checkbox"
                                    class="h-4 w-4 cursor-pointer rounded border-gray-300 text-gray-900 focus:ring-gray-500" />

                                <div>
                                    <div class="text-sm font-medium text-gray-800">
                                        Banner Aktif
                                    </div>

                                    <div class="mt-0.5 text-xs text-gray-500">
                                        Banner dapat ditampilkan
                                        di portal.
                                    </div>
                                </div>
                            </label>

                            <!-- FOOTER -->
                            <div class="flex justify-end gap-2 border-t border-gray-200 pt-5">
                                <button type="button" :disabled="loadingForm
                                    "
                                    class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    @click="
                                        closeFormModal
                                    ">
                                    Batal
                                </button>

                                <button type="submit" :disabled="loadingForm ||
                                    loadingGroups ||
                                    selectedGroups.length ===
                                    0
                                    "
                                    class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
                                    <span v-if="
                                        loadingForm
                                    "
                                        class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                                    {{
                                        loadingForm
                                            ? 'Menyimpan...'
                                            : 'Simpan'
                                    }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- CONFIRM MODAL -->
            <div v-if="showConfirmModal" class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeConfirmModal
                ">
                <div class="w-full max-w-md rounded-xl bg-white shadow-2xl">
                    <div class="p-6">
                        <div class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
                            <AlertCircle class="h-5 w-5 text-gray-600" :stroke-width="1.8" />
                        </div>

                        <h2 class="mt-4 text-lg font-semibold text-gray-900">
                            {{ confirmTitle }}
                        </h2>

                        <p class="mt-2 text-sm leading-6 text-gray-500">
                            {{ confirmMessage }}
                        </p>

                        <div class="mt-6 flex justify-end gap-2">
                            <button type="button" :disabled="confirmLoading
                                "
                                class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                @click="
                                    closeConfirmModal
                                ">
                                Batal
                            </button>

                            <button type="button" :disabled="confirmLoading
                                "
                                class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                @click="
                                    executeConfirmAction
                                ">
                                <span v-if="
                                    confirmLoading
                                "
                                    class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                                {{
                                    confirmLoading
                                        ? 'Memproses...'
                                        : confirmActionText
                                }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DETAIL MODAL -->
            <div v-if="showDetailModal" class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeDetailModal
                ">
                <div class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                    <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">
                                Detail Banner
                            </h2>

                            <p class="mt-1 text-sm text-gray-500">
                                Informasi banner dan group
                                akses.
                            </p>
                        </div>

                        <button type="button"
                            class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            @click="
                                closeDetailModal
                            ">
                            <X class="h-5 w-5" :stroke-width="1.8" />
                        </button>
                    </div>

                    <div class="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                        <!-- LOADING -->
                        <div v-if="
                            loadingDetail
                        " class="space-y-5">
                            <div class="skeleton-shimmer aspect-[16/6] w-full rounded-xl"></div>

                            <div v-for="item in 4" :key="item" class="space-y-2">
                                <div class="skeleton-shimmer h-3 w-24 rounded"></div>

                                <div class="skeleton-shimmer h-10 w-full rounded-lg"></div>
                            </div>
                        </div>

                        <!-- DATA -->
                        <div v-else-if="
                            bannerDetail
                        " class="space-y-6">
                            <!-- IMAGE -->
                            <div class="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                                <div v-if="
                                    getImageUrl(
                                        bannerDetail.image
                                    )
                                " class="aspect-[16/6] w-full">
                                    <img :src="getImageUrl(
                                        bannerDetail.image
                                    )
                                        " :alt="bannerDetail.title
                                            " class="h-full w-full object-cover" />
                                </div>

                                <div v-else class="flex aspect-[16/6] items-center justify-center text-gray-400">
                                    <Image class="h-10 w-10" :stroke-width="1.5" />
                                </div>
                            </div>

                            <!-- TITLE -->
                            <div class="border-b border-gray-200 pb-5">
                                <div class="flex items-start justify-between gap-4">
                                    <div class="min-w-0">
                                        <h3 class="text-lg font-semibold text-gray-900">
                                            {{
                                                bannerDetail.title ||
                                                '-'
                                            }}
                                        </h3>

                                        <p class="mt-1 break-all text-sm text-gray-500">
                                            {{
                                                bannerDetail.image ||
                                                '-'
                                            }}
                                        </p>
                                    </div>

                                    <span v-if="
                                        bannerDetail.is_active
                                    "
                                        class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>

                                        Aktif
                                    </span>

                                    <span v-else
                                        class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        <span class="h-1.5 w-1.5 rounded-full bg-gray-400"></span>

                                        Nonaktif
                                    </span>
                                </div>
                            </div>

                            <!-- INFO -->
                            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div class="sm:col-span-2">
                                    <div class="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Judul
                                    </div>

                                    <div class="mt-1 text-sm text-gray-800">
                                        {{
                                            bannerDetail.title ||
                                            '-'
                                        }}
                                    </div>
                                </div>

                                <div class="sm:col-span-2">
                                    <div class="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        File Gambar
                                    </div>

                                    <div class="mt-1 break-all text-sm text-gray-800">
                                        {{
                                            bannerDetail.image ||
                                            '-'
                                        }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Status
                                    </div>

                                    <div class="mt-2">
                                        <span v-if="
                                            bannerDetail.is_active
                                        "
                                            class="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                            <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>

                                            Aktif
                                        </span>

                                        <span v-else
                                            class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                            <span class="h-1.5 w-1.5 rounded-full bg-gray-400"></span>

                                            Nonaktif
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div class="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Dibuat
                                    </div>

                                    <div class="mt-1 text-sm text-gray-800">
                                        {{
                                            formatDate(
                                                bannerDetail.created_at
                                            )
                                        }}
                                    </div>
                                </div>

                                <!-- GROUPS -->
                                <div class="sm:col-span-2">
                                    <div class="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Group Akses
                                    </div>

                                    <div v-if="
                                        bannerDetail.groups?.length
                                    " class="mt-2 flex flex-wrap gap-2">
                                        <span v-for="group in bannerDetail.groups" :key="group.id
                                            "
                                            class="inline-flex items-center gap-1.5 rounded-md bg-purple-50 px-2.5 py-1.5 text-xs font-medium text-purple-700">
                                            <UsersRound class="h-3.5 w-3.5" />

                                            {{
                                                group.group_name
                                            }}
                                        </span>
                                    </div>

                                    <div v-else class="mt-1 text-sm text-gray-400">
                                        Tidak ada group.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- EMPTY -->
                        <div v-else class="py-10 text-center text-sm text-gray-500">
                            Data banner tidak ditemukan.
                        </div>
                    </div>

                    <div class="flex justify-end border-t border-gray-200 px-6 py-4">
                        <button type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            @click="
                                closeDetailModal
                            ">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            <!-- GROUP MODAL -->
            <div v-if="showGroupsModal" class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeGroupsModal
                ">
                <div class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                    <!-- HEADER -->
                    <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">
                                Group Akses Banner
                            </h2>

                            <p class="mt-1 text-sm text-gray-500">
                                Tentukan group SSO yang
                                dapat melihat banner.
                            </p>
                        </div>

                        <button type="button"
                            class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            @click="
                                closeGroupsModal
                            ">
                            <X class="h-5 w-5" :stroke-width="1.8" />
                        </button>
                    </div>

                    <!-- BODY -->
                    <div class="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                        <!-- BANNER INFO -->
                        <div v-if="
                            groupBanner
                        "
                            class="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                            <div class="h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white">
                                <img v-if="
                                    getImageUrl(
                                        groupBanner.image
                                    )
                                " :src="getImageUrl(
                                        groupBanner.image
                                    )
                                        " :alt="groupBanner.title
                                        " class="h-full w-full object-cover" />

                                <div v-else class="flex h-full w-full items-center justify-center text-gray-400">
                                    <Image class="h-5 w-5" />
                                </div>
                            </div>

                            <div class="min-w-0">
                                <div class="truncate text-sm font-semibold text-gray-900">
                                    {{
                                        groupBanner.title
                                    }}
                                </div>

                                <div class="mt-0.5 text-xs text-gray-500">
                                    {{
                                        selectedGroups.length
                                    }}
                                    group dipilih
                                </div>
                            </div>
                        </div>

                        <!-- TOOLBAR -->
                        <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <div class="text-sm text-gray-600">
                                <span class="font-medium text-gray-900">
                                    {{
                                        selectedGroups.length
                                    }}
                                </span>

                                group dipilih
                            </div>

                            <div class="flex gap-2">
                                <button type="button"
                                    class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    @click="
                                        selectAllGroups
                                    ">
                                    Pilih Semua
                                </button>

                                <button type="button"
                                    class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    @click="
                                        clearAllGroups
                                    ">
                                    Hapus Semua
                                </button>
                            </div>
                        </div>

                        <!-- LOADING -->
                        <div v-if="
                            loadingGroups
                        " class="space-y-2">
                            <div v-for="item in 8" :key="item" class="h-12 animate-pulse rounded-lg bg-gray-100"></div>
                        </div>

                        <!-- GROUPS -->
                        <div v-else-if="
                            availableGroups.length
                        " class="space-y-2">
                            <label v-for="group in availableGroups" :key="group.path
                                " class="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition"
                                :class="isGroupSelected(
                                    group.path
                                )
                                        ? 'border-emerald-300 bg-emerald-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                    " :style="{
                                    paddingLeft:
                                        `${1 + ((group.level || 0) * 1.5)}rem`,
                                }">
                                <input type="checkbox" :checked="isGroupSelected(
                                    group.path
                                )
                                    "
                                    class="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    @change="
                                        toggleGroup(
                                            group.path
                                        )
                                        " />

                                <div class="min-w-0 flex-1">
                                    <div class="flex items-center gap-2 text-sm font-medium text-gray-900">
                                        <span v-if="
                                            group.level >
                                            0
                                        " class="text-gray-400">
                                            ↳
                                        </span>

                                        {{
                                            group.name
                                        }}
                                    </div>

                                    <div class="mt-0.5 truncate text-xs text-gray-500">
                                        {{
                                            group.path
                                        }}
                                    </div>
                                </div>

                                <UsersRound class="h-4 w-4 shrink-0 text-gray-400" :stroke-width="1.8" />
                            </label>
                        </div>

                        <!-- EMPTY -->
                        <div v-else
                            class="rounded-lg border border-gray-200 px-4 py-10 text-center text-sm text-gray-500">
                            Tidak ada group SSO.
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div class="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
                        <button type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="savingGroups
                                " @click="
                                closeGroupsModal
                            ">
                            Batal
                        </button>

                        <button type="button"
                            class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="savingGroups ||
                                loadingGroups ||
                                selectedGroups.length ===
                                0
                                " @click="
                                saveBannerGroups
                            ">
                            <span v-if="
                                savingGroups
                            "
                                class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                            {{
                                savingGroups
                                    ? 'Menyimpan...'
                                    : 'Simpan Group'
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>

<style scoped>
.banners-table-wrapper {
    width: 100% !important;
    min-width: 0 !important;
}

/*
|--------------------------------------------------------------------------
| DataTables
|--------------------------------------------------------------------------
*/

:deep(.dt-container) {
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
}

:deep(.dt-layout-row) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    width: 100% !important;
    min-width: 100% !important;

    margin: 0;
    padding: 0.75rem 0;
}

:deep(.dt-layout-row:first-child) {
    padding-top: 0;
}

:deep(.dt-layout-row:last-child) {
    padding-bottom: 0;
}

:deep(.dt-layout-cell) {
    display: flex;
    align-items: center;

    min-width: 0 !important;
}

:deep(.dt-layout-table) {
    display: block !important;

    position: relative;

    width: 100% !important;
    min-width: 100% !important;
    max-width: none !important;

    margin: 0 !important;
    padding: 0 !important;
}

:deep(.dt-layout-table > table) {
    display: table !important;

    width: 100% !important;
    min-width: 100% !important;
    max-width: none !important;

    margin: 0 !important;

    table-layout: auto !important;
}

/*
|--------------------------------------------------------------------------
| Table
|--------------------------------------------------------------------------
*/

:deep(#banners-table) {
    display: table !important;

    width: 100% !important;
    min-width: 100% !important;
    max-width: none !important;

    margin: 0 !important;

    border-collapse: collapse;
}

:deep(#banners-table thead) {
    width: 100% !important;
}

:deep(#banners-table thead tr) {
    width: 100% !important;
}

:deep(#banners-table thead th) {
    height: 44px;

    border-bottom: 1px solid #e5e7eb;

    background: #f9fafb;

    padding: 0.75rem 1rem;

    color: #6b7280;

    font-size: 0.75rem;
    font-weight: 600;

    text-align: left;

    white-space: nowrap;
}

:deep(#banners-table tbody) {
    width: 100% !important;
}

:deep(#banners-table tbody tr) {
    width: 100% !important;

    transition:
        background-color 0.15s ease;
}

:deep(#banners-table tbody tr:hover) {
    background: #fafafa;
}

:deep(#banners-table tbody td) {
    border-bottom: 1px solid #f3f4f6;

    padding: 0.85rem 1rem;

    vertical-align: middle;

    font-size: 0.875rem;
}

:deep(#banners-table tbody tr:last-child td) {
    border-bottom: 0;
}

/*
|--------------------------------------------------------------------------
| Empty
|--------------------------------------------------------------------------
*/

:deep(#banners-table tbody tr.dt-empty) {
    width: 100% !important;
}

:deep(#banners-table tbody td.dt-empty) {
    display: table-cell !important;

    width: 100% !important;
    min-width: 100% !important;

    height: 160px !important;

    padding: 3rem 1rem !important;

    text-align: center !important;
    vertical-align: middle !important;

    color: #6b7280 !important;

    font-size: 0.875rem !important;

    white-space: normal !important;
}

:deep(#banners-table tbody td[colspan]) {
    width: 100% !important;
    min-width: 100% !important;
}

/*
|--------------------------------------------------------------------------
| Length
|--------------------------------------------------------------------------
*/

:deep(.dt-length) {
    display: flex;
    align-items: center;
}

:deep(.dt-length select) {
    min-width: 70px;

    cursor: pointer;

    border: 1px solid #d1d5db;
    border-radius: 0.5rem;

    background: white;

    padding: 0.45rem 2rem 0.45rem 0.7rem;

    color: #374151;

    font-size: 0.875rem;

    outline: none;
}

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

:deep(.dt-search) {
    display: flex;
    align-items: center;
}

:deep(.dt-search input) {
    width: 240px;

    border: 1px solid #d1d5db;
    border-radius: 0.5rem;

    background: white;

    padding: 0.55rem 0.75rem;

    color: #374151;

    font-size: 0.875rem;

    outline: none;

    transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
}

:deep(.dt-search input:focus) {
    border-color: #9ca3af;

    box-shadow:
        0 0 0 2px rgb(156 163 175 / 15%);
}

/*
|--------------------------------------------------------------------------
| Info
|--------------------------------------------------------------------------
*/

:deep(.dt-info) {
    color: #6b7280;

    font-size: 0.8rem;
}

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

:deep(.dt-paging) {
    display: flex;
    align-items: center;

    gap: 0.25rem;
}

:deep(.dt-paging-button) {
    min-width: 34px;
    height: 34px;

    cursor: pointer !important;

    border: 1px solid transparent !important;
    border-radius: 0.5rem !important;

    background: transparent !important;

    color: #6b7280 !important;

    font-size: 0.8rem !important;
}

:deep(.dt-paging-button:hover) {
    border-color: #e5e7eb !important;

    background: #f9fafb !important;

    color: #111827 !important;
}

:deep(.dt-paging-button.current) {
    border-color: #111827 !important;

    background: #111827 !important;

    color: white !important;
}

:deep(.dt-paging-button.disabled) {
    cursor: not-allowed !important;

    opacity: 0.45;
}

/*
|--------------------------------------------------------------------------
| Ordering
|--------------------------------------------------------------------------
*/

:deep(.dt-orderable-asc),
:deep(.dt-orderable-desc) {
    cursor: pointer;
}

:deep(.dt-column-order) {
    opacity: 0.5;
}

/*
|--------------------------------------------------------------------------
| Loading
|--------------------------------------------------------------------------
*/

:deep(.datatable-loading) {
    display: inline-flex;

    align-items: center;

    gap: 0.5rem;
}

:deep(.datatable-spinner) {
    width: 16px;
    height: 16px;

    border: 2px solid #d1d5db;

    border-top-color: #374151;

    border-radius: 9999px;

    animation:
        datatable-spin 0.7s linear infinite;
}

@keyframes datatable-spin {
    to {
        transform: rotate(360deg);
    }
}

/*
|--------------------------------------------------------------------------
| Skeleton
|--------------------------------------------------------------------------
*/

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

    background: linear-gradient(90deg,
            transparent 0%,
            rgb(255 255 255 / 45%) 40%,
            rgb(255 255 255 / 80%) 50%,
            rgb(255 255 255 / 45%) 60%,
            transparent 100%);

    animation:
        skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
    100% {
        transform: translateX(100%);
    }
}

/*
|--------------------------------------------------------------------------
| Tablet
|--------------------------------------------------------------------------
*/

@media (max-width: 768px) {
    :deep(.dt-layout-row) {
        flex-wrap: wrap;
    }

    :deep(.dt-layout-cell) {
        width: 100%;
    }

    :deep(.dt-search) {
        width: 100%;
    }

    :deep(.dt-search input) {
        width: 100%;
        flex: 1;
    }
}

/*
|--------------------------------------------------------------------------
| Mobile
|--------------------------------------------------------------------------
*/

@media (max-width: 640px) {

    :deep(#banners-table thead th),
    :deep(#banners-table tbody td) {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }

    :deep(.dt-paging-button) {
        min-width: 30px;
        height: 30px;
    }
}
</style>