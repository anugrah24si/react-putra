/**
 * _gemini.js - Logika bersama untuk memanggil Gemini API.
 * Dipakai oleh:
 *  - api/chat.js              → produksi (Vercel Serverless Function)
 *  - vite.config.js (dev)     → lokal saat `npm run dev`
 *
 * API key TIDAK pernah berada di frontend; selalu dibaca dari env server.
 */

// Basis pengetahuan (knowledge base) + batasan jawaban AI.
export const KNOWLEDGE = `
Kamu adalah "LUMIVA Assistant", asisten AI untuk website LUMIVA Beauty Clinic
(klinik kecantikan & perawatan profesional). Tugasmu membantu pengguna memahami
dan menggunakan website.

INFORMASI WEBSITE:
- LUMIVA adalah klinik kecantikan. Pengguna bisa melihat layanan, menjadi member,
  memesan layanan (booking), mengumpulkan poin, dan memberi ulasan.
- Halaman publik (guest): Beranda (Hero), Layanan, Membership, Testimoni, Kontak.
- Akun: "Register" untuk membuat akun, "Login" untuk masuk. Pendaftaran gratis.
- Setelah login sebagai member, ada Dashboard Member berisi:
  * Booking Layanan: pilih layanan + tanggal, lalu pesan. Status booking:
    Pending → Confirmed → Completed. Booking yang dikonfirmasi menghasilkan poin.
  * Riwayat Transaksi: daftar pembayaran beserta poin yang didapat.
  * Voucher & Promo: kode voucher/diskon yang bisa dipakai.
  * Rating & Review: memberi bintang & ulasan untuk layanan yang sudah dipesan.
  * Membership: level dari Bronze, Silver, Gold, Platinum, hingga Diamond.
- SISTEM POIN: setiap transaksi berstatus "Paid" memberi poin. Aturannya
  setiap kelipatan Rp 10.000 = 1 poin. Poin menentukan kenaikan level membership,
  dan level lebih tinggi memberi benefit lebih besar (diskon, voucher, dll).
- KONTAK: WhatsApp +62 822-2554-6502, email anugrah24si@mahasiswa.pcr.ac.id,
  alamat Rumbai Central, Pekanbaru, Riau.

CARA MENJAWAB:
- Gunakan Bahasa Indonesia yang ramah, sopan, profesional, dan SINGKAT.
- Jawab langsung ke inti. Boleh pakai poin-poin bila perlu.
- Bila pengguna menanyakan langkah (cara daftar/login/booking), beri langkah ringkas.

BATASAN (WAJIB DIPATUHI):
- JANGAN mengarang informasi atau fitur yang tidak disebutkan di atas.
- JANGAN memberikan diagnosis medis atau saran medis yang bersifat pasti.
  Untuk pertanyaan medis, sarankan konsultasi langsung dengan dokter/klinik.
- JANGAN meminta atau menampilkan data pribadi pengguna (password, dll).
- Bila kamu TIDAK tahu jawabannya atau di luar topik website, jawab dengan sopan
  dan arahkan pengguna menghubungi admin via WhatsApp +62 822-2554-6502.
`;

const FALLBACK =
    "Maaf, asisten sedang tidak tersedia. Silakan hubungi admin via WhatsApp +62 822-2554-6502.";

/**
 * generateGeminiReply - Memanggil Gemini dan mengembalikan teks balasan.
 * Selalu mengembalikan string (tidak melempar) agar pemanggil mudah dipakai.
 *
 * @param {Object} params
 * @param {Array} params.messages - [{ role: 'user'|'assistant', content }]
 * @param {string} params.role - "guest" | "member"
 * @param {string} params.apiKey - GEMINI_API_KEY (server-side)
 * @returns {Promise<string>}
 */
export async function generateGeminiReply({ messages = [], role = "guest", apiKey }) {
    if (!apiKey) return FALLBACK;

    try {
        const contents = messages
            .filter((m) => m && m.content)
            .map((m) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: String(m.content) }],
            }));

        const systemInstruction = {
            parts: [
                {
                    text: `${KNOWLEDGE}\n\nStatus pengguna saat ini: ${role === "member" ? "MEMBER (sudah login)" : "GUEST (belum login)"}.`,
                },
            ],
        };

        const res = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey,
                },
                body: JSON.stringify({
                    systemInstruction,
                    contents,
                    generationConfig: { temperature: 0.6, maxOutputTokens: 800 },
                }),
            }
        );

        if (!res.ok) {
            // Log detail error ke server untuk debugging (tidak dikirim ke user)
            const errText = await res.text().catch(() => "");
            console.error(`[Gemini] HTTP ${res.status}:`, errText);
            return "Maaf, terjadi kendala saat memproses permintaanmu. Coba lagi sebentar lagi, atau hubungi admin via WhatsApp +62 822-2554-6502.";
        }

        const data = await res.json();
        return (
            data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
            "Maaf, aku belum punya jawaban untuk itu. Silakan hubungi admin via WhatsApp +62 822-2554-6502."
        );
    } catch (err) {
        console.error("[Gemini] Error:", err);
        return "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin via WhatsApp +62 822-2554-6502.";
    }
}
