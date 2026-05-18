/**
 * Select Component - Reusable select dropdown
 * 
 * @param {string} label - Label untuk select
 * @param {string} name - Name attribute
 * @param {string} value - Nilai yang dipilih
 * @param {function} onChange - Handler saat nilai berubah
 * @param {Array} options - Array of options: [{ value, label }]
 * @param {boolean} required - Apakah field wajib diisi
 * @param {string} placeholder - Placeholder option
 * @param {string} className - Custom className tambahan
 */
export default function Select({
    label,
    name,
    value,
    onChange,
    options = [],
    required = false,
    placeholder = 'Select an option',
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
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="med-select"
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
