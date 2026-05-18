/**
 * Input Component - Reusable input field
 * 
 * @param {string} label - Label untuk input
 * @param {string} name - Name attribute
 * @param {string} value - Nilai input
 * @param {function} onChange - Handler saat nilai berubah
 * @param {string} type - Type input: 'text', 'email', 'password', 'number'
 * @param {string} placeholder - Placeholder text
 * @param {boolean} required - Apakah field wajib diisi
 * @param {string} className - Custom className tambahan
 */
export default function Input({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = false,
    className = '',
    ...props
}) {
    return (
        <div className={`med-field ${className}`}>
            {label && (
                <label className="med-label">
                    {label}
                    {required && <span className="med-req">*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="med-input"
                {...props}
            />
        </div>
    );
}
