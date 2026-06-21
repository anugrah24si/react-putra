import { Card, CardContent } from "@/components/ui/card";

/**
 * StatCard - Kartu KPI ringkas untuk dashboard analytics (reusable).
 *
 * @param {string} label - Judul statistik
 * @param {string|number} value - Nilai
 * @param {ReactNode} icon - Komponen ikon (lucide-react)
 * @param {string} hint - Teks kecil opsional di bawah nilai
 */
export default function StatCard({ label, value, icon: Icon, hint }) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between p-4">
                <div>
                    <p className="text-xs font-medium text-muted-foreground">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
                    {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
                </div>
                {Icon ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
