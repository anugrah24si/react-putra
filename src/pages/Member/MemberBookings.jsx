import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bookingSchema } from "@/schemas/crmSchemas";
import { services } from "@/data/services";
import { getCurrentUser } from "@/lib/auth";
import { createBooking, getBookingsByUser } from "@/services/bookingService";

/**
 * statusColor - Warna badge sesuai status booking.
 */
function statusColor(status) {
    switch (status) {
        case "Confirmed": return "bg-blue-500/15 text-blue-600 dark:text-blue-400";
        case "Completed": return "bg-green-500/15 text-green-600 dark:text-green-400";
        case "Cancelled": return "bg-red-500/15 text-red-600 dark:text-red-400";
        default: return "bg-amber-500/15 text-amber-600 dark:text-amber-400"; // Pending
    }
}

/**
 * MemberBookings - Halaman member untuk memesan layanan & melihat booking sendiri.
 */
export default function MemberBookings() {
    const user = getCurrentUser();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: { service_name: "", booking_date: "", notes: "" },
    });

    // Ambil booking milik member
    async function loadBookings() {
        if (!user?.id) return;
        setLoading(true);
        try {
            setBookings(await getBookingsByUser(user.id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBookings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Submit booking baru
    const onSubmit = async (values) => {
        setSaving(true);
        setError("");
        try {
            const selected = services.find((s) => s.name === values.service_name);
            await createBooking({
                user_id: user.id,
                user_name: user.full_name,
                service_name: values.service_name,
                service_price: selected?.price || null,
                booking_date: values.booking_date,
                notes: values.notes || null,
                status: "Pending",
            });
            reset({ service_name: "", booking_date: "", notes: "" });
            await loadBookings();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const selectedService = watch("service_name");

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CalendarCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Booking Layanan</h1>
                    <p className="text-sm text-muted-foreground">Pesan layanan klinik dan pantau statusnya</p>
                </div>
            </div>

            {error ? (
                <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            ) : null}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Form Booking */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Buat Booking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Layanan</Label>
                                <Select value={selectedService} onValueChange={(v) => setValue("service_name", v, { shouldValidate: true })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih layanan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map((s) => (
                                            <SelectItem key={s.id} value={s.name}>
                                                {s.name} — {s.price}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.service_name ? <p className="text-xs text-destructive">{errors.service_name.message}</p> : null}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="booking_date">Tanggal</Label>
                                <Input id="booking_date" type="date" {...register("booking_date")} />
                                {errors.booking_date ? <p className="text-xs text-destructive">{errors.booking_date.message}</p> : null}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Catatan (opsional)</Label>
                                <Input id="notes" placeholder="Permintaan khusus..." {...register("notes")} />
                            </div>

                            <Button type="submit" className="w-full" disabled={saving}>
                                {saving ? "Memproses..." : "Pesan Sekarang"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Daftar Booking */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Booking Saya</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-sm text-muted-foreground">Memuat...</p>
                        ) : bookings.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Belum ada booking.</p>
                        ) : (
                            <div className="space-y-3">
                                {bookings.map((b) => (
                                    <div key={b.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                                        <div>
                                            <p className="font-medium text-foreground">{b.service_name}</p>
                                            <p className="text-xs text-muted-foreground">{b.booking_date} · {b.service_price || "-"}</p>
                                        </div>
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(b.status)}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
