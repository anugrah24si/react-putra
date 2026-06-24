import { cn } from "@/lib/utils";

/**
 * Meteors - Efek hujan meteor (diadaptasi dari Aceternity UI ke JavaScript).
 * Murni CSS (animasi meteor-effect didefinisikan di assets/tailwind.css),
 * tanpa library tambahan.
 *
 * @param {number} number - Jumlah meteor (default 20)
 * @param {string} className - Class tambahan untuk tiap meteor
 */
export function Meteors({ number = 20, className }) {
    const meteors = new Array(number).fill(true);

    return (
        <>
            {meteors.map((_, idx) => (
                <span
                    key={`meteor-${idx}`}
                    className={cn(
                        "absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor-effect rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
                        "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
                        className
                    )}
                    style={{
                        top: 0,
                        left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
                        animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
                        animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
                    }}
                />
            ))}
        </>
    );
}
