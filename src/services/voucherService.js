import { supabase } from "@/lib/supabase";

/**
 * voucherService.js - Operasi data Voucher & Promo ke Supabase.
 * Dipakai admin (CRUD) dan member (lihat voucher aktif).
 */

const SELECT = "id, code, title, description, discount, active, expires_at, created_at";

/**
 * getVouchers - Ambil SEMUA voucher (admin).
 */
export async function getVouchers() {
    const { data, error } = await supabase
        .from("vouchers")
        .select(SELECT)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil voucher");
    return data || [];
}

/**
 * getActiveVouchers - Ambil voucher yang aktif saja (member).
 */
export async function getActiveVouchers() {
    const { data, error } = await supabase
        .from("vouchers")
        .select(SELECT)
        .eq("active", true)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil voucher");
    return data || [];
}

/**
 * createVoucher - Membuat voucher baru (admin).
 * @param {Object} payload
 */
export async function createVoucher(payload) {
    const { data, error } = await supabase
        .from("vouchers")
        .insert(payload)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal membuat voucher");
    return data;
}

/**
 * updateVoucher - Mengubah voucher (admin).
 * @param {string} id
 * @param {Object} payload
 */
export async function updateVoucher(id, payload) {
    const { data, error } = await supabase
        .from("vouchers")
        .update(payload)
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal memperbarui voucher");
    return data;
}

/**
 * deleteVoucher - Menghapus voucher (admin).
 * @param {string} id
 */
export async function deleteVoucher(id) {
    const { error } = await supabase.from("vouchers").delete().eq("id", id);
    if (error) throw new Error(error.message || "Gagal menghapus voucher");
}
