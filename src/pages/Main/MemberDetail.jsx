import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getUserById } from "../../services/userService";
import { getBookingsByUser } from "../../services/bookingService";
import { getTransactionsByUser } from "../../services/transactionService";
import { getReviewsByUser } from "../../services/reviewService";
import { getActiveVouchers } from "../../services/voucherService";
import MembershipBadge from "../../components/membership/MembershipBadge";
import CustomerNotes from "../../components/notes/CustomerNotes";
import "../../styles/dashboard-home.css";

const TABS = ["Profil", "Booking", "Transaksi", "Review", "Voucher", "Customer Notes"];

function formatRupiah(n) {
    return "Rp " + Number(n || 0).toLocaleString("id-ID");
}

/**
 * MemberDetail - Halaman Detail Member untuk admin.
 * Menyatukan seluruh data CRM pelanggan dalam satu tempat (tab).
 */
export default function MemberDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("Profil");
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError("");
            try {
                const [u, bk, tx, rv, vc] = await Promise.all([
                    getUserById(id),
                    getBookingsByUser(id),
                    getTransactionsByUser(id),
                    getReviewsByUser(id),
                    getActiveVouchers(),
                ]);
                setUser(u);
                setBookings(bk);
                setTransactions(tx);
                setReviews(rv);
                setVouchers(vc);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const totalSpent = useMemo(
        () => transactions.filter((t) => t.status === "Paid").reduce((s, t) => s + Number(t.amount || 0), 0),
        [transactions]
    );

    if (loading) return <div className="med-customers"><div className="med-empty">Memuat data member...</div></div>;
    if (error) return <div className="med-customers"><div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div></div>;
    if (!user) return null;

    return (
        <div className="med-customers">
            {/* Header */}
            <div className="med-customers__head">
                <div>
                    <button type="button" className="med-btn med-btn--ghost" onClick={() => navigate("/admin/users")} style={{ marginBottom: "8px" }}>
                        <ArrowLeft size={16} /> Kembali
                    </button>
                    <div className="med-customers__title">{user.full_name}</div>
                    <div className="med-customers__subtitle">{user.email} · {user.role}</div>
                </div>
            </div>

            {/* Tab navigation (switcher sederhana, tanpa library baru) */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderBottom: "1px solid var(--med-border)", paddingBottom: "8px" }}>
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        className={`med-btn ${activeTab === tab ? "med-btn--primary" : "med-btn--ghost"}`}
                        style={{ minHeight: "32px", padding: "6px 14px" }}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Konten tab */}
            <div style={{ marginTop: "8px" }}>
                {activeTab === "Profil" ? (
                    <section className="med-tablecard" style={{ padding: "20px" }}>
                        <div style={{ display: "grid", gap: "12px" }}>
                            <Row label="Nama" value={user.full_name} />
                            <Row label="Email" value={user.email} />
                            <Row label="Telepon" value={user.phone || "-"} />
                            <Row label="Status" value={user.status} />
                            <Row label="Membership" value={<MembershipBadge level={user.membership_level} />} />
                            <Row label="Poin" value={`${user.points ?? 0} poin`} />
                            <Row label="Total Belanja" value={formatRupiah(totalSpent)} />
                        </div>
                    </section>
                ) : null}

                {activeTab === "Booking" ? (
                    <SimpleTable
                        cols={["Layanan", "Tanggal", "Status"]}
                        rows={bookings.map((b) => [b.service_name, b.booking_date, b.status])}
                        empty="Belum ada booking"
                    />
                ) : null}

                {activeTab === "Transaksi" ? (
                    <SimpleTable
                        cols={["Keterangan", "Nominal", "Status"]}
                        rows={transactions.map((t) => [t.description, formatRupiah(t.amount), t.status])}
                        empty="Belum ada transaksi"
                    />
                ) : null}

                {activeTab === "Review" ? (
                    <SimpleTable
                        cols={["Layanan", "Rating", "Ulasan"]}
                        rows={reviews.map((r) => [r.services?.name || "-", "★".repeat(r.rating) + "☆".repeat(5 - r.rating), r.comment || "-"])}
                        empty="Belum ada review"
                    />
                ) : null}

                {activeTab === "Voucher" ? (
                    <SimpleTable
                        cols={["Kode", "Judul", "Diskon"]}
                        rows={vouchers.map((v) => [v.code, v.title, `${v.discount}%`])}
                        empty="Belum ada voucher aktif"
                    />
                ) : null}

                {activeTab === "Customer Notes" ? (
                    <CustomerNotes userId={id} />
                ) : null}
            </div>
        </div>
    );
}

/** Row - Baris label-value untuk tab Profil */
function Row({ label, value }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid var(--med-border)", paddingBottom: "8px" }}>
            <span className="med-td--muted">{label}</span>
            <span className="med-td--strong">{value}</span>
        </div>
    );
}

/** SimpleTable - Tabel ringkas untuk tab booking/transaksi/review/voucher */
function SimpleTable({ cols, rows, empty }) {
    return (
        <section className="med-tablecard">
            <div className="med-tablewrap">
                <table className="med-table">
                    <thead>
                        <tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr><td colSpan={cols.length}><div className="med-empty">{empty}</div></td></tr>
                        ) : (
                            rows.map((r, i) => (
                                <tr key={i}>{r.map((cell, j) => <td key={j} className={j === 0 ? "med-td--strong" : "med-td--muted"}>{cell}</td>)}</tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
