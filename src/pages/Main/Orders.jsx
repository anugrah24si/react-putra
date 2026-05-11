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
        if (statusLabel === "Completed") return "med-badge med-badge--success";
        if (statusLabel === "Pending") return "med-badge med-badge--warning";
        if (statusLabel === "Scheduled") return "med-badge med-badge--info";
        return "med-badge med-badge--danger";
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
        <div className="med-orders">
            <div className="med-orders__head">
                <div>
                    <div className="med-orders__title">Orders Management</div>
                    <div className="med-orders__subtitle">Manage all treatment bookings and appointments</div>
                </div>

                <div className="med-orders__actions">
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
                        className="med-btn med-btn--primary"
                        onClick={() => setIsCreateOpen(true)}
                    >
                        + New Order
                    </button>
                </div>
            </div>

            <section className="med-tablecard">
                <div className="med-tablewrap">
                    <table className="med-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Treatment</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="med-table__right">Amount</th>
                                <th className="med-table__right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isEmpty || filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="med-empty">No orders found</div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => {
                                    const statusLabel = displayOrderStatus(order.status);
                                    return (
                                        <tr key={order.id}>
                                            <td className="med-td--strong">{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.item}</td>
                                            <td className="med-td--muted">{order.date ?? "-"}</td>
                                            <td>
                                                <span className={statusTone(statusLabel)}>{statusLabel}</span>
                                            </td>
                                            <td className="med-table__right med-td--strong">{order.total}</td>
                                            <td className="med-table__right">
                                                <button
                                                    type="button"
                                                    className="med-chip"
                                                    onClick={() => alert(`Order: ${order.id}`)}
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
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {!isEmpty && filteredOrders.length > pageSize ? (
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

                    {/* Page numbers */}
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
                <div className="med-overlay" role="dialog" aria-modal="true" aria-label="Create new order">
                    <div className="med-modal">
                        <div className="med-modal__head">
                            <div>
                                <div className="med-modal__title">Create New Order</div>
                            </div>
                            <button type="button" className="med-modal__close" onClick={() => setIsCreateOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <form className="med-form" onSubmit={handleSubmitOrder} noValidate>
                            <div className="med-modal__body">
                                <div className="med-field">
                                    <label className="med-label">Customer</label>
                                    <input
                                        value={orderForm.customer}
                                        onChange={(e) => setOrderForm((c) => ({ ...c, customer: e.target.value }))}
                                        placeholder="Sarah Anderson"
                                        className="med-input"
                                        required
                                    />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Treatment</label>
                                    <input
                                        value={orderForm.item}
                                        onChange={(e) => setOrderForm((c) => ({ ...c, item: e.target.value }))}
                                        placeholder="Facial Diamond Glow"
                                        className="med-input"
                                        required
                                    />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Amount</label>
                                    <input
                                        value={orderForm.total}
                                        onChange={(e) => setOrderForm((c) => ({ ...c, total: e.target.value }))}
                                        placeholder="850000"
                                        className="med-input"
                                        required
                                    />
                                </div>
                                <div className="med-field">
                                    <label className="med-label">Status</label>
                                    <select
                                        value={orderForm.status}
                                        onChange={(e) => setOrderForm((c) => ({ ...c, status: e.target.value }))}
                                        className="med-select"
                                    >
                                        <option value="Preparing">Preparing</option>
                                        <option value="On Delivery">On Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
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
