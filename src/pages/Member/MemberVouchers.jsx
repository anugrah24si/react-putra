import { useEffect, useState } from "react";
import { Gift, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveVouchers } from "@/services/voucherService";

/**
 * MemberVouchers - Halaman member untuk melihat voucher & promo yang aktif.
 */
export default function MemberVouchers() {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                setVouchers(await getActiveVouchers());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Voucher & Promo</h1>
                    <p className="text-sm text-muted-foreground">Penawaran spesial untuk kamu</p>
                </div>
            </div>

            {error ? (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            ) : null}

            {loading ? (
                <p className="text-sm text-muted-foreground">Memuat...</p>
            ) : vouchers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada voucher aktif.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {vouchers.map((v) => (
                        <Card key={v.id} className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">{v.title}</CardTitle>
                                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-sm font-bold text-primary">
                                        {v.discount}%
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-muted-foreground">{v.description}</p>
                                <div className="flex items-center gap-2 rounded-lg border border-dashed border-primary/40 bg-primary/5 px-3 py-2">
                                    <Tag className="h-4 w-4 text-primary" />
                                    <span className="font-mono text-sm font-bold tracking-wider text-primary">{v.code}</span>
                                </div>
                                {v.expires_at ? (
                                    <p className="text-xs text-muted-foreground">
                                        Berlaku sampai {new Date(v.expires_at).toLocaleDateString("id-ID")}
                                    </p>
                                ) : null}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
