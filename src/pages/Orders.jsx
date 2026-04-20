import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 12;

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
export default function Orders({ orders, onAddOrder, isEmpty, showForm }) {
    // State untuk menyimpan nilai input form order
    const [orderForm, setOrderForm] = useState({
        customerName: "",
        status: "Pending",
        totalPrice: "",
        orderDate: "",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE));

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, orders]);

    useEffect(() => {
        setCurrentPage(1);
    }, [orders]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    /**
     * getOrderStatusClass - Menentukan class CSS berdasarkan status order
     * Setiap status memiliki styling yang berbeda untuk keperluan visual
     * @param {string} status - Status dari order (Preparing, On Delivery, Delivered, Canceled)
     * @returns {string} CSS class untuk styling status badge
     */
    function getOrderStatusClass(status) {
        if (status === "Completed") return "order-status delivered";
        if (status === "Pending") return "order-status preparing";
        return "order-status canceled";
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
        if (!orderForm.customerName.trim() || !orderForm.totalPrice || !orderForm.orderDate) {
            alert("Silakan isi semua field yang wajib");
            return;
        }

        // Panggil callback untuk menambah order
        onAddOrder(orderForm);

        // Reset form ke state awal
        setOrderForm({
            customerName: "",
            status: "Pending",
            totalPrice: "",
            orderDate: "",
        });
    }

    return (
        <div id="dashboard-container">
            <div className="panel-card">
                {/* Judul Panel */}
                <div className="panel-title">Recent Orders</div>

                {showForm ? (
                    <form className="quick-add-form" onSubmit={handleSubmitOrder} noValidate>
                        <input
                            type="text"
                            placeholder="Customer Name"
                            aria-label="Customer name"
                            value={orderForm.customerName}
                            onChange={(event) =>
                                setOrderForm((current) => ({ ...current, customerName: event.target.value }))
                            }
                            required
                        />

                        <select
                            aria-label="Order status"
                            value={orderForm.status}
                            onChange={(event) =>
                                setOrderForm((current) => ({ ...current, status: event.target.value }))
                            }
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <input
                            type="number"
                            min="1"
                            placeholder="Total Price"
                            aria-label="Total price"
                            value={orderForm.totalPrice}
                            onChange={(event) =>
                                setOrderForm((current) => ({ ...current, totalPrice: event.target.value }))
                            }
                            required
                        />

                        <input
                            type="date"
                            aria-label="Order date"
                            value={orderForm.orderDate}
                            onChange={(event) =>
                                setOrderForm((current) => ({ ...current, orderDate: event.target.value }))
                            }
                            required
                        />

                        <button type="submit">Simpan Order</button>
                    </form>
                ) : null}

                {/* Menampilkan pesan kosong jika tidak ada data */}
                {isEmpty ? (
                    <div id="dashboard-empty-state">
                        No orders found
                    </div>
                ) : (
                    <div className="list-panel-stack">
                        {/* Tabel untuk menampilkan daftar orders */}
                        <div className="table-wrapper">
                            <table className="panel-table">
                                {/* Header tabel */}
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer Name</th>
                                        <th>Status</th>
                                        <th>Total Price</th>
                                        <th>Order Date</th>
                                    </tr>
                                </thead>

                                {/* Body tabel - menampilkan setiap order */}
                                <tbody>
                                    {paginatedOrders.map((order) => (
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.customerName}</td>
                                            <td>
                                                <span className={getOrderStatusClass(order.status)}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td>{order.totalPrice}</td>
                                            <td>{order.orderDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-bar">
                            <span className="pagination-info">
                                Halaman {currentPage} dari {totalPages}
                            </span>
                            <div className="pagination-controls">
                                <button
                                    type="button"
                                    className="pagination-button"
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    disabled={currentPage === 1}
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    className="pagination-button"
                                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
