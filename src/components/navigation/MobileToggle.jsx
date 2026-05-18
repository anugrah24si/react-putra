/**
 * MobileToggle Component - Hamburger button untuk mobile menu
 * 
 * @param {boolean} isOpen - Status menu terbuka/tertutup
 * @param {function} onToggle - Handler saat button diklik
 * @param {string} className - Custom className tambahan
 */
export default function MobileToggle({
    isOpen,
    onToggle,
    className = ''
}) {
    return (
        <button
            type="button"
            className={`med-mobile-toggle${isOpen ? ' med-mobile-toggle--open' : ''} ${className}`}
            onClick={onToggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
        >
            <span className="med-mobile-toggle__icon">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </button>
    );
}
