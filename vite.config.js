import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import path from 'path'
import { generateGeminiReply } from './api/_gemini.js'

/**
 * Plugin dev: menyediakan endpoint POST /api/chat saat `npm run dev`.
 * Tujuannya agar chatbot bisa diuji secara lokal TANPA perlu `vercel dev`.
 * Di produksi (Vercel), endpoint ini dilayani oleh api/chat.js.
 */
function chatApiDevPlugin(env) {
  return {
    name: 'chat-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        try {
          // Baca body request (stream) lalu parse JSON.
          let raw = ''
          for await (const chunk of req) raw += chunk
          const body = raw ? JSON.parse(raw) : {}
          const { messages = [], role = 'guest' } = body

          const reply = await generateGeminiReply({
            messages,
            role,
            apiKey: env.GEMINI_API_KEY,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ reply }))
        } catch (err) {
          console.error('[dev /api/chat] Error:', err)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              reply:
                'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin via WhatsApp +62 822-2554-6502.',
            })
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Muat semua env (tanpa prefix VITE_) agar GEMINI_API_KEY terbaca di dev.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwind(), chatApiDevPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
