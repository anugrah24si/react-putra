import { Fragment, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * KineticText - Teks yang menganimasikan ketebalan (font-weight) tiap huruf
 * mengikuti posisi kursor (diadaptasi dari Magic UI). Huruf terdekat dengan
 * kursor menjadi paling tebal, lalu melandai ke huruf di sekitarnya.
 *
 * Memakai font variabel (Geist Variable) agar transisi bobot mulus. Tanpa
 * library animasi tambahan.
 *
 * @param {string} text - Teks yang ditampilkan
 * @param {number} minWeight - Bobot dasar (default 400)
 * @param {number} maxWeight - Bobot maksimum saat dekat kursor (default 900)
 * @param {number} radius - Radius pengaruh kursor dalam px (default 80)
 * @param {string} className
 */
export function KineticText({ text, className, minWeight = 400, maxWeight = 900, radius = 80 }) {
    const charRefs = useRef([]);

    // Atur bobot tiap huruf berdasarkan jarak ke kursor
    const handleMouseMove = (e) => {
        for (const el of charRefs.current) {
            if (!el) continue;
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
            const t = Math.max(0, 1 - dist / radius);
            const w = Math.round(minWeight + (maxWeight - minWeight) * t);
            el.style.fontVariationSettings = `'wght' ${w}`;
            el.style.fontWeight = String(w);
        }
    };

    // Kembalikan ke bobot dasar saat kursor keluar
    const reset = () => {
        for (const el of charRefs.current) {
            if (!el) continue;
            el.style.fontVariationSettings = `'wght' ${minWeight}`;
            el.style.fontWeight = String(minWeight);
        }
    };

    const words = text.split(" ");
    let counter = 0;

    return (
        <span
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className={cn("inline", className)}
            style={{ fontFamily: "'Geist Variable', system-ui, sans-serif" }}
        >
            {words.map((word, wi) => (
                <Fragment key={wi}>
                    {/* Satu kata = inline-block agar tidak terputus saat wrap */}
                    <span className="inline-block whitespace-nowrap">
                        {word.split("").map((ch, ci) => {
                            const index = counter++;
                            return (
                                <span
                                    key={ci}
                                    ref={(el) => {
                                        charRefs.current[index] = el;
                                    }}
                                    className="transition-[font-variation-settings,font-weight] duration-200 ease-out"
                                    style={{ fontVariationSettings: `'wght' ${minWeight}`, fontWeight: minWeight }}
                                >
                                    {ch}
                                </span>
                            );
                        })}
                    </span>
                    {/* Spasi antar kata sebagai titik wrap */}
                    {wi < words.length - 1 ? " " : null}
                </Fragment>
            ))}
        </span>
    );
}

export default KineticText;
