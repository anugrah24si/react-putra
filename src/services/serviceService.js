import { supabase } from "@/lib/supabase";

/**
 * serviceService.js - Operasi data Layanan/Produk (tabel public.services).
 * Dipakai admin (CRUD di halaman Products) dan publik/member (landing & booking).
 * Memakai SELECT "*" agar tetap aman walau kolom 'active' belum ditambahkan
 * (jalankan database/08_products_setup.sql untuk mengaktifkan kolom & izin tulis).
 */

/**
 * getServices - Ambil semua layanan, urut dari yang terbaru dibuat.
 */
export async function getServices() {
    const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });
    if (error) throw new Error(error.message || "Gagal mengambil layanan");
    return data || [];
}

/**
 * createService - Membuat layanan baru (admin).
 * id dibuat unik karena services.id bertipe text (PK).
 * @param {Object} payload - { name, description, price, image, active }
 */
export async function createService(payload) {
    const id =
        typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `svc-${Date.now()}`;

    const { data, error } = await supabase
        .from("services")
        .insert({ id, ...payload })
        .select("*")
        .single();
    if (error) throw new Error(error.message || "Gagal membuat layanan");
    return data;
}

/**
 * updateService - Mengubah layanan (admin).
 * @param {string} id
 * @param {Object} payload
 */
export async function updateService(id, payload) {
    const { data, error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", id)
        .select("*")
        .single();
    if (error) throw new Error(error.message || "Gagal memperbarui layanan");
    return data;
}

/**
 * deleteService - Menghapus layanan (admin).
 * @param {string} id
 */
export async function deleteService(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw new Error(error.message || "Gagal menghapus layanan");
}
