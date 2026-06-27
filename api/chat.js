/**
 * api/chat.js - Vercel Serverless Function untuk AI Chatbot (Gemini).
 *
 * Frontend hanya mengirim { messages, role } ke endpoint ini. API key Gemini
 * disimpan di environment server (GEMINI_API_KEY) — TIDAK PERNAH di frontend.
 *
 * Set di Vercel: Settings → Environment Variables → GEMINI_API_KEY
 *
 * Logika pemanggilan Gemini ada di ./_gemini.js (dipakai bersama dengan
 * middleware dev di vite.config.js agar konsisten antara lokal & produksi).
 */

import { generateGeminiReply } from "./_gemini.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    // Body bisa berupa object (sudah di-parse Vercel) atau string
    const body =
        typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { messages = [], role = "guest" } = body;

    const reply = await generateGeminiReply({
        messages,
        role,
        apiKey: process.env.GEMINI_API_KEY,
    });

    res.status(200).json({ reply });
}
