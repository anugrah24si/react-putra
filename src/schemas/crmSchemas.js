import { z } from "zod";

/**
 * crmSchemas.js - Skema validasi (Zod) untuk form Booking, Transaksi, Voucher.
 */

// Form booking (dipakai member untuk memesan layanan)
export const bookingSchema = z.object({
    service_name: z.string().min(1, "Pilih layanan"),
    booking_date: z.string().min(1, "Pilih tanggal booking"),
    notes: z.string().optional(),
});

// Form transaksi (dipakai admin)
export const transactionSchema = z.object({
    user_id: z.string().min(1, "Pilih member"),
    description: z.string().min(1, "Keterangan wajib diisi"),
    amount: z.coerce.number({ message: "Nominal harus angka" }).min(0, "Nominal tidak boleh negatif"),
    status: z.enum(["Paid", "Pending", "Refunded"]),
});

// Form voucher (dipakai admin)
export const voucherSchema = z.object({
    code: z.string().min(3, "Kode minimal 3 karakter"),
    title: z.string().min(1, "Judul wajib diisi"),
    description: z.string().optional(),
    discount: z.coerce.number({ message: "Diskon harus angka" }).min(0).max(100, "Maksimal 100%"),
    active: z.boolean().default(true),
    expires_at: z.string().optional(),
});
