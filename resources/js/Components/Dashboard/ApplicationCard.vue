<script setup>
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

defineProps({
    application: {
        type: Object,
        required: true,
    },
})

const iconMap = {
    'layout-dashboard': LayoutDashboard,
    home: Home,
    'graduation-cap': GraduationCap,
    'book-open': BookOpen,
    book: Book,
    'book-open-check': BookOpenCheck,
    library: Library,
    school: School,

    users: Users,
    'users-round': UsersRound,
    user: User,
    'user-check': UserCheck,
    'user-cog': UserCog,
    'id-card': IdCard,

    briefcase: Briefcase,
    'building-2': Building2,

    monitor: Monitor,
    laptop: Laptop,
    smartphone: Smartphone,
    server: Server,
    database: Database,
    network: Network,
    wifi: Wifi,
    'hard-drive': HardDrive,

    package: Package,
    'package-check': PackageCheck,

    wallet: Wallet,
    banknote: Banknote,
    'credit-card': CreditCard,
    receipt: Receipt,
    calculator: Calculator,

    calendar: Calendar,
    'calendar-days': CalendarDays,
    'calendar-check': CalendarCheck,
    'calendar-clock': CalendarClock,
    clock: Clock,

    clipboard: Clipboard,
    'clipboard-check': ClipboardCheck,
    'clipboard-list': ClipboardList,

    'file-text': FileText,
    file: File,
    'file-check': FileCheck,
    'file-clock': FileClock,
    'file-spreadsheet': FileSpreadsheet,
    'file-code': FileCode,
    'file-image': FileImage,
    'file-archive': FileArchive,

    folder: Folder,
    'folder-open': FolderOpen,
    archive: Archive,
    'archive-restore': ArchiveRestore,

    printer: Printer,
    'qr-code': QrCode,

    mail: Mail,
    send: Send,
    inbox: Inbox,
    'message-square': MessageSquare,
    megaphone: Megaphone,
    newspaper: Newspaper,
    phone: Phone,
    headphones: Headphones,

    'heart-pulse': HeartPulse,
    stethoscope: Stethoscope,

    presentation: Presentation,
    image: Image,

    cloud: Cloud,
    'cloud-upload': CloudUpload,
    'cloud-download': CloudDownload,
    upload: Upload,
    download: Download,

    link: Link,
    search: Search,

    'bar-chart-3': BarChart3,
    'pie-chart': PieChart,
    'trending-up': TrendingUp,
    activity: Activity,

    award: Award,
    star: Star,
    target: Target,
    rocket: Rocket,

    shield: Shield,
    'shield-check': ShieldCheck,
    'key-round': KeyRound,
    lock: Lock,

    settings: Settings,
    cog: Cog,
    wrench: Wrench,

    'code-2': Code2,
    terminal: Terminal,

    tag: Tag,
    ticket: Ticket,
    contact: Contact,
    'map-pin': MapPin,
    bell: Bell,

    'refresh-cw': RefreshCw,

    'grid-2x2': Grid2X2,
}

const getIcon = (icon) => {
    return iconMap[icon] || Grid2X2
}
</script>

<template>
    <a
        :href="application.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
    >
        <div class="flex items-start justify-between">
            <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-700 transition group-hover:bg-emerald-50 group-hover:text-emerald-600"
            >
                <component
                    :is="getIcon(application.icon)"
                    class="h-6 w-6"
                    :stroke-width="1.8"
                />
            </div>

            <svg
                class="h-5 w-5 text-gray-300 transition group-hover:text-emerald-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
            </svg>
        </div>

        <h3
            class="mt-4 text-base font-semibold text-gray-900 transition group-hover:text-emerald-600"
        >
            {{ application.name }}
        </h3>

        <p
            v-if="application.description"
            class="mt-1.5 line-clamp-2 text-sm leading-6 text-gray-500"
        >
            {{ application.description }}
        </p>

        <div
            class="mt-4 text-sm font-medium text-gray-500 transition group-hover:text-emerald-600"
        >
            Buka aplikasi →
        </div>
    </a>
</template>