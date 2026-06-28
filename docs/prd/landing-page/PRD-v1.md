# PRD V1 — Dokumentasi Landing Page LUMIVA Beauty Clinic

| Metadata | Keterangan |
|---|---|
| Dokumen | PRD V1 — Dokumentasi Kondisi Saat Ini |
| Produk | Landing Page Publik LUMIVA Beauty Clinic |
| Versi Dokumen | 1.0 |
| Status | Dokumentasi (Documentation Phase) |
| Sumber Analisis | Source code aktual project (`src/pages/Public/Landing.jsx` dan turunannya) |
| Tujuan Dokumen | Mendokumentasikan kondisi Landing Page apa adanya, tanpa redesign |

> Catatan metodologi: Seluruh isi dokumen ini diturunkan dari hasil pembacaan source code. Informasi yang tidak ditemukan di dalam project ditandai secara eksplisit dengan kalimat "Belum dapat diidentifikasi berdasarkan implementasi project saat ini."

---

## 1. Ringkasan Produk

Landing Page LUMIVA adalah halaman publik (rute `/`) dari sebuah aplikasi web klinik kecantikan dan perawatan. Halaman ini dapat diakses tanpa login dan berperan sebagai pintu masuk utama bagi calon pelanggan sebelum melakukan registrasi atau pemesanan layanan.

Berdasarkan implementasi, halaman dirakit oleh komponen orchestrator `Landing.jsx` yang menyusun sembilan section mandiri secara berurutan, dibungkus oleh `PublicLayout` (navbar publik di atas, footer publik di bawah). Brand yang digunakan secara konsisten di seluruh implementasi adalah **LUMIVA Beauty Clinic**.

Catatan: Pada beberapa file masih ditemukan jejak penamaan lama "MediCare" (mis. komentar pada `BrandLogo.jsx`, key localStorage `medicare-user` dan `medicare-theme`). Identitas brand yang ditampilkan ke pengguna adalah LUMIVA.

---

## 2. Latar Belakang

LUMIVA merupakan bagian dari aplikasi yang lebih besar dengan tiga area utama (publik, member, admin), terlihat dari konfigurasi routing pada `src/App.jsx`:

- **Area Publik** — Landing page dan halaman member (dibungkus `PublicLayout`).
- **Area Member** — Dashboard, bookings, transactions, vouchers, reviews (dilindungi `RequireAuth`).
- **Area Admin** — Analytics, products, users, bookings, transactions, vouchers, reviews, doctors & staff (dilindungi `RequireAdmin`, dibungkus `MainLayout`).

Landing Page berfungsi sebagai lapisan akuisisi yang menghubungkan pengunjung anonim menuju ekosistem membership dan booking yang sudah ada.

---

## 3. Tujuan Landing Page

Berdasarkan struktur dan CTA yang diimplementasikan, tujuan Landing Page adalah:

1. Memperkenalkan klinik kecantikan LUMIVA beserta value proposition-nya.
2. Mendorong pengunjung anonim untuk **registrasi member** (CTA dominan mengarah ke `/register`).
3. Mendorong pengunjung untuk **melakukan booking layanan** (CTA mengarah ke `/login` atau `/member/bookings`).
4. Membangun kepercayaan melalui data kredibilitas, keunggulan, dan testimoni pelanggan.
5. Menjawab keraguan calon pelanggan melalui FAQ dan informasi kontak.

---

## 4. Tujuan Bisnis

Tujuan bisnis yang dapat **disimpulkan dari implementasi** (bukan dari dokumen bisnis formal):

- Meningkatkan jumlah pendaftaran member baru (konversi guest → member).
- Meningkatkan volume pemesanan layanan melalui kanal online.
- Mendorong adopsi program membership berjenjang (Bronze hingga Diamond).

> Tujuan bisnis kuantitatif (target angka, periode, OKR) **belum dapat diidentifikasi berdasarkan implementasi project saat ini.**

---

## 5. Target Pengguna

Target pengguna yang dapat disimpulkan dari konten dan alur:

