/**
 * Avatar Component - Menampilkan avatar user dengan initial atau gambar
 * 
 * @param {string} src - URL gambar avatar
 * @param {string} alt - Alt text untuk gambar
 * @param {string} initials - Initial jika tidak ada gambar
 * @param {string} size - Ukuran avatar: 'small', 'medium', 'large'
 * @param {string} className - Custom className tambahan
 */
export default function Avatar({
    src,
    alt = 'Avatar',
    initials = 'U',
    size = 'medium',
    className = ''
}) {
    const sizeClass = size === 'small' ? 'med-avatar--small' : '';
    const avatarClass = `med-avatar ${sizeClass} ${className}`.trim();

    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={avatarClass}
            />
        );
    }

    return (
        <div className={avatarClass}>
            {initials}
        </div>
    );
}
