import { useMemo, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import PageHeader from "./components/PageHeader";
import ErrorPage from "./components/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import ordersSeed from "./data/orders.json";
import customersSeed from "./data/customers.json";

function parseCurrency(value) {
    const onlyDigits = String(value).replace(/[^0-9]/g, "");
    return Number(onlyDigits || 0);
}

/**
 * formatRupiah - Memformat angka menjadi tampilan rupiah sederhana
 * @param {number} value - Nilai dalam bentuk angka
 * @returns {string} Nilai terformat dalam bentuk Rp.XX.XXX
 */
function formatRupiah(value) {
    return `Rp.${new Intl.NumberFormat("id-ID").format(value)}`;
}

/**
 * getNextId - Menghasilkan ID 3 digit berikutnya dari daftar item
 * Contoh: jika ID terakhir adalah 005, maka akan menghasilkan 006
 * @param {Array} items - Daftar item yang memiliki properti id
 * @returns {string} ID 3 digit dengan padding nol di depan
 */
function getNextId(items) {
    const maxId = items.reduce((maxValue, item) => {
        const numeric = Number(
            String(item.orderId || item.customerId || "0").replace(/[^0-9]/g, ""),
        );
        return numeric > maxValue ? numeric : maxValue;
    }, 0);

    return maxId + 1;
}

/**
 * App Component - Komponen utama aplikasi dengan routing
 * 
 * Fitur-fitur:
 * - Menampilkan sidebar dengan menu navigasi
 * - Routing menggunakan React Router (Dashboard, Orders, Customers)
 * - Search bar untuk filtering data
 * - State management untuk data orders, customers, dan menu
 */
export default function App() {
    const { pathname } = useLocation();
    // State untuk menyimpan nilai input search
    const [searchQuery, setSearchQuery] = useState("");
    const [ordersData, setOrdersData] = useState(() =>
        ordersSeed.map((order) => ({
            ...order,
            totalPrice: formatRupiah(order.totalPrice),
        })),
    );
    const [customersData, setCustomersData] = useState(customersSeed);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [showCustomerForm, setShowCustomerForm] = useState(false);

    const activeSection =
        pathname === "/"
            ? "dashboard"
            : pathname.startsWith("/orders")
              ? "orders"
              : pathname.startsWith("/customers")
                ? "customers"
                : pathname.startsWith("/errors/400")
                  ? "error-400"
                  : pathname.startsWith("/errors/401")
                    ? "error-401"
                    : pathname.startsWith("/errors/403")
                      ? "error-403"
                      : "dashboard";

    /**
     * dashboardCards - Menghitung statistik dashboard dari data orders
     * Statistik yang dihitung: Total Orders, Total Delivered, Total Canceled, Total Revenue
     * Menggunakan useMemo agar hanya dihitung ulang saat ordersData berubah
     */
    const dashboardCards = useMemo(() => {
        const totalOrders = ordersData.length;
        const totalDelivered = ordersData.filter((item) => item.status === "Completed").length;
        const totalCanceled = ordersData.filter((item) => item.status === "Cancelled").length;
        const totalRevenue = ordersData.reduce(
            (total, item) => total + (item.status === "Cancelled" ? 0 : parseCurrency(item.totalPrice)),
            0,
        );

        return [
            { id: "orders", icon: "cart", value: String(totalOrders), label: "Total Orders" },
            { id: "delivered", icon: "truck", value: String(totalDelivered), label: "Total Delivered" },
            { id: "canceled", icon: "ban", value: String(totalCanceled), label: "Total Canceled" },
            { id: "revenue", icon: "money", value: formatRupiah(totalRevenue), label: "Total Revenue" },
        ];
    }, [ordersData]);

    /**
     * filteredDashboardCards - Kartu dashboard yang difilter berdasarkan search query
     * Search hanya aktif saat di halaman Dashboard
     */
    const filteredDashboardCards = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (activeSection !== "dashboard" || !query) {
            return dashboardCards;
        }

        return dashboardCards.filter((card) =>
            card.label.toLowerCase().includes(query),
        );
    }, [activeSection, dashboardCards, searchQuery]);

    /**
     * filteredOrders - Data orders yang difilter berdasarkan search query
     * Search hanya aktif saat di halaman Orders
     */
    const filteredOrders = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (activeSection !== "orders" || !query) {
            return ordersData;
        }

        return ordersData.filter((order) =>
            [order.orderId, order.customerName, order.status, order.orderDate]
                .join(" ")
                .toLowerCase()
                .includes(query),
        );
    }, [activeSection, ordersData, searchQuery]);

    /**
     * filteredCustomers - Data customers yang difilter berdasarkan search query
     * Search hanya aktif saat di halaman Customers
     */
    const filteredCustomers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (activeSection !== "customers" || !query) {
            return customersData;
        }

        return customersData.filter((customer) =>
            [customer.customerId, customer.customerName, customer.email, customer.phone, customer.loyalty]
                .join(" ")
                .toLowerCase()
                .includes(query),
        );
    }, [activeSection, customersData, searchQuery]);

    /**
     * handleSearchChange - Menangani perubahan input search
     * Dipanggil saat user mengetik di search bar
     */
    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleAddOrder(orderPayload) {
        const nextOrderNumber = String(getNextId(ordersData)).padStart(3, "0");
        const normalizedTotal = formatRupiah(parseCurrency(orderPayload.totalPrice));

        setOrdersData((currentOrders) => [
            {
                orderId: `ORD-${nextOrderNumber}`,
                customerName: orderPayload.customerName.trim(),
                status: orderPayload.status,
                totalPrice: normalizedTotal,
                orderDate: orderPayload.orderDate,
            },
            ...currentOrders,
        ]);

        setShowOrderForm(false);
    }

    /**
     * handleAddCustomer - Menambahkan customer baru dari form Customers
     */
    function handleAddCustomer(customerPayload) {
        const nextCustomerNumber = String(getNextId(customersData)).padStart(3, "0");

        setCustomersData((currentCustomers) => [
            {
                customerId: `CUS-${nextCustomerNumber}`,
                customerName: customerPayload.customerName.trim(),
                email: customerPayload.email.trim(),
                phone: customerPayload.phone.trim(),
                loyalty: customerPayload.loyalty,
            },
            ...currentCustomers,
        ]);

        setShowCustomerForm(false);
    }

    /**
     * pageTitle - Menentukan judul halaman sesuai route yang aktif
     */
    const pageTitle =
        activeSection === "orders"
            ? "Orders"
            : activeSection === "customers"
              ? "Customers"
                            : activeSection === "error-400"
                                ? "Error 400"
                                : activeSection === "error-401"
                                    ? "Error 401"
                                    : activeSection === "error-403"
                                        ? "Error 403"
              : "Dashboard";

    /**
     * pageBreadcrumb - Menentukan breadcrumb sesuai route yang aktif
     */
    const pageBreadcrumb =
        activeSection === "orders"
                        ? ["Home", "Orders", "Order List"]
            : activeSection === "customers"
                            ? ["Home", "Customers", "Customer List"]
                            : activeSection === "error-400"
                                ? ["Home", "Error", "400"]
                                : activeSection === "error-401"
                                    ? ["Home", "Error", "401"]
                                    : activeSection === "error-403"
                                        ? ["Home", "Error", "403"]
                                        : ["Home", "Dashboard"];

    // Mengecek apakah data kosong untuk menampilkan pesan empty state
    const isDashboardEmpty = filteredDashboardCards.length === 0;
    const isOrdersEmpty = filteredOrders.length === 0;
    const isCustomersEmpty = filteredCustomers.length === 0;

    return (
        <div className="min-h-screen bg-latar font-poppins text-teks">
            <div className="flex min-h-screen flex-col lg:flex-row">
                {/* Sidebar Navigation */}
                <Sidebar />

                {/* Main Content Area dengan Routes */}
                <main className="flex-1 p-4 md:p-6 xl:p-8">
                    <Header
                        searchValue={searchQuery}
                        onSearchChange={handleSearchChange}
                    />
                    <div className="mt-6 space-y-6">
                        <PageHeader
                            title={pageTitle}
                            breadcrumb={pageBreadcrumb}
                        >
                            {activeSection === "orders" ? (
                                <button
                                    id="add-button"
                                    type="button"
                                    onClick={() => setShowOrderForm((current) => !current)}
                                >
                                    {showOrderForm ? "Tutup Form" : "Add Orders"}
                                </button>
                            ) : null}
                            {activeSection === "customers" ? (
                                <button
                                    id="add-button"
                                    type="button"
                                    onClick={() => setShowCustomerForm((current) => !current)}
                                >
                                    {showCustomerForm ? "Tutup Form" : "Add Customer"}
                                </button>
                            ) : null}
                        </PageHeader>

                        {/* 
                            Routes Component - Menampilkan komponen sesuai dengan URL path
                            Setiap <Route> mendefinisikan path dan element yang akan ditampilkan
                            path="/" untuk Dashboard, path="/orders" untuk Orders, dll.
                        */}
                        <Routes>
                            {/* Route untuk halaman Dashboard (path: /) */}
                            <Route
                                path="/"
                                element={
                                    <Dashboard
                                        activeSection={activeSection}
                                        cards={filteredDashboardCards}
                                        orders={filteredOrders}
                                        customers={filteredCustomers}
                                        onAddOrder={handleAddOrder}
                                        onAddCustomer={handleAddCustomer}
                                        searchQuery={searchQuery}
                                        isEmpty={isDashboardEmpty}
                                        isOrdersEmpty={isOrdersEmpty}
                                        isCustomersEmpty={isCustomersEmpty}
                                    />
                                }
                            />

                            {/* Route untuk halaman Orders (path: /orders) */}
                            <Route
                                path="/orders"
                                element={
                                    <Orders
                                        orders={filteredOrders}
                                        onAddOrder={handleAddOrder}
                                        isEmpty={isOrdersEmpty}
                                        showForm={showOrderForm}
                                    />
                                }
                            />

                            {/* Route untuk halaman Customers (path: /customers) */}
                            <Route
                                path="/customers"
                                element={
                                    <Customers
                                        customers={filteredCustomers}
                                        onAddCustomer={handleAddCustomer}
                                        isEmpty={isCustomersEmpty}
                                        showForm={showCustomerForm}
                                    />
                                }
                            />

                            <Route
                                path="/errors/400"
                                element={
                                    <ErrorPage
                                        errorCode="400"
                                        description="Bad Request"
                                        image="/img/error-400.svg"
                                    />
                                }
                            />
                            <Route
                                path="/errors/401"
                                element={
                                    <ErrorPage
                                        errorCode="401"
                                        description="Unauthorized"
                                        image="/img/error-401.svg"
                                    />
                                }
                            />
                            <Route
                                path="/errors/403"
                                element={
                                    <ErrorPage
                                        errorCode="403"
                                        description="Forbidden"
                                        image="/img/error-403.svg"
                                    />
                                }
                            />

                            {/* Route untuk halaman 404 Not Found (path: *) */}
                            {/* path="*" mencocokkan semua URL yang belum terdefinisi */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}
