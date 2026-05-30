import { Search } from "lucide-react"
import { Input } from "./input"
import { cn } from "@/lib/utils"

/**
 * SearchInput Component - Input field dengan icon search
 * 
 * @param {string} value - Nilai input
 * @param {function} onChange - Handler saat input berubah
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Custom className tambahan
 */
export function SearchInput({ value, onChange, placeholder = "Search...", className, ...props }) {
    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                type="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="pl-9"
                {...props}
            />
        </div>
    )
}
