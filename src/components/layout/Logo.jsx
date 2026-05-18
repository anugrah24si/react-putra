/**
 * Logo Component - Menampilkan logo aplikasi dengan title dan subtitle
 * 
 * @param {string} brandmark - Initial atau icon untuk brandmark
 * @param {string} title - Judul aplikasi
 * @param {string} subtitle - Subtitle aplikasi
 * @param {string} className - Custom className tambahan
 */
export default function Logo({
    brandmark = 'LC',
    title = 'Lumiere Clinic',
    subtitle = 'Beauty & Wellness',
    className = ''
}) {
    return (
        <div className={`med-sidebar__brandrow ${className}`}>
            <div className="med-brandmark" aria-hidden="true">
                <span>{brandmark}</span>
            </div>
            <div className="med-brandcopy">
                <div className="med-brandcopy__title">{title}</div>
                <div className="med-brandcopy__subtitle">{subtitle}</div>
            </div>
        </div>
    );
}
