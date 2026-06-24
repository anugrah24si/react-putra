import { useEffect, useRef, useState } from "react";

/**
 * DefaultCursor - Bentuk kursor kustom (panah teardrop).
 * Memakai currentColor agar terlihat di tema terang maupun gelap.
 */
function DefaultCursor() {
    return (
        <svg
            width="25"
            height="27"
            viewBox="0 0 50 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.25))" }}
        >
            <path
                d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 38.949C24.7724 38.7974 25.2095 38.7974 25.6062 38.9492L39.8829 44.1954C41.7898 44.8902 43.5585 42.9759 42.6817 41.1495Z"
                fill="currentColor"
                stroke="#ffffff"
                strokeWidth="2.25825"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/**
 * SmoothCursor - Kursor kustom yang mengikuti mouse dengan gerakan halus
 * (spring/lerp) dan berotasi mengikuti arah gerak. Diadaptasi dari Magic UI
 * ke JavaScript tanpa library animasi. Otomatis nonaktif di perangkat sentuh.
 */
export function SmoothCursor() {
    const cursorRef = useRef(null);
    const [enabled, setEnabled] = useState(false);
    const [visible, setVisible] = useState(false);

    // Target & state animasi disimpan di ref agar tidak memicu re-render
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0, rot: 0, scale: 1 });
    const targetRot = useRef(0);
    const targetScale = useRef(1);
    const lastPos = useRef({ x: 0, y: 0 });
    const idleTimer = useRef(null);

    // Aktifkan hanya untuk pointer presisi (mouse), bukan layar sentuh
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        setEnabled(window.matchMedia("(pointer: fine)").matches);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        // Sembunyikan kursor default selama komponen aktif
        const previousCursor = document.body.style.cursor;
        document.body.style.cursor = "none";

        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            target.current = { x, y };
            if (!visible) setVisible(true);

            // Hitung arah gerak → sudut rotasi kursor
            const vx = x - lastPos.current.x;
            const vy = y - lastPos.current.y;
            const speed = Math.hypot(vx, vy);
            if (speed > 0.5) {
                targetRot.current = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
                targetScale.current = 0.9;
                if (idleTimer.current) clearTimeout(idleTimer.current);
                idleTimer.current = setTimeout(() => {
                    targetScale.current = 1;
                }, 150);
            }
            lastPos.current = { x, y };
        };

        window.addEventListener("mousemove", handleMouseMove);

        let raf;
        const loop = () => {
            const cur = current.current;
            // Gerak halus menuju posisi mouse (exponential smoothing)
            cur.x += (target.current.x - cur.x) * 0.2;
            cur.y += (target.current.y - cur.y) * 0.2;
            cur.scale += (targetScale.current - cur.scale) * 0.2;

            // Rotasi mengambil jalur terpendek (-180..180)
            let diff = targetRot.current - cur.rot;
            diff = (((diff + 180) % 360) + 360) % 360 - 180;
            cur.rot += diff * 0.2;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) rotate(${cur.rot}deg) scale(${cur.scale})`;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(raf);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            document.body.style.cursor = previousCursor;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    if (!enabled) return null;

    return (
        <div
            ref={cursorRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9999] text-foreground"
            style={{
                willChange: "transform",
                opacity: visible ? 1 : 0,
                transition: "opacity 200ms ease",
                // Posisikan tip kursor sedikit ke kiri-atas titik mouse
                marginLeft: "-4px",
                marginTop: "-2px",
            }}
        >
            <DefaultCursor />
        </div>
    );
}

export default SmoothCursor;
