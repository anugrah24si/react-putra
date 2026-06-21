/**
 * noteCategories.js - Daftar kategori Customer Notes.
 * Sumber data tunggal untuk form, badge, dan statistik (Tahap 8).
 */
export const NOTE_CATEGORIES = [
    { value: "Allergy", color: "bg-red-500/15 text-red-600 dark:text-red-400" },
    { value: "Skin Condition", color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
    { value: "Preference", color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
    { value: "Consultation", color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400" },
    { value: "Treatment History", color: "bg-green-500/15 text-green-600 dark:text-green-400" },
    { value: "Medical Warning", color: "bg-rose-600/15 text-rose-600 dark:text-rose-400" },
    { value: "Other", color: "bg-slate-400/15 text-slate-600 dark:text-slate-300" },
];

// Hanya nilai kategori (untuk dropdown & validasi)
export const NOTE_CATEGORY_VALUES = NOTE_CATEGORIES.map((c) => c.value);

/**
 * getCategoryColor - Ambil kelas warna badge berdasarkan kategori.
 */
export function getCategoryColor(type) {
    return NOTE_CATEGORIES.find((c) => c.value === type)?.color || NOTE_CATEGORIES.at(-1).color;
}
