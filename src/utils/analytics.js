import { MEMBERSHIP_LEVELS } from "@/data/membershipLevels";

/**
 * analytics.js - Helper perhitungan statistik untuk CRM Analytics Dashboard.
 * Semua fungsi menerima data real dari database (bukan dummy).
 */

/* ---------- Helper tanggal ---------- */
const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const startOfWeek = () => { const d = startOfToday(); const day = (d.getDay() + 6) % 7; d.setDate(d.getDate() - day); return d; };
const startOfMonth = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); };
const startOfYear = () => { const d = new Date(); return new Date(d.getFullYear(), 0, 1); };

/**
 * computeMemberStats - Statistik member & distribusi membership.
 * Hanya menghitung user dengan role 'user' sebagai member.
 */
export function computeMemberStats(users = []) {
    const members = users.filter((u) => u.role === "user");
    const monthStart = startOfMonth().getTime();

    const distribution = {};
    MEMBERSHIP_LEVELS.forEach((l) => { distribution[l.name] = 0; });

    let active = 0, inactive = 0, newThisMonth = 0;
    for (const m of members) {
        if (m.status === "Active") active += 1; else inactive += 1;
        if (distribution[m.membership_level] !== undefined) distribution[m.membership_level] += 1;
        if (m.created_at && new Date(m.created_at).getTime() >= monthStart) newThisMonth += 1;
    }

    return { total: members.length, active, inactive, newThisMonth, distribution };
}

/**
 * computeBookingStats - Statistik booking (total, hari/minggu/bulan, per status).
 */
export function computeBookingStats(bookings = []) {
    const today = startOfToday().getTime();
    const week = startOfWeek().getTime();
    const month = startOfMonth().getTime();

    let todayCount = 0, weekCount = 0, monthCount = 0;
    const byStatus = { Pending: 0, Confirmed: 0, Completed: 0, Cancelled: 0 };

    for (const b of bookings) {
        const t = b.created_at ? new Date(b.created_at).getTime() : 0;
        if (t >= today) todayCount += 1;
        if (t >= week) weekCount += 1;
        if (t >= month) monthCount += 1;
        if (byStatus[b.status] !== undefined) byStatus[b.status] += 1;
    }

    return { total: bookings.length, today: todayCount, week: weekCount, month: monthCount, byStatus };
}

/**
 * computeTransactionStats - Statistik transaksi + data grafik pendapatan bulanan.
 * Hanya transaksi status 'Paid' yang dihitung sebagai pendapatan.
 */
export function computeTransactionStats(transactions = []) {
    const today = startOfToday().getTime();
    const month = startOfMonth().getTime();
    const year = startOfYear().getTime();

    let revToday = 0, revMonth = 0, revYear = 0;
    // 12 bulan terakhir untuk grafik
    const monthly = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleString("id-ID", { month: "short", year: "2-digit" });
        monthly[key] = 0;
    }

    for (const tx of transactions) {
        if (tx.status !== "Paid") continue;
        const amount = Number(tx.amount || 0);
        const t = tx.created_at ? new Date(tx.created_at) : null;
        if (!t) continue;
        const time = t.getTime();
        if (time >= today) revToday += amount;
        if (time >= month) revMonth += amount;
        if (time >= year) revYear += amount;
        const key = t.toLocaleString("id-ID", { month: "short", year: "2-digit" });
        if (monthly[key] !== undefined) monthly[key] += amount;
    }

    const chart = Object.entries(monthly).map(([name, total]) => ({ name, total }));
    return { total: transactions.length, revToday, revMonth, revYear, chart };
}

/**
 * computeVoucherStats - Statistik voucher (opsi a: total, aktif, nonaktif).
 */
export function computeVoucherStats(vouchers = []) {
    const active = vouchers.filter((v) => v.active).length;
    return { total: vouchers.length, active, inactive: vouchers.length - active };
}

/**
 * computeTopCustomers - Member dengan total spending tertinggi.
 * @param {Array} users
 * @param {Array} transactions
 * @param {number} limit
 */
export function computeTopCustomers(users = [], transactions = [], limit = 5) {
    const map = {};
    for (const tx of transactions) {
        if (tx.status !== "Paid" || !tx.user_id) continue;
        if (!map[tx.user_id]) map[tx.user_id] = { count: 0, total: 0 };
        map[tx.user_id].count += 1;
        map[tx.user_id].total += Number(tx.amount || 0);
    }

    return users
        .filter((u) => u.role === "user" && map[u.id])
        .map((u) => ({
            id: u.id,
            name: u.full_name,
            membership_level: u.membership_level,
            totalTransaction: map[u.id].count,
            totalSpending: map[u.id].total,
        }))
        .sort((a, b) => b.totalSpending - a.totalSpending)
        .slice(0, limit);
}

/**
 * computeMostPopularServices - Layanan dengan booking terbanyak.
 * @param {Array} bookings
 * @param {number} limit
 */
export function computeMostPopularServices(bookings = [], limit = 5) {
    const map = {};
    for (const b of bookings) {
        const name = b.service_name || "-";
        map[name] = (map[name] || 0) + 1;
    }
    return Object.entries(map)
        .map(([name, total]) => ({ name, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, limit);
}

/**
 * computeTopRatedService - Layanan dengan rata-rata rating tertinggi.
 * @param {Array} reviews - review (punya services.name & rating)
 */
export function computeTopRatedService(reviews = []) {
    const map = {};
    for (const r of reviews) {
        const name = r.services?.name || "-";
        if (!map[name]) map[name] = { sum: 0, count: 0 };
        map[name].sum += Number(r.rating || 0);
        map[name].count += 1;
    }
    let top = null;
    for (const [name, { sum, count }] of Object.entries(map)) {
        const avg = count > 0 ? sum / count : 0;
        if (!top || avg > top.average) top = { name, average: Number(avg.toFixed(1)), count };
    }
    return top;
}

/**
 * formatRupiah - Format angka ke Rupiah.
 */
export function formatRupiah(amount) {
    return "Rp " + Number(amount || 0).toLocaleString("id-ID");
}
