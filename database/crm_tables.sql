-- ============================================================================
-- CRM TABLES: BOOKINGS, TRANSACTIONS, VOUCHERS
-- ============================================================================
-- Tabel untuk fitur Booking Layanan, Riwayat Transaksi, dan Voucher & Promo.
-- Data dipakai bersama oleh Member (lihat/buat) dan Admin (CRUD) → sinkron.
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABEL BOOKINGS (Booking Layanan)
-- ----------------------------------------------------------------------------
create table if not exists public.bookings (
    id            uuid primary key default gen_random_uuid(),
    user_id       uuid references public.users(id) on delete cascade,
    user_name     text,                                  -- nama member (snapshot)
    service_name  text not null,                         -- nama layanan
    service_price text,                                  -- harga layanan
    booking_date  date not null,                         -- tanggal booking
    status        text not null default 'Pending',       -- Pending/Confirmed/Completed/Cancelled
    notes         text,                                  -- catatan member
    created_at    timestamptz not null default now()
);

create index if not exists idx_bookings_user on public.bookings (user_id);


-- ----------------------------------------------------------------------------
-- 2. TABEL TRANSACTIONS (Riwayat Transaksi)
-- ----------------------------------------------------------------------------
create table if not exists public.transactions (
    id           uuid primary key default gen_random_uuid(),
    user_id      uuid references public.users(id) on delete cascade,
    user_name    text,                                   -- nama member (snapshot)
    description  text not null,                          -- keterangan transaksi
    amount       numeric not null default 0,             -- nominal (Rp)
    status       text not null default 'Paid',           -- Paid/Pending/Refunded
    created_at   timestamptz not null default now()
);

create index if not exists idx_transactions_user on public.transactions (user_id);


-- ----------------------------------------------------------------------------
-- 3. TABEL VOUCHERS (Voucher & Promo)
-- ----------------------------------------------------------------------------
create table if not exists public.vouchers (
    id           uuid primary key default gen_random_uuid(),
    code         text not null unique,                   -- kode voucher
    title        text not null,                          -- judul promo
    description  text,                                   -- deskripsi
    discount     integer not null default 0,             -- diskon (%)
    active       boolean not null default true,          -- status aktif
    expires_at   date,                                   -- tanggal kedaluwarsa
    created_at   timestamptz not null default now()
);


-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) — izinkan CRUD untuk kebutuhan demo/tugas
-- ----------------------------------------------------------------------------
alter table public.bookings     enable row level security;
alter table public.transactions enable row level security;
alter table public.vouchers     enable row level security;

-- Bookings
drop policy if exists "crud bookings" on public.bookings;
create policy "crud bookings" on public.bookings for all using (true) with check (true);

-- Transactions
drop policy if exists "crud transactions" on public.transactions;
create policy "crud transactions" on public.transactions for all using (true) with check (true);

-- Vouchers
drop policy if exists "crud vouchers" on public.vouchers;
create policy "crud vouchers" on public.vouchers for all using (true) with check (true);


-- ----------------------------------------------------------------------------
-- 5. DATA AWAL VOUCHER (contoh)
-- ----------------------------------------------------------------------------
insert into public.vouchers (code, title, description, discount, active, expires_at)
values
    ('WELCOME10', 'Diskon Member Baru', 'Diskon 10% untuk transaksi pertama', 10, true, '2026-12-31'),
    ('GLOWING25', 'Promo Facial', 'Diskon 25% layanan facial premium', 25, true, '2026-12-31'),
    ('VIP50', 'Promo VIP Diamond', 'Diskon 50% khusus member Diamond', 50, true, '2026-12-31')
on conflict (code) do nothing;

-- ============================================================================
-- SELESAI ✅  Tabel: bookings, transactions, vouchers
-- ============================================================================
