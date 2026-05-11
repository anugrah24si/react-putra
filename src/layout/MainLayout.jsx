import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/dashboard-home.css";

const dashboardSidebarSections = [
    { type: "link", label: "Dashboard", to: "/", active: true, icon: "dashboard" },
    { type: "link", label: "Patients", to: "/customers", icon: "patients" },
    {
        type: "group",
        label: "Appointments",
        icon: "appointments",
        items: [
            { label: "All Appointments", to: "/orders" },
            { label: "Calendar View", to: "/orders" },
        ],
    },
    { type: "link", label: "Medical Records", to: "/products", icon: "records" },
    {
        type: "group",
        label: "Staff",
        icon: "staff",
        items: [
            { label: "All Staff", to: "/doctors-and-staff" },
            { label: "Doctor Profiles", to: "/doctors-and-staff" },
            { label: "Departments", to: "/doctors-and-staff" },
            { label: "Shift Management", to: "/doctors-and-staff" },
        ],
    },
    {
        type: "group",
        label: "Billing",
        icon: "billing",
        items: [
            { label: "Overview", to: "/orders" },
            { label: "Invoices", to: "/orders" },
            { label: "Payments", to: "/orders" },
        ],
    },
    { type: "link", label: "Reports", to: "/products", icon: "reports" },
    { type: "link", label: "Analytics", to: "/customers", icon: "analytics" },
    { type: "link", label: "Settings", to: "/products", icon: "settings" },
];

function DashboardSidebarIcon({ type }) {
    const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" };

    if (type === "dashboard") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M2.5 2.5h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M9.5 2.5h4v3.33h-4V2.5Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M9.5 8.5h4v5h-4v-5Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M2.5 10.5h4v3h-4v-3Z" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "patients") {
        return (
            <svg {...common} aria-hidden="true">
                <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.33" />
                <path d="M2.5 13.5c.5-2.67 2.33-4 3.5-4s3 .33 3.5 4" stroke="currentColor" strokeWidth="1.33" />
                <path d="M11 4.5h3M12.5 3v3" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "appointments") {
        return (
            <svg {...common} aria-hidden="true">
                <rect x="2.5" y="3" width="11" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.33" />
                <path d="M5 1.5v3M11 1.5v3M2.5 6.5h11" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "records") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M5 2.5h5.5L13.5 5v8.5h-8.5v-11Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M10.5 2.5V5h3" stroke="currentColor" strokeWidth="1.33" />
                <path d="M6.5 8h3.5M6.5 10h3.5" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "staff") {
        return (
            <svg {...common} aria-hidden="true">
                <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M2.5 13.5c.75-2.5 2.5-3.5 3.5-3.5s2.75.5 3.5 3.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M10.5 5.5h3M12 4v3" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "billing") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M4 2.5h8l-1 11H5L4 2.5Z" stroke="currentColor" strokeWidth="1.33" />
                <path d="M7 6.5h2.5M7 9h3" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "reports") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M3 12.5h10.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M4.5 10V7M8 10V4M11.5 10V6" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    if (type === "analytics") {
        return (
            <svg {...common} aria-hidden="true">
                <path d="M3 12.5V3.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M3 12.5h10.5" stroke="currentColor" strokeWidth="1.33" />
                <path d="M5 9l2-2 2 1.5 3-4" stroke="currentColor" strokeWidth="1.33" />
            </svg>
        );
    }

    return (
        <svg {...common} aria-hidden="true">
            <path d="M3 3h10v10H3V3Z" stroke="currentColor" strokeWidth="1.33" />
            <path d="M6 6h4M6 9h3" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

function DashboardShellHeader() {
    return (
        <header className="med-topbar">
            <div className="med-topbar__titleblock">
                <h1 className="med-topbar__title">Dashboard</h1>
                <p className="med-topbar__subtitle">Welcome back, Dr. Smith</p>
            </div>

            <div className="med-topbar__actions">
                <div className="med-statuspill">
                    <span className="med-statuspill__dot" aria-hidden="true" />
                    <span>Online</span>
                </div>

                <button type="button" className="med-iconbutton" aria-label="Open notifications">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 2.5a3.5 3.5 0 0 0-3.5 3.5v1.25c0 .9-.3 1.78-.84 2.5L2.5 11h11l-1.16-1.25a4 4 0 0 1-.84-2.5V6A3.5 3.5 0 0 0 8 2.5Z" stroke="currentColor" strokeWidth="1.33" />
                        <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.33" />
                    </svg>
                </button>

                <div className="med-avatar" aria-label="Dr. Smith profile">DS</div>
            </div>
        </header>
    );
}

function DashboardSidebar() {
    return (
        <aside className="med-sidebar" aria-label="Main navigation">
            <div className="med-sidebar__brandrow">
                <div className="med-brandmark" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4.5h4v4H3v-4Z" stroke="currentColor" strokeWidth="1.33" />
                        <path d="M9 8.5h4v3H9v-3Z" stroke="currentColor" strokeWidth="1.33" />
                        <path d="M11.67 4.33v2.67M10.33 5.67H13" stroke="currentColor" strokeWidth="1.33" />
                    </svg>
                </div>
                <div className="med-brandcopy">
                    <div className="med-brandcopy__title">MediCare Admin</div>
                    <div className="med-brandcopy__subtitle">Hospital Management</div>
                </div>
            </div>

            <div className="med-sidebar__navwrap">
                <nav className="med-sidebar__nav">
                    {dashboardSidebarSections.map((item) => {
                        if (item.type === "group") {
                            return (
                                <details key={item.label} className="med-group" open>
                                    <summary className="med-navitem med-navitem--summary">
                                        <span className="med-navitem__left">
                                            <span className="med-navicon" aria-hidden="true">
                                                <DashboardSidebarIcon type={item.icon} />
                                            </span>
                                            <span className="med-navitem__label">{item.label}</span>
                                        </span>
                                        <span className="med-chevron" aria-hidden="true" />
                                    </summary>
                                    <div className="med-group__body">
                                        {item.items.map((subItem) => (
                                            <Link key={subItem.label} to={subItem.to} className="med-subitem">
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                </details>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                to={item.to}
                                className={`med-navitem${item.active ? " med-navitem--active" : ""}`}
                            >
                                <span className="med-navitem__left">
                                    <span className="med-navicon" aria-hidden="true">
                                        <DashboardSidebarIcon type={item.icon} />
                                    </span>
                                    <span className="med-navitem__label">{item.label}</span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="med-sidebar__footer">
                <button type="button" className="med-collapsebtn" aria-label="Collapse sidebar">
                    <span className="med-collapsebtn__icon" aria-hidden="true" />
                    <span>Collapse</span>
                </button>
            </div>
        </aside>
    );
}

export default function MainLayout({
    activeSection,
    menuItems,
    onMenuClick,
    onAddMenu,
    onRemoveMenu,
    searchValue,
    onSearchChange,
    theme,
    onToggleTheme,
}) {
    return (
        <div className="med-shell">
            <div className="med-shell__inner">
                <Sidebar
                    activeSection={activeSection}
                    menuItems={menuItems}
                    onMenuClick={onMenuClick}
                    onAddMenu={onAddMenu}
                    onRemoveMenu={onRemoveMenu}
                />

                <main className="med-main">
                    <Header
                        searchValue={searchValue}
                        onSearchChange={onSearchChange}
                        activeSection={activeSection}
                        theme={theme}
                        onToggleTheme={onToggleTheme}
                    />
                    <div className="med-content">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
