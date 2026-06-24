import { useEffect, useRef, useId } from "react";
import { supabase } from "@/lib/supabase";

/**
 * useRealtimeSync - Berlangganan perubahan tabel Supabase secara realtime.
 *
 * Saat terjadi INSERT/UPDATE/DELETE pada tabel (opsional difilter per kolom),
 * callback onChange dipanggil agar halaman memuat ulang data terbaru. Dengan
 * begini, perubahan yang dilakukan admin langsung tampil di akun member tanpa
 * perlu refresh manual.
 *
 * Catatan: butuh Realtime diaktifkan untuk tabel terkait (jalankan
 * database/07_realtime_sync_setup.sql). Jika belum diaktifkan, halaman tetap berfungsi
 * normal — hanya saja update live belum berjalan (tidak menimbulkan error).
 *
 * @param {string} table - Nama tabel (mis. "bookings")
 * @param {function} onChange - Dipanggil saat ada perubahan data
 * @param {Object} [options]
 * @param {string|null} [options.filter] - Filter realtime, mis. "user_id=eq.<uuid>"
 * @param {boolean} [options.enabled] - Aktif/tidaknya langganan (default true)
 */
export function useRealtimeSync(table, onChange, { filter = null, enabled = true } = {}) {
    // Simpan callback terbaru di ref agar tidak perlu resubscribe tiap render
    const handlerRef = useRef(onChange);
    useEffect(() => {
        handlerRef.current = onChange;
    }, [onChange]);

    // ID unik per instance hook → nama channel tidak bentrok walau beberapa
    // komponen berlangganan tabel yang sama (mis. TrustBar & TestimonialsSection).
    const instanceId = useId();

    useEffect(() => {
        if (!table || !enabled) return;

        // Konfigurasi event perubahan (semua tipe: insert/update/delete)
        const changeConfig = { event: "*", schema: "public", table };
        if (filter) changeConfig.filter = filter;

        const channel = supabase
            .channel(`rt:${table}:${filter || "all"}:${instanceId}`)
            .on("postgres_changes", changeConfig, () => {
                handlerRef.current?.();
            })
            .subscribe();

        // Bersihkan langganan saat komponen unmount / dependency berubah
        return () => {
            supabase.removeChannel(channel);
        };
    }, [table, filter, enabled, instanceId]);

    // Cadangan keandalan: muat ulang data saat tab kembali aktif/fokus,
    // sehingga perubahan yang sempat terlewat oleh realtime tetap tersinkron.
    useEffect(() => {
        if (!enabled) return;

        const refreshIfVisible = () => {
            if (document.visibilityState === "visible") {
                handlerRef.current?.();
            }
        };

        window.addEventListener("focus", refreshIfVisible);
        document.addEventListener("visibilitychange", refreshIfVisible);
        return () => {
            window.removeEventListener("focus", refreshIfVisible);
            document.removeEventListener("visibilitychange", refreshIfVisible);
        };
    }, [enabled]);
}
