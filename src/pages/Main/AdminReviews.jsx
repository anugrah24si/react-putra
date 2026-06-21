import { useEffect, useMemo, useState } from "react";
import { getReviews, setReviewStatus, replyReview, deleteReview } from "../../services/reviewService";
import { computeReviewStats } from "../../utils/review";
import "../../styles/dashboard-home.css";

/**
 * AdminReviews - Halaman admin untuk moderasi review.
 * Fitur: statistik (total, rata-rata, distribusi), sembunyikan/ tampilkan,
 * balas review, dan hapus.
 */
export default function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    // State modal balasan
    const [replyTarget, setReplyTarget] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [saving, setSaving] = useState(false);

    async function load() {
        setLoading(true);
        setError("");
        try {
            setReviews(await getReviews());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    // Statistik (dipakai ulang di Tahap 8 lewat computeReviewStats)
    const stats = useMemo(() => computeReviewStats(reviews), [reviews]);

    const filtered = useMemo(() => {
        if (statusFilter === "All") return reviews;
        return reviews.filter((r) => r.status === statusFilter);
    }, [reviews, statusFilter]);

    async function handleStatus(review, status) {
        setError("");
        try {
            await setReviewStatus(review.id, status);
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete(review) {
        if (!window.confirm("Hapus review ini secara permanen?")) return;
        try {
            await deleteReview(review.id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    function openReply(review) {
        setReplyTarget(review);
        setReplyText(review.admin_reply || "");
    }

    async function submitReply(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            await replyReview(replyTarget.id, replyText);
            setReplyTarget(null);
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    function statusTone(status) {
        if (status === "approved") return "med-badge med-badge--success";
        if (status === "reported") return "med-badge med-badge--danger";
        return "med-badge med-badge--neutral"; // hidden
    }

    return (
        <div className="med-customers">
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">Rating & Review</div>
                    <div className="med-customers__subtitle">Moderasi ulasan pelanggan ({reviews.length} review)</div>
                </div>
                <div className="med-customers__actions">
                    <select className="med-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: "auto" }}>
                        <option value="All">All Status</option>
                        <option value="approved">Approved</option>
                        <option value="hidden">Hidden</option>
                        <option value="reported">Reported</option>
                    </select>
                </div>
            </div>

            {error ? <div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div> : null}

            {/* Statistik */}
            <div className="med-stats-grid">
                <div className="med-statcard">
                    <div className="med-statcard__label">Total Review</div>
                    <div className="med-statcard__value">{stats.total}</div>
                </div>
                <div className="med-statcard">
                    <div className="med-statcard__label">Average Rating</div>
                    <div className="med-statcard__value">{stats.average} ★</div>
                </div>
                <div className="med-statcard" style={{ gridColumn: "span 2" }}>
                    <div className="med-statcard__label">Distribusi Rating</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "8px" }}>
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = stats.distribution[star];
                            const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                            return (
                                <div key={star} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
                                    <span style={{ width: "32px" }}>{star} ★</span>
                                    <div style={{ flex: 1, height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "999px", overflow: "hidden" }}>
                                        <div style={{ width: `${pct}%`, height: "100%", background: "#f59e0b" }} />
                                    </div>
                                    <span style={{ width: "40px", textAlign: "right" }}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tabel review */}
            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Layanan</th>
                                <th>Rating</th>
                                <th>Ulasan</th>
                                <th>Status</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6}><div className="med-empty">Memuat data...</div></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6}><div className="med-empty">Tidak ada review</div></td></tr>
                            ) : (
                                filtered.map((r) => (
                                    <tr key={r.id}>
                                        <td className="med-td--strong">{r.users?.full_name || "-"}</td>
                                        <td>{r.services?.name || "-"}</td>
                                        <td>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                                        <td className="med-td--muted">
                                            {r.comment || "-"}
                                            {r.admin_reply ? <div style={{ fontSize: "12px", color: "#2e6ffc", marginTop: "4px" }}>↳ {r.admin_reply}</div> : null}
                                        </td>
                                        <td><span className={statusTone(r.status)}>{r.status}</span></td>
                                        <td className="med-table__right">
                                            <button type="button" className="med-chip" onClick={() => openReply(r)}>Balas</button>
                                            {r.status === "hidden" ? (
                                                <button type="button" className="med-btn med-btn--ghost" style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }} onClick={() => handleStatus(r, "approved")}>Tampilkan</button>
                                            ) : (
                                                <button type="button" className="med-btn med-btn--ghost" style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }} onClick={() => handleStatus(r, "hidden")}>Sembunyikan</button>
                                            )}
                                            <button type="button" className="med-btn med-btn--ghost" style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }} onClick={() => handleDelete(r)}>Hapus</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Modal balasan admin */}
            {replyTarget ? (
                <div className="med-overlay" role="dialog" aria-modal="true">
                    <div className="med-modal">
                        <div className="med-modal__head">
                            <div className="med-modal__title">Balas Review</div>
                            <button type="button" className="med-modal__close" onClick={() => setReplyTarget(null)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>
                        <form className="med-form" onSubmit={submitReply}>
                            <div className="med-modal__body">
                                <div className="med-field">
                                    <label className="med-label">Balasan untuk {replyTarget.users?.full_name}</label>
                                    <textarea className="med-input" rows={4} value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Terima kasih atas ulasannya..." required />
                                </div>
                            </div>
                            <div className="med-modal__actions">
                                <button type="button" className="med-btn med-btn--ghost" onClick={() => setReplyTarget(null)}>Batal</button>
                                <button type="submit" className="med-btn med-btn--primary" disabled={saving}>{saving ? "Menyimpan..." : "Kirim Balasan"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
