import { z } from "zod";

/**
 * reviewSchema.js - Skema validasi (Zod) untuk form Rating & Review.
 */
export const reviewSchema = z.object({
    // Rating wajib 1-5
    rating: z.coerce
        .number({ message: "Beri rating bintang" })
        .int()
        .min(1, "Minimal 1 bintang")
        .max(5, "Maksimal 5 bintang"),
    // Komentar opsional, maksimal 500 karakter
    comment: z.string().max(500, "Maksimal 500 karakter").optional(),
});
