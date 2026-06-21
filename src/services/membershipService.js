import { supabase } from "@/lib/supabase";

/**
 * membershipService.js - Operasi data membership ke Supabase.
 * Terpisah dari userService agar logika membership modular.
 */

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
