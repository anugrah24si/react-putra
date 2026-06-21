import { supabase } from '@/lib/supabase'

/**
 * userService - Kumpulan fungsi untuk operasi data User ke Supabase.
 * Mencakup: Login, Register, dan CRUD (Create, Read, Update, Delete).
 */

/* ============================================================
 * AUTH: LOGIN & REGISTER
 * ============================================================ */

/**
 * loginUser - Proses login langsung ke Supabase (bukan dummy json).
 * Memanggil fungsi RPC 'login_user' di database yang mencocokkan
 * email + password (password diverifikasi dalam bentuk hash).
 *
 * @param {string} email - Email user
 * @param {string} password - Password user
 * @returns {Promise<Object>} Data user jika berhasil
 * @throws {Error} Jika email/password salah atau terjadi error
 */
export async function loginUser(email, password) {
    const { data, error } = await supabase.rpc('login_user', {
        p_email: email,
        p_password: password,
    })

    if (error) {
        throw new Error(error.message || 'Gagal melakukan login')
    }

    // RPC mengembalikan array. Kosong berarti email/password salah.
    if (!data || data.length === 0) {
        throw new Error('Email atau password salah')
    }

    return data[0]
}

/**
 * registerUser - Proses pendaftaran user baru ke Supabase.
 * Memanggil fungsi RPC 'register_user' di database yang menyimpan
 * user baru dengan password ter-hash.
 *
 * @param {Object} payload - { fullName, email, phone, password }
 * @returns {Promise<Object>} Data user yang baru dibuat
 * @throws {Error} Jika email sudah terdaftar atau terjadi error
 */
export async function registerUser({ fullName, email, phone, password }) {
    const { data, error } = await supabase.rpc('register_user', {
        p_full_name: fullName,
        p_email: email,
        p_phone: phone || null,
        p_password: password,
    })

    if (error) {
        // Email duplikat akan memunculkan pesan dari database
        if (error.message?.toLowerCase().includes('sudah terdaftar')) {
            throw new Error('Email sudah terdaftar. Gunakan email lain.')
        }
        throw new Error(error.message || 'Gagal mendaftar')
    }

    return Array.isArray(data) ? data[0] : data
}

/* ============================================================
 * CRUD: KELOLA DATA USER (HALAMAN ADMIN)
 * ============================================================ */

/**
 * getUsers - Mengambil semua data user (READ).
 * Password tidak ikut diambil demi keamanan.
 *
 * @returns {Promise<Array>} Daftar user
 */
export async function getUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, phone, role, status, membership_level, points, created_at, updated_at')
        .order('created_at', { ascending: false })

    if (error) {
        throw new Error(error.message || 'Gagal mengambil data user')
    }

    return data || []
}

/**
 * createUser - Menambah user baru dari halaman admin (CREATE).
 * Menggunakan fungsi register_user agar password tetap ter-hash.
 *
 * @param {Object} payload - { fullName, email, phone, password }
 * @returns {Promise<Object>} Data user baru
 */
export async function createUser({ fullName, email, phone, password }) {
    return registerUser({ fullName, email, phone, password })
}

/**
 * updateUser - Mengubah data user (UPDATE).
 *
 * @param {string} id - ID user yang akan diubah
 * @param {Object} payload - Data yang ingin diubah { full_name, email, phone, role, status }
 * @returns {Promise<Object>} Data user setelah diubah
 */
export async function updateUser(id, payload) {
    const { data, error } = await supabase
        .from('users')
        .update(payload)
        .eq('id', id)
        .select('id, full_name, email, phone, role, status, created_at, updated_at')
        .single()

    if (error) {
        throw new Error(error.message || 'Gagal mengubah data user')
    }

    return data
}

/**
 * deleteUser - Menghapus user (DELETE).
 *
 * @param {string} id - ID user yang akan dihapus
 * @returns {Promise<void>}
 */
export async function deleteUser(id) {
    const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message || 'Gagal menghapus user')
    }
}

/**
 * getUserById - Mengambil satu user lengkap berdasarkan ID (untuk Detail Member).
 *
 * @param {string} id - ID user
 * @returns {Promise<Object>} Data user
 */
export async function getUserById(id) {
    const { data, error } = await supabase
        .from('users')
        .select('id, full_name, email, phone, role, status, membership_level, points, created_at')
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(error.message || 'Gagal mengambil data user')
    }

    return data
}
