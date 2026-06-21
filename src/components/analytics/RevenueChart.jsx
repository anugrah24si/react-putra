import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/utils/analytics";

/**
 * RevenueChart - Grafik pendapatan per bulan (12 bulan terakhir).
 * @param {Array} data - [{ name, total }]
 */
export default function RevenueChart({ data = [] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Grafik Pendapatan (12 Bulan)</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <defs>
                            <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2e6ffc" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#2e6ffc" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="currentColor" />
                        <YAxis tick={{ fontSize: 11 }} stroke="currentColor" width={70}
                            tickFormatter={(v) => "Rp" + (v >= 1000000 ? (v / 1000000) + "jt" : v / 1000 + "rb")} />
                        <Tooltip formatter={(v) => formatRupiah(v)} />
                        <Area type="monotone" dataKey="total" stroke="#2e6ffc" strokeWidth={2} fill="url(#revGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
