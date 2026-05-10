import { useMemo, useState } from "react";

const PAGE_SIZE = 5;

export default function Dashboard({ cards, orders, isEmpty }) {
    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
    const effectivePage = Math.min(currentPage, totalPages);

    const pagedOrders = useMemo(() => {
        const start = (effectivePage - 1) * PAGE_SIZE;
        return orders.slice(start, start + PAGE_SIZE);
    }, [effectivePage, orders]);

    function handleExport() {
        const header = ["Order ID", "Customer", "Treatment", "Date", "Status", "Amount"];
        const lines = orders.map((o) => {
            const date = o.date ?? "";
            const status = displayOrderStatus(o.status);
            return [o.id, o.customer, o.item, date, status, o.total]
                .map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`)
                .join(",");
        });

        const csv = [header.join(","), ...lines].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recent-orders.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="lc-dashboard">
            <div className="lc-pagehead">
                <div className="lc-pagehead__title">Dashboard Admin</div>
                <div className="lc-pagehead__subtitle">Selamat datang kembali</div>
            </div>

            {/* ── Stat Cards ───────────────────────────── */}
            <div className="lc-stats">
                {isEmpty ? (
                    <div className="lc-empty">No results found</div>
                ) : (
                    cards.map((card) => (
                        <div key={card.id} className="lc-stat">
                            <div className="lc-stat__top">
                                <div className="lc-stat__icon" aria-label={card.label}>
                                    {card.id === "revenue" && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A886" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="1" x2="12" y2="23" />
                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    )}
                                    {card.id === "clients" && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A886" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    )}
                                    {card.id === "appointments" && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A886" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    )}
                                    {card.id === "treatments" && (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A886" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    )}
                                </div>
                                <div
                                    className={
                                        card.id === "revenue"
                                            ? "lc-pill lc-pill--success"
                                            : card.id === "treatments"
                                              ? "lc-pill lc-pill--danger"
                                              : "lc-pill lc-pill--success"
                                    }
                                >
                                    {card.delta ?? "+0.0%"}
                                </div>
                            </div>
                            <div className="lc-stat__value">{card.value}</div>
                            <div className="lc-stat__label">{card.label}</div>
                        </div>
                    ))
                )}
            </div>

            {/* ── Recent Orders Table ───────────────────── */}
            <section className="lc-tablecard">
                <div className="lc-tablecard__head">
                    <div>
                        <div className="lc-tablecard__title">Recent Orders</div>
                        <div className="lc-tablecard__desc">
                            Latest treatment bookings and appointments
                            {orders.length > 0 && (
                                <span style={{ marginLeft: 8, fontSize: 12, color: "#C9A886", fontWeight: 500 }}>
                                    ({orders.length} total)
                                </span>
                            )}
                        </div>
                    </div>
                    <button type="button" className="lc-export" onClick={handleExport}>
                        <span className="lc-export__icon" aria-hidden="true">
                            <span />
                            <span />
                        </span>
                        Export
                    </button>
                </div>

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
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="lc-empty">No orders found</div>
                                    </td>
                                </tr>
                            ) : (
                                pagedOrders.map((order) => {
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
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination ── */}
                {orders.length > PAGE_SIZE && (
                    <div className="lc-dash-pagination">
                        {/* Prev */}
                        <button
                            type="button"
                            className="lc-page-btn"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={effectivePage === totalPages}
                            aria-label="Next page"
                        >
                            Next
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
