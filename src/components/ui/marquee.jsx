import { cn } from "@/lib/utils";

/**
 * Marquee - Konten berjalan otomatis (looping) secara horizontal/vertikal.
 * Diadaptasi dari Magic UI ke JavaScript. Murni CSS (animasi marquee
 * didefinisikan di assets/tailwind.css), tanpa library tambahan.
 *
 * @param {boolean} reverse - Arah berlawanan
 * @param {boolean} pauseOnHover - Berhenti saat kursor di atasnya
 * @param {boolean} vertical - Arah vertikal
 * @param {number} repeat - Berapa kali konten digandakan agar mulus (default 4)
 * @param {string} className
 */
export function Marquee({
    children,
    className,
    reverse = false,
    pauseOnHover = false,
    vertical = false,
    repeat = 4,
    ...props
}) {
    return (
        <div
            {...props}
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                vertical ? "flex-col" : "flex-row",
                className
            )}
        >
            {Array.from({ length: repeat }).map((_, i) => (
                <div
                    key={i}
                    className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                        "animate-marquee flex-row": !vertical,
                        "animate-marquee-vertical flex-col": vertical,
                        "group-hover:[animation-play-state:paused]": pauseOnHover,
                        "[animation-direction:reverse]": reverse,
                    })}
                >
                    {children}
                </div>
            ))}
        </div>
    );
}

export default Marquee;
