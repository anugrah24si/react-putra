/**
 * SectionHeader Component - Header untuk section dengan title, subtitle, dan actions
 * 
 * @param {string} title - Judul section
 * @param {string} subtitle - Subtitle section
 * @param {ReactNode} actions - Action buttons atau elements
 * @param {string} className - Custom className tambahan
 */
export default function SectionHeader({
    title,
    subtitle,
    actions,
    className = ''
}) {
    return (
        <div className={className}>
            <div>
                <h2 className="med-orders__title">{title}</h2>
                {subtitle && <p className="med-orders__subtitle">{subtitle}</p>}
            </div>
            {actions && (
                <div className="med-orders__actions">
                    {actions}
                </div>
            )}
        </div>
    );
}
