-- ============================================================================
-- PERBAIKAN: function crypt(text, text) does not exist
-- ============================================================================
-- Penyebab: di Supabase, extension pgcrypto berada di schema "extensions",
-- sedangkan fungsi login/register sebelumnya hanya mencari di schema "public".
-- Solusi: pastikan extension ada, lalu tambahkan "extensions" ke search_path.
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- ============================================================================

-- Pastikan pgcrypto terpasang di schema extensions
create extension if not exists pgcrypto with schema extensions;


-- ---------- Perbaiki fungsi REGISTER ----------
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
    if exists (select 1 from public.users u where u.email = v_email) then
        raise exception 'Email % sudah terdaftar', v_email
            using errcode = 'unique_violation';
    end if;

    return query
    insert into public.users (full_name, email, phone, password, role, status)
    values (
        trim(p_full_name),
        v_email,
        nullif(trim(p_phone), ''),
        crypt(p_password, gen_salt('bf')),
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


-- ---------- Perbaiki fungsi LOGIN ----------
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
      and u.password = crypt(p_password, u.password)
      and u.status = 'Active';
end;
$$;


-- Beri izin eksekusi ulang (jaga-jaga)
grant execute on function public.register_user(text, text, text, text) to anon, authenticated;
grant execute on function public.login_user(text, text) to anon, authenticated;

-- ============================================================================
-- SELESAI ✅  Coba login lagi: admin@medicare.com / admin123
-- ============================================================================
