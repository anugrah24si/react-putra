import { Outlet } from "react-router-dom";
import PublicNavbar from "@/components/public/PublicNavbar";

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
            <PublicNavbar theme={theme} onToggleTheme={onToggleTheme} />

            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-background py-6">
                <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
                    © 2025 MediCare Clinic. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
