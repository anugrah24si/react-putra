/**
 * LoadingSpinner Component - Menampilkan loading spinner
 * 
 * @param {string} size - Ukuran spinner: 'sm', 'md', 'lg'
 * @param {string} text - Text yang ditampilkan di bawah spinner
 * @param {boolean} fullScreen - Apakah fullscreen atau inline
 */
export default function LoadingSpinner({
    size = 'md',
    text = 'Loading...',
    fullScreen = true
}) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const containerClass = fullScreen
        ? 'flex flex-col justify-center items-center min-h-screen bg-white'
        : 'flex flex-col justify-center items-center p-8';

    return (
        <div className={containerClass}>
            <div className={`${sizeClasses[size]} border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4`}></div>
            {text && <p className="text-green-600 text-lg">{text}</p>}
        </div>
    );
}
