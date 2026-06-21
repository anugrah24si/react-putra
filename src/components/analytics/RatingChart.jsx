import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * RatingChart - Bar chart distribusi rating 1-5 bintang.
 * @param {Object} distribution - { 1, 2, 3, 4, 5 }
 */
export default function RatingChart({ distribution = {} }) {
    const data = [5, 4, 3, 2, 1].map((star) => ({
        name: `${star} ★`,
        total: distribution[star] || 0,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Distribusi Rating</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
                        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} stroke="currentColor" />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="currentColor" width={40} />
                        <Tooltip />
                        <Bar dataKey="total" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
