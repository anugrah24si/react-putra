-- ============================================================================
-- TAHAP 7: CUSTOMER NOTES
-- ============================================================================
-- Tabel catatan pelanggan (CRM) yang dikelola Admin di halaman Detail Member.
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- ============================================================================

create table if not exists public.customer_notes (
    id           uuid primary key default gen_random_uuid(),
    user_id      uuid references public.users(id) on delete cascade,   -- member
    note_type    text not null check (note_type in (
                     'Allergy', 'Skin Condition', 'Preference',
                     'Consultation', 'Treatment History', 'Medical Warning', 'Other'
                  )),
    note_content text not null,
    is_important boolean not null default false,                        -- tandai catatan penting
    created_by   uuid references public.users(id),                      -- admin pembuat
    created_at   timestamptz not null default now(),
    updated_at   timestamptz not null default now()
);

create index if not exists idx_customer_notes_user on public.customer_notes (user_id);
create index if not exists idx_customer_notes_type on public.customer_notes (note_type);

-- Trigger updated_at otomatis
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_customer_notes_updated_at on public.customer_notes;
create trigger trg_customer_notes_updated_at
    before update on public.customer_notes
    for each row
    execute function public.set_updated_at();

-- Row Level Security (CRUD untuk kebutuhan demo/tugas)
alter table public.customer_notes enable row level security;
drop policy if exists "crud customer_notes" on public.customer_notes;
create policy "crud customer_notes" on public.customer_notes for all using (true) with check (true);

-- ============================================================================
-- SELESAI ✅  Tabel: customer_notes
-- ============================================================================
