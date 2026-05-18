import { Link } from "react-router-dom";

/**
 * NavItem Component - Single navigation item untuk sidebar
 * 
 * @param {string} to - Path URL tujuan
 * @param {string} label - Label menu
 * @param {ReactNode} icon - Icon menu
 * @param {boolean} isActive - Status aktif
 * @param {boolean} removable - Apakah bisa dihapus
 * @param {function} onClick - Handler saat diklik
 * @param {function} onRemove - Handler saat dihapus
 * @param {ReactNode} removeIcon - Icon untuk tombol remove
 */
export default function NavItem({
    to,
    label,
    icon,
    isActive,
    removable,
    onClick,
    onRemove,
    removeIcon
}) {
    return (
        <li>
            <Link
                to={to}
                className={isActive ? "med-navitem med-navitem--active" : "med-navitem"}
                onClick={onClick}
            >
                <span className="med-navitem__left">
                    {icon && (
                        <span className="med-navicon" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    <span className="med-navitem__label">{label}</span>
                </span>
                {removable && (
                    <button
                        type="button"
                        className="med-navremove"
                        aria-label={`Delete ${label}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove?.();
                        }}
                    >
                        {removeIcon}
                    </button>
                )}
            </Link>
        </li>
    );
}
