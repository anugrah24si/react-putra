-- ============================================================================
-- PRODUCTS / SERVICES (admin CRUD + sinkron ke guest & member)
-- ============================================================================
-- Memakai tabel public.services yang sudah dibuat di 04_review_rating_tables.sql.
-- File ini menambahkan: kolom 'active', izin tulis (CRUD) untuk admin, dan
-- mengaktifkan Realtime agar perubahan admin langsung tampil di landing (guest)
-- dan halaman booking (member).
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- Aman dijalankan berulang. Jalankan SETELAH 04_review_rating_tables.sql.
-- ============================================================================

-- 1. Kolom 'active' untuk menyembunyikan/menampilkan layanan ke publik
alter table public.services
    add column if not exists active boolean not null default true;

-- 2. Izin tulis (CRUD) untuk kebutuhan admin (kebijakan baca sudah ada di 04)
drop policy if exists "crud services" on public.services;
create policy "crud services" on public.services for all using (true) with check (true);

-- 3. Aktifkan Realtime untuk tabel services (idempoten)
do $$
begin
    if not exists (
        select 1 from pg_publication_tables
        where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'services'
    ) then
        execute 'alter publication supabase_realtime add table public.services';
    end if;
end $$;

alter table public.services replica identity full;

-- ============================================================================
-- SELESAI ✅  services: kolom active + izin CRUD + realtime
-- ============================================================================
