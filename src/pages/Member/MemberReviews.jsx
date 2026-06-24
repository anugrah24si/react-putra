import { useEffect, useMemo, useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/review/StarRating";
import ReviewForm from "@/components/review/ReviewForm";
import { getCurrentUser } from "@/lib/auth";
import { useServices } from "@/hooks/useServices";
import { getBookingsByUser } from "@/services/bookingService";
import { getReviewsByUser, createReview, updateReview } from "@/services/reviewService";
import { canEditReview } from "@/utils/review";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

/**
 * MemberReviews - Halaman member untuk memberi/mengedit review.
 * Hanya booking berstatus "Completed" yang bisa direview.
 */
export default function MemberReviews() {
    const user = getCurrentUser();
    // Daftar layanan dari DB (untuk memetakan nama → service_id saat menyimpan review)
    const services = useServices();
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // State form review
    const [formOpen, setFormOpen] = useState(false);
    const [activeBooking, setActiveBooking] = useState(null);
    const [activeReview, setActiveReview] = useState(null);

    async function load() {
        if (!user?.id) return;
        setLoading(true);
        setError("");
        try {
            const [bk, rv] = await Promise.all([
                getBookingsByUser(user.id),
                getReviewsByUser(user.id),
            ]);
            // Booking yang bisa direview: sudah Confirmed/Completed (layanan
            // sudah dipesan & dibayar), atau yang sudah pernah diberi review.
            const reviewedIds = new Set((rv || []).map((r) => r.booking_id));
            const reviewable = bk.filter(
                (b) => b.status === "Confirmed" || b.status === "Completed" || reviewedIds.has(b.id)
            );
            setBookings(reviewable);
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

    // Sinkron realtime: balasan/status review dari admin & perubahan status
    // booking (mis. jadi "Completed") langsung tampil tanpa refresh manual.
    const userFilter = user?.id ? `user_id=eq.${user.id}` : null;
    useRealtimeSync("reviews", load, { filter: userFilter, enabled: !!user?.id });
    useRealtimeSync("bookings", load, { filter: userFilter, enabled: !!user?.id });

    // Map review berdasarkan booking_id untuk akses cepat
    const reviewByBooking = useMemo(() => {
        const map = {};
        reviews.forEach((r) => { map[r.booking_id] = r; });
        return map;
    }, [reviews]);

    // Buka form: beri review baru
    function openCreate(booking) {
        setActiveBooking(booking);
        setActiveReview(null);
        setFormOpen(true);
    }

    // Buka form: edit review
    function openEdit(booking, review) {
        setActiveBooking(booking);
        setActiveReview(review);
        setFormOpen(true);
    }

    // Simpan review (create / update)
    async function handleSubmit(values) {
        if (activeReview) {
            await updateReview(activeReview.id, { rating: values.rating, comment: values.comment || null });
        } else {
            const serviceId = services.find((s) => s.name === activeBooking.service_name)?.id || null;
            await createReview({
                user_id: user.id,
                booking_id: activeBooking.id,
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
                    <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Rating & Review</h1>
                    <p className="text-sm text-muted-foreground">Beri ulasan untuk layanan yang sudah kamu pesan</p>
                </div>
            </div>

            {error ? (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            ) : null}

            {loading ? (
                <p className="text-sm text-muted-foreground">Memuat...</p>
            ) : bookings.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center text-sm text-muted-foreground">
                        Belum ada layanan yang bisa direview.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => {
                        const review = reviewByBooking[booking.id];
                        return (
                            <Card key={booking.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">{booking.service_name}</CardTitle>
                                        <span className="text-xs text-muted-foreground">{booking.booking_date}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {review ? (
                                        <>
                                            <StarRating value={review.rating} readOnly />
                                            {review.comment ? (
                                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                                            ) : null}

                                            {/* Balasan admin */}
                                            {review.admin_reply ? (
                                                <div className="flex gap-2 rounded-lg bg-muted/50 p-3">
                                                    <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                    <div>
                                                        <p className="text-xs font-medium text-foreground">Balasan Admin</p>
                                                        <p className="text-sm text-muted-foreground">{review.admin_reply}</p>
                                                    </div>
                                                </div>
                                            ) : null}

                                            {/* Tombol edit (hanya dalam 7 hari) */}
                                            {canEditReview(review.created_at) ? (
                                                <Button variant="outline" size="sm" onClick={() => openEdit(booking, review)}>
                                                    Edit Review
                                                </Button>
                                            ) : (
                                                <p className="text-xs text-muted-foreground">Masa edit review (7 hari) sudah berakhir.</p>
                                            )}
                                        </>
                                    ) : (
                                        <Button size="sm" onClick={() => openCreate(booking)}>
                                            Beri Review
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            <ReviewForm
                open={formOpen}
                onOpenChange={setFormOpen}
                booking={activeBooking}
                existingReview={activeReview}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
