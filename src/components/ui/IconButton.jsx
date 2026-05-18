/**
 * IconButton Component - Button khusus untuk icon saja
 * 
 * @param {ReactNode} icon - Icon yang akan ditampilkan
 * @param {string} ariaLabel - Label untuk accessibility
 * @param {function} onClick - Handler saat button diklik
 * @param {string} title - Tooltip text
 * @param {string} className - Custom className tambahan
 */
export default function IconButton({
    icon,
    ariaLabel,
    onClick,
    title,
    className = '',
    ...props
}) {
    return (
        <button
            type="button"
            className={`med-iconbutton ${className}`}
            aria-label={ariaLabel}
            title={title}
            onClick={onClick}
            {...props}
        >
            {icon}
        </button>
    );
}
