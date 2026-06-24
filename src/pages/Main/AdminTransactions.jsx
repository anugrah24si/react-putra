import { useEffect, useMemo, useState } from "react";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../../services/transactionService";
import { syncMembershipFromTransactions } from "../../services/membershipService";
import { getUsers } from "../../services/userService";
import "../../styles/dashboard-home.css";

const STATUSES = ["Paid", "Pending", "Refunded"];
const EMPTY = { user_id: "", description: "", amount: "", status: "Paid" };

function formatRupiah(amount) {
    return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}

/**
 * AdminTransactions - Halaman admin untuk CRUD transaksi member.
 * Transaksi yang dibuat admin otomatis muncul di Riwayat Transaksi member.
 */
export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(EMPTY);

    async function load() {
        setLoading(true);
        setError("");
        try {
            const [tx, us] = await Promise.all([getTransactions(), getUsers()]);
            setTransactions(tx);
            setUsers(us);
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
        return transactions.filter((t) => !q || t.user_name?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q));
    }, [transactions, search]);

    function openAdd() {
        setEditingId(null);
        setForm(EMPTY);
        setIsOpen(true);
    }

    function openEdit(t) {
        setEditingId(t.id);
        setForm({ user_id: t.user_id || "", description: t.description, amount: String(t.amount), status: t.status });
        setIsOpen(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            const selectedUser = users.find((u) => u.id === form.user_id);
            const payload = {
                user_id: form.user_id,
                user_name: selectedUser?.full_name || null,
                description: form.description,
                amount: Number(form.amount) || 0,
                status: form.status,
            };

            // Kumpulkan member yang poin/level-nya perlu disinkronkan ulang.
            // Saat edit, member lama (sebelum diubah) juga ikut disinkronkan
            // agar poinnya terkoreksi bila transaksi dipindah ke member lain.
            const affected = new Set();
            if (editingId) {
                const original = transactions.find((t) => t.id === editingId);
                if (original?.user_id) affected.add(original.user_id);
                await updateTransaction(editingId, payload);
            } else {
                await createTransaction(payload);
            }
            if (form.user_id) affected.add(form.user_id);

            // Hitung ulang poin & level otomatis dari transaksi 'Paid'
            await Promise.all([...affected].map((uid) => syncMembershipFromTransactions(uid)));

            setIsOpen(false);
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(t) {
        if (!window.confirm("Hapus transaksi ini?")) return;
        try {
            await deleteTransaction(t.id);
            // Sinkronkan poin & level member setelah transaksinya dihapus
            if (t.user_id) await syncMembershipFromTransactions(t.user_id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    function statusTone(status) {
        if (status === "Paid") return "med-badge med-badge--success";
        if (status === "Refunded") return "med-badge med-badge--danger";
        return "med-badge med-badge--neutral";
    }

    return (
        <div className="med-customers">
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">Transaction History</div>
                    <div className="med-customers__subtitle">Kelola transaksi member ({transactions.length} transaksi)</div>
                </div>
                <div className="med-customers__actions">
                    <div className="med-search">
                        <svg className="med-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Cari..." className="med-search__input" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <button type="button" className="med-btn med-btn--primary" onClick={openAdd}>+ Add Transaction</button>
                </div>
            </div>

            {error ? <div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div> : null}

            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Keterangan</th>
                                <th>Nominal</th>
                                <th>Status</th>
                                <th>Tanggal</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6}><div className="med-empty">Memuat data...</div></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6}><div className="med-empty">Tidak ada transaksi</div></td></tr>
                            ) : (
                                filtered.map((t) => (
                                    <tr key={t.id}>
                                        <td className="med-td--strong">{t.user_name || "-"}</td>
                                        <td>{t.description}</td>
                                        <td className="med-td--strong">{formatRupiah(t.amount)}</td>
                                        <td><span className={statusTone(t.status)}>{t.status}</span></td>
                                        <td className="med-td--muted">{new Date(t.created_at).toLocaleDateString("id-ID")}</td>
                                        <td className="med-table__right">
                                            <button type="button" className="med-chip" onClick={() => openEdit(t)}>Edit</button>
                                            <button type="button" className="med-btn med-btn--ghost" style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }} onClick={() => handleDelete(t)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {isOpen ? (
                <div className="med-overlay" role="dialog" aria-modal="true">
                    <div className="med-modal">
                        <div className="med-modal__head">
                            <div className="med-modal__title">{editingId ? "Edit Transaction" : "Add Transaction"}</div>
                            <button type="button" className="med-modal__close" onClick={() => setIsOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>
                        <form className="med-form" onSubmit={handleSubmit}>
                            <div className="med-modal__body">
                                <div className="med-field">
                                    <label className="med-label">Member <span className="med-req">*</span></label>
                                    <select className="med-select" value={form.user_id} onChange={(e) => setForm((f) => ({ ...f, user_id: e.target.value }))} required>
                                        <option value="">Pilih member</option>
                                        {users.map((u) => <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>)}
                                    </select>
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Keterangan <span className="med-req">*</span></label>
                                    <input className="med-input" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Pembayaran Facial Treatment" required />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Nominal (Rp) <span className="med-req">*</span></label>
                                    <input className="med-input" type="number" min="0" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="350000" required />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Status</label>
                                    <select className="med-select" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="med-field">
                                    <p className="med-td--muted" style={{ fontSize: "0.8rem", margin: 0 }}>
                                        💡 Poin &amp; level membership dihitung otomatis dari transaksi
                                        berstatus <b>Paid</b> (setiap Rp 10.000 = 1 poin).
                                    </p>
                                </div>
                            </div>
                            <div className="med-modal__actions">
                                <button type="button" className="med-btn med-btn--ghost" onClick={() => setIsOpen(false)}>Cancel</button>
                                <button type="submit" className="med-btn med-btn--primary" disabled={saving}>{saving ? "Menyimpan..." : editingId ? "Save" : "Create"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
