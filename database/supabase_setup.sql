-- ============================================================================
-- SETUP DATABASE SUPABASE — SISTEM USER (CRUD + LOGIN + REGISTER)
-- ============================================================================
-- Cara pakai:
-- 1. Buka project Supabase kamu
-- 2. Masuk ke menu "SQL Editor"
-- 3. Klik "New query"
-- 4. Salin SELURUH isi file ini, paste, lalu klik "Run"
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. EXTENSION
-- ----------------------------------------------------------------------------
-- pgcrypto dipakai untuk hashing password (bcrypt) supaya password tidak
-- disimpan dalam bentuk teks asli (lebih aman).
create extension if not exists pgcrypto;


-- ----------------------------------------------------------------------------
-- 2. TABEL USERS
-- ----------------------------------------------------------------------------
-- Tabel utama untuk menyimpan data user (admin & user biasa).
create table if not exists public.users (
    id          uuid primary key default gen_random_uuid(),  -- ID unik otomatis
    full_name   text not null,                               -- Nama lengkap
    email       text not null unique,                        -- Email (unik, untuk login)
    phone       text,                                        -- Nomor telepon (opsional)
    password    text not null,                               -- Password (disimpan ter-hash)
    role        text not null default 'user',                -- Peran: 'admin' / 'user'
    status      text not null default 'Active',              -- Status: 'Active' / 'Inactive'
    created_at  timestamptz not null default now(),          -- Waktu dibuat
    updated_at  timestamptz not null default now()           -- Waktu terakhir diubah
);

-- Index pada kolom email untuk mempercepat pencarian saat login.
create index if not exists idx_users_email on public.users (email);


-- ----------------------------------------------------------------------------
-- 3. TRIGGER updated_at OTOMATIS
-- ----------------------------------------------------------------------------
-- Fungsi ini otomatis meng-update kolom updated_at setiap kali baris diubah.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- Pasang trigger ke tabel users.
drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at
    before update on public.users
    for each row
    execute function public.set_updated_at();


-- ----------------------------------------------------------------------------
-- 4. FUNGSI REGISTER (PENDAFTARAN USER BARU)
-- ----------------------------------------------------------------------------
-- Dipanggil dari website: supabase.rpc('register_user', { ... })
-- Tugasnya: membuat user baru dengan password yang sudah di-hash.
-- Mengembalikan data user (tanpa password) jika berhasil.
create or replace function public.register_user(
    p_full_name text,
    p_email     text,
    p_phone     text,
    p_password  text
)
returns table (
    id         uuid,
    full_name  text,
    email      text,
    phone      text,
    role       text,
    status     text,
    created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
    v_email text := lower(trim(p_email));
begin
    -- Cek apakah email sudah terdaftar
    if exists (select 1 from public.users u where u.email = v_email) then
        raise exception 'Email % sudah terdaftar', v_email
            using errcode = 'unique_violation';
    end if;

    -- Simpan user baru dengan password ter-hash (bcrypt)
    return query
    insert into public.users (full_name, email, phone, password, role, status)
    values (
        trim(p_full_name),
        v_email,
        nullif(trim(p_phone), ''),
        crypt(p_password, gen_salt('bf')),  -- hashing bcrypt
        'user',
        'Active'
    )
    returning
        users.id,
        users.full_name,
        users.email,
        users.phone,
        users.role,
        users.status,
        users.created_at;
end;
$$;


-- ----------------------------------------------------------------------------
-- 5. FUNGSI LOGIN
-- ----------------------------------------------------------------------------
-- Dipanggil dari website: supabase.rpc('login_user', { ... })
-- Tugasnya: mencocokkan email + password. Password dibandingkan dengan
-- versi ter-hash di database menggunakan crypt().
-- Mengembalikan data user (tanpa password) jika cocok, atau kosong jika salah.
create or replace function public.login_user(
    p_email    text,
    p_password text
)
returns table (
    id         uuid,
    full_name  text,
    email      text,
    phone      text,
    role       text,
    status     text,
    created_at timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
    v_email text := lower(trim(p_email));
begin
    return query
    select
        u.id,
        u.full_name,
        u.email,
        u.phone,
        u.role,
        u.status,
        u.created_at
    from public.users u
    where u.email = v_email
      and u.password = crypt(p_password, u.password)  -- verifikasi password
      and u.status = 'Active';                         -- hanya user aktif
end;
$$;


-- ----------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
-- Mengaktifkan RLS pada tabel users.
alter table public.users enable row level security;

-- CATATAN KEAMANAN:
-- Policy di bawah mengizinkan operasi CRUD penuh dari role 'anon' (kunci publik).
-- Ini ditujukan untuk kebutuhan TUGAS / DEMO agar halaman admin bisa langsung
-- melakukan Create, Read, Update, Delete data user dari frontend.
-- Untuk aplikasi produksi sebaiknya gunakan kebijakan yang lebih ketat.

-- Hapus policy lama jika ada (agar bisa di-run ulang tanpa error)
drop policy if exists "Public read users"   on public.users;
drop policy if exists "Public insert users" on public.users;
drop policy if exists "Public update users" on public.users;
drop policy if exists "Public delete users" on public.users;

-- READ: boleh melihat data user
create policy "Public read users"
    on public.users for select
    using (true);

-- INSERT: boleh menambah user (dipakai halaman admin "Add User")
create policy "Public insert users"
    on public.users for insert
    with check (true);

-- UPDATE: boleh mengubah user (dipakai halaman admin "Edit User")
create policy "Public update users"
    on public.users for update
    using (true)
    with check (true);

-- DELETE: boleh menghapus user (dipakai halaman admin "Delete User")
create policy "Public delete users"
    on public.users for delete
    using (true);

-- Beri izin eksekusi fungsi register & login untuk role publik (anon & authenticated).
grant execute on function public.register_user(text, text, text, text) to anon, authenticated;
grant execute on function public.login_user(text, text) to anon, authenticated;


-- ----------------------------------------------------------------------------
-- 7. DATA AWAL (SEED)
-- ----------------------------------------------------------------------------
-- Membuat beberapa akun contoh. Password di-hash otomatis.
-- Akun admin default:  email = admin@medicare.com  | password = admin123
-- Akun user default:   email = user@medicare.com   | password = user123
insert into public.users (full_name, email, phone, password, role, status)
values
    ('Admin MediCare', 'admin@medicare.com', '+62 812-0000-0001', crypt('admin123', gen_salt('bf')), 'admin', 'Active'),
    ('Dr. Anugrah',    'anugrah@medicare.com', '+62 812-0000-0002', crypt('anugrah123', gen_salt('bf')), 'admin', 'Active'),
    ('User MediCare',  'user@medicare.com', '+62 812-0000-0003', crypt('user123', gen_salt('bf')), 'user', 'Active')
on conflict (email) do nothing;


-- ============================================================================
-- SELESAI ✅
-- ============================================================================
-- Setelah Run berhasil:
-- - Tabel "users" muncul di menu Table Editor
-- - Fungsi "register_user" & "login_user" muncul di Database > Functions
-- - Bisa login dengan: admin@medicare.com / admin123
-- ============================================================================