| Segmen | Indikasi dari Implementasi |
|---|---|
| Calon pelanggan klinik kecantikan | Copy hero, layanan perawatan kulit & kecantikan |
| Pengunjung anonim (guest) | Landing dapat diakses tanpa login; CTA mengarah ke registrasi |
| Member existing | Navbar & CTA menampilkan state "sudah login" (Dashboard, Booking) |

> Data demografis spesifik (usia, lokasi, gender, daya beli) **belum dapat diidentifikasi berdasarkan implementasi project saat ini.** Satu-satunya indikasi lokasi adalah alamat kontak "Rumbai Central, Pekanbaru, Riau".

---

## 6. Persona Singkat

Persona berikut disusun terbatas pada bukti implementasi (bukan riset pengguna formal):

- **Persona A — Calon Pelanggan Baru:** Mengunjungi landing tanpa akun, ingin mengetahui layanan dan harga sebelum mendaftar. Dilayani oleh Hero, Services, WhyChooseUs, FAQ.
- **Persona B — Member Aktif:** Sudah memiliki akun; navbar menampilkan salam "Hi, [nama]" dan tombol Dashboard; CTA berubah menjadi "Buka Dashboard" / "Booking Sekarang".

> Persona formal (goals, pain points, behaviour terdokumentasi) **belum dapat diidentifikasi berdasarkan implementasi project saat ini.**

---

## 7. Value Proposition

Diturunkan dari copy pada `HeroSection.jsx` dan `WhyChooseUs.jsx`:

> "Rawat Kecantikan Anda Bersama LUMIVA — Layanan perawatan kulit & kecantikan oleh tenaga ahli berpengalaman. Pesan mudah, pelayanan personal, dan nikmati keuntungan eksklusif sebagai member."

Empat pilar diferensiasi (dari WhyChooseUs):

1. Tenaga Ahli Berpengalaman
2. Produk Aman & Berkualitas
3. Pelayanan Personal
4. Booking Mudah & Fleksibel

---

## 8. Information Architecture

```
PublicLayout (src/layout/PublicLayout.jsx)
├── SmoothCursor                     (kursor kustom global)
├── PublicNavbar                     (sticky top, scroll-spy)
├── <main>
│   └── Landing (Outlet)
│       ├── HeroSection         #beranda
│       ├── TrustBar            (tanpa id)
│       ├── ServicesSection     #layanan
│       ├── WhyChooseUs         #keunggulan
│       ├── MembershipSection   #membership
│       ├── TestimonialsSection #testimoni   (conditional)
│       ├── FAQSection          #faq
│       ├── CTASection          (tanpa id)
│       └── ContactSection      #kontak
└── PublicFooter
```

Anchor section yang dapat dituju via hash: `#beranda`, `#layanan`, `#keunggulan`, `#membership`, `#testimoni`, `#faq`, `#kontak`.

---

## 9. User Journey

Berdasarkan CTA dan navigasi yang diimplementasikan:

```
Pengunjung anonim membuka "/"
        │
        ▼
Hero (Attention) ── klik "Daftar Sekarang" ──────► /register
        │                  └ "Lihat Layanan" ────► scroll #layanan
        ▼
TrustBar (kredibilitas instan)
        ▼
Services (Interest) ── klik "Booking Sekarang" ──► /login (jika belum login)
        ▼
WhyChooseUs (Desire)
        ▼
Membership ── klik "Daftar Gratis Sekarang" ─────► /register
        ▼
Testimonials (social proof)
        ▼
FAQ (mengurangi keraguan)
        ▼
CTASection (Action) ── "Daftar Sekarang" ────────► /register
        │                └ "Hubungi Kami" ───────► scroll #kontak
        ▼
Contact ── email / WhatsApp / Maps (link eksternal)
        ▼
Footer
```

Untuk pengguna yang **sudah login**, CTA otomatis berubah: "Buka Dashboard" → `/member`, "Booking Sekarang" → `/member/bookings`, "Lihat Membership Saya" → `/member`.

