import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const MainLayout = React.lazy(() => import("./layout/MainLayout"));
const Products = React.lazy(() => import("./pages/Main/Products"));
const DoctorsAndStaff = React.lazy(() => import("./pages/Main/DoctorsAndStaff"));
const Users = React.lazy(() => import("./pages/Main/Users"));
const NotFound = React.lazy(() => import("./pages/Main/NotFound"));
const AuthLayout = React.lazy(() => import("./layout/AuthLayout"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));
const PublicLayout = React.lazy(() => import("./layout/PublicLayout"));
const Landing = React.lazy(() => import("./pages/Public/Landing"));
const MemberDashboard = React.lazy(() => import("./pages/Member/MemberDashboard"));
const MemberBookings = React.lazy(() => import("./pages/Member/MemberBookings"));
const MemberTransactions = React.lazy(() => import("./pages/Member/MemberTransactions"));
const MemberVouchers = React.lazy(() => import("./pages/Member/MemberVouchers"));
const MemberReviews = React.lazy(() => import("./pages/Member/MemberReviews"));
const AdminBookings = React.lazy(() => import("./pages/Main/AdminBookings"));
const AdminTransactions = React.lazy(() => import("./pages/Main/AdminTransactions"));
const AdminVouchers = React.lazy(() => import("./pages/Main/AdminVouchers"));
const AdminReviews = React.lazy(() => import("./pages/Main/AdminReviews"));
const MemberDetail = React.lazy(() => import("./pages/Main/MemberDetail"));
const Analytics = React.lazy(() => import("./pages/Main/Analytics"));
import RequireAdmin from "./components/RequireAdmin";
import RequireAuth from "./components/RequireAuth";
import ChatBot from "./components/chatbot/ChatBot";

// Menu sidebar admin (Dashboard digantikan Analytics; Orders & Customers dihapus)
const initialMenuItems = [
    { id: "analytics", label: "Analytics", removable: false },
    { id: "products", label: "Products", removable: false },
    { id: "users", label: "Users", removable: false },
    { id: "bookings", label: "Bookings", removable: false },
    { id: "transactions", label: "Transactions", removable: false },
    { id: "vouchers", label: "Vouchers", removable: false },
    { id: "reviews", label: "Reviews", removable: false },
    { id: "doctors-and-staff", label: "Doctors & Staff", removable: false },
];

/**
 * App Component - Komponen utama aplikasi dengan routing.
 * Area admin dibungkus MainLayout + dijaga RequireAdmin.
 */
export default function App() {
    const location = useLocation();
    const navigate = useNavigate();

    // Menu aktif diturunkan dari URL (untuk highlight sidebar)
    const activeSection = useMemo(() => {
        const path = location.pathname;
        if (path.startsWith("/admin/products")) return "products";
        if (path.startsWith("/admin/doctors-and-staff")) return "doctors-and-staff";
        if (path.startsWith("/admin/users")) return "users";
        if (path.startsWith("/admin/bookings")) return "bookings";
        if (path.startsWith("/admin/transactions")) return "transactions";
        if (path.startsWith("/admin/vouchers")) return "vouchers";
        if (path.startsWith("/admin/reviews")) return "reviews";
        return "analytics"; // default termasuk /admin & /admin/analytics
    }, [location.pathname]);

    const [searchQuery, setSearchQuery] = useState("");
    const [menuItems, setMenuItems] = useState(initialMenuItems);
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem("medicare-theme");
        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
        return "dark";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.body.setAttribute("data-theme", theme);
        window.localStorage.setItem("medicare-theme", theme);
    }, [theme]);

    const filteredMenuItems = useMemo(() => menuItems, [menuItems]);

    // Active menu diturunkan dari URL; Link menangani navigasi.
    function handleSectionChange(sectionId) {
        return sectionId;
    }

    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
    }

    function handleToggleTheme() {
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
    }

    // Menambahkan menu baru ke sidebar
    function handleAddMenu() {
        const newNumber = menuItems.filter((item) => item.id.startsWith("menu-")).length + 1;
        setMenuItems((currentItems) => [
            ...currentItems,
            { id: `menu-${newNumber}`, label: `Menu ${newNumber}`, removable: true },
        ]);
    }

    // Menghapus menu (hanya yang removable). Jika menu aktif dihapus → ke Analytics.
    function handleRemoveMenu(menuId) {
        setMenuItems((currentItems) => {
            const targetItem = currentItems.find((item) => item.id === menuId);
            if (!targetItem?.removable) {
                return currentItems;
            }
            const nextItems = currentItems.filter((item) => item.id !== menuId);
            if (activeSection === menuId) {
                navigate("/admin/analytics");
            }
            return nextItems;
        });
    }

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Auth routes */}
                <Route element={<AuthLayout theme={theme} onToggleTheme={handleToggleTheme} />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>

                {/* Public site (bisa diakses tanpa login) */}
                <Route element={<PublicLayout theme={theme} onToggleTheme={handleToggleTheme} />}>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/member"
                        element={
                            <RequireAuth>
                                <MemberDashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/member/bookings"
                        element={
                            <RequireAuth>
                                <MemberBookings />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/member/transactions"
                        element={
                            <RequireAuth>
                                <MemberTransactions />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/member/vouchers"
                        element={
                            <RequireAuth>
                                <MemberVouchers />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/member/reviews"
                        element={
                            <RequireAuth>
                                <MemberReviews />
                            </RequireAuth>
                        }
                    />
                </Route>

                {/* Admin app (dibungkus MainLayout + dijaga RequireAdmin) */}
                <Route
                    element={
                        <RequireAdmin>
                            <MainLayout
                                activeSection={activeSection}
                                menuItems={filteredMenuItems}
                                onMenuClick={handleSectionChange}
                                onAddMenu={handleAddMenu}
                                onRemoveMenu={handleRemoveMenu}
                                searchValue={searchQuery}
                                onSearchChange={handleSearchChange}
                                theme={theme}
                                onToggleTheme={handleToggleTheme}
                            />
                        </RequireAdmin>
                    }
                >
                    {/* /admin & /dashboard → Analytics (pengganti Dashboard lama) */}
                    <Route path="/dashboard" element={<Navigate to="/admin/analytics" replace />} />
                    <Route path="/admin" element={<Navigate to="/admin/analytics" replace />} />

                    <Route path="/admin/analytics" element={<Analytics />} />
                    <Route path="/admin/products" element={<Products />} />
                    <Route path="/admin/doctors-and-staff" element={<DoctorsAndStaff />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/users/:id" element={<MemberDetail />} />
                    <Route path="/admin/bookings" element={<AdminBookings />} />
                    <Route path="/admin/transactions" element={<AdminTransactions />} />
                    <Route path="/admin/vouchers" element={<AdminVouchers />} />
                    <Route path="/admin/reviews" element={<AdminReviews />} />
                </Route>

                {/* Global fallback */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* AI Chatbot (muncul di seluruh halaman) */}
            <ChatBot />
        </Suspense>
    );
}
