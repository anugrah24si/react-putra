import { NOTE_CATEGORY_VALUES } from "@/data/noteCategories";

/**
 * customerNote.js - Helper Customer Notes.
 * computeNoteStats dipakai ulang di Tahap 8 (CRM Analytics).
 */

/**
 * computeNoteStats - Menghitung statistik dari daftar customer notes.
 * @param {Array} notes - Daftar note (punya field note_type, is_important)
 * @returns {{ total: number, important: number, byCategory: Object }}
 */
export function computeNoteStats(notes = []) {
    const byCategory = {};
    NOTE_CATEGORY_VALUES.forEach((c) => { byCategory[c] = 0; });

    let important = 0;
    for (const n of notes) {
        if (byCategory[n.note_type] !== undefined) byCategory[n.note_type] += 1;
        if (n.is_important) important += 1;
    }

    return { total: notes.length, important, byCategory };
}
