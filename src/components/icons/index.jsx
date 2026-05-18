/**
 * Icon Components - Kumpulan SVG icons reusable
 */

// Common props untuk semua icon
const commonProps = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" };

/**
 * DashboardIcon - Icon untuk menu dashboard
 */
export function DashboardIcon() {
    return (
        <svg {...commonProps} aria-hidden="true">
            <path d="M2.5 2.5h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.33" />
            <path d="M9.5 2.5h4v3.33h-4V2.5Z" stroke="currentColor" strokeWidth="1.33" />
            <path d="M9.5 8.5h4v5h-4v-5Z" stroke="currentColor" strokeWidth="1.33" />
            <path d="M2.5 10.5h4v3h-4v-3Z" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

/**
 * OrdersIcon - Icon untuk menu orders/appointments
 */
export function OrdersIcon() {
    return (
        <svg {...commonProps} aria-hidden="true">
            <rect x="2.5" y="3" width="11" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.33" />
            <path d="M5 1.5v3M11 1.5v3M2.5 6.5h11" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

/**
 * ProductsIcon - Icon untuk menu products
 */
export function ProductsIcon() {
    return (
        <svg {...commonProps} aria-hidden="true">
            <path d="M5 2.5h5.5L13.5 5v8.5h-8.5v-11Z" stroke="currentColor" strokeWidth="1.33" />
            <path d="M10.5 2.5V5h3" stroke="currentColor" strokeWidth="1.33" />
            <path d="M6.5 8h3.5M6.5 10h3.5" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

/**
 * StaffIcon - Icon untuk menu doctors and staff
 */
export function StaffIcon() {
    return (
        <svg {...commonProps} aria-hidden="true">
            <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.33" />
            <path d="M2.5 13.5c.75-2.5 2.5-3.5 3.5-3.5s2.75.5 3.5 3.5" stroke="currentColor" strokeWidth="1.33" />
            <path d="M10.5 5.5h3M12 4v3" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

/**
 * CustomersIcon - Icon untuk menu customers
 */
export function CustomersIcon() {
    return (
        <svg {...commonProps} aria-hidden="true">
            <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.33" />
            <path d="M2.5 13.5c.5-2.67 2.33-4 3.5-4s3 .33 3.5 4" stroke="currentColor" strokeWidth="1.33" />
            <path d="M11 4.5h3M12.5 3v3" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

/**
 * SearchIcon - Icon untuk search
 */
export function SearchIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.33" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
        </svg>
    );
}

/**
 * NotificationIcon - Icon untuk notifications
 */
export function NotificationIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2.5a3.5 3.5 0 0 0-3.5 3.5v1.25c0 .9-.3 1.78-.84 2.5L2.5 11h11l-1.16-1.25a4 4 0 0 1-.84-2.5V6A3.5 3.5 0 0 0 8 2.5Z" stroke="currentColor" strokeWidth="1.33" />
            <path d="M6.5 12.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.33" />
        </svg>
    );
}

/**
 * SunIcon - Icon untuk light mode
 */
export function SunIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 2.5v2.2M12 19.3v2.2M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2.5 12h2.2M19.3 12h2.2M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

/**
 * MoonIcon - Icon untuk dark mode
 */
export function MoonIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4 6.8 6.8 0 0 0 20 14.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
