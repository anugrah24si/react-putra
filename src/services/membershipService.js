import { supabase } from "@/lib/supabase";
import { getLevelByPoints } from "@/utils/membership";
import { getTransactionsByUser } from "@/services/transactionService";

/**
 * membershipService.js - Operasi data membership ke Supabase.
 * Terpisah dari userService agar logika membership modular.
 */

/**
 * RUPIAH_PER_POINT - Aturan loyalty: setiap kelipatan nominal ini pada
 * transaksi berstatus 'Paid' memberi 1 poin (mis. Rp 10.000 = 1 poin).
 */
export const RUPIAH_PER_POINT = 10000;

/**
 * calculatePoints - Menghitung poin dari sebuah nominal belanja.
 * @param {number} amount - Nominal (Rp)
 * @returns {number} Jumlah poin (dibulatkan ke bawah)
 */
export function calculatePoints(amount) {
    return Math.floor(Number(amount || 0) / RUPIAH_PER_POINT);
}

// Kolom yang diambil saat membaca data membership (tanpa password)
const MEMBERSHIP_SELECT = "id, full_name, email, role, status, membership_level, points";

/**
 * getMembershipByUserId - Mengambil data membership satu user.
 * @param {string} userId - ID user
 * @returns {Promise<Object>} Data user + membership
 */
export async function getMembershipByUserId(userId) {
    const { data, error } = await supabase
        .from("users")
        .select(MEMBERSHIP_SELECT)
        .eq("id", userId)
        .single();

    if (error) {
        throw new Error(error.message || "Gagal mengambil data membership");
    }
    return data;
}

/**
 * updateMembership - Mengubah level & poin membership user (dipakai admin).
 * Perubahan ini otomatis terlihat di Dashboard Admin (sinkronisasi).
 *
 * @param {string} userId - ID user
 * @param {Object} payload - { membership_level, points }
 * @returns {Promise<Object>} Data terbaru setelah diubah
 */
export async function updateMembership(userId, { membership_level, points }) {
    const { data, error } = await supabase
        .from("users")
        .update({ membership_level, points })
        .eq("id", userId)
        .select(MEMBERSHIP_SELECT)
        .single();

    if (error) {
        throw new Error(error.message || "Gagal memperbarui membership");
    }
    return data;
}

/**
 * addPoints - Menambah poin user lalu kembalikan data terbaru.
 * Berguna nanti saat transaksi/booking memberi poin reward.
 *
 * @param {string} userId - ID user
 * @param {number} amount - Jumlah poin yang ditambahkan
 * @returns {Promise<Object>} Data terbaru
 */
export async function addPoints(userId, amount) {
    // Ambil poin sekarang dulu
    const current = await getMembershipByUserId(userId);
    const newPoints = (current.points || 0) + Number(amount || 0);

    return updateMembership(userId, {
        membership_level: current.membership_level,
        points: newPoints,
    });
}

/**
 * syncMembershipFromTransactions - Menghitung ulang poin & level member
 * berdasarkan SELURUH transaksi berstatus 'Paid' miliknya.
 *
 * Bersifat idempoten (dihitung dari sumber data, bukan ditambah-tambah),
 * sehingga edit/refund/hapus transaksi otomatis terkoreksi tanpa double-count.
 * Level ditentukan otomatis dari total poin via getLevelByPoints.
 *
 * @param {string} userId - ID member yang transaksinya berubah
 * @returns {Promise<Object|null>} Data membership terbaru, atau null bila tanpa userId
 */
export async function syncMembershipFromTransactions(userId) {
    if (!userId) return null;

    // Ambil transaksi member, jumlahkan hanya yang berstatus 'Paid'
    const transactions = await getTransactionsByUser(userId);
    const totalPaid = transactions
        .filter((t) => t.status === "Paid")
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    // Konversi total belanja → poin → level
    const points = calculatePoints(totalPaid);
    const level = getLevelByPoints(points).name;

    return updateMembership(userId, { membership_level: level, points });
}
