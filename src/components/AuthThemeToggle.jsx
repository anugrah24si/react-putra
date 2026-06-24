import { useOutletContext } from "react-router-dom";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

/**
 * SunIcon - Ikon matahari (untuk beralih ke mode terang).
 */
function SunIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
    );
}

/**
 * MoonIcon - Ikon bulan (untuk beralih ke mode gelap).
 */
function MoonIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
    );
}

/**
 * AuthThemeToggle - Tombol untuk mengganti tema (dark/light) di halaman auth.
 * Mengambil state theme dan fungsi toggle dari Outlet context (AuthLayout).
 * Styling memakai Tailwind/shadcn agar otomatis mengikuti dark mode.
 */
export default function AuthThemeToggle() {
    const { theme, onToggleTheme } = useOutletContext();

    return (
        <AnimatedThemeToggler
            theme={theme}
            onToggleTheme={onToggleTheme}
            className="fixed right-5 top-5 z-50 h-11 w-11 rounded-xl border border-border bg-card text-foreground shadow-md hover:-translate-y-0.5 hover:bg-accent"
        >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </AnimatedThemeToggler>
    );
}
