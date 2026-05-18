/**
 * Card Component - Container card reusable
 * 
 * @param {ReactNode} children - Konten card
 * @param {string} className - Custom className tambahan
 * @param {function} onClick - Handler saat card diklik
 */
export default function Card({
    children,
    className = '',
    onClick
}) {
    return (
        <div
            className={`med-tablecard ${className}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}
