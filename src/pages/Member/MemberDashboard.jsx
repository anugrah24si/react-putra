import { Link } from "react-router-dom";
import { CalendarCheck, Receipt, Gift, Sparkles, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MembershipCard from "@/components/membership/MembershipCard";
import { useMembership } from "@/hooks/useMembership";

/**
 * MemberDashboard - Halaman dashboard untuk member (role = user) yang login.
 * Menampilkan kartu membership dan menu cepat ke fitur member lainnya.
 * (Fitur Booking, Transaksi, dll akan aktif pada tahap berikutnya.)
 */
export default function MemberDashboard() {
    const { membership, loading, error } = useMembership();

    // Menu cepat menuju fitur member
    const quickMenus = [
        { label: "Booking Layanan", desc: "Pesan layanan klinik", icon: CalendarCheck, to: "/member/bookings" },
        { label: "Riwayat Transaksi", desc: "Lihat transaksi kamu", icon: Receipt, to: "/member/transactions" },
        { label: "Voucher & Promo", desc: "Penawaran spesial", icon: Gift, to: "/member/vouchers" },
        { label: "Rating & Review", desc: "Beri ulasan layanan", icon: Star, to: "/member/reviews" },
    ];

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            {/* Sapaan */}
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Halo, {membership?.full_name || "Member"} 👋
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Selamat datang di dashboard member MediCare
                    </p>
                </div>
            </div>

            {error ? (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                </div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Kartu Membership */}
                <div className="lg:col-span-1">
                    {loading ? (
                        <Card>
                            <CardContent className="p-8 text-center text-sm text-muted-foreground">
                                Memuat membership...
                            </CardContent>
                        </Card>
                    ) : (
                        <MembershipCard membership={membership} />
                    )}
                </div>

                {/* Menu cepat */}
                <div className="lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {quickMenus.map((menu) => {
                            const Icon = menu.icon;
                            return (
                                <Card
                                    key={menu.label}
                                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <CardContent className="flex flex-col gap-3 p-6">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground">{menu.label}</h3>
                                            <p className="text-sm text-muted-foreground">{menu.desc}</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-auto w-fit" asChild>
                                            <Link to={menu.to}>Buka</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
