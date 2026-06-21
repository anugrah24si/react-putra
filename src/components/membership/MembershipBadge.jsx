import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLevelConfig } from "@/utils/membership";

/**
 * MembershipBadge - Badge kecil yang menampilkan level membership.
 * Reusable: dipakai di tabel admin, dashboard member, dll.
 *
 * @param {string} level - Nama level (Bronze/Silver/Gold/Platinum/Diamond)
 * @param {boolean} showIcon - Tampilkan ikon mahkota (default true)
 * @param {string} className - Class tambahan
 */
export default function MembershipBadge({ level, showIcon = true, className }) {
    const config = getLevelConfig(level);

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                config.color,
                className
            )}
        >
            {showIcon && <Crown className="h-3 w-3" />}
            {config.name}
        </span>
    );
}
