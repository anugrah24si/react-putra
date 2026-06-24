import { useEffect, useState, useCallback } from "react";
import { getCurrentUser, saveSession } from "@/lib/auth";
import { getMembershipByUserId } from "@/services/membershipService";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

/**
 * useMembership - Hook untuk mengambil data membership user yang sedang login.
 * Dipakai di Member Dashboard dan komponen lain. Otomatis tersinkron secara
 * realtime: bila admin/transaksi mengubah poin atau level, data ikut diperbarui.
 *
 * @returns {{ membership: Object|null, loading: boolean, error: string, reload: function }}
 */
export function useMembership() {
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Ambil ulang data membership dari Supabase
    const reload = useCallback(async () => {
        const user = getCurrentUser();
        if (!user?.id) {
            setMembership(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        try {
            const data = await getMembershipByUserId(user.id);
            setMembership(data);
            // Jaga sesi di localStorage tetap selaras (level & poin terbaru)
            saveSession({ ...user, ...data });
        } catch (err) {
            setError(err.message || "Gagal memuat membership");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    // Sinkron realtime: pantau baris user ini agar perubahan poin/level langsung tampil
    const currentUser = getCurrentUser();
    useRealtimeSync("users", reload, {
        filter: currentUser?.id ? `id=eq.${currentUser.id}` : null,
        enabled: !!currentUser?.id,
    });

    return { membership, loading, error, reload };
}
