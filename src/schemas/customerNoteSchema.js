import { z } from "zod";
import { NOTE_CATEGORY_VALUES } from "@/data/noteCategories";

/**
 * customerNoteSchema.js - Skema validasi (Zod) untuk form Customer Note.
 */
export const customerNoteSchema = z.object({
    note_type: z.enum(NOTE_CATEGORY_VALUES, { message: "Pilih kategori catatan" }),
    note_content: z.string().min(3, "Isi catatan minimal 3 karakter").max(1000, "Maksimal 1000 karakter"),
    is_important: z.boolean().default(false),
});