---

## 10. Landing Page Flow (Pemetaan AIDA)

| Tahap AIDA | Section | Peran |
|---|---|---|
| Attention | HeroSection, TrustBar | Menarik perhatian, value proposition, CTA utama, kredibilitas |
| Interest | ServicesSection | Menampilkan katalog layanan + harga |
| Desire | WhyChooseUs, MembershipSection, TestimonialsSection | Diferensiasi, benefit membership, social proof |
| Action | FAQSection, CTASection, ContactSection | Mengurangi keraguan, ajakan akhir, kontak |

---

## 11. Struktur Landing Page (Daftar Section)

| Urutan | Komponen | File | Anchor ID |
|---|---|---|---|
| 1 | HeroSection | `components/public/HeroSection.jsx` | `beranda` |
| 2 | TrustBar | `components/public/TrustBar.jsx` | — |
| 3 | ServicesSection | `components/public/ServicesSection.jsx` | `layanan` |
| 4 | WhyChooseUs | `components/public/WhyChooseUs.jsx` | `keunggulan` |
| 5 | MembershipSection | `components/public/MembershipSection.jsx` | `membership` |
| 6 | TestimonialsSection | `components/public/TestimonialsSection.jsx` | `testimoni` |
| 7 | FAQSection | `components/public/FAQSection.jsx` | `faq` |
| 8 | CTASection | `components/public/CTASection.jsx` | — |
| 9 | ContactSection | `components/public/ContactSection.jsx` | `kontak` |

---

## 12. Analisis Top Area

**Komponen:** PublicNavbar, HeroSection, TrustBar.

- **PublicNavbar** — Sticky (`sticky top-0 z-50`) dengan backdrop blur. Berisi BrandLogo, tiga link section (Beranda, Layanan, Kontak), tombol theme toggle (`AnimatedThemeToggler`), serta aksi auth. Saat belum login menampilkan tombol Login & Register; saat login menampilkan salam "Hi, [nama]", link Dashboard, dan Logout. Memiliki menu mobile (hamburger) dan scroll-spy berbasis `IntersectionObserver` untuk menandai link aktif.
- **HeroSection** — Layout dua kolom (teks + gambar `/img/clinik.jpg`). Berisi badge, judul dengan animasi `KineticText`, paragraf value proposition, dan dua CTA (primer kontekstual + "Lihat Layanan"). Memiliki aksen latar blur dekoratif.
- **TrustBar** — Empat metrik kredibilitas (Pelanggan Dilayani, Rata-rata Rating, Jenis Perawatan, Produk Aman & Legal) dengan animasi `NumberTicker`. Dua metrik pertama mengambil **data nyata** dari Supabase (jumlah user role `user` dan rata-rata rating review approved) dengan fallback statis (500+, 4.9/5); dua metrik lainnya bernilai statis (20+, 100%).

---

## 13. Analisis Middle Area

**Komponen:** ServicesSection, WhyChooseUs, MembershipSection, TestimonialsSection, FAQSection.

- **ServicesSection** — Grid kartu layanan (`MagicCard`) menampilkan nama, deskripsi, gambar, harga, dan tombol "Booking Sekarang". Data dari hook `useServices({ activeOnly: true })` (Supabase + realtime, fallback `src/data/services.js`). Pagination muncul bila layanan > 6 (PAGE_SIZE = 6).
- **WhyChooseUs** — Empat kartu keunggulan statis (data array `reasons` di dalam komponen) dengan ikon lucide-react dan `MagicCard`.
- **MembershipSection** — Lima tier membership dari data statis `MEMBERSHIP_LEVELS` (`src/data/membershipLevels.js`): Bronze, Silver, Gold, Platinum, Diamond — masing-masing dengan minPoints, badge berwarna, dan daftar benefit. Diakhiri CTA registrasi.
- **TestimonialsSection** — Dua baris `Marquee` berisi review pelanggan (status `approved` dan memiliki komentar) dari Supabase, dengan sinkron realtime. **Section disembunyikan sepenuhnya bila tidak ada review** (`return null`).
- **FAQSection** — Accordion 5 pertanyaan statis (array `faqs` di dalam komponen). Item pertama terbuka secara default (`openIndex = 0`).

