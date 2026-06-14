import { useNavigate } from 'react-router-dom';
import { PageTitle } from './layout';
import { SearchInput, IconButton, Avatar, AvatarImage, AvatarFallback, StatusPill } from './ui';
import { MobileToggle } from './navigation';
import { NotificationIcon, SunIcon, MoonIcon } from './icons';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';

/**
 * Page labels configuration - Mapping section ke title dan subtitle
 */
const pageLabels = {
    dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Dr. Smith' },
    customers: { title: 'Customers', subtitle: 'Manage your client relationships and history' },
    orders: { title: 'Orders', subtitle: 'Manage appointments and treatments' },
    products: { title: 'Products', subtitle: 'Manage medical products and services' },
    'doctors-and-staff': { title: 'Doctors & Staff', subtitle: 'Manage your medical team and staff members' },
    users: { title: 'Users', subtitle: 'Kelola data user — terhubung ke Supabase' },
};

/**
 * getInitials - Mengambil inisial dari nama lengkap (maksimal 2 huruf).
 * Contoh: "Admin MediCare" → "AM"
 */
function getInitials(name) {
    if (!name) return 'US';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const second = parts[1]?.[0] ?? '';
    return (first + second).toUpperCase() || 'US';
}

/**
 * Header Component - Top navigation bar dengan search, notifications, dan user profile
 * 
 * @param {string} searchValue - Nilai search input
 * @param {function} onSearchChange - Handler saat search berubah
 * @param {string} activeSection - Section yang sedang aktif
 * @param {string} theme - Theme saat ini: 'dark' atau 'light'
 * @param {function} onToggleTheme - Handler untuk toggle theme
 * @param {function} onToggleSidebar - Handler untuk toggle sidebar mobile
 * @param {boolean} isSidebarOpen - Status sidebar mobile
 */
export default function Header({
    searchValue,
    onSearchChange,
    activeSection,
    theme,
    onToggleTheme,
    onToggleSidebar,
    isSidebarOpen
}) {
    const meta = pageLabels[activeSection] ?? pageLabels.dashboard;
    const navigate = useNavigate();

    // Data user yang sedang login (untuk avatar & dropdown)
    const user = getCurrentUser();
    const displayName = user?.full_name || 'Dr. Smith';
    const displayEmail = user?.email || 'dr.smith@clinic.com';
    const initials = getInitials(user?.full_name);

    // Handler logout: hapus sesi lalu kembali ke halaman publik
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="med-topbar">
            {/* Mobile Toggle Button */}
            <MobileToggle
                isOpen={isSidebarOpen}
                onToggle={onToggleSidebar}
            />

            {/* Page Title */}
            <PageTitle
                title={meta.title}
                subtitle={meta.subtitle}
            />

            {/* Actions */}
            <div className="med-topbar__actions">
                <StatusPill status="Online" showDot={true} />

                <IconButton
                    icon={<NotificationIcon />}
                    ariaLabel="Notifications"
                />

                <IconButton
                    icon={theme === "dark" ? <SunIcon /> : <MoonIcon />}
                    ariaLabel={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    title={theme === "dark" ? "Light mode" : "Dark mode"}
                    onClick={onToggleTheme}
                />

                {/* User Profile Dropdown Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="cursor-pointer focus:outline-none">
                            <Avatar>
                                <AvatarImage
                                    src={user?.avatar_url || ''}
                                    alt={displayName}
                                    className="grayscale"
                                />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{displayName}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {displayEmail}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Help & Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Search Bar */}
            <SearchInput
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Search appointments, clients, treatments..."
            />
        </header>
    );
}
