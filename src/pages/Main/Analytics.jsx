import { Users, UserCheck, UserX, UserPlus, CalendarCheck, Wallet, Star, Gift, FileText, Tag } from "lucide-react";
import StatCard from "../../components/analytics/StatCard";
import RevenueChart from "../../components/analytics/RevenueChart";
import MembershipChart from "../../components/analytics/MembershipChart";
import BookingStatusChart from "../../components/analytics/BookingStatusChart";
import RatingChart from "../../components/analytics/RatingChart";
import MembershipBadge from "../../components/membership/MembershipBadge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAnalytics } from "../../hooks/useAnalytics";
import { formatRupiah } from "../../utils/analytics";
import { NOTE_CATEGORIES } from "../../data/noteCategories";
import "../../styles/dashboard-home.css";

/**
 * Analytics - CRM Analytics Dashboard (admin).
 * Menampilkan seluruh statistik dari data real: member, booking, transaksi,
 * review, voucher, customer notes, top customer, most popular service.
 */
export default function Analytics() {
    const { data, loading, error } = useAnalytics();

    if (loading) return <div className="med-customers"><div className="med-empty">Memuat analytics...</div></div>;
    if (error) return <div className="med-customers"><div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div></div>;
    if (!data) return null;

    const { members, bookings, transactions, reviews, vouchers, notes, topCustomers, popularServices, topRatedService } = data;

    return (
        <div className="med-customers">
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">CRM Analytics Dashboard</div>
                    <div className="med-customers__subtitle">Ringkasan seluruh aktivitas CRM (data real-time dari Supabase)</div>
                </div>
            </div>

            {/* ===== BARIS 1: KPI Utama ===== */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Member" value={members.total} icon={Users} hint={`${members.newThisMonth} baru bulan ini`} />
                <StatCard label="Pendapatan Bulan Ini" value={formatRupiah(transactions.revMonth)} icon={Wallet} />
                <StatCard label="Total Booking" value={bookings.total} icon={CalendarCheck} hint={`${bookings.today} hari ini`} />
                <StatCard label="Average Rating" value={`${reviews.average} ★`} icon={Star} hint={`${reviews.total} review`} />
            </div>

            {/* ===== Customer Analytics ===== */}
            <h3 className="mt-2 font-semibold text-foreground">Customer Analytics</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Member" value={members.total} icon={Users} />
                <StatCard label="Member Baru (Bulan Ini)" value={members.newThisMonth} icon={UserPlus} />
                <StatCard label="Member Aktif" value={members.active} icon={UserCheck} />
                <StatCard label="Member Tidak Aktif" value={members.inactive} icon={UserX} />
            </div>

            {/* ===== BARIS 2: Pendapatan + Membership ===== */}
            <div className="grid gap-4 lg:grid-cols-2">
                <RevenueChart data={transactions.chart} />
                <MembershipChart distribution={members.distribution} />
            </div>

            {/* ===== Transaction KPI ===== */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Total Transaksi" value={transactions.total} icon={Wallet} />
                <StatCard label="Pendapatan Hari Ini" value={formatRupiah(transactions.revToday)} icon={Wallet} />
                <StatCard label="Pendapatan Bulan Ini" value={formatRupiah(transactions.revMonth)} icon={Wallet} />
                <StatCard label="Pendapatan Tahun Ini" value={formatRupiah(transactions.revYear)} icon={Wallet} />
            </div>

            {/* ===== BARIS 3: Booking Status + Rating ===== */}
            <div className="grid gap-4 lg:grid-cols-2">
                <BookingStatusChart byStatus={bookings.byStatus} />
                <RatingChart distribution={reviews.distribution} />
            </div>

            {/* ===== BARIS 4: Top Customer + Most Popular Service ===== */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Top Customer */}
                <Card>
                    <CardHeader><CardTitle>Top Customer</CardTitle></CardHeader>
                    <CardContent>
                        {topCustomers.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Belum ada data.</p>
                        ) : (
                            <div className="space-y-3">
                                {topCustomers.map((c, i) => (
                                    <div key={c.id} className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{c.name}</p>
                                                <p className="text-xs text-muted-foreground">{c.totalTransaction} transaksi</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-foreground">{formatRupiah(c.totalSpending)}</p>
                                            <MembershipBadge level={c.membership_level} showIcon={false} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Most Popular Service */}
                <Card>
                    <CardHeader><CardTitle>Most Popular Service</CardTitle></CardHeader>
                    <CardContent>
                        {popularServices.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Belum ada data.</p>
                        ) : (
                            <div className="space-y-3">
                                {popularServices.map((s, i) => (
                                    <div key={s.name} className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                                            <p className="text-sm font-medium text-foreground">{s.name}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-foreground">{s.total} booking</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {topRatedService ? (
                            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-muted-foreground">Top Rated:</span>
                                <span className="font-medium text-foreground">{topRatedService.name} ({topRatedService.average} ★)</span>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>

            {/* ===== BARIS 5: Voucher + Customer Notes ===== */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Voucher Analytics */}
                <Card>
                    <CardHeader><CardTitle>Voucher Analytics</CardTitle></CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-lg border border-border p-3 text-center">
                                <Tag className="mx-auto mb-1 h-4 w-4 text-primary" />
                                <p className="text-xl font-bold text-foreground">{vouchers.total}</p>
                                <p className="text-xs text-muted-foreground">Total</p>
                            </div>
                            <div className="rounded-lg border border-border p-3 text-center">
                                <Gift className="mx-auto mb-1 h-4 w-4 text-green-500" />
                                <p className="text-xl font-bold text-foreground">{vouchers.active}</p>
                                <p className="text-xs text-muted-foreground">Aktif</p>
                            </div>
                            <div className="rounded-lg border border-border p-3 text-center">
                                <Gift className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                                <p className="text-xl font-bold text-foreground">{vouchers.inactive}</p>
                                <p className="text-xs text-muted-foreground">Tidak Aktif</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Customer Notes Analytics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Customer Notes Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-3 flex gap-4">
                            <div><p className="text-xl font-bold text-foreground">{notes.total}</p><p className="text-xs text-muted-foreground">Total Notes</p></div>
                            <div><p className="text-xl font-bold text-rose-500">{notes.important}</p><p className="text-xs text-muted-foreground">Important</p></div>
                        </div>
                        <div className="space-y-1.5">
                            {NOTE_CATEGORIES.map((cat) => (
                                <div key={cat.value} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{cat.value}</span>
                                    <span className="font-medium text-foreground">{notes.byCategory[cat.value] || 0}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
