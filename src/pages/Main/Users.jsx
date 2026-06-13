import { useEffect, useMemo, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../../services/userService";
import "../../styles/dashboard-home.css";

/**
 * Users Component - Halaman admin untuk CRUD data User dari Supabase.
 *
 * Fitur:
 * - READ   : menampilkan semua user dari Supabase
 * - CREATE : menambah user baru (password ter-hash)
 * - UPDATE : mengubah data user (nama, email, phone, role, status)
 * - DELETE : menghapus user
 */
export default function Users() {
    // State data user dari Supabase
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // State pencarian & filter
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    // State modal Add/Edit
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null); // null = mode Add, ada nilai = mode Edit
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        status: "Active",
    });

    /**
     * loadUsers - Mengambil data user dari Supabase (READ).
     */
    async function loadUsers() {
        setLoading(true);
        setError("");
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message || "Gagal memuat data user");
        } finally {
            setLoading(false);
        }
    }

    // Ambil data user saat halaman pertama kali dibuka
    useEffect(() => {
        loadUsers();
    }, []);

    /**
     * filteredUsers - Hasil filter pencarian (nama/email) dan filter role.
     */
    const filteredUsers = useMemo(() => {
        const q = search.toLowerCase();
        return users.filter((u) => {
            const matchSearch =
                !q ||
                u.full_name?.toLowerCase().includes(q) ||
                u.email?.toLowerCase().includes(q);
            const matchRole = roleFilter === "All" || u.role === roleFilter;
            return matchSearch && matchRole;
        });
    }, [users, search, roleFilter]);

    /**
     * openAddForm - Membuka modal dalam mode tambah user baru.
     */
    function openAddForm() {
        setEditingId(null);
        setForm({
            fullName: "",
            email: "",
            phone: "",
            password: "",
            role: "user",
            status: "Active",
        });
        setIsFormOpen(true);
    }

    /**
     * openEditForm - Membuka modal dalam mode edit user.
     * @param {Object} user - Data user yang akan diedit
     */
    function openEditForm(user) {
        setEditingId(user.id);
        setForm({
            fullName: user.full_name || "",
            email: user.email || "",
            phone: user.phone || "",
            password: "", // password tidak diubah saat edit
            role: user.role || "user",
            status: user.status || "Active",
        });
        setIsFormOpen(true);
    }

    /**
     * handleSubmit - Menyimpan data (CREATE atau UPDATE) ke Supabase.
     */
    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            if (editingId) {
                // Mode UPDATE
                await updateUser(editingId, {
                    full_name: form.fullName,
                    email: form.email,
                    phone: form.phone || null,
                    role: form.role,
                    status: form.status,
                });
            } else {
                // Mode CREATE
                await createUser({
                    fullName: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                });
            }

            setIsFormOpen(false);
            await loadUsers(); // refresh data
        } catch (err) {
            setError(err.message || "Gagal menyimpan data user");
        } finally {
            setSaving(false);
        }
    }

    /**
     * handleDelete - Menghapus user setelah konfirmasi (DELETE).
     * @param {Object} user - Data user yang akan dihapus
     */
    async function handleDelete(user) {
        if (!window.confirm(`Hapus user "${user.full_name}"?`)) return;

        setError("");
        try {
            await deleteUser(user.id);
            await loadUsers(); // refresh data
        } catch (err) {
            setError(err.message || "Gagal menghapus user");
        }
    }

    /**
     * roleTone - Menentukan warna badge berdasarkan role.
     */
    function roleTone(role) {
        return role === "admin" ? "med-badge med-badge--info" : "med-badge med-badge--neutral";
    }

    /**
     * statusTone - Menentukan warna badge berdasarkan status.
     */
    function statusTone(status) {
        return status === "Active" ? "med-badge med-badge--success" : "med-badge med-badge--neutral";
    }

    return (
        <div className="med-customers">
            {/* Header */}
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">Users</div>
                    <div className="med-customers__subtitle">
                        Kelola data user — terhubung langsung ke Supabase ({users.length} user)
                    </div>
                </div>

                <div className="med-customers__actions">
                    {/* Search */}
                    <div className="med-search">
                        <svg className="med-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            className="med-search__input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Filter Role */}
                    <select
                        className="med-select"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        aria-label="Filter role"
                        style={{ width: "auto" }}
                    >
                        <option value="All">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                    <button type="button" className="med-btn med-btn--primary" onClick={openAddForm}>
                        + Add User
                    </button>
                </div>
            </div>

            {/* Pesan error */}
            {error ? (
                <div className="med-badge med-badge--danger" style={{ padding: "10px 14px" }}>
                    {error}
                </div>
            ) : null}

            {/* Tabel */}
            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="med-empty">Memuat data...</div>
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="med-empty">Tidak ada user ditemukan</div>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td className="med-td--strong">{u.full_name}</td>
                                        <td className="med-td--muted">{u.email}</td>
                                        <td className="med-td--muted">{u.phone ?? "-"}</td>
                                        <td>
                                            <span className={roleTone(u.role)}>{u.role}</span>
                                        </td>
                                        <td>
                                            <span className={statusTone(u.status)}>{u.status}</span>
                                        </td>
                                        <td className="med-table__right">
                                            <button
                                                type="button"
                                                className="med-chip"
                                                onClick={() => openEditForm(u)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="med-btn med-btn--ghost"
                                                style={{ minHeight: "28px", padding: "4px 12px", marginLeft: "8px" }}
                                                onClick={() => handleDelete(u)}
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

            {/* Modal Add/Edit */}
            {isFormOpen ? (
                <div className="med-overlay" role="dialog" aria-modal="true" aria-label="User form">
                    <div className="med-modal">
                        <div className="med-modal__head">
                            <div className="med-modal__title">
                                {editingId ? "Edit User" : "Add User"}
                            </div>
                            <button type="button" className="med-modal__close" onClick={() => setIsFormOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <form className="med-form" onSubmit={handleSubmit} noValidate>
                            <div className="med-modal__body">
                                <div className="med-field">
                                    <label className="med-label">Full Name <span className="med-req">*</span></label>
                                    <input
                                        value={form.fullName}
                                        onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                                        placeholder="Dr. Anugrah"
                                        className="med-input"
                                        required
                                    />
                                </div>

                                <div className="med-field">
                                    <label className="med-label">Email <span className="med-req">*</span></label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                        placeholder="user@medicare.com"
                                        className="med-input"
                                        required
                                    />
                                </div>

                                <div className="med-field">
                                    <label className="med-label">Phone</label>
                                    <input
                                        value={form.phone}
                                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                        placeholder="+62 812-3456-7890"
                                        className="med-input"
                                    />
                                </div>

                                {/* Password hanya muncul saat tambah user baru */}
                                {!editingId ? (
                                    <div className="med-field">
                                        <label className="med-label">Password <span className="med-req">*</span></label>
                                        <input
                                            type="password"
                                            value={form.password}
                                            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                                            placeholder="Minimal 6 karakter"
                                            className="med-input"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                ) : null}

                                {/* Role & Status hanya bisa diatur saat edit */}
                                {editingId ? (
                                    <>
                                        <div className="med-field">
                                            <label className="med-label">Role</label>
                                            <select
                                                value={form.role}
                                                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                                                className="med-select"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>

                                        <div className="med-field">
                                            <label className="med-label">Status</label>
                                            <select
                                                value={form.status}
                                                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                                                className="med-select"
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            <div className="med-modal__actions">
                                <button type="button" className="med-btn med-btn--ghost" onClick={() => setIsFormOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="med-btn med-btn--primary" disabled={saving}>
                                    {saving ? "Menyimpan..." : editingId ? "Save Changes" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
