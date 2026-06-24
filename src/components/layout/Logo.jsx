import { BrandMark } from "@/components/BrandLogo";

/**
 * Logo Component - Menampilkan logo aplikasi dengan title dan subtitle
 * 
 * @param {string} title - Judul aplikasi
 * @param {string} subtitle - Subtitle aplikasi
 * @param {string} className - Custom className tambahan
 */
export default function Logo({
    title = 'LUMIVA',
    subtitle = 'Beauty & Wellness',
    className = ''
}) {
    return (
        <div className={`med-sidebar__brandrow ${className}`}>
            <div className="med-brandmark">
                <BrandMark className="h-full w-full rounded-lg" />
            </div>
            <div className="med-brandcopy">
                <div className="med-brandcopy__title">{title}</div>
                <div className="med-brandcopy__subtitle">{subtitle}</div>
            </div>
        </div>
    );
}
