-- ============================================================================
-- TAHAP 5: RATING & REVIEW
-- ============================================================================
-- Membuat tabel services (untuk relasi) dan reviews.
-- Review berelasi ke users (user_id), services (service_id), bookings (booking_id).
-- Nama user & service diambil via relasi, tidak disimpan ulang.
--
-- Cara pakai: paste SELURUH isi file ini ke Supabase > SQL Editor > Run.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABEL SERVICES (relasi untuk reviews & analytics Tahap 8)
--    id memakai slug agar cocok dengan data services.js di frontend.
-- ----------------------------------------------------------------------------
create table if not exists public.services (
    id          text primary key,
    name        text not null,
    description text,
    price       text,
    image       text,
    created_at  timestamptz not null default now()
);

-- Seed services (sinkron dengan src/data/services.js)
insert into public.services (id, name, description, price, image) values
    ('facial-treatment', 'Facial Treatment', 'Perawatan wajah premium untuk kulit cerah dan sehat.', 'Rp 350.000', '/img/product_treatment.png'),
    ('skincare',         'Skincare Consultation', 'Konsultasi kulit bersama dokter ahli dermatologi.', 'Rp 250.000', '/img/product_skincare.png'),
    ('makeup',           'Professional Makeup', 'Tata rias profesional untuk acara spesial kamu.', 'Rp 500.000', '/img/product_makeup_face.png'),
    ('haircare',         'Hair Care', 'Perawatan rambut menyeluruh agar lebih sehat & berkilau.', 'Rp 300.000', '/img/product_haircare.png'),
    ('lipstick',         'Lip Treatment', 'Perawatan bibir lembut dengan produk berkualitas.', 'Rp 150.000', '/img/product_lipstick.png'),
    ('eye-makeup',       'Eye Makeup', 'Riasan mata memukau oleh tim profesional kami.', 'Rp 200.000', '/img/product_makeup_eye.png')
on conflict (id) do nothing;


-- ----------------------------------------------------------------------------
-- 2. TABEL REVIEWS
-- ----------------------------------------------------------------------------
create table if not exists public.reviews (
    id             uuid primary key default gen_random_uuid(),
    user_id        uuid references public.users(id) on delete cascade,
    booking_id     uuid references public.bookings(id) on delete cascade,
    service_id     text references public.services(id),
    rating         integer not null check (rating between 1 and 5),
    comment        text,
    status         text not null default 'approved' check (status in ('approved', 'hidden', 'reported')),
    admin_reply    text,
    admin_reply_at timestamptz,
    created_at     timestamptz not null default now(),
    updated_at     timestamptz not null default now(),
    -- Satu booking hanya boleh satu review (cegah duplikat)
    unique (booking_id)
);

create index if not exists idx_reviews_user on public.reviews (user_id);
create index if not exists idx_reviews_service on public.reviews (service_id);
create index if not exists idx_reviews_status on public.reviews (status);


-- ----------------------------------------------------------------------------
-- 3. TRIGGER updated_at OTOMATIS
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_reviews_updated_at on public.reviews;
create trigger trg_reviews_updated_at
    before update on public.reviews
    for each row
    execute function public.set_updated_at();


-- ----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS)
-- ----------------------------------------------------------------------------
alter table public.services enable row level security;
alter table public.reviews  enable row level security;

drop policy if exists "read services" on public.services;
create policy "read services" on public.services for select using (true);

drop policy if exists "crud reviews" on public.reviews;
create policy "crud reviews" on public.reviews for all using (true) with check (true);

-- ============================================================================
-- SELESAI ✅  Tabel: services, reviews
-- ============================================================================
