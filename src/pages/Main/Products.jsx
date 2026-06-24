import { useEffect, useMemo, useState } from "react";
import { getServices, createService, updateService, deleteService } from "../../services/serviceService";
import { useRealtimeSync } from "../../hooks/useRealtimeSync";
import "../../styles/dashboard-home.css";

const EMPTY = { name: "", description: "", price: "", image: "/img/product_treatment.png", active: true };

/**
 * formatRupiahInput - Mengubah input angka menjadi format "Rp X.XXX".
 * Mengambil hanya digit, lalu menambahkan pemisah ribuan & prefix "Rp ".
 * @param {string|number} value
 * @returns {string}
 */
function formatRupiahInput(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  return "Rp " + Number(digits).toLocaleString("id-ID");
}

/**
 * Products - Halaman admin untuk mengelola Layanan/Produk (tabel services).
 * Data tersinkron ke landing (guest) dan halaman booking (member) secara realtime.
 */
export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY);

  // Muat daftar layanan dari Supabase
  async function load() {
    setLoading(true);
    setError("");
    try {
      setItems(await getServices());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Sinkron realtime: perubahan apa pun langsung tampil di sini juga
  useRealtimeSync("services", load);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((s) => !q || s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q));
  }, [items, search]);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY);
    setIsOpen(true);
  }

  function openEdit(s) {
    setEditingId(s.id);
    setForm({
      name: s.name || "",
      description: s.description || "",
      price: formatRupiahInput(s.price),
      image: s.image || "/img/product_treatment.png",
      active: s.active !== false,
    });
    setIsOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: form.price.trim() || null,
        image: form.image.trim() || null,
        active: Boolean(form.active),
      };
      if (editingId) {
        await updateService(editingId, payload);
      } else {
        await createService(payload);
      }
      setIsOpen(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s) {
    if (!window.confirm(`Hapus layanan "${s.name}"?`)) return;
    try {
      await deleteService(s.id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="med-customers">
      <div className="med-customers__head">
        <div>
          <div className="med-customers__title">Products &amp; Layanan</div>
          <div className="med-customers__subtitle">
            Kelola layanan klinik ({items.length} layanan)
            <br />
            <span style={{ fontSize: "0.8rem" }}>
              💡 Perubahan langsung tampil di halaman publik (guest) &amp; booking member.
            </span>
          </div>
        </div>
        <div className="med-customers__actions">
          <div className="med-search">
            <svg className="med-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Cari layanan..." className="med-search__input" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button type="button" className="med-btn med-btn--primary" onClick={openAdd}>+ Add Layanan</button>
        </div>
      </div>

      {error ? <div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>{error}</div> : null}

      <section className="med-tablecard">
        <div className="med-tablewrap">
          <table className="med-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Deskripsi</th>
                <th>Harga</th>
                <th>Status</th>
                <th className="med-table__right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6}><div className="med-empty">Memuat data...</div></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6}><div className="med-empty">Belum ada layanan</div></td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <img
                        src={s.image || "/img/product_treatment.png"}
                        alt={s.name}
                        onError={(e) => { e.target.src = "/img/product_treatment.png"; }}
                        style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }}
                      />
                    </td>
                    <td className="med-td--strong">{s.name}</td>
                    <td className="med-td--muted" style={{ maxWidth: 260 }}>{s.description || "-"}</td>
                    <td className="med-td--strong">{s.price || "-"}</td>
                    <td>
                      <span className={s.active !== false ? "med-badge med-badge--success" : "med-badge med-badge--neutral"}>
                        {s.active !== false ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="med-table__right">
                      <button type="button" className="med-chip" onClick={() => openEdit(s)}>Edit</button>
                      <button type="button" className="med-btn med-btn--ghost" style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }} onClick={() => handleDelete(s)}>Delete</button>
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
              <div className="med-modal__title">{editingId ? "Edit Layanan" : "Add Layanan"}</div>
              <button type="button" className="med-modal__close" onClick={() => setIsOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <form className="med-form" onSubmit={handleSubmit}>
              <div className="med-modal__body">
                <div className="med-field">
                  <label className="med-label">Nama Layanan <span className="med-req">*</span></label>
                  <input className="med-input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Facial Treatment" required />
                </div>
                <div className="med-field">
                  <label className="med-label">Deskripsi</label>
                  <textarea className="med-textarea" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Perawatan wajah premium..." />
                </div>
                <div className="med-field">
                  <label className="med-label">Harga</label>
                  <input className="med-input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: formatRupiahInput(e.target.value) }))} placeholder="Rp 350.000" />
                </div>
                <div className="med-field">
                  <label className="med-label">Gambar (path/URL)</label>
                  <input className="med-input" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="/img/product_treatment.png" />
                </div>
                <div className="med-field">
                  <label className="med-label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
                    Tampilkan di halaman publik (aktif)
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
