-- ============================================================================
-- SINKRONISASI BOOKING → TRANSAKSI
-- ============================================================================
-- Menautkan transaksi ke booking asalnya lewat kolom booking_id, agar saat
-- booking di-Confirm oleh admin, sistem dapat membuat 1 transaksi otomatis
-- TANPA duplikat (1 booking = maksimal 1 transaksi).
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- Aman dijalankan berulang (pakai IF NOT EXISTS).
-- Jalankan SETELAH 03_booking_transaction_voucher_tables.sql.
-- ============================================================================

-- 1. Tambah kolom booking_id pada tabel transactions
alter table public.transactions
    add column if not exists booking_id uuid references public.bookings(id) on delete set null;

-- 2. Cegah duplikat: satu booking hanya boleh punya satu transaksi.
--    Index unik parsial (hanya berlaku saat booking_id tidak NULL),
--    sehingga transaksi manual (booking_id NULL) tetap bebas dibuat.
create unique index if not exists uniq_transactions_booking
    on public.transactions (booking_id)
    where booking_id is not null;

-- ============================================================================
-- SELESAI ✅  Kolom baru: transactions.booking_id (+ index unik anti-duplikat)
-- ============================================================================
