import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

/**
 * ChatBody - Area pesan: menampilkan empty state, daftar bubble, indikator
 * mengetik, dan auto-scroll ke pesan terbaru.
 *
 * @param {Array} messages - Daftar pesan
 * @param {boolean} loading - AI sedang menjawab
 * @param {Array<string>} suggestions - Saran pertanyaan (empty state)
 * @param {function} onSuggestion - Handler klik saran
 */
export default function ChatBody({ messages, loading, suggestions = [], onSuggestion }) {
    const endRef = useRef(null);

    // Auto-scroll ke bawah setiap ada pesan baru / saat mengetik
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const isEmpty = messages.length === 0;

    return (
        <div className="flex-1 space-y-4 overflow-y-auto bg-background px-4 py-4">
            {isEmpty ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Halo! 👋 Aku LUMIVA Assistant</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Tanya apa saja seputar layanan, membership, atau cara pakai website ini.
                    </p>

                    {suggestions.length > 0 ? (
                        <div className="mt-4 flex flex-col gap-2">
                            {suggestions.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => onSuggestion(s)}
                                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            ) : (
                messages.map((m, i) => <ChatMessage key={i} message={m} />)
            )}

            {loading ? <TypingIndicator /> : null}

            <div ref={endRef} />
        </div>
    );
}
