import { useEffect, useMemo, useState } from "react";
import { Receipt, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/review/StarRating";
import ReviewForm from "@/components/review/ReviewForm";
import { getCurrentUser } from "@/lib/auth";
import { useServices } from "@/hooks/useServices";
import { getTransactionsByUser } from "@/services/transactionService";
import { calculatePoints } from "@/services/membershipService";
import { getReviewsByUser, createReview, updateReview } from "@/services/reviewService";
import { canEditReview } from "@/utils/review";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

/**
 * formatRupiah - Format angka menjadi format Rupiah.
 */
function formatRupiah(amount) {
    return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}

/**
 * statusColor - Warna badge sesuai status transaksi.
 */
function statusColor(status) {
    switch (status) {
        case "Paid": return "bg-green-500/15 text-green-600 dark:text-green-400";
        case "Refunded": return "bg-red-500/15 text-red-600 dark:text-red-400";
        default: return "bg-amber-500/15 text-amber-600 dark:text-amber-400"; // Pending
    }
}

/**
 * getServiceNameFromTx - Ambil nama layanan dari deskripsi transaksi.
 * Transaksi dari booking memakai format "Booking {nama layanan}".
 */
function getServiceNameFromTx(description) {
    return String(description || "").replace(/^Booking\s+/i, "").trim();
}

/**
 * MemberTransactions - Riwayat transaksi member.
 * Untuk transaksi layanan (terhubung ke booking), member dapat langsung
 * memberi / mengedit rating & ulasan dari halaman ini.
 */
export default function MemberTransactions() {
    const user = getCurrentUser();
    // Daftar layanan dari DB (untuk memetakan nama → service_id saat menyimpan review)
    const services = useServices();
    const [transactions, setTransactions] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // State form review
    const [formOpen, setFormOpen] = useState(false);
    const [activeTx, setActiveTx] = useState(null);
    const [activeReview, setActiveReview] = useState(null);

    // Muat transaksi + review milik member
    async function load() {
        if (!user?.id) return;
        setLoading(true);
        try {
            const [tx, rv] = await Promise.all([
                getTransactionsByUser(user.id),
                getReviewsByUser(user.id),
            ]);
            setTransactions(tx);
            setReviews(rv);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sinkron realtime: transaksi baru & review (mis. balasan admin) langsung tampil
    const userFilter = user?.id ? `user_id=eq.${user.id}` : null;
    useRealtimeSync("transactions", load, { filter: userFilter, enabled: !!user?.id });
    useRealtimeSync("reviews", load, { filter: userFilter, enabled: !!user?.id });

    // Map review berdasarkan booking_id untuk akses cepat
    const reviewByBooking = useMemo(() => {
        const map = {};
        reviews.forEach((r) => { if (r.booking_id) map[r.booking_id] = r; });
        return map;
    }, [reviews]);

    // Buka form review (baru atau edit) untuk sebuah transaksi
    function openReview(tx, existing) {
        setActiveTx(tx);
        setActiveReview(existing || null);
        setFormOpen(true);
    }

    // Simpan review (create / update) lalu muat ulang
    async function handleSubmit(values) {
        if (activeReview) {
            await updateReview(activeReview.id, { rating: values.rating, comment: values.comment || null });
        } else {
            const serviceName = getServiceNameFromTx(activeTx.description);
            const serviceId = services.find((s) => s.name === serviceName)?.id || null;
            await createReview({
                user_id: user.id,
                booking_id: activeTx.booking_id,
                service_id: serviceId,
                rating: values.rating,
                comment: values.comment || null,
            });
        }
        await load();
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Receipt className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Riwayat Transaksi</h1>
                    <p className="text-sm text-muted-foreground">Daftar transaksi pembayaran kamu</p>
                </div>
            </div>

            {error ? (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            ) : null}

            <Card>
                <CardHeader>
                    <CardTitle>Transaksi</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-sm text-muted-foreground">Memuat...</p>
                    ) : transactions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((t) => {
                                const review = t.booking_id ? reviewByBooking[t.booking_id] : null;
                                // Hanya transaksi layanan (punya booking_id) yang bisa direview
                                const canReview = Boolean(t.booking_id);
                                return (
                                    <div key={t.id} className="rounded-lg border border-border p-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-foreground">{t.description}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(t.created_at).toLocaleDateString("id-ID")}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-foreground">{formatRupiah(t.amount)}</p>
                                                <div className="mt-1 flex items-center justify-end gap-2">
                                                    {/* Poin yang didapat (hanya transaksi Paid, Rp 10.000 = 1 poin) */}
                                                    {t.status === "Paid" ? (
                                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                            +{calculatePoints(t.amount)} poin
                                                        </span>
                                                    ) : null}
                                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(t.status)}`}>
                                                        {t.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Area rating & ulasan (khusus transaksi layanan) */}
                                        {canReview ? (
                                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                                                {review ? (
                                                    <>
                                                        <div className="flex flex-col gap-1">
                                                            <StarRating value={review.rating} readOnly size="h-4 w-4" />
                                                            {review.comment ? (
                                                                <p className="text-xs text-muted-foreground">"{review.comment}"</p>
                                                            ) : null}
                                                        </div>
                                                        {canEditReview(review.created_at) ? (
                                                            <Button variant="outline" size="sm" onClick={() => openReview(t, review)}>
                                                                Edit Rating
                                                            </Button>
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground">Masa edit berakhir</span>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-xs text-muted-foreground">Beri penilaian untuk layanan ini</span>
                                                        <Button size="sm" onClick={() => openReview(t, null)}>
                                                            <Star className="mr-1.5 h-4 w-4" />
                                                            Beri Rating
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Dialog form review (dipakai ulang dari fitur Review) */}
            <ReviewForm
                open={formOpen}
                onOpenChange={setFormOpen}
                booking={activeTx ? {
                    id: activeTx.booking_id,
                    service_name: getServiceNameFromTx(activeTx.description),
                    booking_date: new Date(activeTx.created_at).toLocaleDateString("id-ID"),
                } : null}
                existingReview={activeReview}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
