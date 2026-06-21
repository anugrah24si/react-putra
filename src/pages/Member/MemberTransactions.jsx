import { useEffect, useState } from "react";
import { Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { getTransactionsByUser } from "@/services/transactionService";

/**
 * formatRupiah - Format angka menjadi format Rupiah.
 */
function formatRupiah(amount) {
    return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}

/**
 * statusColor - Warna badge sesuai status transaksi.
 */
function statusColor(status) {
    switch (status) {
        case "Paid": return "bg-green-500/15 text-green-600 dark:text-green-400";
        case "Refunded": return "bg-red-500/15 text-red-600 dark:text-red-400";
        default: return "bg-amber-500/15 text-amber-600 dark:text-amber-400"; // Pending
    }
}

/**
 * MemberTransactions - Halaman member untuk melihat riwayat transaksi sendiri.
 */
export default function MemberTransactions() {
    const user = getCurrentUser();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            if (!user?.id) return;
            setLoading(true);
            try {
                setTransactions(await getTransactionsByUser(user.id));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mx-auto max-w-4xl px-4 py-10">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Receipt className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Riwayat Transaksi</h1>
                    <p className="text-sm text-muted-foreground">Daftar transaksi pembayaran kamu</p>
                </div>
            </div>

            {error ? (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            ) : null}

            <Card>
                <CardHeader>
                    <CardTitle>Transaksi</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-sm text-muted-foreground">Memuat...</p>
                    ) : transactions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Belum ada transaksi.</p>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((t) => (
                                <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                                    <div>
                                        <p className="font-medium text-foreground">{t.description}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(t.created_at).toLocaleDateString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">{formatRupiah(t.amount)}</p>
                                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(t.status)}`}>
                                            {t.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
