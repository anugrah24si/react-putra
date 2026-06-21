import { supabase } from "@/lib/supabase";

/**
 * bookingService.js - Operasi data Booking ke Supabase.
 * Dipakai member (buat & lihat booking sendiri) dan admin (CRUD semua booking).
 */

const SELECT = "id, user_id, user_name, service_name, service_price, booking_date, status, notes, created_at";

/**
 * getBookings - Ambil SEMUA booking (untuk admin).
 */
export async function getBookings() {
    const { data, error } = await supabase
        .from("bookings")
        .select(SELECT)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil data booking");
    return data || [];
}

/**
 * getBookingsByUser - Ambil booking milik satu user (untuk member).
 * @param {string} userId
 */
export async function getBookingsByUser(userId) {
    const { data, error } = await supabase
        .from("bookings")
        .select(SELECT)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message || "Gagal mengambil booking");
    return data || [];
}

/**
 * createBooking - Membuat booking baru (member).
 * @param {Object} payload
 */
export async function createBooking(payload) {
    const { data, error } = await supabase
        .from("bookings")
        .insert(payload)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal membuat booking");
    return data;
}

/**
 * updateBooking - Mengubah booking (admin: ubah status, dll).
 * @param {string} id
 * @param {Object} payload
 */
export async function updateBooking(id, payload) {
    const { data, error } = await supabase
        .from("bookings")
        .update(payload)
        .eq("id", id)
        .select(SELECT)
        .single();
    if (error) throw new Error(error.message || "Gagal memperbarui booking");
    return data;
}

/**
 * deleteBooking - Menghapus booking (admin).
 * @param {string} id
 */
export async function deleteBooking(id) {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) throw new Error(error.message || "Gagal menghapus booking");
}
