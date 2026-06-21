/**
 * review.js - Helper untuk fitur Rating & Review.
 * computeReviewStats juga dipakai ulang di Tahap 8 (CRM Analytics).
 */

// Batas waktu member boleh mengedit review (dalam hari)
export const REVIEW_EDIT_LIMIT_DAYS = 7;

/**
 * canEditReview - Cek apakah review masih boleh diedit (dalam 7 hari).
 * @param {string} createdAt - ISO timestamp review dibuat
 * @returns {boolean}
 */
export function canEditReview(createdAt) {
    if (!createdAt) return false;
    const created = new Date(createdAt).getTime();
    const now = Date.now();
    const limitMs = REVIEW_EDIT_LIMIT_DAYS * 24 * 60 * 60 * 1000;
    return now - created <= limitMs;
}

/**
 * computeReviewStats - Menghitung statistik dari daftar review.
 * Dipakai di Admin Reviews dan CRM Analytics (Tahap 8).
 *
 * @param {Array} reviews - Daftar review (punya field rating)
 * @returns {{ total: number, average: number, distribution: Object }}
 */
export function computeReviewStats(reviews = []) {
    const total = reviews.length;
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;

    for (const r of reviews) {
        const rating = Number(r.rating) || 0;
        if (rating >= 1 && rating <= 5) {
            distribution[rating] += 1;
            sum += rating;
        }
    }

    const average = total > 0 ? Number((sum / total).toFixed(1)) : 0;
    return { total, average, distribution };
}
