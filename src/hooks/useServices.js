import { useCallback, useEffect, useState } from "react";
import { getServices } from "@/services/serviceService";
import { services as staticServices } from "@/data/services";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

/**
 * useServices - Mengambil daftar layanan dari Supabase (tabel services) dengan
 * sinkron realtime, sehingga perubahan oleh admin langsung tampil di landing
 * (guest) dan halaman booking (member).
 *
 * Fallback aman: bila data DB kosong atau gagal diambil, memakai data statis
 * dari src/data/services.js agar tampilan tetap berfungsi.
 *
 * @param {Object} [options]
 * @param {boolean} [options.activeOnly] - Hanya layanan aktif (untuk publik)
 * @returns {Array} Daftar layanan
 */
export function useServices({ activeOnly = false } = {}) {
    const [list, setList] = useState(staticServices);

    const load = useCallback(async () => {
        try {
            const data = await getServices();
            const arr = data && data.length ? data : staticServices;
            setList(activeOnly ? arr.filter((s) => s.active !== false) : arr);
        } catch {
            setList(staticServices);
        }
    }, [activeOnly]);

    useEffect(() => {
        load();
    }, [load]);

    // Sinkron realtime: layanan yang diubah admin langsung diperbarui
    useRealtimeSync("services", load);

    return list;
}
