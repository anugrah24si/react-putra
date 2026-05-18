import { X } from 'lucide-react';

/**
 * Modal Component - Reusable modal dialog
 * 
 * @param {boolean} isOpen - Status modal terbuka/tertutup
 * @param {function} onClose - Handler saat modal ditutup
 * @param {string} title - Judul modal
 * @param {ReactNode} children - Konten modal
 * @param {ReactNode} footer - Footer modal (buttons, etc)
 * @param {string} size - Ukuran modal: 'sm', 'md', 'lg', 'view'
 * @param {string} className - Custom className tambahan
 */
export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    className = ''
}) {
    if (!isOpen) return null;

    const sizeClass = size !== 'md' ? `med-modal--${size}` : '';
    const modalClass = `med-modal ${sizeClass} ${className}`.trim();

    return (
        <div className="med-overlay" role="dialog" aria-modal="true" onClick={onClose}>
            <div className={modalClass} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="med-modal__head">
                    <h3 className="med-modal__title">{title}</h3>
                    <button
                        type="button"
                        className="med-modal__close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="med-modal__body">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="med-modal__actions">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
