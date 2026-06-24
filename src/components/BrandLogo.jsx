import { cn } from "@/lib/utils";

/**
 * BrandMark - Lambang brand MediCare memakai file logo asli (/img/logo.png).
 * Ditampilkan dalam kotak putih membulat agar logo tampil rapi & konsisten
 * di semua tempat (navbar, footer, sidebar, halaman error).
 *
 * @param {string} className - Kelas tambahan untuk mengatur ukuran kotak
 */
export function BrandMark({ className }) {
    return (
        <span
            className={cn(
                "inline-flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border",
                className
            )}
        >
            <img
                src="/img/logo.png"
                alt="LUMIVA"
                className="h-full w-full object-contain p-1"
            />
        </span>
    );
}

/**
 * BrandLogo - Lambang + teks "MediCare" dalam satu lockup.
 *
 * @param {boolean} showText - Tampilkan teks brand (default true)
 * @param {string} markClassName - Kelas ukuran lambang (default h-9 w-9)
 * @param {string} textClassName - Kelas teks brand
 * @param {string} className - Kelas pembungkus
 */
export default function BrandLogo({
    showText = true,
    markClassName = "h-9 w-9",
    textClassName = "text-lg",
    className,
}) {
    return (
        <span className={cn("inline-flex items-center gap-2", className)}>
            <BrandMark className={markClassName} />
            {showText ? (
                <span className={cn("font-bold uppercase tracking-[0.25em] text-foreground", textClassName)}>
                    LUMIVA
                </span>
            ) : null}
        </span>
    );
}
