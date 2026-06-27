import { Sparkles, Trash2, X } from "lucide-react";

/**
 * ChatHeader - Header jendela chat: logo AI, nama assistant, status online,
 * tombol bersihkan chat, dan tombol tutup.
 *
 * @param {function} onClear - Bersihkan riwayat chat
 * @param {function} onClose - Tutup jendela chat
 */
export default function ChatHeader({ onClear, onClose }) {
    return (
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-foreground">LUMIVA Assistant</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Online
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    onClick={onClear}
                    aria-label="Bersihkan chat"
                    title="Bersihkan chat"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup chat"
                    title="Tutup"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
