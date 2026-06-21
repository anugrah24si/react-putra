import { MEMBERSHIP_LEVELS } from "@/data/membershipLevels";

/**
 * membership.js - Fungsi bantu (helper) untuk perhitungan membership.
 */

/**
 * getLevelConfig - Mengambil konfigurasi sebuah level berdasarkan namanya.
 * @param {string} levelName - Nama level (mis. "Gold")
 * @returns {Object} Konfigurasi level (default Bronze jika tidak ditemukan)
 */
export function getLevelConfig(levelName) {
    return (
        MEMBERSHIP_LEVELS.find((lvl) => lvl.name === levelName) ||
        MEMBERSHIP_LEVELS[0]
    );
}

/**
 * getLevelByPoints - Menentukan level berdasarkan jumlah poin.
 * @param {number} points - Total poin user
 * @returns {Object} Konfigurasi level yang sesuai
 */
export function getLevelByPoints(points = 0) {
    // Cari level tertinggi yang minPoints-nya <= points
    let current = MEMBERSHIP_LEVELS[0];
    for (const level of MEMBERSHIP_LEVELS) {
        if (points >= level.minPoints) {
            current = level;
        }
    }
    return current;
}

/**
 * getNextLevel - Mengambil level berikutnya setelah level sekarang.
 * @param {string} levelName - Nama level sekarang
 * @returns {Object|null} Level berikutnya, atau null jika sudah tertinggi
 */
export function getNextLevel(levelName) {
    const index = MEMBERSHIP_LEVELS.findIndex((lvl) => lvl.name === levelName);
    if (index === -1 || index === MEMBERSHIP_LEVELS.length - 1) {
        return null;
    }
    return MEMBERSHIP_LEVELS[index + 1];
}

/**
 * getProgressToNextLevel - Menghitung progress (0-100%) menuju level berikutnya.
 * @param {number} points - Total poin user
 * @param {string} levelName - Nama level sekarang
 * @returns {number} Persentase progress (0-100)
 */
export function getProgressToNextLevel(points = 0, levelName) {
    const current = getLevelConfig(levelName);
    const next = getNextLevel(levelName);

    // Sudah level tertinggi → progress penuh
    if (!next) return 100;

    const range = next.minPoints - current.minPoints;
    if (range <= 0) return 100;

    const progress = ((points - current.minPoints) / range) * 100;
    return Math.min(100, Math.max(0, Math.round(progress)));
}
