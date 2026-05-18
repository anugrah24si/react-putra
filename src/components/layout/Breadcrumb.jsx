/**
 * Breadcrumb Component - Menampilkan breadcrumb navigation
 * 
 * @param {Array<string>} items - Array of breadcrumb items
 * @param {string} separator - Separator character (default: '/')
 */
export default function Breadcrumb({ items, separator = '/' }) {
    if (!items || items.length === 0) return null;

    return (
        <div id="breadcrumb-links">
            {items.map((item, index) => (
                <div key={`${item}-${index}`}>
                    <span id={index === 0 ? "breadcrumb-home" : "breadcrumb-current"}>
                        {item}
                    </span>
                    {index < items.length - 1 && (
                        <span id="breadcrumb-separator"> {separator} </span>
                    )}
                </div>
            ))}
        </div>
    );
}
