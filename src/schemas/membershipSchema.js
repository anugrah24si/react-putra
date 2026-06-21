import { z } from "zod";
import { MEMBERSHIP_LEVEL_NAMES } from "@/data/membershipLevels";

/**
 * membershipSchema.js - Skema validasi (Zod) untuk form ubah membership.
 * Dipakai bersama React Hook Form di MembershipForm.
 */
export const membershipSchema = z.object({
    // Level harus salah satu dari daftar level yang valid
    membership_level: z.enum(MEMBERSHIP_LEVEL_NAMES, {
        message: "Pilih level membership yang valid",
    }),
    // Poin tidak boleh negatif
    points: z.coerce
        .number({ message: "Poin harus berupa angka" })
        .int("Poin harus bilangan bulat")
        .min(0, "Poin tidak boleh negatif"),
});
