import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 12;

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
export default function Customers({ customers, onAddCustomer, isEmpty, showForm }) {
    // State untuk menyimpan nilai input form pelanggan
    const [customerForm, setCustomerForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        loyalty: "Bronze",
    });
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(customers.length / ITEMS_PER_PAGE));

    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return customers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, customers]);

    useEffect(() => {
        setCurrentPage(1);
    }, [customers]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    /**
     * getTierClass - Menentukan class CSS berdasarkan tier/level pelanggan
     * Setiap tier memiliki styling yang berbeda untuk keperluan visual
     * @param {string} tier - Tier pelanggan (Bronze, Silver, Gold, Platinum)
     * @returns {string} CSS class untuk styling tier badge
     */
    function getTierClass(tier) {
        if (tier === "Gold") return "customer-tier gold";
        if (tier === "Silver") return "customer-tier silver";
        return "customer-tier bronze";
    }

    /**
     * handleSubmitCustomer - Menangani submit form pelanggan baru
     * Melakukan validasi data sebelum memanggil callback onAddCustomer
     * Mengembalikan form ke state awal setelah submit berhasil
     * @param {Event} event - Event dari form submission
     */
    function handleSubmitCustomer(event) {
        event.preventDefault();

        // Validasi: semua field yang wajib harus terisi
        if (!customerForm.customerName.trim() || !customerForm.email.trim() || !customerForm.phone.trim()) {
            alert("Silakan isi semua field yang wajib (nama, email, phone)");
            return;
        }

        // Panggil callback untuk menambah pelanggan
        onAddCustomer(customerForm);

        // Reset form ke state awal
        setCustomerForm({
            customerName: "",
            email: "",
            phone: "",
            loyalty: "Bronze",
        });
    }

    return (
        <div id="dashboard-container">
            <div className="panel-card">
                {/* Judul Panel */}
                <div className="panel-title">Customers</div>

                {showForm ? (
                    <form className="quick-add-form" onSubmit={handleSubmitCustomer} noValidate>
                        <input
                            type="text"
                            placeholder="Customer Name"
                            aria-label="Customer name"
                            value={customerForm.customerName}
                            onChange={(event) =>
                                setCustomerForm((current) => ({ ...current, customerName: event.target.value }))
                            }
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            value={customerForm.email}
                            onChange={(event) =>
                                setCustomerForm((current) => ({ ...current, email: event.target.value }))
                            }
                            required
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            aria-label="Phone"
                            value={customerForm.phone}
                            onChange={(event) =>
                                setCustomerForm((current) => ({ ...current, phone: event.target.value }))
                            }
                            required
                        />

                        <select
                            aria-label="Customer loyalty"
                            value={customerForm.loyalty}
                            onChange={(event) =>
                                setCustomerForm((current) => ({ ...current, loyalty: event.target.value }))
                            }
                        >
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                        </select>

                        <button type="submit">Simpan Customer</button>
                    </form>
                ) : null}

                {/* Menampilkan pesan kosong jika tidak ada data */}
                {isEmpty ? (
                    <div id="dashboard-empty-state">
                        No customers found
                    </div>
                ) : (
                    <div className="list-panel-stack">
                        {/* Grid untuk menampilkan daftar pelanggan dalam bentuk kartu */}
                        <div className="customers-grid">
                            {paginatedCustomers.map((customer) => (
                                <article key={customer.customerId} className="customer-card">
                                    {/* Header kartu berisi nama, email, dan tier */}
                                    <div className="customer-head">
                                        <div>
                                            <p className="customer-name">{customer.customerName}</p>
                                            <p className="customer-email">{customer.email}</p>
                                        </div>
                                        {/* Badge tier dengan styling yang sesuai */}
                                        <span className={getTierClass(customer.loyalty)}>
                                            {customer.loyalty}
                                        </span>
                                    </div>

                                    {/* Meta information berisi ID, kota, dan total pesanan */}
                                    <div className="customer-meta">
                                        <span>{customer.customerId}</span>
                                        <span>{customer.phone}</span>
                                    </div>
                                </article>
                            ))}
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
