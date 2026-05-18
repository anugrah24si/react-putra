/**
 * Container Component - Wrapper container untuk layout
 * 
 * @param {ReactNode} children - Konten container
 * @param {string} className - Custom className tambahan
 * @param {string} maxWidth - Max width container
 */
export default function Container({
    children,
    className = '',
    maxWidth = '100%'
}) {
    return (
        <div
            className={className}
            style={{ maxWidth, width: '100%' }}
        >
            {children}
        </div>
    );
}
