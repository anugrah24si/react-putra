/**
 * PageTitle Component - Menampilkan title dan subtitle halaman
 * 
 * @param {string} title - Judul halaman
 * @param {string} subtitle - Subtitle halaman
 * @param {string} className - Custom className tambahan
 */
export default function PageTitle({
    title,
    subtitle,
    className = ''
}) {
    return (
        <div className={`med-topbar__titleblock ${className}`}>
            <h1 className="med-topbar__title">{title}</h1>
            {subtitle && <p className="med-topbar__subtitle">{subtitle}</p>}
        </div>
    );
}
