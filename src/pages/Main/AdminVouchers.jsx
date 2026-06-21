import { useEffect, useMemo, useState } from "react";
import { getVouchers, createVoucher, updateVoucher, deleteVoucher } from "../../services/voucherService";
import "../../styles/dashboard-home.css";

const EMPTY = { code: "", title: "", description: "", discount: "", active: true, expires_at: "" };

/**
 * AdminVouchers - Halaman admin untuk CRUD voucher & promo.
 * Voucher yang aktif otomatis tampil di halaman Voucher member.
 */
export default function AdminVouchers() {
    const [vouchers, setVouchers] = useState([]);
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
            setVouchers(await getVouchers());
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
        return vouchers.filter((v) => !q || v.code?.toLowerCase().includes(q) || v.title?.toLowerCase().includes(q));
    }, [vouchers, search]);

    function openAdd() {
        setEditingId(null);
        setForm(EMPTY);
        setIsOpen(true);
    }

    function openEdit(v) {
        setEditingId(v.id);
        setForm({
            code: v.code,
            title: v.title,
            description: v.description || "",
            discount: String(v.discount),
            active: v.active,
            expires_at: v.expires_at || "",
        });
        setIsOpen(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            const payload = {
                code: form.code.trim().toUpperCase(),
                title: form.title.trim(),
                description: form.description.trim() || null,
                discount: Number(form.discount) || 0,
                active: form.active,
                expires_at: form.expires_at || null,
            };
            if (editingId) {
                await updateVoucher(editingId, payload);
            } else {
                await createVoucher(payload);
            }
            setIsOpen(false);
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(v) {
        if (!window.confirm(`Hapus voucher "${v.code}"?`)) return;
        try {
            await deleteVoucher(v.id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="med-customers">
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">Voucher & Promo</div>
                    <div className="med-customers__subtitle">Kelola voucher promo ({vouchers.length} voucher)</div>
                </div>
                <div className="med-customers__actions">
                    <div className="med-search">
                        <svg className="med-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Cari kode / judul..." className="med-search__input" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <button type="button" className="med-btn med-btn--primary" onClick={openAdd}>+ Add Voucher</button>
                </div>
            </div>

            {error ? <div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div> : null}

            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table">
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Judul</th>
                                <th>Diskon</th>
                                <th>Aktif</th>
                                <th>Kedaluwarsa</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={6}><div className="med-empty">Memuat data...</div></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6}><div className="med-empty">Tidak ada voucher</div></td></tr>
                            ) : (
                                filtered.map((v) => (
                                    <tr key={v.id}>
                                        <td className="med-td--strong">{v.code}</td>
                                        <td>{v.title}</td>
                                        <td className="med-td--strong">{v.discount}%</td>
                                        <td>
                                            <span className={v.active ? "med-badge med-badge--success" : "med-badge med-badge--neutral"}>
                                                {v.active ? "Aktif" : "Nonaktif"}
                                            </span>
                                        </td>
                                        <td className="med-td--muted">{v.expires_at || "-"}</td>
                                        <td className="med-table__right">
                                            <button type="button" className="med-chip" onClick={() => openEdit(v)}>Edit</button>
                                            <button type="button" className="med-btn med-btn--ghost" style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }} onClick={() => handleDelete(v)}>Delete</button>
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
                            <div className="med-modal__title">{editingId ? "Edit Voucher" : "Add Voucher"}</div>
                            <button type="button" className="med-modal__close" onClick={() => setIsOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>
                        <form className="med-form" onSubmit={handleSubmit}>
                            <div className="med-modal__body">
                                <div className="med-field">
                                    <label className="med-label">Kode <span className="med-req">*</span></label>
                                    <input className="med-input" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} placeholder="WELCOME10" required />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Judul <span className="med-req">*</span></label>
                                    <input className="med-input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Diskon Member Baru" required />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Deskripsi</label>
                                    <input className="med-input" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Diskon 10% untuk transaksi pertama" />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Diskon (%) <span className="med-req">*</span></label>
                                    <input className="med-input" type="number" min="0" max="100" value={form.discount} onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))} placeholder="10" required />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Tanggal Kedaluwarsa</label>
                                    <input className="med-input" type="date" value={form.expires_at} onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))} />
                                </div>
                                <div className="med-field">
                                    <label className="med-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
                                        Voucher Aktif
                                    </label>
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
