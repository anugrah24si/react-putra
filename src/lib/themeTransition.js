import { flushSync } from "react-dom";

/**
 * themeTransition.js - Mengganti tema (dark/light) dengan animasi circular
 * reveal memakai View Transitions API (efek ala AnimatedThemeToggler Magic UI).
 *
 * Tetap kompatibel dengan sistem tema project (atribut data-theme + state React
 * lewat onToggleTheme). Bila browser tidak mendukung View Transitions, tema
 * tetap berganti tanpa animasi (fallback aman).
 *
 * @param {string} theme - Tema saat ini ("dark"/"light")
 * @param {function} onToggleTheme - Handler dari App untuk sinkron state & localStorage
 * @param {HTMLElement} [originEl] - Elemen titik awal lingkaran animasi (mis. tombol)
 */
export function toggleThemeWithTransition(theme, onToggleTheme, originEl) {
    // Terapkan tema baru secara sinkron (agar snapshot transisi akurat)
    const applyChange = () => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        document.body.setAttribute("data-theme", next);
        onToggleTheme?.();
    };

    // Fallback bila View Transitions API tidak tersedia
    if (typeof document === "undefined" || !document.startViewTransition) {
        applyChange();
        return;
    }

    const transition = document.startViewTransition(() => {
        flushSync(applyChange);
    });

    transition.ready
        .then(() => {
            // Titik asal lingkaran: tengah tombol, atau pojok kanan atas bila tak ada
            let x = window.innerWidth - 40;
            let y = 40;
            if (originEl && typeof originEl.getBoundingClientRect === "function") {
                const r = originEl.getBoundingClientRect();
                x = r.left + r.width / 2;
                y = r.top + r.height / 2;
            }
            const maxRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${maxRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 650,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        })
        .catch(() => {
            // Diamkan — tema sudah berganti walau animasi gagal
        });
}
