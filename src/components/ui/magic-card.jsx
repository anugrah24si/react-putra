import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * MagicCard - Kartu dengan glow gradien yang mengikuti kursor (border + isi).
 * Diadaptasi dari Magic UI ke JavaScript tanpa library animasi: posisi kursor
 * di-set langsung ke radial-gradient lewat ref (tanpa re-render).
 *
 * @param {number} gradientSize - Radius lingkaran glow (px)
 * @param {string} gradientColor - Warna glow di dalam kartu (saat hover)
 * @param {string} gradientFrom - Warna awal glow pada border
 * @param {string} gradientTo - Warna akhir glow pada border
 * @param {string} className - Kelas tambahan untuk root (atur radius/ukuran)
 */
export function MagicCard({
    children,
    className,
    gradientSize = 220,
    gradientColor = "rgba(16,185,129,0.15)",
    gradientFrom = "#34d399",
    gradientTo = "#10b981",
}) {
    const cardRef = useRef(null);
    const borderRef = useRef(null);
    const overlayRef = useRef(null);

    // Posisikan glow mengikuti kursor
    const handleMouseMove = useCallback(
        (e) => {
            const el = cardRef.current;
            if (!el) return;
            const { left, top } = el.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            if (borderRef.current) {
                borderRef.current.style.background = `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientFrom}, ${gradientTo}, hsl(var(--border)) 100%)`;
            }
            if (overlayRef.current) {
                overlayRef.current.style.background = `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, ${gradientColor}, transparent 100%)`;
            }
        },
        [gradientSize, gradientFrom, gradientTo, gradientColor]
    );

    // Saat kursor keluar, dorong glow jauh agar border kembali normal
    const handleMouseLeave = useCallback(() => {
        const far = `-${gradientSize * 10}px`;
        if (borderRef.current) {
            borderRef.current.style.background = `radial-gradient(${gradientSize}px circle at ${far} ${far}, ${gradientFrom}, ${gradientTo}, hsl(var(--border)) 100%)`;
        }
        if (overlayRef.current) {
            overlayRef.current.style.background = `radial-gradient(${gradientSize}px circle at ${far} ${far}, ${gradientColor}, transparent 100%)`;
        }
    }, [gradientSize, gradientFrom, gradientTo, gradientColor]);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("group relative rounded-[inherit]", className)}
        >
            {/* Lapisan border ber-glow */}
            <div ref={borderRef} className="pointer-events-none absolute inset-0 rounded-[inherit] bg-border" />
            {/* Permukaan kartu */}
            <div className="absolute inset-px rounded-[inherit] bg-background" />
            {/* Glow di dalam kartu (muncul saat hover) */}
            <div
                ref={overlayRef}
                className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            {/* Konten */}
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export default MagicCard;
