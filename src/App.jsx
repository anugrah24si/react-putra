import React, { Suspense, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import customerSeed from "./data/customers.json";
import orderSeed from "./data/orders.json";
//import Loading from "./components/Loading";
// import Orders from "./pages/Main/Orders";
// import MainLayout from "./layout/MainLayout";
// import Dashboard from "./pages/Main/Dashboard";
// import Customers from "./pages/Main/Customers";
// import NotFound from "./pages/Main/NotFound";
// import AuthLayout from "./layout/AuthLayout";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import Forgot from "./pages/Auth/Forgot";

const MainLayout = React.lazy(() => import("./layout/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Main/Orders"));
const Customers = React.lazy(() => import("./pages/Main/Customers"));
const Products = React.lazy(() => import("./pages/Main/Products"));
const DoctorsAndStaff = React.lazy(() => import("./pages/Main/DoctorsAndStaff"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const NotFound = React.lazy(() => import("./pages/Main/NotFound"));
const AuthLayout = React.lazy(() => import("./layout/AuthLayout"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));




// Data awal untuk menu sidebar
const initialMenuItems = [
    { id: "dashboard", label: "Dashboard", removable: false },
    { id: "orders", label: "Orders", removable: false },
    { id: "customers", label: "Customers", removable: false },
    { id: "products", label: "Products", removable: false },
    { id: "doctors-and-staff", label: "Doctors & Staff", removable: false },
];

const orderStatusMap = {
    Pending: "Preparing",
    Completed: "Delivered",
    Cancelled: "Canceled",
};

function buildOrderRows(rawOrders) {
    return rawOrders.map((order) => ({
        id: order.orderId,
        customer: order.customerName,
        item: "Treatment Booking",
        total: formatRupiah(order.totalPrice),
        status: orderStatusMap[order.status] ?? order.status,
        date: order.orderDate,
    }));
}

function buildCustomerRows(rawCustomers, rawOrders) {
    const summaryByCustomer = rawOrders.reduce((summary, order) => {
        const key = order.customerName.trim().toLowerCase();
        const orderDate = order.orderDate ?? "";
        const totalPrice = Number(order.totalPrice || 0);
        const currentSummary = summary[key] ?? {
            totalSpent: 0,
            totalOrder: 0,
            lastVisit: "",
        };

        summary[key] = {
            totalSpent: currentSummary.totalSpent + totalPrice,
            totalOrder: currentSummary.totalOrder + 1,
            lastVisit: orderDate > currentSummary.lastVisit ? orderDate : currentSummary.lastVisit,
        };

        return summary;
    }, {});

    return rawCustomers.map((customer) => {
        const summary = summaryByCustomer[customer.customerName.trim().toLowerCase()] ?? {
            totalSpent: 0,
            totalOrder: 0,
            lastVisit: "",
        };

        return {
            id: customer.customerId,
            name: customer.customerName,
            email: customer.email,
            phone: customer.phone,
            lastVisit: summary.lastVisit || "-",
            totalSpent: formatRupiah(summary.totalSpent),
            status: "Active",
            city: "Unknown",
            tier: customer.loyalty,
            totalOrder: summary.totalOrder,
        };
    });
}

/**
 * parseRupiah - Mengubah teks rupiah seperti Rp.78.000 menjadi angka
 * @param {string|number} value - Nilai dalam format rupiah atau angka
 * @returns {number} Nilai dalam bentuk angka untuk keperluan kalkulasi
 */
function parseRupiah(value) {
    const onlyDigits = String(value).replace(/[^0-9]/g, "");
    return Number(onlyDigits || 0);
}

/**
 * formatRupiah - Memformat angka menjadi tampilan rupiah sederhana
 * @param {number} value - Nilai dalam bentuk angka
 * @returns {string} Nilai terformat dalam bentuk Rp.XX.XXX
 */
function formatRupiah(value) {
    return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
}

const orderRows = buildOrderRows(orderSeed);
const customerRows = buildCustomerRows(customerSeed, orderSeed);

/**
 * getNextId - Menghasilkan ID 3 digit berikutnya dari daftar item
 * Contoh: jika ID terakhir adalah 005, maka akan menghasilkan 006
 * @param {Array} items - Daftar item yang memiliki properti id
 * @returns {string} ID 3 digit dengan padding nol di depan
 */
function getNextId(items) {
    const maxId = items.reduce((maxValue, item) => {
        const numeric = Number(String(item.id).replace(/[^0-9]/g, ""));
        return numeric > maxValue ? numeric : maxValue;
    }, 0);

    return String(maxId + 1).padStart(3, "0");
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
    const location = useLocation();
    const navigate = useNavigate();

    const activeSection = useMemo(() => {
        const path = location.pathname;
        if (path.startsWith("/orders")) return "orders";
        if (path.startsWith("/customers")) return "customers";
        if (path.startsWith("/products")) return "products";
        if (path.startsWith("/doctors-and-staff")) return "doctors-and-staff";
        return "dashboard";
    }, [location.pathname]);

    // State untuk menyimpan nilai input search
    const [searchQuery, setSearchQuery] = useState("");
    // State untuk menyimpan daftar menu di sidebar
    const [menuItems, setMenuItems] = useState(initialMenuItems);
    // State untuk menyimpan data orders
    const [ordersData, setOrdersData] = useState(orderRows);
    // State untuk menyimpan data customers
    const [customersData, setCustomersData] = useState(customerRows);

    /**
     * dashboardCards - Menghitung statistik dashboard dari data orders
     * Statistik yang dihitung: Total Orders, Total Delivered, Total Canceled, Total Revenue
     * Menggunakan useMemo agar hanya dihitung ulang saat ordersData berubah
     */
    const dashboardCards = useMemo(() => {
        const totalRevenue = ordersData.reduce(
            (total, item) => total + (item.status === "Canceled" ? 0 : parseRupiah(item.total)),
            0,
        );

        const activeClients = customersData.length;
        const appointments = ordersData.length;
        const treatmentSessions = ordersData.filter((item) => item.status === "Delivered").length;

        return [
            { id: "revenue", value: formatRupiah(totalRevenue), label: "Total Revenue", delta: "+12.5%" },
            { id: "clients", value: String(activeClients), label: "Active Clients", delta: "+8.2%" },
            { id: "appointments", value: String(appointments), label: "Appointments", delta: "+23.1%" },
            { id: "treatments", value: String(treatmentSessions), label: "Treatment Sessions", delta: "-2.4%" },
        ];
    }, [customersData.length, ordersData]);

    /**
     * filteredMenuItems - Menu yang sudah difilter berdasarkan search
     * Saat ini mengembalikan semua menu (tidak difilter)
     */
    const filteredMenuItems = useMemo(() => {
        return menuItems;
    }, [menuItems]);

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
            [order.id, order.customer, order.item, order.status]
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
            [
                customer.id,
                customer.name,
                customer.email,
                customer.city,
                customer.tier,
                customer.phone,
                customer.status,
            ]
                .join(" ")
                .toLowerCase()
                .includes(query),
        );
    }, [activeSection, customersData, searchQuery]);

    /**
     * handleSectionChange - Mengubah menu yang sedang aktif
     * Dipanggil saat user mengklik menu di sidebar
     */
    function handleSectionChange(sectionId) {
        // Active menu is derived from URL; Link handles navigation.
        // Keep callback for Sidebar API compatibility.
        return sectionId;
    }

    /**
     * handleSearchChange - Menangani perubahan input search
     * Dipanggil saat user mengetik di search bar
     */
    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    /**
     * handleAddMenu - Menambahkan menu baru ke sidebar
     * Menu baru bernama "Menu N" dan dapat dihapus (removable: true)
     */
    function handleAddMenu() {
        const newNumber = menuItems.filter((item) => item.id.startsWith("menu-")).length + 1;

        setMenuItems((currentItems) => [
            ...currentItems,
            {
                id: `menu-${newNumber}`,
                label: `Menu ${newNumber}`,
                removable: true,
            },
        ]);
    }

    /**
     * handleAddOrder - Menambahkan order baru dari form Orders
     * Juga sinkronisasi dengan data customers
     */
    function handleAddOrder(orderPayload) {
        const newOrderId = getNextId(ordersData);
        const normalizedTotal = formatRupiah(parseRupiah(orderPayload.total));
        const today = new Date().toISOString().slice(0, 10);
        const orderAmount = parseRupiah(normalizedTotal);

        setOrdersData((currentOrders) => [
            {
                id: `ORD-${newOrderId}`,
                customer: orderPayload.customer.trim(),
                item: orderPayload.item.trim(),
                total: normalizedTotal,
                status: orderPayload.status,
                date: today,
            },
            ...currentOrders,
        ]);

        // Sinkronkan customer: jika sudah ada, totalOrder naik; jika belum, buat baru
        setCustomersData((currentCustomers) => {
            const targetName = orderPayload.customer.trim().toLowerCase();
            const existingCustomer = currentCustomers.find(
                (customer) => customer.name.toLowerCase() === targetName,
            );

            if (existingCustomer) {
                return currentCustomers.map((customer) =>
                    customer.name.toLowerCase() === targetName
                        ? {
                              ...customer,
                              totalOrder: Number(customer.totalOrder || 0) + 1,
                              lastVisit: today,
                              status: "Active",
                              totalSpent: formatRupiah(parseRupiah(customer.totalSpent) + orderAmount),
                          }
                        : customer,
                );
            }

            return [
                {
                    id: `CUST-${getNextId(currentCustomers)}`,
                    name: orderPayload.customer.trim(),
                    email: `${orderPayload.customer.trim().replace(/\s+/g, "").toLowerCase()}@email.com`,
                    phone: "-",
                    lastVisit: today,
                    totalSpent: formatRupiah(orderAmount),
                    status: "Active",
                    totalOrder: 1,
                    city: "Unknown",
                    tier: "Bronze",
                },
                ...currentCustomers,
            ];
        });
    }

    /**
     * handleAddCustomer - Menambahkan customer baru dari form Customers
     */
    function handleAddCustomer(customerPayload) {
        const newCustomerId = getNextId(customersData);
        const today = new Date().toISOString().slice(0, 10);

        setCustomersData((currentCustomers) => [
            {
                id: `CUST-${newCustomerId}`,
                name: customerPayload.name.trim(),
                email: customerPayload.email.trim(),
                phone: (customerPayload.phone ?? "").trim() || "-",
                lastVisit: customerPayload.lastVisit || today,
                totalSpent: formatRupiah(parseRupiah(customerPayload.totalSpent || 0)),
                status: customerPayload.status || "Active",
                totalOrder: Number(customerPayload.totalOrder || 0),
                city: typeof customerPayload.city === "string" ? customerPayload.city.trim() : "Unknown",
                tier: customerPayload.tier || "Bronze",
            },
            ...currentCustomers,
        ]);
    }

    /**
     * handleRemoveMenu - Menghapus menu dari sidebar
     * Hanya menu dengan removable=true yang boleh dihapus
     * Jika menu yang dihapus adalah yang aktif, fokus berpindah ke menu lain
     */
    function handleRemoveMenu(menuId) {
        setMenuItems((currentItems) => {
            const targetItem = currentItems.find((item) => item.id === menuId);

            // Hanya menu dengan removable=true yang boleh dihapus
            if (!targetItem?.removable) {
                return currentItems;
            }

            const nextItems = currentItems.filter((item) => item.id !== menuId);

            if (activeSection === menuId) {
                navigate("/");
            }

            return nextItems;
        });
    }

    // Mengecek apakah data kosong untuk menampilkan pesan empty state
    const isDashboardEmpty = filteredDashboardCards.length === 0;
    const isOrdersEmpty = filteredOrders.length === 0;
    const isCustomersEmpty = filteredCustomers.length === 0;

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Auth routes (explicit paths) */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>

                {/* Main app (wrapped by MainLayout) */}
                <Route
                    element={<MainLayout
                        activeSection={activeSection}
                        menuItems={filteredMenuItems}
                        onMenuClick={handleSectionChange}
                        onAddMenu={handleAddMenu}
                        onRemoveMenu={handleRemoveMenu}
                        searchValue={searchQuery}
                        onSearchChange={handleSearchChange}
                    />}
                >
                    {/* Redirect /dashboard → / agar tidak masuk NotFound */}
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />

                    <Route
                        path="/"
                        element={
                            <Dashboard
                                cards={filteredDashboardCards}
                                orders={filteredOrders}
                                isEmpty={isDashboardEmpty}
                            />
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <Orders
                                orders={filteredOrders}
                                onAddOrder={handleAddOrder}
                                isEmpty={isOrdersEmpty}
                            />
                        }
                    />

                    <Route
                        path="/customers"
                        element={
                            <Customers
                                customers={filteredCustomers}
                                onAddCustomer={handleAddCustomer}
                                isEmpty={isCustomersEmpty}
                            />
                        }
                    />

                    {/* Route untuk halaman Products - Menampilkan daftar semua produk */}
                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    {/* Route untuk halaman Doctors & Staff - Mengelola tim medis dan staf */}
                    <Route
                        path="/doctors-and-staff"
                        element={<DoctorsAndStaff />}
                    />

                    {/* Route dinamis untuk halaman ProductDetail - Menerima ID produk dari URL */}
                    <Route
                        path="/products/:id"
                        element={<ProductDetail />}
                    />

                </Route>

                {/* Global fallback - NotFound standalone tanpa sidebar */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}
