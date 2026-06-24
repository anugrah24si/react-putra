import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * NumberTicker - Angka yang beranimasi menghitung (count up) saat masuk layar.
 * Diadaptasi dari Magic UI ke JavaScript tanpa library animasi (pakai
 * requestAnimationFrame + IntersectionObserver).
 *
 * @param {number} value - Nilai akhir
 * @param {number} startValue - Nilai awal (default 0)
 * @param {number} delay - Jeda sebelum mulai (detik)
 * @param {number} decimalPlaces - Jumlah angka desimal
 * @param {string} prefix - Teks sebelum angka (mis. "Rp ")
 * @param {string} suffix - Teks sesudah angka (mis. "+", "%", "/5")
 * @param {string} className
 */
export function NumberTicker({
    value,
    startValue = 0,
    delay = 0,
    decimalPlaces = 0,
    prefix = "",
    suffix = "",
    className,
}) {
    const ref = useRef(null);
    const displayRef = useRef(startValue);
    const [display, setDisplay] = useState(startValue);
    const [inView, setInView] = useState(false);

    // Mulai animasi saat elemen masuk ke layar (sekali)
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Animasikan dari nilai sekarang menuju value (easeOutExpo)
    useEffect(() => {
        if (!inView) return;
        let raf;
        const duration = 1500;
        const from = displayRef.current;
        const to = value;
        const startTime = performance.now() + delay * 1000;

        const animate = (now) => {
            if (now < startTime) {
                raf = requestAnimationFrame(animate);
                return;
            }
            const t = Math.min(1, (now - startTime) / duration);
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            const current = from + (to - from) * eased;
            displayRef.current = current;
            setDisplay(current);
            if (t < 1) raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, delay]);

    // Format angka sesuai jumlah desimal
    const formatted = Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(Number(display.toFixed(decimalPlaces)));

    return (
        <span ref={ref} className={cn("inline-block tabular-nums", className)}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}

export default NumberTicker;
