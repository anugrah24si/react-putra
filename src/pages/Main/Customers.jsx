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
        if (status === "Active") return "lc-badge lc-badge--success";
        return "lc-badge lc-badge--neutral";
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
        <div className="lc-customers">
            <div className="lc-customers__head">
                <div>
                    <div className="lc-customers__title">Customers</div>
                    <div className="lc-customers__subtitle">Manage your client relationships and history</div>
                </div>

                <div className="lc-customers__actions">
                    <div className="lc-orders__filterwrap">
                        <button
                            type="button"
                            className="lc-btn lc-btn--ghost"
                            onClick={() => setIsFilterOpen((v) => !v)}
                            aria-expanded={isFilterOpen ? "true" : "false"}
                        >
                            <span className="lc-btn__icon" aria-hidden="true">
                                <span />
                            </span>
                            Filter
                        </button>
                        {isFilterOpen ? (
                            <div className="lc-pop">
                                <div className="lc-pop__label">Status</div>
                                <select
                                    className="lc-select"
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

                    <button type="button" className="lc-btn lc-btn--primary" onClick={() => setIsCreateOpen(true)}>
                        + Add Customer
                    </button>
                </div>
            </div>

            <section className="lc-tablecard">
                <div className="lc-tablewrap">
                    <table className="lc-table lc-table--customers">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Last Visit</th>
                                <th className="lc-table__right">Total Spent</th>
                                <th>Status</th>
                                <th className="lc-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isEmpty || filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="lc-empty">No customers found</div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedCustomers.map((c) => (
                                    <tr key={c.id}>
                                        <td className="lc-td--strong">{c.id}</td>
                                        <td className="lc-td--strong">{c.name}</td>
                                        <td className="lc-td--muted">{c.email}</td>
                                        <td className="lc-td--muted">{c.phone ?? "-"}</td>
                                        <td className="lc-td--muted">{c.lastVisit ?? "-"}</td>
                                        <td className="lc-table__right lc-td--strong">{c.totalSpent ?? "Rp 0"}</td>
                                        <td>
                                            <span className={statusTone(c.status || "Active")}>{c.status || "Active"}</span>
                                        </td>
                                        <td className="lc-table__right">
                                            <button
                                                type="button"
                                                className="lc-chip"
                                                onClick={() => alert(`Customer: ${c.id}`)}
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                className="lc-kebab"
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
                <div className="lc-dash-pagination">
                    {/* Prev */}
                    <button
                        type="button"
                        className="lc-page-btn"
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
                            className={`lc-page-btn${effectivePage === page ? " lc-page-btn--active" : ""}`}
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
                        className="lc-page-btn"
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
                <div className="lc-modal" role="dialog" aria-modal="true" aria-label="Add customer">
                    <div className="lc-modal__card">
                        <div className="lc-modal__head">
                            <div>
                                <div className="lc-modal__title">Add Customer</div>
                                <div className="lc-modal__desc">Create a new client profile</div>
                            </div>
                            <button type="button" className="lc-modal__close" onClick={() => setIsCreateOpen(false)}>
                                Close
                            </button>
                        </div>

                        <form className="lc-form" onSubmit={handleSubmitCustomer} noValidate>
                            <label className="lc-field">
                                <span>Name</span>
                                <input
                                    value={customerForm.name}
                                    onChange={(e) => setCustomerForm((c) => ({ ...c, name: e.target.value }))}
                                    placeholder="Sarah Anderson"
                                    required
                                />
                            </label>

                            <label className="lc-field">
                                <span>Email</span>
                                <input
                                    type="email"
                                    value={customerForm.email}
                                    onChange={(e) => setCustomerForm((c) => ({ ...c, email: e.target.value }))}
                                    placeholder="sarah.anderson@email.com"
                                    required
                                />
                            </label>

                            <label className="lc-field">
                                <span>Phone</span>
                                <input
                                    value={customerForm.phone}
                                    onChange={(e) => setCustomerForm((c) => ({ ...c, phone: e.target.value }))}
                                    placeholder="+62 812-3456-7890"
                                />
                            </label>

                            <label className="lc-field">
                                <span>Status</span>
                                <select
                                    value={customerForm.status}
                                    onChange={(e) => setCustomerForm((c) => ({ ...c, status: e.target.value }))}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </label>

                            <label className="lc-field">
                                <span>Total Spent (number)</span>
                                <input
                                    value={customerForm.totalSpent}
                                    onChange={(e) => setCustomerForm((c) => ({ ...c, totalSpent: e.target.value }))}
                                    placeholder="12450000"
                                />
                            </label>

                            <div className="lc-form__actions">
                                <button type="button" className="lc-btn lc-btn--ghost" onClick={() => setIsCreateOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="lc-btn lc-btn--primary">
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
