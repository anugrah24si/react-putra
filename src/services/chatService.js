/**
 * chatService.js - Mengirim pesan chat ke backend (/api/chat).
 * Backend yang berkomunikasi dengan Gemini; frontend tidak menyimpan API key.
 */

/**
 * sendChatMessage - Kirim riwayat pesan ke backend dan terima balasan AI.
 * @param {Array<{role: 'user'|'assistant', content: string}>} messages
 * @param {string} role - "guest" | "member"
 * @returns {Promise<string>} Balasan AI
 */
export async function sendChatMessage(messages, role) {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, role }),
    });

    // Backend selalu mengembalikan { reply } (termasuk pesan error yang ramah)
    const data = await res.json().catch(() => ({}));
    return (
        data.reply ||
        "Maaf, asisten sedang tidak tersedia. Silakan hubungi admin via WhatsApp +62 822-2554-6502."
    );
}