---

## 14. Analisis Bottom Area

**Komponen:** CTASection, ContactSection, PublicFooter.

- **CTASection** — Panel ajakan akhir dengan judul "Siap Merawat Diri Anda Hari Ini?", dua CTA (registrasi/booking kontekstual + "Hubungi Kami"), dan aksen latar dekoratif. Tidak memiliki anchor id.
- **ContactSection** — Tiga kartu kontak (`MagicCard`) yang dapat diklik: Email (Gmail compose), WhatsApp (`wa.me`), dan Alamat (Google Maps). Seluruhnya tautan eksternal `target="_blank"`. Anchor id `kontak`.
- **PublicFooter** — Berisi brand + deskripsi, kolom Navigasi (Beranda, Layanan, Membership, Kontak), kolom Terhubung (WhatsApp, Email, Instagram), dan baris legal (copyright dinamis tahun berjalan, "Kebijakan Privasi" & "Syarat & Ketentuan" sebagai teks non-link).

---

## 15. Fungsi Setiap Section

| Section | Fungsi Utama |
|---|---|
| HeroSection | Menangkap perhatian, menyampaikan value proposition, CTA utama |
| TrustBar | Membangun kredibilitas instan via metrik kuantitatif |
| ServicesSection | Menampilkan katalog layanan + harga, memicu booking |
| WhyChooseUs | Menegaskan diferensiasi & alasan memilih LUMIVA |
| MembershipSection | Menjelaskan benefit membership berjenjang, mendorong registrasi |
| TestimonialsSection | Social proof dari review pelanggan nyata |
| FAQSection | Menjawab keraguan umum sebelum konversi |
| CTASection | Ajakan konversi terakhir yang kuat |
| ContactSection | Menyediakan kanal kontak langsung (email/WA/lokasi) |
| PublicFooter | Navigasi sekunder, kontak, legal, penutup |

---

## 16. CTA Inventory

| Lokasi | Label (Guest) | Label (Login) | Tujuan (Guest) | Tujuan (Login) |
|---|---|---|---|---|
| Hero primer | Daftar Sekarang | Buka Dashboard | `/register` | `/member` |
| Hero sekunder | Lihat Layanan | Lihat Layanan | `#layanan` | `#layanan` |
| Services (per kartu) | Booking Sekarang | Booking Sekarang | `/login` | `/member/bookings` |
| Membership | Daftar Gratis Sekarang | Lihat Membership Saya | `/register` | `/member` |
| CTASection primer | Daftar Sekarang | Booking Sekarang | `/register` | `/member/bookings` |
| CTASection sekunder | Hubungi Kami | Hubungi Kami | `#kontak` | `#kontak` |
| Contact — Email | (kartu) | — | Gmail compose (eksternal) | sama |
| Contact — WhatsApp | (kartu) | — | `wa.me/6282225546502` | sama |
| Contact — Alamat | (kartu) | — | Google Maps (eksternal) | sama |
| Navbar | Login / Register | Logout / Dashboard | `/login`, `/register` | logout, `/member`\|`/admin` |

---

## 17. Navigation Structure

- **Navbar desktop:** Beranda (`/#beranda`), Layanan (`/#layanan`), Kontak (`/#kontak`), Dashboard (kondisional saat login), aksi auth + theme toggle.
- **Navbar mobile:** Link yang sama dalam panel hamburger yang dapat dibuka/tutup.
- **Scroll-spy:** Hanya aktif di rute `/`. Menandai link aktif berdasarkan section yang berada di tengah viewport (`rootMargin: "-45% 0px -50% 0px"`).
- **Footer:** Beranda, Layanan, Membership, Kontak.

