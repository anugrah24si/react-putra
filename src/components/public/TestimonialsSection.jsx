import { useEffect, useCallback, useMemo, useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import StarRating from "@/components/review/StarRating";
import Reveal from "@/components/public/Reveal";
import { getReviews } from "@/services/reviewService";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";
import { cn } from "@/lib/utils";

/**
 * getInitial - Ambil inisial nama untuk avatar testimoni.
 */
function getInitial(name) {
    return (name?.trim()?.[0] || "U").toUpperCase();
}

/**
 * ReviewCard - Kartu satu testimoni di dalam marquee.
 */
function ReviewCard({ name, service, rating, body }) {
    return (
        <figure
            className={cn(
                "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {getInitial(name)}
                </div>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium text-foreground">{name}</figcaption>
                    {service ? <p className="text-xs font-medium text-muted-foreground">{service}</p> : null}
                </div>
            </div>
            <div className="mt-2">
                <StarRating value={rating} readOnly size="h-4 w-4" />
            </div>
            <blockquote className="mt-2 text-sm text-muted-foreground">"{body}"</blockquote>
        </figure>
    );
}

/**
 * TestimonialsSection - Ulasan pelanggan nyata (status approved) berjalan
 * otomatis dalam dua baris marquee (berlawanan arah). Disembunyikan jika
 * belum ada review berkomentar.
 */
export default function TestimonialsSection() {
    const [reviews, setReviews] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const load = useCallback(async () => {
        try {
            const data = await getReviews({ status: "approved" });
            const withComment = (data || []).filter((r) => r.comment?.trim());
            setReviews(withComment);
        } catch {
            // Diamkan — section tidak ditampilkan jika gagal
        } finally {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    // Sinkron realtime: review baru langsung muncul di marquee
    useRealtimeSync("reviews", load);

    // Bagi menjadi dua baris untuk marquee atas & bawah
    const [firstRow, secondRow] = useMemo(() => {
        const half = Math.ceil(reviews.length / 2);
        return [reviews.slice(0, half), reviews.slice(half)];
    }, [reviews]);

    if (!loaded || reviews.length === 0) return null;

    return (
        <section id="testimoni" className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                <Reveal className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Apa Kata Pelanggan Kami
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Pengalaman nyata dari pelanggan yang telah merawat diri bersama kami
                    </p>
                </Reveal>

                <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:25s]">
                        {firstRow.map((r) => (
                            <ReviewCard
                                key={r.id}
                                name={r.users?.full_name || "Pelanggan"}
                                service={r.services?.name}
                                rating={r.rating}
                                body={r.comment}
                            />
                        ))}
                    </Marquee>

                    {/* Baris kedua hanya jika ada cukup review */}
                    {secondRow.length > 0 ? (
                        <Marquee reverse pauseOnHover className="[--duration:25s]">
                            {secondRow.map((r) => (
                                <ReviewCard
                                    key={r.id}
                                    name={r.users?.full_name || "Pelanggan"}
                                    service={r.services?.name}
                                    rating={r.rating}
                                    body={r.comment}
                                />
                            ))}
                        </Marquee>
                    ) : null}

                    {/* Gradien memudar di kiri & kanan */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </div>
        </section>
    );
}
