import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StarRating - Komponen bintang rating (reusable).
 * Bisa dipakai sebagai input (interaktif) atau display (read-only).
 *
 * @param {number} value - Nilai rating sekarang (1-5)
 * @param {function} onChange - Handler saat bintang dipilih (mode input)
 * @param {boolean} readOnly - True = hanya tampilan
 * @param {string} size - Ukuran ikon (kelas tailwind, mis. "h-5 w-5")
 */
export default function StarRating({ value = 0, onChange, readOnly = false, size = "h-5 w-5" }) {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hover || value);
                return (
                    <button
                        key={star}
                        type="button"
                        disabled={readOnly}
                        onClick={() => !readOnly && onChange?.(star)}
                        onMouseEnter={() => !readOnly && setHover(star)}
                        onMouseLeave={() => !readOnly && setHover(0)}
                        className={cn(!readOnly && "cursor-pointer", "transition-transform", !readOnly && "hover:scale-110")}
                        aria-label={`${star} bintang`}
                    >
                        <Star
                            className={cn(
                                size,
                                active ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-muted-foreground/40"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}
