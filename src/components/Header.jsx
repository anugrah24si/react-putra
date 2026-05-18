import { PageTitle } from './layout';
import { SearchBar, IconButton, Avatar, StatusPill } from './ui';
import { MobileToggle } from './navigation';
import { NotificationIcon, SunIcon, MoonIcon } from './icons';

/**
 * Page labels configuration - Mapping section ke title dan subtitle
 */
const pageLabels = {
    dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Dr. Smith' },
    customers: { title: 'Customers', subtitle: 'Manage your client relationships and history' },
    orders: { title: 'Orders', subtitle: 'Manage appointments and treatments' },
    products: { title: 'Products', subtitle: 'Manage medical products and services' },
    'doctors-and-staff': { title: 'Doctors & Staff', subtitle: 'Manage your medical team and staff members' },
};

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
                <StatusPill status="Online" />

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

                <Avatar initials="DS" size="small" />
            </div>

            {/* Search Bar */}
            <SearchBar
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Search appointments, clients, treatments..."
            />
        </header>
    );
}
