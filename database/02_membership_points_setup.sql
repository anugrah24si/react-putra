-- ============================================================================
-- TAHAP 1: MEMBERSHIP SYSTEM
-- ============================================================================
-- Menambahkan kolom membership ke tabel users dan memperbarui fungsi
-- register_user & login_user agar ikut mengembalikan data membership.
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- Aman dijalankan walau tabel users sudah berisi data (pakai IF NOT EXISTS
-- dan DEFAULT, jadi data lama otomatis mendapat nilai default).
-- ============================================================================

-- 1. Tambah kolom membership_level dan points
alter table public.users
    add column if not exists membership_level text not null default 'Bronze';

alter table public.users
    add column if not exists points integer not null default 0;


-- 2. Perbarui fungsi REGISTER agar mengembalikan membership_level & points
--    (DROP dulu karena tipe return berubah)
drop function if exists public.register_user(text, text, text, text);

create function public.register_user(
    p_full_name text,
    p_email     text,
    p_phone     text,
    p_password  text
)
returns table (
    id               uuid,
    full_name        text,
    email            text,
    phone            text,
    role             text,
    status           text,
    membership_level text,
    points           integer,
    created_at       timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
    v_email text := lower(trim(p_email));
begin
    if exists (select 1 from public.users u where u.email = v_email) then
        raise exception 'Email % sudah terdaftar', v_email
            using errcode = 'unique_violation';
    end if;

    -- Member baru otomatis: role 'user', membership 'Bronze', points 0
    return query
    insert into public.users (full_name, email, phone, password, role, status, membership_level, points)
    values (
        trim(p_full_name),
        v_email,
        nullif(trim(p_phone), ''),
        crypt(p_password, gen_salt('bf')),
        'user',
        'Active',
        'Bronze',
        0
    )
    returning
        users.id,
        users.full_name,
        users.email,
        users.phone,
        users.role,
        users.status,
        users.membership_level,
        users.points,
        users.created_at;
end;
$$;


-- 3. Perbarui fungsi LOGIN agar mengembalikan membership_level & points
drop function if exists public.login_user(text, text);

create function public.login_user(
    p_email    text,
    p_password text
)
returns table (
    id               uuid,
    full_name        text,
    email            text,
    phone            text,
    role             text,
    status           text,
    membership_level text,
    points           integer,
    created_at       timestamptz
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
        u.membership_level,
        u.points,
        u.created_at
    from public.users u
    where u.email = v_email
      and u.password = crypt(p_password, u.password)
      and u.status = 'Active';
end;
$$;


-- 4. Beri izin eksekusi ulang
grant execute on function public.register_user(text, text, text, text) to anon, authenticated;
grant execute on function public.login_user(text, text) to anon, authenticated;

-- ============================================================================
-- SELESAI ✅
-- Kolom baru: membership_level (default 'Bronze'), points (default 0)
-- ============================================================================
