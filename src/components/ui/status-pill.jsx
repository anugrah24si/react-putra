import { Badge } from "./badge"
import { cn } from "@/lib/utils"

/**
 * StatusPill Component - Menampilkan status dengan dot indicator
 * Wrapper around shadcn Badge with dot indicator
 * 
 * @param {string} status - Text status
 * @param {string} variant - Variant badge: 'default', 'secondary', 'destructive', 'outline'
 * @param {boolean} showDot - Tampilkan dot indicator
 * @param {string} dotColor - Warna dot indicator (CSS color)
 * @param {string} className - Custom className tambahan
 */
export function StatusPill({
    status = "Online",
    variant = "secondary",
    showDot = true,
    dotColor = "hsl(var(--primary))",
    className,
    ...props
}) {
    return (
        <Badge variant={variant} className={cn("gap-1.5", className)} {...props}>
            {showDot && (
                <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: dotColor }}
                    aria-hidden="true"
                />
            )}
            <span>{status}</span>
        </Badge>
    )
}
