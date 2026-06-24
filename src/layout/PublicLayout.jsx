import { Outlet } from "react-router-dom";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/PublicFooter";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

/**
 * PublicLayout - Layout untuk halaman publik (bisa diakses tanpa login).
 * Menyediakan navbar di atas dan footer di bawah, konten lewat <Outlet />.
 *
 * @param {string} theme - Tema saat ini ('dark'/'light')
 * @param {function} onToggleTheme - Handler ganti tema
 */
export default function PublicLayout({ theme, onToggleTheme }) {
    return (
        <div className="flex min-h-screen flex-col scroll-smooth bg-background text-foreground [&_section]:scroll-mt-16">
            <SmoothCursor />
            <PublicNavbar theme={theme} onToggleTheme={onToggleTheme} />

            <main className="flex-1">
                <Outlet />
            </main>

            <PublicFooter />
        </div>
    );
}
