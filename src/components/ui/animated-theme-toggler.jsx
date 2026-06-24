import { useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleThemeWithTransition } from "@/lib/themeTransition";

/**
 * AnimatedThemeToggler - Tombol ganti tema dengan animasi circular reveal
 * (diadaptasi dari Magic UI). Memakai sistem tema project lewat props.
 *
 * @param {string} theme - Tema saat ini ("dark"/"light")
 * @param {function} onToggleTheme - Handler ganti tema dari App
 * @param {string} className - Kelas tambahan untuk tombol
 * @param {ReactNode} children - Ikon kustom (opsional, default Sun/Moon)
 */
export function AnimatedThemeToggler({ theme, onToggleTheme, className, children }) {
    const ref = useRef(null);
    const isDark = theme === "dark";

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => toggleThemeWithTransition(theme, onToggleTheme, ref.current)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Mode terang" : "Mode gelap"}
            className={cn(
                "inline-flex items-center justify-center transition-transform hover:scale-110",
                className
            )}
        >
            {children ?? (isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
        </button>
    );
}

export default AnimatedThemeToggler;
