import { useState } from "react";

/**
 * ChatInput - Footer input: textarea + tombol kirim.
 * Enter mengirim, Shift+Enter baris baru.
 *
 * @param {function} onSend - Handler kirim (text)
 * @param {boolean} disabled - Nonaktif saat AI sedang menjawab
 */
export default function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState("");

    const submit = () => {
        const text = value.trim();
        if (!text || disabled) return;
        onSend(text);
        setValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    return (
        <div className="flex items-end gap-2 border-t border-border bg-card px-3 py-3">
            <textarea
                rows={1}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pesan..."
                className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
                type="button"
                onClick={submit}
                disabled={disabled || !value.trim()}
                aria-label="Kirim pesan"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
                {/* Ikon kirim (paper plane) */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
            </button>
        </div>
    );
}
