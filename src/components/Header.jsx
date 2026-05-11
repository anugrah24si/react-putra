const pageLabels = {
    dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Dr. Smith' },
    customers: { title: 'Customers', subtitle: 'Manage your client relationships and history' },
    orders: { title: 'Orders', subtitle: 'Manage appointments and treatments' },
    products: { title: 'Products', subtitle: 'Manage medical products and services' },
    'doctors-and-staff': { title: 'Doctors & Staff', subtitle: 'Manage your medical team and staff members' },
};

export default function Header({ searchValue, onSearchChange, activeSection, theme, onToggleTheme }) {
    const meta = pageLabels[activeSection] ?? pageLabels.dashboard;

    return (
        <header className="med-topbar">
            <div className="med-topbar__titleblock">
                <h1 className="med-topbar__title">{meta.title}</h1>
                <p className="med-topbar__subtitle">{meta.subtitle}</p>
            </div>

            <div className="med-topbar__actions">
                <div className="med-search">
                    <span className="med-search__icon" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.33" />
                            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
                        </svg>
                    </span>
                    <input
                        className="med-search__input"
                        type="text"
                        placeholder="Search appointments, clients, treatments..."
                        value={searchValue}
                        onChange={onSearchChange}
                        aria-label="Search"
                    />
                </div>

                <div className="med-statuspill">
                    <span className="med-statuspill__dot" aria-hidden="true" />
                    <span>Online</span>
                </div>

                <button type="button" className="med-iconbutton" aria-label="Notifications">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 2.5a3.5 3.5 0 0 0-3.5 3.5v1.25c0 .9-.3 1.78-.84 2.5L2.5 11h11l-1.16-1.25a4 4 0 0 1-.84-2.5V6A3.5 3.5 0 0 0 8 2.5Z" stroke="currentColor" strokeWidth="1.33" />
                        <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.33" />
                    </svg>
                </button>

                <button
                    type="button"
                    className="med-iconbutton"
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    onClick={onToggleTheme}
                    title={theme === "dark" ? "Light mode" : "Dark mode"}
                >
                    {theme === "dark" ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M12 2.5v2.2M12 19.3v2.2M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2.5 12h2.2M19.3 12h2.2M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4 6.8 6.8 0 0 0 20 14.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>

                <div className="med-avatar med-avatar--small">DS</div>
            </div>
        </header>
    );
}
