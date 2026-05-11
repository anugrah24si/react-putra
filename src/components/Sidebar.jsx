import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function SidebarIcon({ type }) {
    const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" };

    if (type === "dashboard") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M2.5 2.5h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M9.5 2.5h4v3.33h-4V2.5Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M9.5 8.5h4v5h-4v-5Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M2.5 10.5h4v3h-4v-3Z" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "orders") {
        return (
            <svg {...common} aria-hidden="true">
                <rect x="2.5" y="3" width="11" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.33" />
                <path d="M5 1.5v3M11 1.5v3M2.5 6.5h11" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "products") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M5 2.5h5.5L13.5 5v8.5h-8.5v-11Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M10.5 2.5V5h3" stroke="currentColor" strokeWidth="1.33" />
                <path d="M6.5 8h3.5M6.5 10h3.5" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "doctors-and-staff") {
        return (
            <svg {...common} aria-hidden="true">
                <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M2.5 13.5c.75-2.5 2.5-3.5 3.5-3.5s2.75.5 3.5 3.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M10.5 5.5h3M12 4v3" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    return (
        <svg {...common} aria-hidden="true">
            <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.33" />
            <path d="M2.5 13.5c.5-2.67 2.33-4 3.5-4s3 .33 3.5 4" stroke="currentColor" strokeWidth="1.33" />
            <path d="M11 4.5h3M12.5 3v3" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
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
function SidebarMenuItem({ id, label, isActive, removable, onClick, onRemove }) {
    /**
     * getMenuPath - Menentukan path URL berdasarkan ID menu
     * Mengembalikan path yang sesuai untuk Link
     */
    function getMenuPath(menuId) {
        if (menuId === "dashboard") return "/";
        if (menuId === "orders") return "/orders";
        if (menuId === "customers") return "/customers";
        if (menuId === "products") return "/products";
        if (menuId === "doctors-and-staff") return "/doctors-and-staff";
        return "/";
    }

    return (
        <li>
            <Link
                to={getMenuPath(id)}
                className={isActive ? "med-navitem med-navitem--active" : "med-navitem"}
                onClick={() => onClick(id)}
            >
                <span className="med-navitem__left">
                    <span className="med-navicon" aria-hidden="true">
                        <SidebarIcon type={id} />
                    </span>
                    <span className="med-navitem__label">{label}</span>
                </span>
                {removable ? (
                    <button
                        type="button"
                        className="med-navremove"
                        aria-label={`Delete ${label}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove(id);
                        }}
                    >
                        <FaTrashAlt />
                    </button>
                ) : null}
            </Link>
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
export default function Sidebar({ activeSection, menuItems, onMenuClick, onAddMenu, onRemoveMenu }) {
    return (
        <aside className="med-sidebar">
            <div className="med-sidebar__brandrow">
                <div className="med-brandmark" aria-hidden="true">
                    <span>LC</span>
                </div>
                <div className="med-brandcopy">
                    <div className="med-brandcopy__title">Lumiere Clinic</div>
                    <div className="med-brandcopy__subtitle">Beauty &amp; Wellness</div>
                </div>
            </div>

            <nav className="med-sidebar__navwrap" aria-label="Sidebar navigation">
                <ul className="med-sidebar__nav med-nav">
                    {menuItems.map((item) => (
                        <SidebarMenuItem
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            isActive={activeSection === item.id}
                            removable={item.removable}
                            onClick={onMenuClick}
                            onRemove={onRemoveMenu}
                        />
                    ))}
                </ul>
            </nav>

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
        </aside>
    );
}
