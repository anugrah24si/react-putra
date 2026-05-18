/**
 * SearchBar Component - Input search dengan icon
 * 
 * @param {string} value - Nilai input search
 * @param {function} onChange - Handler saat nilai berubah
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Custom className tambahan
 */
export default function SearchBar({
    value,
    onChange,
    placeholder = 'Search...',
    className = ''
}) {
    return (
        <div className={`med-search ${className}`}>
            <span className="med-search__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.33" />
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
                </svg>
            </span>
            <input
                className="med-search__input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                aria-label="Search"
            />
        </div>
    );
}
