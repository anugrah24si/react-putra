import { useEffect, useCallback, useState } from "react";
import { Users, Star, Sparkles, ShieldCheck } from "lucide-react";
import Reveal from "@/components/public/Reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { getReviews } from "@/services/reviewService";
import { getUsers } from "@/services/userService";
import { computeReviewStats } from "@/utils/review";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

/**
 * TrustBar - Deretan angka kredibilitas untuk membangun kepercayaan instan.
 * Mengambil data nyata (jumlah member & rata-rata rating) dari Supabase,
 * dengan fallback aman bila data belum tersedia (tidak akan error).
 */
export default function TrustBar() {
    const [stats, setStats] = useState({ members: null, rating: null });

    // Ambil data nyata (jumlah member & rata-rata rating); fallback bila kosong
    const load = useCallback(async () => {
        try {
            const [users, reviews] = await Promise.all([
                getUsers().catch(() => []),
                getReviews({ status: "approved" }).catch(() => []),
            ]);
            const members = users.filter((u) => u.role === "user").length;
            const { average } = computeReviewStats(reviews);
            setStats({
                members: members > 0 ? members : null,
                rating: average > 0 ? average : null,
            });
        } catch {
            // Diamkan — gunakan fallback
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    // Sinkron realtime: jumlah member & rating ikut update otomatis
    useRealtimeSync("users", load);
    useRealtimeSync("reviews", load);

    // Daftar item kredibilitas (pakai data nyata bila ada, fallback bila kosong).
    // value = angka, suffix = teks di belakang angka untuk animasi NumberTicker.
    const items = [
        {
            icon: Users,
            value: stats.members ?? 500,
            suffix: "+",
            decimalPlaces: 0,
            label: "Pelanggan Dilayani",
        },
        {
            icon: Star,
            value: stats.rating ?? 4.9,
            suffix: "/5",
            decimalPlaces: 1,
            label: "Rata-rata Rating",
        },
        {
            icon: Sparkles,
            value: 20,
            suffix: "+",
            decimalPlaces: 0,
            label: "Jenis Perawatan",
        },
        {
            icon: ShieldCheck,
            value: 100,
            suffix: "%",
            decimalPlaces: 0,
            label: "Produk Aman & Legal",
        },
    ];

    return (
        <section className="border-b border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {items.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <Reveal key={item.label} delay={i * 80} className="flex flex-col items-center gap-2 text-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <NumberTicker
                                    value={item.value}
                                    suffix={item.suffix}
                                    decimalPlaces={item.decimalPlaces}
                                    delay={i * 0.1}
                                    className="text-2xl font-bold text-foreground"
                                />
                                <div className="text-xs text-muted-foreground">{item.label}</div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
