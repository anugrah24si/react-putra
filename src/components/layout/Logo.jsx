/**
 * Logo Component - Menampilkan logo aplikasi dengan title dan subtitle
 * 
 * @param {string} title - Judul aplikasi
 * @param {string} subtitle - Subtitle aplikasi
 * @param {string} className - Custom className tambahan
 */
export default function Logo({
    title = 'Lumiere Clinic',
    subtitle = 'Beauty & Wellness',
    className = ''
}) {
    return (
        <div className={`med-sidebar__brandrow ${className}`}>
            <div className="med-brandmark">
                <img
                    src="/img/logo.png"
                    alt={title}
                    className="h-full w-full object-contain p-1"
                />
            </div>
            <div className="med-brandcopy">
                <div className="med-brandcopy__title">{title}</div>
                <div className="med-brandcopy__subtitle">{subtitle}</div>
            </div>
        </div>
    );
}
