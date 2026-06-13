/**
 * auth.js - Helper sederhana untuk mengelola sesi user di sisi client.
 * Sesi disimpan di localStorage dengan key "medicare-user" saat login berhasil.
 */

const STORAGE_KEY = "medicare-user";

/**
 * getCurrentUser - Mengambil data user yang sedang login.
 * @returns {Object|null} Data user, atau null jika belum login.
 */
export function getCurrentUser() {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/**
 * isLoggedIn - Cek apakah ada user yang sedang login.
 * @returns {boolean}
 */
export function isLoggedIn() {
    return getCurrentUser() !== null;
}

/**
 * isAdmin - Cek apakah user yang login berperan sebagai admin.
 * @returns {boolean}
 */
export function isAdmin() {
    const user = getCurrentUser();
    return user?.role === "admin";
}

/**
 * saveSession - Menyimpan data user ke localStorage (dipanggil saat login).
 * @param {Object} user - Data user dari Supabase
 */
export function saveSession(user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

/**
 * logout - Menghapus sesi user (logout).
 */
export function logout() {
    window.localStorage.removeItem(STORAGE_KEY);
}
