import { Button } from "./button"
import { cn } from "@/lib/utils"

/**
 * IconButton Component - Button khusus untuk icon saja
 * Wrapper around shadcn Button with icon variant
 * 
 * @param {ReactNode} icon - Icon yang akan ditampilkan
 * @param {string} ariaLabel - Label untuk accessibility
 * @param {function} onClick - Handler saat button diklik
 * @param {string} title - Tooltip text
 * @param {string} className - Custom className tambahan
 * @param {string} size - Ukuran: 'sm', 'default', 'lg', 'icon'
 */
export function IconButton({
    icon,
    ariaLabel,
    onClick,
    title,
    className,
    size = "icon",
    variant = "ghost",
    ...props
}) {
    return (
        <Button
            variant={variant}
            size={size}
            aria-label={ariaLabel}
            title={title}
            onClick={onClick}
            className={cn("shrink-0", className)}
            {...props}
        >
            {icon}
        </Button>
    )
}
