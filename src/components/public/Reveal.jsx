import { useEffect, useRef, useState } from "react";

/**
 * Reveal - Membungkus konten agar muncul dengan animasi halus (fade + slide up)
 * saat elemen masuk ke layar (scroll). Memakai IntersectionObserver.
 *
 * @param {ReactNode} children - Konten yang dianimasikan
 * @param {number} delay - Jeda animasi dalam milidetik (untuk efek bertahap)
 * @param {string} className - Class tambahan
 */
export default function Reveal({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Amati elemen; saat masuk layar, aktifkan animasi sekali saja
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
