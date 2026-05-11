import { useMemo, useState } from "react";

/**
 * Customers Component - Halaman untuk menampilkan dan menambah data pelanggan
 * 
 * Fitur:
 * - Menampilkan daftar pelanggan dalam bentuk grid/kartu
 * - Form untuk menambah pelanggan baru
 * - Search filtering untuk mencari pelanggan
 * 
 * @param {Array} customers - Daftar pelanggan yang akan ditampilkan
 * @param {function} onAddCustomer - Callback untuk menambah pelanggan baru
 * @param {boolean} isEmpty - Status apakah daftar pelanggan kosong (saat search)
 */
export default function Customers({ customers, onAddCustomer, isEmpty }) {
    const [customerForm, setCustomerForm] = useState({
        name: "",
        email: "",
        phone: "",
        status: "Active",
        totalSpent: "",
    });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredCustomers = useMemo(() => {
        if (statusFilter === "All") return customers;
        return customers.filter((c) => (c.status || "Active") === statusFilter);
    }, [customers, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
    const effectivePage = Math.min(currentPage, totalPages);

    const paginatedCustomers = useMemo(() => {
        const startIndex = (effectivePage - 1) * pageSize;
        return filteredCustomers.slice(startIndex, startIndex + pageSize);
    }, [effectivePage, filteredCustomers]);

    function statusTone(status) {
        if (status === "Active") return "med-badge med-badge--success";
        return "med-badge med-badge--neutral";
    }

    /**
     * handleSubmitCustomer - Menangani submit form pelanggan baru
     * Melakukan validasi data sebelum memanggil callback onAddCustomer
     * Mengembalikan form ke state awal setelah submit berhasil
     * @param {Event} event - Event dari form submission
     */
    function handleSubmitCustomer(event) {
        event.preventDefault();

        if (!customerForm.name.trim() || !customerForm.email.trim()) {
            alert("Silakan isi field wajib (name, email)");
            return;
        }

        onAddCustomer(customerForm);

        setCustomerForm({
            name: "",
            email: "",
            phone: "",
            status: "Active",
            totalSpent: "",
        });

        setCurrentPage(1);
        setIsCreateOpen(false);
    }

    return (
        <div className="med-customers">
            <div className="med-customers__head">
                <div>
                    <div className="med-customers__title">Customers</div>
                    <div className="med-customers__subtitle">Manage your client relationships and history</div>
                </div>

                <div className="med-customers__actions">
                    <div className="med-orders__filterwrap">
                        <button
                            type="button"
                            className="med-btn med-btn--ghost"
                            onClick={() => setIsFilterOpen((v) => !v)}
                            aria-expanded={isFilterOpen ? "true" : "false"}
                        >
                            <span className="med-btn__icon" aria-hidden="true">
                                <span />
                            </span>
                            Filter
                        </button>
                        {isFilterOpen ? (
                            <div className="med-pop">
                                <div className="med-pop__label">Status</div>
                                <select
                                    className="med-select"
                                    value={statusFilter}
                                    onChange={(e) => {
                                        setStatusFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    aria-label="Filter status"
                                >
                                    <option value="All">All</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        ) : null}
                    </div>

                    <button type="button" className="med-btn med-btn--primary" onClick={() => setIsCreateOpen(true)}>
                        + Add Customer
                    </button>
                </div>
            </div>

            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table med-table--customers">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Last Visit</th>
                                <th className="med-table__right">Total Spent</th>
                                <th>Status</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isEmpty || filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="med-empty">No customers found</div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedCustomers.map((c) => (
                                    <tr key={c.id}>
                                        <td className="med-td--strong">{c.id}</td>
                                        <td className="med-td--strong">{c.name}</td>
                                        <td className="med-td--muted">{c.email}</td>
                                        <td className="med-td--muted">{c.phone ?? "-"}</td>
                                        <td className="med-td--muted">{c.lastVisit ?? "-"}</td>
                                        <td className="med-table__right med-td--strong">{c.totalSpent ?? "Rp 0"}</td>
                                        <td>
                                            <span className={statusTone(c.status || "Active")}>{c.status || "Active"}</span>
                                        </td>
                                        <td className="med-table__right">
                                            <button
                                                type="button"
                                                className="med-chip"
                                                onClick={() => alert(`Customer: ${c.id}`)}
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                className="med-kebab"
                                                aria-label="More actions"
                                                onClick={() => alert("More actions (coming soon)")}
                                            >
                                                <span />
                                                <span />
                                                <span />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {!isEmpty && filteredCustomers.length > pageSize ? (
                <div className="med-dash-pagination">
                    {/* Prev */}
                    <button
                        type="button"
                        className="med-page-btn"
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        disabled={effectivePage === 1}
                        aria-label="Previous page"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Prev
                    </button>

                    {/* Page number buttons */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            type="button"
                            className={`med-page-num${effectivePage === page ? " med-page-num--active" : ""}`}
                            onClick={() => setCurrentPage(page)}
                            aria-label={`Page ${page}`}
                            aria-current={effectivePage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        type="button"
                        className="med-page-btn"
                        onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                        disabled={effectivePage === totalPages}
                        aria-label="Next page"
                    >
                        Next
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            ) : null}



            {isCreateOpen ? (
                <div className="med-overlay" role="dialog" aria-modal="true" aria-label="Add customer">
                    <div className="med-modal">
                        <div className="med-modal__head">
                            <div>
                                <div className="med-modal__title">Add Customer</div>
                            </div>
                            <button type="button" className="med-modal__close" onClick={() => setIsCreateOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <form className="med-form" onSubmit={handleSubmitCustomer} noValidate>
                            <div className="med-modal__body">
                                <div className="med-field">
                                    <label className="med-label">Name <span className="med-req">*</span></label>
                                    <input
                                        value={customerForm.name}
                                        onChange={(e) => setCustomerForm((c) => ({ ...c, name: e.target.value }))}
                                        placeholder="Sarah Anderson"
                                        className="med-input"
                                        required
                                    />
                                </div>

                                <div className="med-field">
                                    <label className="med-label">Email <span className="med-req">*</span></label>
                                    <input
                                        type="email"
                                        value={customerForm.email}
                                        onChange={(e) => setCustomerForm((c) => ({ ...c, email: e.target.value }))}
                                        placeholder="sarah.anderson@email.com"
                                        className="med-input"
                                        required
                                    />
                                </div>

                                <div className="med-field">
                                    <label className="med-label">Phone</label>
                                    <input
                                        value={customerForm.phone}
                                        onChange={(e) => setCustomerForm((c) => ({ ...c, phone: e.target.value }))}
                                        placeholder="+62 812-3456-7890"
                                        className="med-input"
                                    />
                                </div>

                                <div className="med-field">
                                    <label className="med-label">Status</label>
                                    <select
                                        value={customerForm.status}
                                        onChange={(e) => setCustomerForm((c) => ({ ...c, status: e.target.value }))}
                                        className="med-select"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>

                                <div className="med-field">
                                    <label className="med-label">Total Spent</label>
                                    <input
                                        value={customerForm.totalSpent}
                                        onChange={(e) => setCustomerForm((c) => ({ ...c, totalSpent: e.target.value }))}
                                        placeholder="12450000"
                                        className="med-input"
                                    />
                                </div>
                            </div>

                            <div className="med-modal__actions">
                                <button type="button" className="med-btn med-btn--ghost" onClick={() => setIsCreateOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="med-btn med-btn--primary">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
