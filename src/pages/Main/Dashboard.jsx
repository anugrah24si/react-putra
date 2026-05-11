const appointmentItems = [
    { initials: "EW", name: "Emma Wilson", type: "Consultation", time: "09:00 AM", status: "confirmed" },
    { initials: "MB", name: "Michael Brown", type: "Follow-up", time: "10:30 AM", status: "pending" },
    { initials: "SD", name: "Sarah Davis", type: "Surgery", time: "02:15 PM", status: "confirmed" },
    { initials: "JJ", name: "James Johnson", type: "Consultation", time: "04:00 PM", status: "confirmed" },
];

const activityItems = [
    { icon: "patient", label: "New patient registered", name: "Alice Cooper", time: "5 min ago", accent: "#2E6FFC" },
    { icon: "check", label: "Appointment completed", name: "Bob Wilson", time: "15 min ago", accent: "#00C046" },
    { icon: "lab", label: "Lab results uploaded", name: "Carol Smith", time: "32 min ago", accent: "#FF5710" },
    { icon: "prescription", label: "Prescription updated", name: "David Lee", time: "1 hour ago", accent: "#A329FB" },
];

const quickActions = [
    { label: "Add New Patient", icon: "patient", primary: true },
    { label: "Schedule Appointment", icon: "calendar" },
    { label: "View Lab Results", icon: "lab" },
    { label: "Emergency Alert", icon: "alert" },
];

const statMeta = {
    clients: { label: "Total Patients", icon: "patients", accent: "#2E6FFC" },
    appointments: { label: "Today's Appointments", icon: "calendar", accent: "#00C046" },
    treatments: { label: "Active Cases", icon: "active", accent: "#FF5710" },
    revenue: { label: "Critical Alerts", icon: "alert", accent: "#FF020E" },
};

function StatIcon({ type, color }) {
    if (type === "patients") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 20.5c.5-3.5 2.67-5.5 5-5.5h6c2.33 0 4.5 2 5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
            </svg>
        );
    }

    if (type === "calendar") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="17" rx="2.5" stroke={color} strokeWidth="1.8" />
                <path d="M8 2.75v4.5M16 2.75v4.5M3 9h18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === "active") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 12h4l3-9 4 16 2.5-7H21" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8" />
            <path d="M12 7.5v5l3 1.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ActivityIcon({ type, color }) {
    if (type === "patient") {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
                <path d="M4 20c.75-3.5 3-5 8-5s7.25 1.5 8 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === "check") {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 7 9 18l-5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    if (type === "lab") {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 3h6M10 3v6l-4.5 8.2A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.7-2.8L14 9V3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
            <path d="M12 7.5v5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="1" fill={color} />
        </svg>
    );
}

function QuickActionIcon({ type, color }) {
    if (type === "patient") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" />
                <path d="M4 20.5c.5-3.5 2.67-5.5 8-5.5s7.5 2 8 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === "calendar") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="17" rx="2.5" stroke={color} strokeWidth="1.8" />
                <path d="M8 2.75v4.5M16 2.75v4.5M3 9h18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
    }

    if (type === "lab") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 4h14M9 4v4l-4 8.5A2 2 0 0 0 6.8 20h10.4a2 2 0 0 0 1.8-3.1L15 8V4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
            <path d="M12 7.5v5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="1" fill={color} />
        </svg>
    );
}

export default function Dashboard({ cards = [] }) {
    return (
        <div className="med-dashboard">
            <section className="med-stats" aria-label="Dashboard summary">
                {cards.map((card) => {
                    const meta = statMeta[card.id] ?? { label: card.label, icon: "alert", accent: "#2E6FFC" };
                    const isNegative = String(card.delta ?? "").trim().startsWith("-");

                    return (
                        <article key={card.id} className="med-statcard">
                            <div className="med-statcard__head">
                                <div className="med-statcard__label">{meta.label}</div>
                                <div className="med-statcard__icon" style={{ color: meta.accent }} aria-hidden="true">
                                    <StatIcon type={meta.icon} color={meta.accent} />
                                </div>
                            </div>
                            <div className="med-statcard__value">{card.value}</div>
                            <div className={`med-statcard__delta${isNegative ? " med-statcard__delta--down" : " med-statcard__delta--up"}`}>
                                {card.delta ?? "+0%"} <span>from last month</span>
                            </div>
                        </article>
                    );
                })}
            </section>

            <section className="med-splitgrid" aria-label="Appointments and activity">
                <article className="med-panel med-panel--appointments">
                    <div className="med-panel__head">
                        <div>
                            <h2 className="med-panel__title">Today's Appointments</h2>
                            <p className="med-panel__subtitle">You have {appointmentItems.length} appointments scheduled for today</p>
                        </div>
                    </div>

                    <div className="med-list med-list--appointments">
                        {appointmentItems.map((appointment) => (
                            <div key={`${appointment.name}-${appointment.time}`} className="med-appointment">
                                <div className="med-avatar med-avatar--small">{appointment.initials}</div>
                                <div className="med-appointment__info">
                                    <div className="med-appointment__name">{appointment.name}</div>
                                    <div className="med-appointment__type">{appointment.type}</div>
                                </div>
                                <div className="med-appointment__meta">
                                    <div className="med-appointment__time">{appointment.time}</div>
                                    <span className={`med-statusbadge med-statusbadge--${appointment.status}`}>{appointment.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" className="med-outlinebtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <rect x="3" y="4" width="18" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M8 2.75v4.5M16 2.75v4.5M3 9h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        View All Appointments
                    </button>
                </article>

                <article className="med-panel med-panel--activity">
                    <div className="med-panel__head">
                        <div>
                            <h2 className="med-panel__title">Recent Activities</h2>
                            <p className="med-panel__subtitle">Latest updates and activities</p>
                        </div>
                    </div>

                    <div className="med-list med-list--activities">
                        {activityItems.map((activity) => (
                            <div key={`${activity.label}-${activity.time}`} className="med-activity">
                                <div className="med-activity__icon" style={{ borderColor: `${activity.accent}44`, color: activity.accent, background: `${activity.accent}14` }} aria-hidden="true">
                                    <ActivityIcon type={activity.icon} color={activity.accent} />
                                </div>
                                <div className="med-activity__content">
                                    <div className="med-activity__label">{activity.label}</div>
                                    <div className="med-activity__name">{activity.name}</div>
                                    <div className="med-activity__time">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section className="med-panel med-panel--quickactions">
                <div className="med-panel__head med-panel__head--stacked">
                    <div>
                        <h2 className="med-panel__title">Quick Actions</h2>
                        <p className="med-panel__subtitle">Frequently used actions for faster workflow</p>
                    </div>
                </div>

                <div className="med-actionsgrid">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            type="button"
                            className={`med-actionbtn${action.primary ? " med-actionbtn--primary" : ""}`}
                        >
                            <QuickActionIcon type={action.icon} color={action.primary ? "#0D0D0D" : "#FFFFFF"} />
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
