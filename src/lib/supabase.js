import { createClient } from '@supabase/supabase-js'

/**
 * Konfigurasi koneksi ke Supabase.
 *
 * Nilai diambil dari environment variable (file .env) saat development lokal.
 * Fallback (nilai cadangan) disediakan agar build di Vercel tetap berjalan
 * meskipun environment variable belum di-set di dashboard Vercel.
 *
 * Catatan: "publishable key" memang dirancang aman untuk dipakai di sisi client
 * (browser), mirip dengan anon key. Keamanan data tetap dijaga oleh Row Level
 * Security (RLS) di sisi database Supabase.
 */
const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL || 'https://wtyeewengiajohyyxjoi.supabase.co'

const supabaseKey =
    import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_zgfUaCXNfJrsp8LYPqvPTQ_vqq2_jcb'

/**
 * Instance client Supabase yang dipakai di seluruh aplikasi.
 * Import dengan: import { supabase } from '@/lib/supabase'
 */
export const supabase = createClient(supabaseUrl, supabaseKey)
