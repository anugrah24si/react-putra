import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import Reveal from "@/components/public/Reveal";
import { useServices } from "@/hooks/useServices";
import { isLoggedIn } from "@/lib/auth";

// Jumlah layanan per halaman
const PAGE_SIZE = 6;

/**
 * ServicesSection - Etalase layanan unggulan klinik dengan efek MagicCard.
 * Data layanan diambil dari Supabase (dikelola admin) + realtime.
 * Jika layanan lebih dari 6, tampil dengan pagination.
 */
export default function ServicesSection() {
    const navigate = useNavigate();
    // Layanan aktif dari DB (dikelola admin), sinkron realtime
    const services = useServices({ activeOnly: true });
    const [page, setPage] = useState(0);

    // Klik "Booking": belum login → ke login, sudah login → ke halaman booking member
    const handleBooking = () => {
        navigate(isLoggedIn() ? "/member/bookings" : "/login");
    };

    const totalPages = Math.max(1, Math.ceil(services.length / PAGE_SIZE));

    // Pastikan halaman aktif tidak melebihi total (mis. setelah data berubah)
    useEffect(() => {
        if (page > totalPages - 1) setPage(totalPages - 1);
    }, [page, totalPages]);

    const visibleServices = useMemo(() => {
        const start = page * PAGE_SIZE;
        return services.slice(start, start + PAGE_SIZE);
    }, [services, page]);

    const hasPagination = services.length > PAGE_SIZE;

    return (
        <section id="layanan" className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                <Reveal className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Layanan Kami</h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Pilih perawatan yang sesuai dengan kebutuhan kulit dan kecantikan Anda
                    </p>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleServices.map((service, index) => (
                        <Reveal key={service.id} delay={index * 80}>
                            <Card className="group h-full border-none p-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                                <MagicCard className="h-full rounded-xl">
                                    <div className="flex h-full flex-col p-6">
                                        {/* Nama & deskripsi */}
                                        <h3 className="text-lg font-bold text-foreground">{service.name}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>

                                        {/* Gambar layanan */}
                                        <div className="mt-4 h-44 w-full overflow-hidden rounded-xl bg-white">
                                            <img
                                                src={service.image || "/img/product_treatment.png"}
                                                alt={service.name}
                                                loading="lazy"
                                                onError={(e) => { e.target.src = "/img/product_treatment.png"; }}
                                                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Harga + tombol booking */}
                                        <div className="mt-6 flex items-center justify-between">
                                            <p className="text-lg font-bold text-primary">{service.price}</p>
                                            <Button size="sm" onClick={handleBooking}>
                                                Booking Sekarang
                                            </Button>
                                        </div>
                                    </div>
                                </MagicCard>
                            </Card>
                        </Reveal>
                    ))}
                </div>

                {/* Pagination (muncul bila lebih dari 6 layanan) */}
                {hasPagination ? (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            aria-label="Halaman sebelumnya"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setPage(i)}
                                aria-label={`Halaman ${i + 1}`}
                                aria-current={page === i ? "true" : undefined}
                                className={`h-9 w-9 rounded-full border text-sm font-medium transition-colors ${page === i
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page === totalPages - 1}
                            aria-label="Halaman berikutnya"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
