import { useEffect, useState, useCallback } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getMembershipByUserId } from "@/services/membershipService";

/**
 * useMembership - Hook untuk mengambil data membership user yang sedang login.
 * Dipakai nanti di Member Dashboard (Tahap 2) dan komponen lain.
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
        } catch (err) {
            setError(err.message || "Gagal memuat membership");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reload();
    }, [reload]);

    return { membership, loading, error, reload };
}
