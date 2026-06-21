import { supabase } from "@/lib/supabase";

/**
 * customerNoteService.js - Operasi data Customer Notes ke Supabase.
 * Dipakai admin di halaman Detail Member (tab Customer Notes).
 */

const SELECT = "id, user_id, note_type, note_content, is_important, created_by, created_at, updated_at";

/**
 * getNotesByUser - Ambil catatan milik satu member.
 * Diurutkan: catatan penting (is_important) di atas, lalu terbaru.
 * @param {string} userId
 */
export async function getNotesByUser(userId) {
    const { data, error } = await supabase
        .from("customer_notes")
        .select(SELECT)
        .eq("user_id", userId)
        .order("is_important", { ascending: false })
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil catatan");
    return data || [];
}

/**
 * getAllNotes - Ambil SEMUA catatan (untuk statistik Tahap 8).
 */
export async function getAllNotes() {
    const { data, error } = await supabase
        .from("customer_notes")
        .select(SELECT)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil catatan");
    return data || [];
}

/**
 * createNote - Menambah catatan baru (admin).
 * @param {Object} payload - { user_id, note_type, note_content, is_important, created_by }
 */
export async function createNote(payload) {
    const { data, error } = await supabase
        .from("customer_notes")
        .insert(payload)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal menambah catatan");
    return data;
}

/**
 * updateNote - Mengubah catatan (admin).
 * @param {string} id
 * @param {Object} payload - { note_type, note_content, is_important }
 */
export async function updateNote(id, payload) {
    const { data, error } = await supabase
        .from("customer_notes")
        .update(payload)
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal mengubah catatan");
    return data;
}

/**
 * deleteNote - Menghapus catatan (admin).
 * @param {string} id
 */
export async function deleteNote(id) {
    const { error } = await supabase.from("customer_notes").delete().eq("id", id);
    if (error) throw new Error(error.message || "Gagal menghapus catatan");
}
