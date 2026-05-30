import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"

/**
 * StatsCard Component - Card untuk menampilkan statistik dengan icon
 * Dark mode: Background hitam solid dengan layout seperti dashboard
 * Menampilkan label, value, dan delta perubahan
 * 
 * @param {string} label - Label statistik
 * @param {string|number} value - Nilai statistik
 * @param {ReactNode} icon - Icon component (dari lucide-react)
 * @param {string} delta - Perubahan persentase (opsional)
 * @param {string} deltaType - Tipe delta: 'up' atau 'down' (opsional)
 * @param {string} className - Custom className tambahan
 */
export function StatsCard({ label, value, icon: Icon, delta, deltaType, className }) {
    return (
        <Card className={cn("border border-gray-200 bg-white transition-all dark:border-white/10 dark:bg-[#0d0d0d]", className)}>
            <CardContent className="p-5">
                {/* Header dengan label dan icon */}
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
                    {Icon && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">
                            <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className="mb-2">
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>

                {/* Delta (jika ada) */}
                {delta && (
                    <p className={cn(
                        "text-xs font-medium",
                        deltaType === 'up' && "text-green-500",
                        deltaType === 'down' && "text-red-500",
                        !deltaType && "text-gray-500 dark:text-gray-400"
                    )}>
                        {delta}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
