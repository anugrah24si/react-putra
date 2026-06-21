import { useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import { getBookings } from "@/services/bookingService";
import { getTransactions } from "@/services/transactionService";
import { getReviews } from "@/services/reviewService";
import { getVouchers } from "@/services/voucherService";
import { getAllNotes } from "@/services/customerNoteService";
import {
    computeMemberStats,
    computeBookingStats,
    computeTransactionStats,
    computeVoucherStats,
    computeTopCustomers,
    computeMostPopularServices,
    computeTopRatedService,
} from "@/utils/analytics";
import { computeReviewStats } from "@/utils/review";
import { computeNoteStats } from "@/utils/customerNote";

/**
 * useAnalytics - Mengambil seluruh data CRM dari Supabase secara paralel,
 * lalu menghitung semua statistik untuk dashboard analytics.
 *
 * @returns {{ data: Object|null, loading: boolean, error: string }}
 */
export function useAnalytics() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");
            try {
                // Ambil semua data sekaligus (real dari database)
                const [users, bookings, transactions, reviews, vouchers, notes] = await Promise.all([
                    getUsers(),
                    getBookings(),
                    getTransactions(),
                    getReviews(),
                    getVouchers(),
                    getAllNotes(),
                ]);

                // Hitung statistik dari data nyata
                setData({
                    members: computeMemberStats(users),
                    bookings: computeBookingStats(bookings),
                    transactions: computeTransactionStats(transactions),
                    reviews: computeReviewStats(reviews),
                    vouchers: computeVoucherStats(vouchers),
                    notes: computeNoteStats(notes),
                    topCustomers: computeTopCustomers(users, transactions),
                    popularServices: computeMostPopularServices(bookings),
                    topRatedService: computeTopRatedService(reviews),
                });
            } catch (err) {
                setError(err.message || "Gagal memuat data analytics");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { data, loading, error };
}
