/**
 * StatsCard Component - Card untuk menampilkan statistik dengan icon
 * 
 * @param {string} label - Label statistik
 * @param {string|number} value - Nilai statistik
 * @param {ReactNode} icon - Icon component (dari lucide-react)
 */
export default function StatsCard({ label, value, icon: Icon }) {
    return (
        <div className="med-stats-card">
            <div className="med-stats-card__content">
                <p className="med-stats-card__label">{label}</p>
                <p className="med-stats-card__value">{value}</p>
            </div>
            <div className="med-stats-card__icon">
                {Icon && <Icon size={20} />}
            </div>
        </div>
    );
}
