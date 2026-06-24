-- ============================================================================
-- AKTIVASI SUPABASE REALTIME (Sinkronisasi Live Admin → Member)
-- ============================================================================
-- Mengaktifkan Realtime untuk tabel yang dibagikan admin & member, sehingga
-- perubahan oleh admin langsung tampil di akun member tanpa refresh manual.
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- Aman dijalankan berulang (sudah dicek agar tidak menambah tabel dua kali).
-- Jalankan SETELAH seluruh tabel dibuat (file 01 sampai 06).
-- ============================================================================

-- 1. Tambahkan tabel ke publication realtime (idempoten)
do $$
declare
    t text;
    tables text[] := array['users', 'bookings', 'transactions', 'vouchers', 'reviews'];
begin
    foreach t in array tables loop
        if not exists (
            select 1
            from pg_publication_tables
            where pubname = 'supabase_realtime'
              and schemaname = 'public'
              and tablename = t
        ) then
            execute format('alter publication supabase_realtime add table public.%I', t);
        end if;
    end loop;
end $$;

-- 2. REPLICA IDENTITY FULL agar filter realtime (mis. user_id) tetap cocok
--    pada event UPDATE/DELETE (mengirim data lama secara lengkap).
alter table public.users        replica identity full;
alter table public.bookings     replica identity full;
alter table public.transactions replica identity full;
alter table public.vouchers     replica identity full;
alter table public.reviews      replica identity full;

-- ============================================================================
-- SELESAI ✅  Realtime aktif untuk: users, bookings, transactions, vouchers, reviews
-- ============================================================================
