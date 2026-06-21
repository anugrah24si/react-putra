import { FaTrashAlt } from "react-icons/fa";
import { Logo } from './layout';
import { NavItem, SidebarOverlay } from './navigation';
import { Button } from './ui';
import { DashboardIcon, OrdersIcon, ProductsIcon, StaffIcon, CustomersIcon } from './icons';

/**
 * getMenuIcon - Mengembalikan icon component berdasarkan menu ID
 * 
 * @param {string} menuId - ID menu
 * @returns {ReactNode} Icon component
 */
function getMenuIcon(menuId) {
    const iconMap = {
        'dashboard': <DashboardIcon />,
        'orders': <OrdersIcon />,
        'products': <ProductsIcon />,
        'doctors-and-staff': <StaffIcon />,
        'customers': <CustomersIcon />,
        'users': <CustomersIcon />,
        'bookings': <OrdersIcon />,
        'transactions': <OrdersIcon />,
        'vouchers': <ProductsIcon />,
        'reviews': <StaffIcon />,
        'analytics': <DashboardIcon />
    };
    return iconMap[menuId] || <DashboardIcon />;
}

/**
 * getMenuPath - Menentukan path URL berdasarkan ID menu
 * 
 * @param {string} menuId - ID menu
 * @returns {string} Path URL
 */
function getMenuPath(menuId) {
    const pathMap = {
        'dashboard': '/admin',
        'orders': '/admin/orders',
        'customers': '/admin/customers',
        'products': '/admin/products',
        'doctors-and-staff': '/admin/doctors-and-staff',
        'users': '/admin/users',
        'bookings': '/admin/bookings',
        'transactions': '/admin/transactions',
        'vouchers': '/admin/vouchers',
        'reviews': '/admin/reviews',
        'analytics': '/admin/analytics'
    };
    return pathMap[menuId] || '/admin';
}

/**
 * SidebarFooter Component - Footer card untuk sidebar dengan promo/action
 * 
 * @param {function} onAddMenu - Handler saat tombol Add Menu diklik
 */
function SidebarFooter({ onAddMenu }) {
    return (
        <div className="med-sidebar__footer">
            <div className="med-promo">
                <div className="med-promo__icon" aria-hidden="true">
                    <span />
                    <span />
                </div>
                <div className="med-promo__title">Tambah Menu</div>
                <div className="med-promo__desc">Masih tambah menu biasa saja</div>
                <button type="button" className="med-promo__cta" onClick={onAddMenu}>
                    Tambah Menu
                </button>
            </div>
        </div>
    );
}

/**
 * Sidebar Component - Sidebar utama aplikasi
 * Berisi logo, daftar menu navigasi, dan kartu footer
 * 
 * @param {string} activeSection - Menu yang sedang aktif untuk styling
 * @param {Array} menuItems - Daftar item menu yang akan ditampilkan
 * @param {function} onMenuClick - Callback saat menu diklik
 * @param {function} onAddMenu - Callback saat tombol Add Menu ditekan
 * @param {function} onRemoveMenu - Callback saat menu dihapus
 * @param {boolean} isOpen - Status sidebar terbuka/tertutup (untuk mobile)
 * @param {function} onClose - Callback untuk menutup sidebar (untuk mobile)
 */
export default function Sidebar({ activeSection, menuItems, onMenuClick, onAddMenu, onRemoveMenu, isOpen, onClose }) {
    /**
     * handleMenuClick - Handler saat menu diklik
     * Menutup sidebar di mobile setelah menu diklik
     */
    const handleMenuClick = (id) => {
        onMenuClick(id);
        // Close sidebar on mobile/tablet after clicking menu
        if (window.innerWidth <= 1024 && onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            <SidebarOverlay
                isVisible={isOpen}
                onClick={onClose}
            />

            <aside className={`med-sidebar${isOpen ? ' med-sidebar--open' : ''}`}>
                {/* Logo */}
                <Logo />

                {/* Navigation Menu */}
                <nav className="med-sidebar__navwrap" aria-label="Sidebar navigation">
                    <ul className="med-sidebar__nav med-nav">
                        {menuItems.map((item) => (
                            <NavItem
                                key={item.id}
                                to={getMenuPath(item.id)}
                                label={item.label}
                                icon={getMenuIcon(item.id)}
                                isActive={activeSection === item.id}
                                removable={item.removable}
                                onClick={() => handleMenuClick(item.id)}
                                onRemove={() => onRemoveMenu(item.id)}
                                removeIcon={<FaTrashAlt />}
                            />
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <SidebarFooter onAddMenu={onAddMenu} />
            </aside>
        </>
    );
}
