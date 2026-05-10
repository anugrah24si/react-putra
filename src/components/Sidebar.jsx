import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function SidebarIcon({ type, active }) {
    const stroke = active ? "#ffffff" : "#2D2A27";

    if (type === "dashboard") {
        return (
            <span className="lc-icon" aria-hidden="true">
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            </span>
        );
    }

    if (type === "orders") {
        return (
            <span className="lc-icon lc-icon--orders" aria-hidden="true">
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            </span>
        );
    }

    if (type === "products") {
        return (
            <span className="lc-icon lc-icon--products" aria-hidden="true">
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            </span>
        );
    }

    if (type === "doctors-and-staff") {
        return (
            <span className="lc-icon lc-icon--staff" aria-hidden="true">
                <span style={{ width: '8.33px', height: '7.59px', left: '5.84px', top: '10.74px', position: 'absolute', outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
                <span style={{ width: '10px', height: '10px', left: '5px', top: '1.67px', position: 'absolute', outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            </span>
        );
    }

    return (
        <span className="lc-icon lc-icon--customers" aria-hidden="true">
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
        </span>
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
                className={isActive ? "lc-nav__item lc-nav__item--active" : "lc-nav__item"}
                onClick={() => onClick(id)}
            >
                <SidebarIcon type={id} active={isActive} />
                <span className="lc-nav__label">{label}</span>
                {removable ? (
                    <button
                        type="button"
                        className="lc-nav__remove"
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
        <aside className="lc-sidebar">
            <div className="lc-sidebar__top">
                <div className="lc-brand">
                    <div className="lc-brand__mark" aria-hidden="true">
                        <span>LC</span>
                    </div>
                    <div className="lc-brand__text">
                        <div className="lc-brand__name">Lumiere Clinic</div>
                        <div className="lc-brand__tag">Beauty &amp; Wellness</div>
                    </div>
                </div>
            </div>

            <nav className="lc-sidebar__nav" aria-label="Sidebar navigation">
                <ul className="lc-nav">
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

            <div className="lc-sidebar__promo">
                <div className="lc-promo">
                    <div className="lc-promo__icon" aria-hidden="true">
                        <span />
                        <span />
                    </div>
                    <div className="lc-promo__title">Tambah Menu</div>
                    <div className="lc-promo__desc">Masih tambah menu biasa saja</div>
                    <button type="button" className="lc-promo__cta" onClick={onAddMenu}>
                        Tambah Menu
                    </button>
                </div>
            </div>
        </aside>
    );
}
