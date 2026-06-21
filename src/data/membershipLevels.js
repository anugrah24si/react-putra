/**
 * membershipLevels.js - Definisi tingkatan membership.
 * Dipakai sebagai sumber data tunggal (single source of truth) untuk
 * seluruh fitur yang berhubungan dengan membership.
 *
 * Setiap level punya:
 * - name      : nama level
 * - minPoints : poin minimal untuk mencapai level ini
 * - color     : kelas Tailwind untuk warna badge
 * - benefits  : daftar keuntungan level
 */
export const MEMBERSHIP_LEVELS = [
    {
        name: "Bronze",
        minPoints: 0,
        color: "bg-amber-700/15 text-amber-700 dark:text-amber-500",
        benefits: ["Diskon 5% layanan tertentu", "Poin reward setiap transaksi"],
    },
    {
        name: "Silver",
        minPoints: 500,
        color: "bg-slate-400/15 text-slate-600 dark:text-slate-300",
        benefits: ["Diskon 10% semua layanan", "Prioritas booking"],
    },
    {
        name: "Gold",
        minPoints: 1500,
        color: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
        benefits: ["Diskon 15%", "Voucher bulanan", "Free upgrade layanan"],
    },
    {
        name: "Platinum",
        minPoints: 3000,
        color: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
        benefits: ["Diskon 20%", "Konsultasi gratis", "Hadiah ulang tahun"],
    },
    {
        name: "Diamond",
        minPoints: 6000,
        color: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
        benefits: ["Diskon 25%", "Layanan VIP", "Personal beauty advisor"],
    },
];

/**
 * Daftar nama level saja (untuk dropdown/pilihan).
 */
export const MEMBERSHIP_LEVEL_NAMES = MEMBERSHIP_LEVELS.map((lvl) => lvl.name);
