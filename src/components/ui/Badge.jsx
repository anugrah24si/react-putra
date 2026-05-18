/**
 * Badge Component - Menampilkan badge/label dengan warna
 * 
 * @param {string} variant - Tipe badge: 'success', 'warning', 'danger', 'info', 'neutral'
 * @param {ReactNode} children - Konten badge
 * @param {string} className - Custom className tambahan
 */
export default function Badge({
    variant = 'neutral',
    children,
    className = ''
}) {
    const badgeClass = `med-badge med-badge--${variant} ${className}`.trim();

    return (
        <span className={badgeClass}>
            {children}
        </span>
    );
}
