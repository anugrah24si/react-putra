import { supabase } from "@/lib/supabase";

/**
 * reviewService.js - Operasi data Review ke Supabase.
 * Nama user & service diambil via relasi (embed), tidak disimpan ulang.
 */

// Ambil review beserta relasi nama user dan nama service
const SELECT = `
    id, user_id, booking_id, service_id, rating, comment, status,
    admin_reply, admin_reply_at, created_at, updated_at,
    users ( full_name ),
    services ( name )
`;

/**
 * getReviews - Ambil SEMUA review (admin & analytics).
 * @param {Object} options - { status } filter opsional
 */
export async function getReviews({ status } = {}) {
    let query = supabase.from("reviews").select(SELECT).order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw new Error(error.message || "Gagal mengambil review");
    return data || [];
}

/**
 * getReviewsByUser - Ambil review milik satu member.
 * @param {string} userId
 */
export async function getReviewsByUser(userId) {
    const { data, error } = await supabase
        .from("reviews")
        .select(SELECT)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil review");
    return data || [];
}

/**
 * createReview - Membuat review baru (member).
 * UNIQUE(booking_id) di database mencegah review ganda untuk booking sama.
 * @param {Object} payload - { user_id, booking_id, service_id, rating, comment }
 */
export async function createReview(payload) {
    const { data, error } = await supabase
        .from("reviews")
        .insert({ ...payload, status: "approved" })
        .select(SELECT)
        .single();
    if (error) {
        if (error.code === "23505") {
            throw new Error("Kamu sudah memberi review untuk booking ini");
        }
        throw new Error(error.message || "Gagal membuat review");
    }
    return data;
}

/**
 * updateReview - Member mengedit rating/komentar (dibatasi 7 hari di sisi UI).
 * @param {string} id
 * @param {Object} payload - { rating, comment }
 */
export async function updateReview(id, payload) {
    const { data, error } = await supabase
        .from("reviews")
        .update(payload)
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal memperbarui review");
    return data;
}

/**
 * setReviewStatus - Admin mengubah status review (approved/hidden/reported).
 * Menyembunyikan review TANPA menghapus data.
 * @param {string} id
 * @param {string} status
 */
export async function setReviewStatus(id, status) {
    const { data, error } = await supabase
        .from("reviews")
        .update({ status })
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal mengubah status review");
    return data;
}

/**
 * replyReview - Admin membalas review pelanggan.
 * @param {string} id
 * @param {string} reply - Isi balasan admin
 */
export async function replyReview(id, reply) {
    const { data, error } = await supabase
        .from("reviews")
        .update({ admin_reply: reply, admin_reply_at: new Date().toISOString() })
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal membalas review");
    return data;
}

/**
 * deleteReview - Menghapus review permanen (admin).
 * @param {string} id
 */
export async function deleteReview(id) {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) throw new Error(error.message || "Gagal menghapus review");
}
