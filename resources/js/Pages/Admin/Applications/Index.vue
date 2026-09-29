<script setup>
import { Head } from '@inertiajs/vue3'
import axios from 'axios'

import {
    Activity,
    Archive,
    ArchiveRestore,
    Award,
    Banknote,
    BarChart3,
    Bell,
    Book,
    BookOpen,
    BookOpenCheck,
    Briefcase,
    Building2,
    Calendar,
    CalendarCheck,
    CalendarClock,
    CalendarDays,
    Calculator,
    Clipboard,
    ClipboardCheck,
    ClipboardList,
    Clock,
    Cloud,
    CloudDownload,
    CloudUpload,
    Code2,
    Cog,
    Contact,
    CreditCard,
    Database,
    Download,
    File,
    FileArchive,
    FileCheck,
    FileClock,
    FileCode,
    FileImage,
    FileSpreadsheet,
    FileText,
    Folder,
    FolderOpen,
    GraduationCap,
    Grid2X2,
    HardDrive,
    Headphones,
    HeartPulse,
    Home,
    IdCard,
    Image,
    Inbox,
    KeyRound,
    Laptop,
    LayoutDashboard,
    Library,
    Link,
    Lock,
    Mail,
    MapPin,
    Megaphone,
    MessageSquare,
    Monitor,
    Network,
    Newspaper,
    Package,
    PackageCheck,
    Phone,
    PieChart,
    Presentation,
    Printer,
    QrCode,
    Receipt,
    RefreshCw,
    Rocket,
    School,
    Search,
    Send,
    Server,
    Settings,
    Shield,
    ShieldCheck,
    Smartphone,
    Star,
    Stethoscope,
    Tag,
    Target,
    Terminal,
    Ticket,
    TrendingUp,
    Upload,
    User,
    UserCheck,
    UserCog,
    Users,
    UsersRound,
    Wallet,
    Wifi,
    Wrench,
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

const skeletonLoading = ref(true)

const showFormModal = ref(false)
const showDetailModal = ref(false)
const showConfirmModal = ref(false)
const showGroupsModal = ref(false)

const selectedApplication = ref(null)
const groupApplication = ref(null)

const loadingDetail = ref(false)
const loadingForm = ref(false)
const loadingDelete = ref(false)
const loadingStatus = ref(false)
const confirmLoading = ref(false)
const loadingGroups = ref(false)
const savingGroups = ref(false)

const errorMessage = ref('')
const successMessage = ref('')

const formMode = ref('create')

const form = ref({
    id: null,
    name: '',
    code: '',
    description: '',
    url: '',
    icon: '',
    sort_order: 0,
    is_active: true,
})

const applicationDetail = ref(null)

const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmActionText = ref('')
const confirmActionType = ref('')
const confirmApplicationId = ref(null)
const confirmCurrentStatus = ref(false)

const availableGroups = ref([])
const selectedGroups = ref([])

const iconOptions = [
    {
        value: 'layout-dashboard',
        label: 'Dashboard',
        component: LayoutDashboard,
    },
    {
        value: 'home',
        label: 'Beranda',
        component: Home,
    },
    {
        value: 'graduation-cap',
        label: 'Akademik / Wisuda',
        component: GraduationCap,
    },
    {
        value: 'book-open',
        label: 'Buku Terbuka',
        component: BookOpen,
    },
    {
        value: 'book',
        label: 'Buku',
        component: Book,
    },
    {
        value: 'book-open-check',
        label: 'Akademik',
        component: BookOpenCheck,
    },
    {
        value: 'library',
        label: 'Perpustakaan',
        component: Library,
    },
    {
        value: 'school',
        label: 'Sekolah / Kampus',
        component: School,
    },
    {
        value: 'users',
        label: 'Pengguna',
        component: Users,
    },
    {
        value: 'users-round',
        label: 'Kelompok Pengguna',
        component: UsersRound,
    },
    {
        value: 'user',
        label: 'User',
        component: User,
    },
    {
        value: 'user-check',
        label: 'User Terverifikasi',
        component: UserCheck,
    },
    {
        value: 'user-cog',
        label: 'User / Pengaturan',
        component: UserCog,
    },
    {
        value: 'id-card',
        label: 'Kartu Identitas',
        component: IdCard,
    },
    {
        value: 'briefcase',
        label: 'Kepegawaian',
        component: Briefcase,
    },
    {
        value: 'building-2',
        label: 'Gedung / Institusi',
        component: Building2,
    },
    {
        value: 'monitor',
        label: 'Komputer',
        component: Monitor,
    },
    {
        value: 'laptop',
        label: 'Laptop',
        component: Laptop,
    },
    {
        value: 'smartphone',
        label: 'Smartphone',
        component: Smartphone,
    },
    {
        value: 'server',
        label: 'Server',
        component: Server,
    },
    {
        value: 'database',
        label: 'Database',
        component: Database,
    },
    {
        value: 'network',
        label: 'Jaringan',
        component: Network,
    },
    {
        value: 'wifi',
        label: 'WiFi / Internet',
        component: Wifi,
    },
    {
        value: 'hard-drive',
        label: 'Storage',
        component: HardDrive,
    },
    {
        value: 'package',
        label: 'Inventaris',
        component: Package,
    },
    {
        value: 'package-check',
        label: 'Barang / Inventaris',
        component: PackageCheck,
    },
    {
        value: 'wallet',
        label: 'Keuangan',
        component: Wallet,
    },
    {
        value: 'banknote',
        label: 'Keuangan / Pembayaran',
        component: Banknote,
    },
    {
        value: 'credit-card',
        label: 'Pembayaran',
        component: CreditCard,
    },
    {
        value: 'receipt',
        label: 'Transaksi',
        component: Receipt,
    },
    {
        value: 'calculator',
        label: 'Kalkulator',
        component: Calculator,
    },
    {
        value: 'calendar',
        label: 'Kalender',
        component: Calendar,
    },
    {
        value: 'calendar-days',
        label: 'Kalender Akademik',
        component: CalendarDays,
    },
    {
        value: 'calendar-check',
        label: 'Jadwal / Presensi',
        component: CalendarCheck,
    },
    {
        value: 'calendar-clock',
        label: 'Jadwal / Waktu',
        component: CalendarClock,
    },
    {
        value: 'clock',
        label: 'Jam / Waktu',
        component: Clock,
    },
    {
        value: 'clipboard',
        label: 'Clipboard',
        component: Clipboard,
    },
    {
        value: 'clipboard-check',
        label: 'Verifikasi',
        component: ClipboardCheck,
    },
    {
        value: 'clipboard-list',
        label: 'Daftar',
        component: ClipboardList,
    },
    {
        value: 'file-text',
        label: 'Dokumen',
        component: FileText,
    },
    {
        value: 'file',
        label: 'File',
        component: File,
    },
    {
        value: 'file-check',
        label: 'Dokumen Terverifikasi',
        component: FileCheck,
    },
    {
        value: 'file-clock',
        label: 'Dokumen / Riwayat',
        component: FileClock,
    },
    {
        value: 'file-spreadsheet',
        label: 'Spreadsheet',
        component: FileSpreadsheet,
    },
    {
        value: 'file-code',
        label: 'Kode / Pemrograman',
        component: FileCode,
    },
    {
        value: 'file-image',
        label: 'File Gambar',
        component: FileImage,
    },
    {
        value: 'file-archive',
        label: 'File Arsip',
        component: FileArchive,
    },
    {
        value: 'folder',
        label: 'Folder',
        component: Folder,
    },
    {
        value: 'folder-open',
        label: 'Folder Terbuka',
        component: FolderOpen,
    },
    {
        value: 'archive',
        label: 'Arsip',
        component: Archive,
    },
    {
        value: 'archive-restore',
        label: 'Arsip / Restore',
        component: ArchiveRestore,
    },
    {
        value: 'printer',
        label: 'Printer',
        component: Printer,
    },
    {
        value: 'qr-code',
        label: 'QR Code',
        component: QrCode,
    },
    {
        value: 'mail',
        label: 'Email',
        component: Mail,
    },
    {
        value: 'send',
        label: 'Kirim',
        component: Send,
    },
    {
        value: 'inbox',
        label: 'Inbox',
        component: Inbox,
    },
    {
        value: 'message-square',
        label: 'Pesan',
        component: MessageSquare,
    },
    {
        value: 'megaphone',
        label: 'Pengumuman',
        component: Megaphone,
    },
    {
        value: 'newspaper',
        label: 'Berita',
        component: Newspaper,
    },
    {
        value: 'phone',
        label: 'Telepon',
        component: Phone,
    },
    {
        value: 'headphones',
        label: 'Support',
        component: Headphones,
    },
    {
        value: 'heart-pulse',
        label: 'Kesehatan',
        component: HeartPulse,
    },
    {
        value: 'stethoscope',
        label: 'Klinik / Kesehatan',
        component: Stethoscope,
    },
    {
        value: 'presentation',
        label: 'Presentasi',
        component: Presentation,
    },
    {
        value: 'image',
        label: 'Galeri / Foto',
        component: Image,
    },
    {
        value: 'cloud',
        label: 'Cloud',
        component: Cloud,
    },
    {
        value: 'cloud-upload',
        label: 'Upload Cloud',
        component: CloudUpload,
    },
    {
        value: 'cloud-download',
        label: 'Download Cloud',
        component: CloudDownload,
    },
    {
        value: 'upload',
        label: 'Upload',
        component: Upload,
    },
    {
        value: 'download',
        label: 'Download',
        component: Download,
    },
    {
        value: 'link',
        label: 'Link',
        component: Link,
    },
    {
        value: 'search',
        label: 'Pencarian',
        component: Search,
    },
    {
        value: 'bar-chart-3',
        label: 'Statistik',
        component: BarChart3,
    },
    {
        value: 'pie-chart',
        label: 'Grafik',
        component: PieChart,
    },
    {
        value: 'trending-up',
        label: 'Perkembangan',
        component: TrendingUp,
    },
    {
        value: 'activity',
        label: 'Aktivitas',
        component: Activity,
    },
    {
        value: 'award',
        label: 'Prestasi',
        component: Award,
    },
    {
        value: 'star',
        label: 'Favorit / Unggulan',
        component: Star,
    },
    {
        value: 'target',
        label: 'Target',
        component: Target,
    },
    {
        value: 'rocket',
        label: 'Program / Launch',
        component: Rocket,
    },
    {
        value: 'shield',
        label: 'Keamanan',
        component: Shield,
    },
    {
        value: 'shield-check',
        label: 'Keamanan Terverifikasi',
        component: ShieldCheck,
    },
    {
        value: 'key-round',
        label: 'Akses / Key',
        component: KeyRound,
    },
    {
        value: 'lock',
        label: 'Lock / Privasi',
        component: Lock,
    },
    {
        value: 'settings',
        label: 'Pengaturan',
        component: Settings,
    },
    {
        value: 'cog',
        label: 'Konfigurasi',
        component: Cog,
    },
    {
        value: 'wrench',
        label: 'Maintenance',
        component: Wrench,
    },
    {
        value: 'code-2',
        label: 'Pemrograman',
        component: Code2,
    },
    {
        value: 'terminal',
        label: 'Terminal',
        component: Terminal,
    },
    {
        value: 'tag',
        label: 'Tag',
        component: Tag,
    },
    {
        value: 'ticket',
        label: 'Tiket',
        component: Ticket,
    },
    {
        value: 'contact',
        label: 'Kontak',
        component: Contact,
    },
    {
        value: 'map-pin',
        label: 'Lokasi',
        component: MapPin,
    },
    {
        value: 'bell',
        label: 'Notifikasi',
        component: Bell,
    },
    {
        value: 'refresh-cw',
        label: 'Refresh / Sinkronisasi',
        component: RefreshCw,
    },
    {
        value: 'grid-2x2',
        label: 'Aplikasi Umum',
        component: Grid2X2,
    },
]

const getIconOption = (value) => {
    return (
        iconOptions.find(
            icon => icon.value === value
        ) ||
        iconOptions.find(
            icon =>
                icon.value === 'grid-2x2'
        )
    )
}

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

const closeMessages = () => {
    errorMessage.value = ''
    successMessage.value = ''
}

const resetForm = () => {
    form.value = {
        id: null,
        name: '',
        code: '',
        description: '',
        url: '',
        icon: '',
        sort_order: 0,
        is_active: true,
    }
}

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

    dataTable = new window.DataTable(
        table.value,
        {
            processing: false,
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
                url: '/admin/applications/data',
                type: 'GET',

                beforeSend: function () {
                    skeletonLoading.value = true
                },

                dataSrc: function (json) {
                    skeletonLoading.value = false

                    return Array.isArray(
                        json?.data
                    )
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

            columns: [
                {
                    data: null,
                    name: 'name',

                    render: function (
                        data,
                        type,
                        row
                    ) {
                        const name =
                            row.name || '-'

                        const description =
                            row.description || ''

                        const iconOption =
                            iconOptions.find(
                                icon =>
                                    icon.value ===
                                    row.icon
                            )

                        const initial =
                            name
                                .charAt(0)
                                .toUpperCase()

                        if (
                            type !== 'display'
                        ) {
                            return name
                        }

                        return `
                            <div class="flex min-w-0 items-center gap-3">
                                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-sm font-semibold text-gray-700">
                                    <span class="application-icon-placeholder">
                                        ${initial}
                                    </span>
                                </div>

                                <div class="min-w-0">
                                    <div class="truncate font-medium text-gray-900">
                                        ${name}
                                    </div>

                                    ${
                                        description
                                            ? `
                                                <div class="mt-0.5 max-w-[320px] truncate text-xs text-gray-500">
                                                    ${description}
                                                </div>
                                            `
                                            : ''
                                    }
                                </div>
                            </div>
                        `
                    },
                },

                {
                    data: 'code',
                    name: 'code',

                    render: function (
                        data,
                        type
                    ) {
                        if (
                            type !== 'display'
                        ) {
                            return data || ''
                        }

                        return `
                            <span class="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                                ${data || '-'}
                            </span>
                        `
                    },
                },

                {
                    data: 'url',
                    name: 'url',

                    render: function (
                        data,
                        type
                    ) {
                        if (
                            type !== 'display'
                        ) {
                            return data || ''
                        }

                        return `
                            <a
                                href="${data || '#'}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex max-w-[280px] truncate text-sm text-gray-500 transition hover:text-emerald-600"
                                title="${data || ''}"
                            >
                                ${data || '-'}
                            </a>
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
                            type !== 'display'
                        ) {
                            return data ? 1 : 0
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
                    data: null,
                    orderable: false,
                    searchable: false,

                    render: function (
                        data,
                        type,
                        row
                    ) {
                        if (
                            type !== 'display'
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
                                        <circle cx="12" cy="12" r="10"/>
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
                                        <circle cx="9" cy="7" r="4"/>
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
                                    class="cursor-pointer rounded-lg p-2 ${
                                        row.is_active
                                            ? 'text-orange-500 hover:bg-orange-50 hover:text-orange-700'
                                            : 'text-green-500 hover:bg-green-50 hover:text-green-700'
                                    }"
                                    title="${
                                        row.is_active
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
                                        ${
                                            row.is_active
                                                ? `
                                                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                                                    <path d="M8 9h8"/>
                                                    <path d="M8 13h5"/>
                                                `
                                                : `
                                                    <path d="M9 12l2 2 4-4"/>
                                                    <circle cx="12" cy="12" r="9"/>
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
                searchPlaceholder: 'Cari aplikasi...',
                lengthMenu: '_MENU_',
                info: 'Menampilkan _START_–_END_ dari _TOTAL_ aplikasi',
                infoEmpty: 'Tidak ada aplikasi',
                infoFiltered: '',
                zeroRecords: 'Aplikasi tidak ditemukan',
                emptyTable: 'Belum ada data aplikasi',

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

            initComplete: function () {
                skeletonLoading.value = false
            },

            drawCallback: function () {
                skeletonLoading.value = false
            },
        }
    )

    table.value.addEventListener(
        'click',
        handleTableClick
    )
}

const handleTableClick = async (event) => {
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
        await editApplication(id)
        return
    }

    if (action === 'status') {
        const status =
            button.dataset.status === '1'

        openConfirmModal(
            id,
            status
                ? 'Nonaktifkan Aplikasi'
                : 'Aktifkan Aplikasi',
            status
                ? 'Apakah Anda yakin ingin menonaktifkan aplikasi ini?'
                : 'Apakah Anda yakin ingin mengaktifkan aplikasi ini?',
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
            'Hapus Aplikasi',
            'Apakah Anda yakin ingin menghapus aplikasi ini?',
            'Hapus',
            'delete',
            false
        )
    }
}

const showDetail = async (id) => {
    closeMessages()

    showDetailModal.value = true
    loadingDetail.value = true
    applicationDetail.value = null

    try {
        const response =
            await axios.get(
                `/admin/applications/${id}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            )

        applicationDetail.value =
            response.data?.data ||
            null
    } catch (error) {
        showDetailModal.value = false

        errorMessage.value =
            error.response?.data?.message ||
            'Detail aplikasi gagal dimuat.'
    } finally {
        loadingDetail.value = false
    }
}

const addApplication = () => {
    closeMessages()

    formMode.value = 'create'

    resetForm()

    showFormModal.value = true
}

const editApplication = async (id) => {
    closeMessages()

    formMode.value = 'edit'
    loadingForm.value = true

    showFormModal.value = true

    try {
        const response =
            await axios.get(
                `/admin/applications/${id}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            )

        const application =
            response.data?.data ||
            null

        if (!application) {
            throw new Error(
                'Data aplikasi tidak ditemukan.'
            )
        }

        form.value = {
            id: application.id,
            name: application.name || '',
            code: application.code || '',
            description:
                application.description || '',
            url: application.url || '',
            icon: application.icon || '',
            sort_order:
                application.sort_order ?? 0,
            is_active:
                application.is_active ?? true,
        }
    } catch (error) {
        showFormModal.value = false

        errorMessage.value =
            error.response?.data?.message ||
            error.message ||
            'Data aplikasi gagal dimuat.'
    } finally {
        loadingForm.value = false
    }
}

const closeFormModal = (force = false) => {
    if (loadingForm.value && !force) {
        return
    }

    showFormModal.value = false
    resetForm()
}
const saveApplication = async () => {
    loadingForm.value = true

    closeMessages()

    try {
        const payload = {
            name: form.value.name,
            code: form.value.code,
            description:
                form.value.description || null,
            url: form.value.url,
            icon: form.value.icon || null,
            sort_order:
                Number(form.value.sort_order) || 0,
            is_active:
                Boolean(form.value.is_active),
        }

        let response

        if (
            formMode.value === 'edit' &&
            form.value.id
        ) {
            response =
                await axios.put(
                    `/admin/applications/${form.value.id}`,
                    payload,
                    {
                        headers: {
                            Accept:
                                'application/json',
                            'X-Requested-With':
                                'XMLHttpRequest',
                        },
                    }
                )
        } else {
            response =
                await axios.post(
                    '/admin/applications',
                    payload,
                    {
                        headers: {
                            Accept:
                                'application/json',
                            'X-Requested-With':
                                'XMLHttpRequest',
                        },
                    }
                )
        }

        successMessage.value =
            response.data?.message ||
            'Aplikasi berhasil disimpan.'

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
        showFormModal.value = false
        resetForm()

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
                      'Data aplikasi belum valid.'
        } else {
            errorMessage.value =
                error.response?.data
                    ?.message ||
                'Aplikasi gagal disimpan.'
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } finally {
        loadingForm.value = false
    }
}

const openConfirmModal = (
    id,
    title,
    message,
    actionText,
    actionType,
    currentStatus
) => {
    closeMessages()

    confirmApplicationId.value = id
    confirmTitle.value = title
    confirmMessage.value = message
    confirmActionText.value = actionText
    confirmActionType.value = actionType
    confirmCurrentStatus.value =
        currentStatus

    showConfirmModal.value = true
}

const closeConfirmModal = (force = false) => {
    if (confirmLoading.value && !force) {
        return
    }

    showConfirmModal.value = false
    confirmApplicationId.value = null
    confirmTitle.value = ''
    confirmMessage.value = ''
    confirmActionText.value = ''
    confirmActionType.value = ''
    confirmCurrentStatus.value = false
}

const executeConfirmAction = async () => {
    if (
        !confirmApplicationId.value
    ) {
        return
    }

    confirmLoading.value = true

    try {
        if (
            confirmActionType.value ===
            'delete'
        ) {
            await axios.delete(
                `/admin/applications/${confirmApplicationId.value}`,
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
                'Aplikasi berhasil dihapus.'
        }

        if (
            confirmActionType.value ===
            'status'
        ) {
            await axios.patch(
                `/admin/applications/${confirmApplicationId.value}/status`,
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
                !confirmCurrentStatus.value
                    ? 'Aplikasi berhasil diaktifkan.'
                    : 'Aplikasi berhasil dinonaktifkan.'
        }

        closeConfirmModal(true)

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
        showConfirmModal.value = false
        confirmApplicationId.value = null
        confirmTitle.value = ''
        confirmMessage.value = ''
        confirmActionText.value = ''
        confirmActionType.value = ''
        confirmCurrentStatus.value = false

        errorMessage.value =
            error.response?.data
                ?.message ||
            'Aksi gagal dilakukan.'
    } finally {
        confirmLoading.value = false
    }
}

const closeDetailModal = () => {
    if (loadingDetail.value) {
        return
    }

    showDetailModal.value = false
    applicationDetail.value = null
}

const normalizeGroupPath = (
    path
) => {
    return String(path || '')
        .trim()
        .toLowerCase()
}

const flattenGroups = (
    groups,
    result = []
) => {
    if (!Array.isArray(groups)) {
        return result
    }

    groups.forEach(group => {
        if (!group) {
            return
        }

        const path =
            String(
                group.path || ''
            ).trim()

        const name =
            String(
                group.name || ''
            ).trim()

        if (
            path !== ''
            && name !== ''
        ) {
            result.push({
                id:
                    group.id ??
                    path,
                name,
                path,
                level:
                    getGroupLevel(path),
            })
        }

        const children =
            group.subGroups ??
            group.subgroups ??
            group.children ??
            []

        if (
            Array.isArray(children)
            && children.length
        ) {
            flattenGroups(
                children,
                result
            )
        }
    })

    return result
}

const loadAvailableGroups = async () => {
    loadingGroups.value = true

    try {
        const response =
            await axios.get(
                '/admin/applications/groups',
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
        showGroupsModal.value = false
        groupApplication.value = null
        selectedGroups.value = []
        availableGroups.value = []

        errorMessage.value =
            error.response?.data
                ?.message ||
            'Group Keycloak gagal dimuat.'
    } finally {
        loadingGroups.value = false
    }
}

const loadApplicationGroups = async (
    id
) => {
    const response =
        await axios.get(
            `/admin/applications/${id}/groups`,
            {
                headers: {
                    Accept:
                        'application/json',
                    'X-Requested-With':
                        'XMLHttpRequest',
                },
            }
        )

    selectedGroups.value =
        Array.isArray(
            response.data?.data
        )
            ? response.data.data
                .map(group =>
                    normalizeGroupPath(
                        group.group_name
                    )
                )
                .filter(Boolean)
            : []
}

const openGroupsModal = async (
    id
) => {
    closeMessages()

    groupApplication.value = null
    selectedGroups.value = []
    availableGroups.value = []

    showGroupsModal.value = true

    try {
        const applicationResponse =
            await axios.get(
                `/admin/applications/${id}`,
                {
                    headers: {
                        Accept:
                            'application/json',
                        'X-Requested-With':
                            'XMLHttpRequest',
                    },
                }
            )

        groupApplication.value =
            applicationResponse.data
                ?.data || null

        await Promise.all([
            loadAvailableGroups(),
            loadApplicationGroups(id),
        ])
    } catch (error) {
        showGroupsModal.value = false

        errorMessage.value =
            error.response?.data
                ?.message ||
            'Data group aplikasi gagal dimuat.'
    }
}

const closeGroupsModal = () => {
    showGroupsModal.value = false
    groupApplication.value = null
    selectedGroups.value = []
    availableGroups.value = []
}

const toggleGroup = (path) => {
    const normalizedPath =
        normalizeGroupPath(path)

    if (!normalizedPath) {
        return
    }

    if (
        selectedGroups.value.includes(
            normalizedPath
        )
    ) {
        selectedGroups.value =
            selectedGroups.value.filter(
                group =>
                    normalizeGroupPath(
                        group
                    ) !==
                    normalizedPath
            )

        return
    }

    selectedGroups.value = [
        ...selectedGroups.value,
        normalizedPath,
    ]
}

const selectAllGroups = () => {
    selectedGroups.value =
        availableGroups.value
            .map(group =>
                normalizeGroupPath(
                    group.path
                )
            )
            .filter(Boolean)
}

const clearAllGroups = () => {
    selectedGroups.value = []
}

const saveApplicationGroups =
    async () => {
        if (
            !groupApplication.value?.id
        ) {
            return
        }

        savingGroups.value = true

        try {
            const response =
                await axios.put(
                    `/admin/applications/${groupApplication.value.id}/groups`,
                    {
                        groups:
                            selectedGroups.value,
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
                response.data?.message ||
                'Group aplikasi berhasil diperbarui.'

            showGroupsModal.value = false
            groupApplication.value = null
            selectedGroups.value = []
            availableGroups.value = []

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        } catch (error) {
            showGroupsModal.value = false
            groupApplication.value = null
            selectedGroups.value = []
            availableGroups.value = []

            errorMessage.value =
                error.response?.data
                    ?.message ||
                'Group aplikasi gagal diperbarui.'
        } finally {
            savingGroups.value = false
        }
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
    <Head title="Applications" />

    <DashboardLayout>
        <div
            class="w-full min-w-0 space-y-6"
        >
            <div
                v-if="successMessage"
                class="flex items-start justify-between gap-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
                <div
                    class="flex items-start gap-3"
                >
                    <svg
                        class="mt-0.5 h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            d="M20 6 9 17l-5-5"
                        />
                    </svg>

                    <span>
                        {{ successMessage }}
                    </span>
                </div>

                <button
                    type="button"
                    class="cursor-pointer text-green-500 hover:text-green-700"
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
                <div
                    class="flex items-start gap-3"
                >
                    <svg
                        class="mt-0.5 h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                        />
                        <path
                            d="M12 8v4"
                        />
                        <path
                            d="M12 16h.01"
                        />
                    </svg>

                    <span>
                        {{ errorMessage }}
                    </span>
                </div>

                <button
                    type="button"
                    class="cursor-pointer text-red-500 hover:text-red-700"
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
                        class="text-xl font-semibold text-gray-800"
                    >
                        Applications
                    </h1>

                    <p
                        class="mt-1 text-sm text-gray-500"
                    >
                        Kelola aplikasi yang tersedia di portal.
                    </p>
                </div>

                <button
                    type="button"
                    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    @click="
                        addApplication
                    "
                >
                    <svg
                        class="h-4 w-4"
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

                    Tambah Aplikasi
                </button>
            </div>

            <div
                class="w-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
                <div
                    class="w-full min-w-0 px-4 py-4 sm:px-6"
                >
                    <div
                        class="applications-table-wrapper relative w-full min-w-0"
                    >
                        <table
                            ref="table"
                            id="applications-table"
                            class="w-full"
                        >
                            <thead>
                                <tr>
                                    <th>
                                        Aplikasi
                                    </th>

                                    <th>
                                        Code
                                    </th>

                                    <th>
                                        URL
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

                        <div
                            v-if="
                                skeletonLoading
                            "
                            class="pointer-events-none absolute inset-0 top-[44px] z-30 min-h-[520px] overflow-hidden bg-white/95"
                        >
                            <div
                                class="absolute inset-x-0 top-4 z-20 flex items-center justify-center"
                            >
                                <div
                                    class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 shadow-sm"
                                >
                                    <span
                                        class="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700"
                                    ></span>

                                    Memuat data...
                                </div>
                            </div>

                            <div
                                v-for="row in 8"
                                :key="row"
                                class="h-[68px] border-b border-gray-100 px-4"
                            >
                                <div
                                    class="flex h-full items-center gap-4"
                                >
                                    <div
                                        class="flex min-w-0 flex-[2] items-center gap-3"
                                    >
                                        <div
                                            class="skeleton-shimmer h-10 w-10 shrink-0 rounded-lg"
                                        ></div>

                                        <div
                                            class="min-w-0 flex-1 space-y-2"
                                        >
                                            <div
                                                class="skeleton-shimmer h-3.5 w-36 rounded"
                                            ></div>

                                            <div
                                                class="skeleton-shimmer h-3 w-28 rounded"
                                            ></div>
                                        </div>
                                    </div>

                                    <div
                                        class="hidden flex-1 md:block"
                                    >
                                        <div
                                            class="skeleton-shimmer h-3.5 w-20 rounded"
                                        ></div>
                                    </div>

                                    <div
                                        class="hidden flex-[1.5] lg:block"
                                    >
                                        <div
                                            class="skeleton-shimmer h-3.5 w-48 rounded"
                                        ></div>
                                    </div>

                                    <div
                                        class="hidden w-[100px] sm:block"
                                    >
                                        <div
                                            class="skeleton-shimmer h-6 w-16 rounded-full"
                                        ></div>
                                    </div>

                                    <div
                                        class="flex w-[190px] shrink-0 justify-end gap-1"
                                    >
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

            <div
                v-if="showFormModal"
                class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeFormModal
                "
            >
                <div
                    class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
                >
                    <div
                        class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
                    >
                        <div>
                            <h2
                                class="text-lg font-semibold text-gray-900"
                            >
                                {{
                                    formMode ===
                                    'edit'
                                        ? 'Edit Aplikasi'
                                        : 'Tambah Aplikasi'
                                }}
                            </h2>

                            <p
                                class="mt-1 text-sm text-gray-500"
                            >
                                {{
                                    formMode ===
                                    'edit'
                                        ? 'Perbarui informasi aplikasi.'
                                        : 'Tambahkan aplikasi baru ke portal.'
                                }}
                            </p>
                        </div>

                        <button
                            type="button"
                            class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            @click="
                                closeFormModal
                            "
                        >
                            <svg
                                class="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M18 6 6 18"
                                />
                                <path
                                    d="m6 6 12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        class="min-h-0 flex-1 overflow-y-auto px-6 py-5"
                    >
                        <div
                            v-if="loadingForm"
                            class="space-y-5"
                        >
                            <div
                                v-for="item in 6"
                                :key="item"
                                class="space-y-2"
                            >
                                <div
                                    class="skeleton-shimmer h-3.5 w-24 rounded"
                                ></div>

                                <div
                                    class="skeleton-shimmer h-10 w-full rounded-lg"
                                ></div>
                            </div>
                        </div>

                        <form
                            v-else
                            class="space-y-5"
                            @submit.prevent="
                                saveApplication
                            "
                        >
                            <div
                                class="grid grid-cols-1 gap-5 md:grid-cols-2"
                            >
                                <div>
                                    <label
                                        class="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Nama Aplikasi
                                    </label>

                                    <input
                                        v-model="
                                            form.name
                                        "
                                        type="text"
                                        required
                                        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                        placeholder="Contoh: Sistem Akademik"
                                    />
                                </div>

                                <div>
                                    <label
                                        class="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Code
                                    </label>

                                    <input
                                        v-model="
                                            form.code
                                        "
                                        type="text"
                                        required
                                        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                        placeholder="Contoh: siakad"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    Deskripsi
                                </label>

                                <textarea
                                    v-model="
                                        form.description
                                    "
                                    rows="3"
                                    class="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                    placeholder="Deskripsi aplikasi"
                                ></textarea>
                            </div>

                            <div>
                                <label
                                    class="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    URL
                                </label>

                                <input
                                    v-model="
                                        form.url
                                    "
                                    type="url"
                                    required
                                    class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                    placeholder="https://..."
                                />
                            </div>

                            <div
                                class="grid grid-cols-1 gap-5 md:grid-cols-2"
                            >
                                <div>
                                    <label
                                        class="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Icon
                                    </label>

                                    <select
                                        v-model="
                                            form.icon
                                        "
                                        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                    >
                                        <option
                                            value=""
                                        >
                                            Pilih Icon
                                        </option>

                                        <option
                                            v-for="icon in iconOptions"
                                            :key="
                                                icon.value
                                            "
                                            :value="
                                                icon.value
                                            "
                                        >
                                            {{
                                                icon.label
                                            }}
                                        </option>
                                    </select>

                                    <div
                                        class="mt-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3"
                                    >
                                        <div
                                            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm"
                                        >
                                            <component
                                                :is="
                                                    getIconOption(
                                                        form.icon
                                                    )?.component
                                                "
                                                class="h-5 w-5"
                                                :stroke-width="
                                                    1.8
                                                "
                                            />
                                        </div>

                                        <div
                                            class="min-w-0"
                                        >
                                            <div
                                                class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                            >
                                                Preview Icon
                                            </div>

                                            <div
                                                class="mt-0.5 truncate text-sm font-medium text-gray-800"
                                            >
                                                {{
                                                    getIconOption(
                                                        form.icon
                                                    )?.label ||
                                                    'Aplikasi Umum'
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        class="mb-1.5 block text-sm font-medium text-gray-700"
                                    >
                                        Urutan
                                    </label>

                                    <input
                                        v-model.number="
                                            form.sort_order
                                        "
                                        type="number"
                                        min="0"
                                        class="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                                    />
                                </div>
                            </div>

                            <label
                                class="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                            >
                                <input
                                    v-model="
                                        form.is_active
                                    "
                                    type="checkbox"
                                    class="h-4 w-4 cursor-pointer rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                                />

                                <div>
                                    <div
                                        class="text-sm font-medium text-gray-800"
                                    >
                                        Aplikasi Aktif
                                    </div>

                                    <div
                                        class="mt-0.5 text-xs text-gray-500"
                                    >
                                        Aplikasi dapat ditampilkan di portal.
                                    </div>
                                </div>
                            </label>

                            <div
                                class="flex justify-end gap-2 border-t border-gray-200 pt-5"
                            >
                                <button
                                    type="button"
                                    :disabled="
                                        loadingForm
                                    "
                                    class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    @click="
                                        closeFormModal
                                    "
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    :disabled="
                                        loadingForm
                                    "
                                    class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span
                                        v-if="
                                            loadingForm
                                        "
                                        class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                    ></span>

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

            <div
                v-if="showConfirmModal"
                class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeConfirmModal
                "
            >
                <div
                    class="w-full max-w-md rounded-xl bg-white shadow-2xl"
                >
                    <div class="p-6">
                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100"
                        >
                            <svg
                                class="h-5 w-5 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M12 9v4"
                                />
                                <path
                                    d="M12 17h.01"
                                />
                                <path
                                    d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"
                                />
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

                        <div
                            class="mt-6 flex justify-end gap-2"
                        >
                            <button
                                type="button"
                                :disabled="
                                    confirmLoading
                                "
                                class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                @click="
                                    closeConfirmModal
                                "
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                :disabled="
                                    confirmLoading
                                "
                                class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
            </div>

            <div
                v-if="showDetailModal"
                class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeDetailModal
                "
            >
                <div
                    class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
                >
                    <div
                        class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
                    >
                        <div>
                            <h2
                                class="text-lg font-semibold text-gray-900"
                            >
                                Detail Aplikasi
                            </h2>

                            <p
                                class="mt-1 text-sm text-gray-500"
                            >
                                Informasi aplikasi.
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
                                class="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M18 6 6 18"
                                />
                                <path
                                    d="m6 6 12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        class="min-h-0 flex-1 overflow-y-auto px-6 py-5"
                    >
                        <div
                            v-if="loadingDetail"
                            class="space-y-5"
                        >
                            <div
                                class="flex items-center gap-4"
                            >
                                <div
                                    class="skeleton-shimmer h-14 w-14 rounded-xl"
                                ></div>

                                <div
                                    class="flex-1 space-y-2"
                                >
                                    <div
                                        class="skeleton-shimmer h-4 w-48 rounded"
                                    ></div>

                                    <div
                                        class="skeleton-shimmer h-3 w-32 rounded"
                                    ></div>
                                </div>
                            </div>

                            <div
                                v-for="item in 6"
                                :key="item"
                                class="space-y-2"
                            >
                                <div
                                    class="skeleton-shimmer h-3 w-24 rounded"
                                ></div>

                                <div
                                    class="skeleton-shimmer h-10 w-full rounded-lg"
                                ></div>
                            </div>
                        </div>

                        <div
                            v-else-if="
                                applicationDetail
                            "
                            class="space-y-6"
                        >
                            <div
                                class="flex items-center gap-4 border-b border-gray-200 pb-5"
                            >
                                <div
                                    class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-700"
                                >
                                    <component
                                        :is="
                                            getIconOption(
                                                applicationDetail.icon
                                            )?.component
                                        "
                                        class="h-7 w-7"
                                        :stroke-width="
                                            1.8
                                        "
                                    />
                                </div>

                                <div
                                    class="min-w-0"
                                >
                                    <h3
                                        class="truncate text-lg font-semibold text-gray-900"
                                    >
                                        {{
                                            applicationDetail.name
                                        }}
                                    </h3>

                                    <p
                                        class="mt-1 text-sm text-gray-500"
                                    >
                                        {{
                                            applicationDetail.code
                                        }}
                                    </p>
                                </div>
                            </div>

                            <div
                                class="grid grid-cols-1 gap-5 sm:grid-cols-2"
                            >
                                <div>
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Nama
                                    </div>

                                    <div
                                        class="mt-1 text-sm text-gray-800"
                                    >
                                        {{
                                            applicationDetail.name ||
                                            '-'
                                        }}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Code
                                    </div>

                                    <div
                                        class="mt-1 text-sm text-gray-800"
                                    >
                                        {{
                                            applicationDetail.code ||
                                            '-'
                                        }}
                                    </div>
                                </div>

                                <div
                                    class="sm:col-span-2"
                                >
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        URL
                                    </div>

                                    <a
                                        :href="
                                            applicationDetail.url
                                        "
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mt-1 block break-all text-sm text-emerald-600 hover:underline"
                                    >
                                        {{
                                            applicationDetail.url ||
                                            '-'
                                        }}
                                    </a>
                                </div>

                                <div
                                    class="sm:col-span-2"
                                >
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Deskripsi
                                    </div>

                                    <div
                                        class="mt-1 text-sm leading-6 text-gray-700"
                                    >
                                        {{
                                            applicationDetail.description ||
                                            '-'
                                        }}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Icon
                                    </div>

                                    <div
                                        class="mt-2 inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700"
                                    >
                                        <component
                                            :is="
                                                getIconOption(
                                                    applicationDetail.icon
                                                )?.component
                                            "
                                            class="h-5 w-5"
                                            :stroke-width="
                                                1.8
                                            "
                                        />

                                        {{
                                            getIconOption(
                                                applicationDetail.icon
                                            )?.label ||
                                            'Aplikasi Umum'
                                        }}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Status
                                    </div>

                                    <div
                                        class="mt-2"
                                    >
                                        <span
                                            v-if="
                                                applicationDetail.is_active
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
                                            class="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                                        >
                                            <span
                                                class="h-1.5 w-1.5 rounded-full bg-gray-400"
                                            ></span>
                                            Nonaktif
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Urutan
                                    </div>

                                    <div
                                        class="mt-1 text-sm text-gray-800"
                                    >
                                        {{
                                            applicationDetail.sort_order ??
                                            0
                                        }}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        class="text-xs font-medium uppercase tracking-wide text-gray-400"
                                    >
                                        Dibuat
                                    </div>

                                    <div
                                        class="mt-1 text-sm text-gray-800"
                                    >
                                        {{
                                            applicationDetail.created_at ||
                                            '-'
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            v-else
                            class="py-10 text-center text-sm text-gray-500"
                        >
                            Data aplikasi tidak ditemukan.
                        </div>
                    </div>

                    <div
                        class="flex justify-end border-t border-gray-200 px-6 py-4"
                    >
                        <button
                            type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            @click="
                                closeDetailModal
                            "
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            <!-- GROUP MODAL -->
            <div
                v-if="showGroupsModal"
                class="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 p-4"
                @click.self="
                    closeGroupsModal
                "
            >
                <div
                    class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
                >
                    <div
                        class="flex items-center justify-between border-b border-gray-200 px-6 py-4"
                    >
                        <div>
                            <h2
                                class="text-lg font-semibold text-gray-900"
                            >
                                Group Akses Aplikasi
                            </h2>

                            <p
                                class="mt-1 text-sm text-gray-500"
                            >
                                Tentukan group Keycloak yang dapat mengakses aplikasi.
                            </p>
                        </div>

                        <button
                            type="button"
                            class="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            @click="
                                closeGroupsModal
                            "
                        >
                            <svg
                                class="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M18 6 6 18"
                                />
                                <path
                                    d="m6 6 12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        class="min-h-0 flex-1 overflow-y-auto px-6 py-5"
                    >
                        <div
                            v-if="
                                groupApplication
                            "
                            class="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                        >
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-700 shadow-sm"
                            >
                                <component
                                    :is="
                                        getIconOption(
                                            groupApplication.icon
                                        )?.component
                                    "
                                    class="h-5 w-5"
                                    :stroke-width="
                                        1.8
                                    "
                                />
                            </div>

                            <div
                                class="min-w-0"
                            >
                                <div
                                    class="truncate text-sm font-semibold text-gray-900"
                                >
                                    {{
                                        groupApplication.name
                                    }}
                                </div>

                                <div
                                    class="mt-0.5 text-xs text-gray-500"
                                >
                                    {{
                                        groupApplication.code
                                    }}
                                </div>
                            </div>
                        </div>

                        <div
                            class="mb-4 flex flex-wrap items-center justify-between gap-2"
                        >
                            <div
                                class="text-sm text-gray-600"
                            >
                                <span
                                    class="font-medium text-gray-900"
                                >
                                    {{
                                        selectedGroups.length
                                    }}
                                </span>
                                group dipilih
                            </div>

                            <div
                                class="flex gap-2"
                            >
                                <button
                                    type="button"
                                    class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    @click="
                                        selectAllGroups
                                    "
                                >
                                    Pilih Semua
                                </button>

                                <button
                                    type="button"
                                    class="cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    @click="
                                        clearAllGroups
                                    "
                                >
                                    Hapus Semua
                                </button>
                            </div>
                        </div>

                        <div
                            v-if="
                                loadingGroups
                            "
                            class="space-y-2"
                        >
                            <div
                                v-for="item in 8"
                                :key="item"
                                class="h-12 animate-pulse rounded-lg bg-gray-100"
                            ></div>
                        </div>

                        <div
                            v-else-if="
                                availableGroups.length
                            "
                            class="space-y-2"
                        >
                            <label
                                v-for="group in availableGroups"
                                :key="
                                    group.id
                                "
                                class="flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition"
                                :class="
                                    selectedGroups.includes(
                                        normalizeGroupPath(
                                            group.path
                                        )
                                    )
                                        ? 'border-emerald-300 bg-emerald-50'
                                        : 'border-gray-200 hover:bg-gray-50'
                                "
                                :style="{
                                    paddingLeft:
                                        `${1 + ((group.level || 0) * 1.5)}rem`,
                                }"
                            >
                                <input
                                    type="checkbox"
                                    :checked="
                                        selectedGroups.includes(
                                            normalizeGroupPath(
                                                group.path
                                            )
                                        )
                                    "
                                    class="h-4 w-4 cursor-pointer rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                    @change="
                                        toggleGroup(
                                            group.path
                                        )
                                    "
                                />

                                <div
                                    class="min-w-0 flex-1"
                                >
                                    <div
                                        class="flex items-center gap-2 text-sm font-medium text-gray-900"
                                    >
                                        <span
                                            v-if="
                                                group.level > 0
                                            "
                                            class="text-gray-400"
                                        >
                                            ↳
                                        </span>

                                        {{
                                            group.name
                                        }}
                                    </div>

                                    <div
                                        class="mt-0.5 text-xs text-gray-500"
                                    >
                                        {{
                                            group.path
                                        }}
                                    </div>
                                </div>

                                <UsersRound
                                    class="h-4 w-4 shrink-0 text-gray-400"
                                    :stroke-width="
                                        1.8
                                    "
                                />
                            </label>
                        </div>

                        <div
                            v-else
                            class="rounded-lg border border-gray-200 px-4 py-10 text-center text-sm text-gray-500"
                        >
                            Tidak ada group Keycloak.
                        </div>
                    </div>

                    <div
                        class="flex justify-end gap-2 border-t border-gray-200 px-6 py-4"
                    >
                        <button
                            type="button"
                            class="cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="
                                savingGroups
                            "
                            @click="
                                closeGroupsModal
                            "
                        >
                            Batal
                        </button>

                        <button
                            type="button"
                            class="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            :disabled="
                                savingGroups ||
                                loadingGroups
                            "
                            @click="
                                saveApplicationGroups
                            "
                        >
                            <span
                                v-if="
                                    savingGroups
                                "
                                class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                            ></span>

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
.applications-table-wrapper {
    width: 100% !important;
    min-width: 0 !important;
}

/* DataTables */
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

/* Table */
:deep(#applications-table) {
    display: table !important;

    width: 100% !important;
    min-width: 100% !important;
    max-width: none !important;

    margin: 0 !important;

    border-collapse: collapse;
}

/* Header */
:deep(#applications-table thead) {
    width: 100% !important;
}

:deep(#applications-table thead tr) {
    width: 100% !important;
}

:deep(#applications-table thead th) {
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

/* Body */
:deep(#applications-table tbody) {
    width: 100% !important;
}

:deep(#applications-table tbody tr) {
    width: 100% !important;

    transition:
        background-color 0.15s ease;
}

:deep(#applications-table tbody tr:hover) {
    background: #fafafa;
}

:deep(#applications-table tbody td) {
    border-bottom: 1px solid #f3f4f6;

    padding: 0.85rem 1rem;

    vertical-align: middle;

    font-size: 0.875rem;
}

:deep(#applications-table tbody tr:last-child td) {
    border-bottom: 0;
}

/* Empty state */
:deep(#applications-table tbody tr.dt-empty) {
    width: 100% !important;
}

:deep(#applications-table tbody td.dt-empty) {
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

:deep(#applications-table tbody td[colspan]) {
    width: 100% !important;
    min-width: 100% !important;
}

/* Length */
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

/* Search */
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

/* Info */
:deep(.dt-info) {
    color: #6b7280;

    font-size: 0.8rem;
}

/* Pagination */
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

/* Ordering */
:deep(.dt-orderable-asc),
:deep(.dt-orderable-desc) {
    cursor: pointer;
}

:deep(.dt-column-order) {
    opacity: 0.5;
}

/* Loading */
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

    animation: datatable-spin 0.7s linear infinite;
}

@keyframes datatable-spin {
    to {
        transform: rotate(360deg);
    }
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
        transparent 0%,
        rgb(255 255 255 / 45%) 40%,
        rgb(255 255 255 / 80%) 50%,
        rgb(255 255 255 / 45%) 60%,
        transparent 100%
    );

    animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
    100% {
        transform: translateX(100%);
    }
}

/* Tablet / Mobile */
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

@media (max-width: 640px) {
    :deep(#applications-table thead th),
    :deep(#applications-table tbody td) {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }

    :deep(.dt-paging-button) {
        min-width: 30px;
        height: 30px;
    }
}
</style>