import { useCallback, useEffect, useState } from "react";
import FloatingButton from "./FloatingButton";
import ChatWindow from "./ChatWindow";
import { sendChatMessage } from "@/services/chatService";
import { isLoggedIn } from "@/lib/auth";

// Key penyimpanan riwayat chat (bertahan selama browser belum ditutup)
const STORAGE_KEY = "lumiva-chat";

// Saran pertanyaan untuk empty state
const SUGGESTIONS = [
    "Apa itu LUMIVA?",
    "Bagaimana cara daftar & login?",
    "Apa keuntungan jadi member?",
    "Bagaimana cara booking layanan?",
];

/**
 * ChatBot - Orchestrator chatbot: state pesan, simpan riwayat ke localStorage,
 * kirim ke backend, dan tampilkan floating button + jendela chat.
 * Dipasang sekali di App agar muncul di seluruh halaman.
 */
export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState(() => {
        // Muat riwayat dari localStorage (sessionStorage agar hilang saat browser ditutup)
        try {
            const raw = window.sessionStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    // Simpan riwayat tiap kali pesan berubah
    useEffect(() => {
        try {
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch {
            // abaikan bila storage penuh/diblokir
        }
    }, [messages]);

    // Kirim pesan ke AI
    const handleSend = useCallback(
        async (text) => {
            const role = isLoggedIn() ? "member" : "guest";
            const userMessage = { role: "user", content: text };
            const nextMessages = [...messages, userMessage];
            setMessages(nextMessages);
            setLoading(true);

            try {
                const reply = await sendChatMessage(nextMessages, role);
                setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "Maaf, terjadi kesalahan koneksi. Silakan coba lagi atau hubungi admin via WhatsApp +62 822-2554-6502.",
                    },
                ]);
            } finally {
                setLoading(false);
            }
        },
        [messages]
    );

    // Bersihkan riwayat chat
    const handleClear = useCallback(() => {
        setMessages([]);
        try {
            window.sessionStorage.removeItem(STORAGE_KEY);
        } catch {
            // abaikan
        }
    }, []);

    return (
        <>
            <FloatingButton open={open} onClick={() => setOpen((v) => !v)} />
            {open ? (
                <ChatWindow
                    messages={messages}
                    loading={loading}
                    suggestions={SUGGESTIONS}
                    onSend={handleSend}
                    onClear={handleClear}
                    onClose={() => setOpen(false)}
                />
            ) : null}
        </>
    );
}
