/**
 * SidebarOverlay Component - Overlay untuk mobile sidebar
 * 
 * @param {boolean} isVisible - Status visibility overlay
 * @param {function} onClick - Handler saat overlay diklik
 */
export default function SidebarOverlay({
    isVisible,
    onClick
}) {
    return (
        <div
            className={`med-sidebar-overlay${isVisible ? ' med-sidebar-overlay--visible' : ''}`}
            onClick={onClick}
            aria-hidden="true"
        />
    );
}
