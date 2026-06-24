import { supabase } from "@/lib/supabase";

/**
 * transactionService.js - Operasi data Transaksi ke Supabase.
 * Dipakai member (lihat transaksi sendiri) dan admin (CRUD semua transaksi).
 */

const SELECT = "id, user_id, user_name, description, amount, status, created_at, booking_id";

/**
 * getTransactions - Ambil SEMUA transaksi (admin).
 */
export async function getTransactions() {
    const { data, error } = await supabase
        .from("transactions")
        .select(SELECT)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil transaksi");
    return data || [];
}

/**
 * getTransactionsByUser - Ambil transaksi milik satu user (member).
 * @param {string} userId
 */
export async function getTransactionsByUser(userId) {
    const { data, error } = await supabase
        .from("transactions")
        .select(SELECT)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil transaksi");
    return data || [];
}

/**
 * createTransaction - Membuat transaksi baru (admin).
 * @param {Object} payload
 */
export async function createTransaction(payload) {
    const { data, error } = await supabase
        .from("transactions")
        .insert(payload)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal membuat transaksi");
    return data;
}

/**
 * updateTransaction - Mengubah transaksi (admin).
 * @param {string} id
 * @param {Object} payload
 */
export async function updateTransaction(id, payload) {
    const { data, error } = await supabase
        .from("transactions")
        .update(payload)
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal memperbarui transaksi");
    return data;
}

/**
 * deleteTransaction - Menghapus transaksi (admin).
 * @param {string} id
 */
export async function deleteTransaction(id) {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) throw new Error(error.message || "Gagal menghapus transaksi");
}

/**
 * parsePriceToNumber - Mengubah teks harga ("Rp 350.000") menjadi angka (350000).
 * Mengambil hanya digit, jadi aman untuk format ribuan dengan titik.
 * @param {string|number} price
 * @returns {number}
 */
export function parsePriceToNumber(price) {
    if (typeof price === "number") return price;
    const digits = String(price || "").replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
}

/**
 * createTransactionFromBooking - Membuat transaksi otomatis dari sebuah booking
 * (dipakai saat booking di-Confirm admin). Anti-duplikat: jika booking sudah
 * punya transaksi (booking_id sama), tidak membuat transaksi baru.
 *
 * Catatan: butuh kolom transactions.booking_id (jalankan
 * database/06_booking_transaction_link.sql lebih dulu).
 *
 * @param {Object} booking - Data booking (id, user_id, user_name, service_name, service_price)
 * @returns {Promise<Object|null>} Transaksi yang dibuat, atau null bila sudah ada/tidak valid
 */
export async function createTransactionFromBooking(booking) {
    if (!booking?.id) return null;

    // Cek apakah transaksi untuk booking ini sudah ada (hindari duplikat)
    const { data: existing, error: checkError } = await supabase
        .from("transactions")
        .select("id")
        .eq("booking_id", booking.id)
        .maybeSingle();
    if (checkError) throw new Error(checkError.message || "Gagal memeriksa transaksi booking");
    if (existing) return null; // sudah ada → jangan dobel

    const payload = {
        booking_id: booking.id,
        user_id: booking.user_id,
        user_name: booking.user_name || null,
        description: `Booking ${booking.service_name}`,
        amount: parsePriceToNumber(booking.service_price),
        status: "Paid",
    };

    const { data, error } = await supabase
        .from("transactions")
        .insert(payload)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal membuat transaksi dari booking");
    return data;
}
