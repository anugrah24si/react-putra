/**
 * Button Component - Reusable button dengan berbagai variant
 * 
 * @param {string} variant - Tipe button: 'primary', 'ghost', 'danger'
 * @param {string} size - Ukuran button: 'sm', 'md', 'lg'
 * @param {ReactNode} children - Konten button
 * @param {ReactNode} icon - Icon untuk button
 * @param {boolean} disabled - Status disabled
 * @param {function} onClick - Handler saat button diklik
 * @param {string} className - Custom className tambahan
 * @param {string} type - Type button: 'button', 'submit', 'reset'
 */
export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    disabled = false,
    onClick,
    className = '',
    type = 'button',
    ...props
}) {
    const baseClass = 'med-btn';
    const variantClass = variant ? `med-btn--${variant}` : '';
    const sizeClass = size !== 'md' ? `med-btn--${size}` : '';

    const buttonClass = [baseClass, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && <span className="med-btn__icon">{icon}</span>}
            {children}
        </button>
    );
}