Catatan konsistensi: Navbar tidak menautkan ke `#membership`, sedangkan footer menautkannya. Section `#keunggulan`, `#testimoni`, dan `#faq` memiliki anchor namun tidak ditautkan dari navigasi mana pun.

---

## 18. Responsive Overview

- Layout menggunakan kelas Tailwind responsif: `max-w-6xl` container, grid `md:grid-cols-2`, `sm:grid-cols-2 lg:grid-cols-3`, `lg:grid-cols-4`, `lg:grid-cols-5`.
- Navbar memiliki breakpoint `md`: link desktop (`hidden md:flex`) vs menu mobile (`md:hidden`).
- TrustBar: `grid-cols-2 md:grid-cols-4`.
- Footer: `md:grid-cols-4` dengan brand `md:col-span-2`.
- Padding section adaptif (`py-16 md:py-20`, hero `py-16 md:py-24`).

Breakpoint detail (xl/2xl) untuk area landing **belum dapat diidentifikasi secara spesifik** karena pengaturan kustom hanya ditemukan untuk area dashboard admin (`assets/tailwind.css`), bukan landing.

---

## 19. Accessibility Overview

Elemen aksesibilitas yang **ditemukan**:

- `aria-label` pada tombol toggle menu mobile, tombol pagination layanan, dan link sosial footer.
- `aria-expanded` pada tombol accordion FAQ; `aria-current` pada tombol pagination aktif.
- `alt` text pada gambar hero, logo, dan gambar layanan.
- `rel="noopener noreferrer"` pada seluruh tautan eksternal.

Catatan kondisi (didokumentasikan, bukan rekomendasi di V1):

- Atribut `<html lang="en">` (`index.html`) sedangkan seluruh konten berbahasa Indonesia.
- `SmoothCursor` (kursor kustom) aktif global tanpa opsi nonaktif yang teridentifikasi.
- Accordion FAQ menggunakan `<button>` namun tidak memiliki pola ARIA penuh (region/`aria-controls`).

Audit kepatuhan WCAG penuh **belum dapat diidentifikasi berdasarkan implementasi project saat ini** (memerlukan pengujian manual dengan teknologi bantu).

---

## 20. Kelebihan Landing Page

1. Struktur mengikuti alur AIDA yang lengkap (Attention → Action) dengan 9 section terorganisir.
2. Komponen section modular dan terpisah, memudahkan pemeliharaan.
3. Sebagian konten **berbasis data nyata realtime** (TrustBar, Services, Testimonials) dari Supabase, dengan fallback aman.
4. CTA bersifat kontekstual terhadap status login (guest vs member).
5. Mendukung dark/light mode dengan transisi animatif.
6. Animasi reveal-on-scroll konsisten di seluruh section (`Reveal`).
7. Testimoni menyembunyikan diri otomatis bila tidak ada data, menghindari tampilan kosong.

---

## 21. Kekurangan Landing Page

(Didokumentasikan sebagai temuan; analisis & rekomendasi mendalam ada pada PRD V2.)

1. `<html lang="en">` tidak sesuai dengan konten berbahasa Indonesia.
2. Meta SEO minim: hanya `<title>`, tanpa meta description, Open Graph, atau favicon deskriptif untuk berbagi sosial.
3. Inkonsistensi navigasi: `#membership` ada di footer tapi tidak di navbar; `#keunggulan`, `#testimoni`, `#faq` tidak tertaut di mana pun.
4. Jejak penamaan brand lama "MediCare" masih tersisa (komentar & key localStorage).
5. Tautan legal footer ("Kebijakan Privasi", "Syarat & Ketentuan") berupa teks statis tanpa halaman tujuan.
6. CTASection menduplikasi tujuan registrasi/booking dengan Hero & Membership (potensi redundansi pesan).
7. Link sosial Instagram footer mengarah ke `https://instagram.com` generik (bukan profil spesifik).

---

*Dokumen ini murni dokumentasi kondisi saat ini. Evaluasi kualitas dibahas pada PRD V2, dan roadmap pengembangan pada PRD V3.*
