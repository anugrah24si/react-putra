import { cn } from "@/lib/utils";

/**
 * BorderBeam - Sinar yang bergerak mengelilingi tepi container (efek Magic UI).
 * Diadaptasi ke pure CSS: gradien conic berputar (animasi sudut via @property)
 * yang di-mask sehingga hanya tampil pada cincin tepi. Bagian dalam tetap
 * transparan, jadi konten kartu tidak tertutup.
 *
 * Container induk harus `relative` & `overflow-hidden`.
 *
 * @param {number} duration - Durasi satu putaran (detik)
 * @param {number} borderWidth - Ketebalan sinar tepi (px)
 * @param {string} colorFrom - Warna awal gradien
 * @param {string} colorTo - Warna akhir gradien
 * @param {string} className
 */
export function BorderBeam({
    className,
    duration = 8,
    borderWidth = 1.5,
    colorFrom = "#34d399",
    colorTo = "#10b981",
}) {
    return (
        <div
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
            style={{
                padding: `${borderWidth}px`,
                background: `conic-gradient(from var(--beam-angle), transparent 0deg, ${colorFrom} 30deg, ${colorTo} 70deg, transparent 130deg)`,
                // Hanya tampilkan cincin tepi (kurangi area dalam)
                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                maskComposite: "exclude",
                animation: `border-beam-rotate ${duration}s linear infinite`,
            }}
        />
    );
}

export default BorderBeam;
