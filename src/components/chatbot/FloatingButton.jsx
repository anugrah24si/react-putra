import { MessageSquare, X } from "lucide-react";

/**
 * FloatingButton - Tombol mengambang di pojok kanan bawah untuk membuka/menutup
 * chat. Beranimasi halus dan punya titik status "online".
 *
 * @param {boolean} open - Apakah jendela chat terbuka
 * @param {function} onClick - Handler klik
 */
export default function FloatingButton({ open, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={open ? "Tutup chat" : "Buka chat asisten"}
            className="group fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
        >
            {/* Titik status online */}
            {!open ? (
                <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-400" />
            ) : null}

            <span className="transition-transform duration-300">
                {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
            </span>
        </button>
    );
}
