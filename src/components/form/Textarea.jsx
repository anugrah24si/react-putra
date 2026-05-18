/**
 * Textarea Component - Reusable textarea field
 * 
 * @param {string} label - Label untuk textarea
 * @param {string} name - Name attribute
 * @param {string} value - Nilai textarea
 * @param {function} onChange - Handler saat nilai berubah
 * @param {string} placeholder - Placeholder text
 * @param {number} rows - Jumlah baris
 * @param {boolean} required - Apakah field wajib diisi
 * @param {string} className - Custom className tambahan
 */
export default function Textarea({
    label,
    name,
    value,
    onChange,
    placeholder = '',
    rows = 3,
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
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                className="med-textarea"
                {...props}
            />
        </div>
    );
}
