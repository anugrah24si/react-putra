import { Outlet } from "react-router-dom";

/**
 * AuthLayout - Wrapper untuk halaman auth (Login, Register, Forgot).
 * Meneruskan state theme (dark/light) dan fungsi toggle-nya ke halaman anak
 * melalui Outlet context, sehingga tiap halaman auth bisa menampilkan
 * tombol ganti tema dan ikut berubah warnanya.
 *
 * @param {string} theme - Tema saat ini: 'dark' atau 'light'
 * @param {function} onToggleTheme - Handler untuk mengganti tema
 */
export default function AuthLayout({ theme, onToggleTheme }) {
    return (
        <div className="min-h-screen">
            <Outlet context={{ theme, onToggleTheme }} />
        </div>
    );
}
