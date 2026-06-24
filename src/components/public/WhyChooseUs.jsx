import { UserCheck, ShieldCheck, HeartHandshake, CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import Reveal from "@/components/public/Reveal";

/**
 * WhyChooseUs - Menonjolkan keunggulan klinik (diferensiasi).
 * Fokus pada manfaat untuk pelanggan, bukan sekadar fitur.
 */
const reasons = [
    {
        icon: UserCheck,
        title: "Tenaga Ahli Berpengalaman",
        desc: "Ditangani oleh terapis & dokter profesional yang berpengalaman di bidangnya.",
    },
    {
        icon: ShieldCheck,
        title: "Produk Aman & Berkualitas",
        desc: "Menggunakan produk teruji, aman, dan sesuai standar untuk kulit Anda.",
    },
    {
        icon: HeartHandshake,
        title: "Pelayanan Personal",
        desc: "Perawatan disesuaikan dengan riwayat dan kebutuhan setiap pelanggan.",
    },
    {
        icon: CalendarClock,
        title: "Booking Mudah & Fleksibel",
        desc: "Pesan layanan kapan saja secara online dan nikmati keuntungan member.",
    },
];

export default function WhyChooseUs() {
    return (
        <section id="keunggulan" className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                <Reveal className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Kenapa Memilih Kami?</h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Komitmen kami adalah memberikan pengalaman perawatan terbaik untuk Anda
                    </p>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <Reveal key={reason.title} delay={index * 80}>
                                <Card className="h-full border-none p-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                                    <MagicCard className="h-full rounded-xl">
                                        <div className="flex h-full flex-col items-center gap-3 p-6 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-foreground">{reason.title}</h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">{reason.desc}</p>
                                        </div>
                                    </MagicCard>
                                </Card>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
