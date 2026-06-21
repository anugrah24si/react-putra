import { supabase } from "@/lib/supabase";

/**
 * transactionService.js - Operasi data Transaksi ke Supabase.
 * Dipakai member (lihat transaksi sendiri) dan admin (CRUD semua transaksi).
 */

const SELECT = "id, user_id, user_name, description, amount, status, created_at";

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
