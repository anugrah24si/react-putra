import { useEffect, useMemo, useState } from "react";
import { getBookings, updateBooking, deleteBooking } from "../../services/bookingService";
import "../../styles/dashboard-home.css";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

/**
 * AdminBookings - Halaman admin untuk mengelola SEMUA booking member.
 * Admin dapat mengubah status booking dan menghapusnya (sinkron dengan member).
 */
export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    async function load() {
        setLoading(true);
        setError("");
        try {
            setBookings(await getBookings());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return bookings.filter((b) => {
            const matchSearch = !q || b.user_name?.toLowerCase().includes(q) || b.service_name?.toLowerCase().includes(q);
            const matchStatus = statusFilter === "All" || b.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [bookings, search, statusFilter]);

    // Ubah status booking (langsung tersimpan)
    async function handleStatusChange(booking, newStatus) {
        setError("");
        try {
            await updateBooking(booking.id, { status: newStatus });
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(booking) {
        if (!window.confirm(`Hapus booking "${booking.service_name}" milik ${booking.user_name}?`)) return;
        try {
            await deleteBooking(booking.id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="med-customers">
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">Booking Management</div>
                    <div className="med-customers__subtitle">
                        Kelola semua booking layanan member ({bookings.length} booking)
                    </div>
                </div>
                <div className="med-customers__actions">
                    <div className="med-search">
                        <svg className="med-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari nama / layanan..."
                            className="med-search__input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select className="med-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: "auto" }}>
                        <option value="All">All Status</option>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            {error ? <div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div> : null}

            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Layanan</th>
                                <th>Tanggal</th>
                                <th>Harga</th>
                                <th>Status</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6}><div className="med-empty">Memuat data...</div></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6}><div className="med-empty">Tidak ada booking</div></td></tr>
                            ) : (
                                filtered.map((b) => (
                                    <tr key={b.id}>
                                        <td className="med-td--strong">{b.user_name || "-"}</td>
                                        <td>{b.service_name}</td>
                                        <td className="med-td--muted">{b.booking_date}</td>
                                        <td className="med-td--muted">{b.service_price || "-"}</td>
                                        <td>
                                            <select
                                                className="med-select"
                                                value={b.status}
                                                onChange={(e) => handleStatusChange(b, e.target.value)}
                                                style={{ width: "auto", minHeight: "32px" }}
                                            >
                                                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                        <td className="med-table__right">
                                            <button
                                                type="button"
                                                className="med-btn med-btn--ghost"
                                                style={{ minHeight: "28px", padding: "4px 12px" }}
                                                onClick={() => handleDelete(b)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
