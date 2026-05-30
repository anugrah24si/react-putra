import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * LoadingSpinner Component - Menampilkan loading spinner dengan animasi
 * 
 * @param {string} size - Ukuran spinner: 'sm', 'md', 'lg', 'xl'
 * @param {string} text - Text yang ditampilkan di bawah spinner
 * @param {boolean} fullScreen - Apakah fullscreen atau inline
 * @param {string} className - Custom className tambahan
 */
export function LoadingSpinner({
    size = "md",
    text,
    fullScreen = false,
    className
}) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16"
    }

    const containerClass = fullScreen
        ? "flex min-h-screen flex-col items-center justify-center"
        : "flex flex-col items-center justify-center p-8"

    return (
        <div className={cn(containerClass, className)}>
            <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
            {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
        </div>
    )
}
