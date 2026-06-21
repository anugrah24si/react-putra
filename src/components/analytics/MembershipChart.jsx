import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Warna tiap level membership
const COLORS = {
    Bronze: "#b45309",
    Silver: "#94a3b8",
    Gold: "#eab308",
    Platinum: "#06b6d4",
    Diamond: "#8b5cf6",
};

/**
 * MembershipChart - Donut distribusi membership.
 * @param {Object} distribution - { Bronze, Silver, Gold, Platinum, Diamond }
 */
export default function MembershipChart({ distribution = {} }) {
    const data = Object.entries(distribution)
        .map(([name, value]) => ({ name, value }))
        .filter((d) => d.value > 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Distribusi Membership</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <p className="py-12 text-center text-sm text-muted-foreground">Belum ada data</p>
                ) : (
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={COLORS[entry.name] || "#94a3b8"} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
