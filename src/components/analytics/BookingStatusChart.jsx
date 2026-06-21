import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Warna tiap status booking
const COLORS = { Pending: "#f59e0b", Confirmed: "#3b82f6", Completed: "#22c55e", Cancelled: "#ef4444" };

/**
 * BookingStatusChart - Bar chart jumlah booking per status.
 * @param {Object} byStatus - { Pending, Confirmed, Completed, Cancelled }
 */
export default function BookingStatusChart({ byStatus = {} }) {
    const data = Object.entries(byStatus).map(([name, total]) => ({ name, total }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Booking per Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="currentColor" />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} stroke="currentColor" />
                        <Tooltip />
                        <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                            {data.map((entry) => (
                                <Cell key={entry.name} fill={COLORS[entry.name] || "#94a3b8"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
