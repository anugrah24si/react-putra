import { NavLink } from "react-router-dom";
import { FaExclamationTriangle, FaHeadphonesAlt, FaList, FaThLarge } from "react-icons/fa";

/**
 * MenuIcon Component - Menampilkan ikon yang sesuai untuk setiap menu
 * @param {string} menuId - ID dari menu item untuk menentukan ikon yang ditampilkan
 * @returns {JSX.Element} Ikon dari react-icons
 */
function MenuIcon({ menuId }) {
    if (menuId === "dashboard") {
        return <FaThLarge />;
    }

    if (menuId === "orders") {
        return <FaList />;
    }

    if (menuId === "customers") {
        return <FaHeadphonesAlt />;
    }

    return <FaExclamationTriangle />;
}

/**
 * SidebarMenuItem Component - Satu item menu di sidebar untuk navigasi
 * 
 * Menggunakan Link dari React Router untuk navigasi tanpa reload halaman
 * Link menggantikan tag <div> biasa untuk memungkinkan routing
 * 
 * @param {string} id - ID unik dari menu item
 * @param {string} label - Label/teks yang ditampilkan
 * @param {boolean} isActive - Status apakah menu sedang aktif
 * @param {boolean} removable - Apakah menu bisa dihapus
 * @param {function} onClick - Callback saat menu diklik
 * @param {function} onRemove - Callback saat tombol hapus diklik
 */
function SidebarMenuItem({ id, label, to }) {
    /**
     * getMenuPath - Menentukan path URL berdasarkan ID menu
     * Mengembalikan path yang sesuai untuk Link
     */
    return (
        <li>
            <NavLink
                id={id}
                to={to}
                className={({ isActive }) => `sidebar-menu-row${isActive ? " is-active" : ""}`}
            >
                <span className="sidebar-menu-button">
                    <MenuIcon menuId={id} />
                    <span>{label}</span>
                </span>
            </NavLink>
        </li>
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
 */
export default function Sidebar() {
    const menuItems = [
        { id: "dashboard", label: "Dashboard", to: "/" },
        { id: "orders", label: "Orders", to: "/orders" },
        { id: "customers", label: "Customers", to: "/customers" },
        { id: "error-400", label: "Error 400", to: "/errors/400" },
        { id: "error-401", label: "Error 401", to: "/errors/401" },
        { id: "error-403", label: "Error 403", to: "/errors/403" },
    ];

    return (
        <div id="sidebar">
            {/* Logo Section */}
            <div id="sidebar-logo">
                <span id="logo-title">
                    Gacor77 <b id="logo-dot"></b>
                </span>
                <span id="logo-subtitle">Dashboard Admin Gacor77</span>
            </div>

            {/* Menu List Section */}
            <div id="sidebar-menu">
                <ul id="menu-list">
                    {menuItems.map((item) => (
                        <SidebarMenuItem
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            to={item.to}
                        />
                    ))}
                </ul>
            </div>

            {/* Footer Section */}
            <div id="sidebar-footer">
                <div id="footer-card">
                    <div id="footer-text">
                        <span>Selamat datang di panel admin. Gunakan menu untuk melihat data dan simulasi error.</span>
                    </div>
                    <img id="footer-avatar" src="/img/Gacor77.png" alt="Footer avatar" />
                </div>
                <span id="footer-brand">Gacor Restaurant Admin Dashboard</span>
            </div>
        </div>
    );
}
