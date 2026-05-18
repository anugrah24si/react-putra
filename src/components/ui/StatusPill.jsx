/**
 * StatusPill Component - Menampilkan status dengan dot indicator
 * 
 * @param {string} status - Text status
 * @param {string} dotColor - Warna dot indicator
 * @param {string} className - Custom className tambahan
 */
export default function StatusPill({
    status = 'Online',
    dotColor = '#00e35b',
    className = ''
}) {
    return (
        <div className={`med-statuspill ${className}`}>
            <span
                className="med-statuspill__dot"
                style={{ background: dotColor }}
                aria-hidden="true"
            />
            <span>{status}</span>
        </div>
    );
}
