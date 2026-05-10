import { useMemo, useState } from "react";

/**
 * Orders Component - Halaman untuk menampilkan dan menambah data orders
 * 
 * Fitur:
 * - Menampilkan daftar orders dalam bentuk tabel
 * - Form untuk menambah order baru
 * - Search filtering untuk mencari orders
 * 
 * @param {Array} orders - Daftar orders yang akan ditampilkan
 * @param {function} onAddOrder - Callback untuk menambah order baru
 * @param {boolean} isEmpty - Status apakah daftar orders kosong (saat search)
 */
export default function Orders({ orders, onAddOrder, isEmpty }) {
    // State untuk menyimpan nilai input form order
    const [orderForm, setOrderForm] = useState({
        customer: "",
        item: "",
        total: "",
        status: "Preparing",
    });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredOrders = useMemo(() => {
        if (statusFilter === "All") return orders;
        return orders.filter((order) => order.status === statusFilter);
    }, [orders, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
    const effectivePage = Math.min(currentPage, totalPages);

    const paginatedOrders = useMemo(() => {
        const startIndex = (effectivePage - 1) * pageSize;
        return filteredOrders.slice(startIndex, startIndex + pageSize);
    }, [effectivePage, filteredOrders]);

    function displayOrderStatus(status) {
        if (status === "Delivered") return "Completed";
        if (status === "Preparing") return "Pending";
        if (status === "On Delivery") return "Scheduled";
        if (status === "Canceled") return "Canceled";
        return status;
    }

    function statusTone(statusLabel) {
        if (statusLabel === "Completed") return "lc-badge lc-badge--success";
        if (statusLabel === "Pending") return "lc-badge lc-badge--warning";
        if (statusLabel === "Scheduled") return "lc-badge lc-badge--info";
        return "lc-badge lc-badge--danger";
    }

    /**
     * handleSubmitOrder - Menangani submit form order baru
     * Melakukan validasi data sebelum memanggil callback onAddOrder
     * Mengembalikan form ke state awal setelah submit berhasil
     * @param {Event} event - Event dari form submission
     */
    function handleSubmitOrder(event) {
        event.preventDefault();

        // Validasi: semua field harus terisi
        if (!orderForm.customer.trim() || !orderForm.item.trim() || !orderForm.total.trim()) {
            alert("Silakan isi semua field yang wajib");
            return;
        }

        // Panggil callback untuk menambah order
        onAddOrder(orderForm);

        // Reset form ke state awal
        setOrderForm({
            customer: "",
            item: "",
            total: "",
            status: "Preparing",
        });

        setCurrentPage(1);
        setIsCreateOpen(false);
    }

    return (
        <div className="lc-orders">
            <div className="lc-orders__head">
                <div>
                    <div className="lc-orders__title">Orders Management</div>
                    <div className="lc-orders__subtitle">Manage all treatment bookings and appointments</div>
                </div>

                <div className="lc-orders__actions">
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
                                    <option value="Delivered">Delivered</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="On Delivery">On Delivery</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        className="lc-btn lc-btn--primary"
                        onClick={() => setIsCreateOpen(true)}
                    >
                        + New Order
                    </button>
                </div>
            </div>

            <section className="lc-tablecard">
                <div className="lc-tablewrap">
                    <table className="lc-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Treatment</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="lc-table__right">Amount</th>
                                <th className="lc-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isEmpty || filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="lc-empty">No orders found</div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => {
                                    const statusLabel = displayOrderStatus(order.status);
                                    return (
                                        <tr key={order.id}>
                                            <td className="lc-td--strong">{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.item}</td>
                                            <td className="lc-td--muted">{order.date ?? "-"}</td>
                                            <td>
                                                <span className={statusTone(statusLabel)}>{statusLabel}</span>
                                            </td>
                                            <td className="lc-table__right lc-td--strong">{order.total}</td>
                                            <td className="lc-table__right">
                                                <button
                                                    type="button"
                                                    className="lc-chip"
                                                    onClick={() => alert(`Order: ${order.id}`)}
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
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {!isEmpty && filteredOrders.length > pageSize ? (
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

                    {/* Page numbers */}
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
                <div className="lc-modal" role="dialog" aria-modal="true" aria-label="Create new order">
                    <div className="lc-modal__card">
                        <div className="lc-modal__head">
                            <div>
                                <div className="lc-modal__title">Create New Order</div>
                                <div className="lc-modal__desc">Add a treatment booking</div>
                            </div>
                            <button type="button" className="lc-modal__close" onClick={() => setIsCreateOpen(false)}>
                                Close
                            </button>
                        </div>

                        <form className="lc-form" onSubmit={handleSubmitOrder} noValidate>
                            <label className="lc-field">
                                <span>Customer</span>
                                <input
                                    value={orderForm.customer}
                                    onChange={(e) => setOrderForm((c) => ({ ...c, customer: e.target.value }))}
                                    placeholder="Sarah Anderson"
                                    required
                                />
                            </label>
                            <label className="lc-field">
                                <span>Treatment</span>
                                <input
                                    value={orderForm.item}
                                    onChange={(e) => setOrderForm((c) => ({ ...c, item: e.target.value }))}
                                    placeholder="Facial Diamond Glow"
                                    required
                                />
                            </label>
                            <label className="lc-field">
                                <span>Amount</span>
                                <input
                                    value={orderForm.total}
                                    onChange={(e) => setOrderForm((c) => ({ ...c, total: e.target.value }))}
                                    placeholder="850000"
                                    required
                                />
                            </label>
                            <label className="lc-field">
                                <span>Status</span>
                                <select
                                    value={orderForm.status}
                                    onChange={(e) => setOrderForm((c) => ({ ...c, status: e.target.value }))}
                                >
                                    <option value="Preparing">Preparing</option>
                                    <option value="On Delivery">On Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
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
