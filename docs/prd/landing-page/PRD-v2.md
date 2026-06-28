# PRD V2 — Evaluasi Landing Page LUMIVA Beauty Clinic

| Metadata | Keterangan |
|---|---|
| Dokumen | PRD V2 — Evaluasi & Analisis Kualitas |
| Produk | Landing Page Publik LUMIVA Beauty Clinic |
| Versi Dokumen | 1.0 |
| Basis | PRD V1 (dokumentasi kondisi saat ini) |
| Tujuan | Mengevaluasi kualitas implementasi & memberi rekomendasi tanpa mengubah identitas |

> Format setiap temuan: **Kondisi Saat Ini → Permasalahan → Dampak → Rekomendasi → Prioritas → Estimasi Manfaat.** Seluruh temuan berbasis source code aktual. Tidak ada perubahan kode yang dilakukan pada fase ini.

---

## Ringkasan Prioritas Temuan

| No | Area | Temuan | Prioritas |
|---|---|---|---|
| 1 | SEO | `lang="en"` & meta tag minim | High |
| 2 | Accessibility | Lang mismatch, pola ARIA FAQ, smooth cursor | High |
| 3 | UX Navigasi | Section tidak tertaut & inkonsistensi navbar/footer | Medium |
| 4 | Conversion | Redundansi CTA & tidak adanya pelacakan | Medium |
| 5 | Trust Building | Metrik sebagian statis, link sosial generik | Medium |
| 6 | Copywriting | Tautan legal kosong, brand legacy | Medium |
| 7 | Visual Hierarchy | Section tanpa anchor & ritme heading | Low |
| 8 | Typography | Definisi font ganda/tidak terpakai | Low |
| 9 | Color System | Token warna konsisten (catatan minor) | Low |
| 10 | Motion | Animasi tanpa `prefers-reduced-motion` | Medium |
| 11 | Responsive | Aman, tanpa penanganan landscape kecil | Low |
| 12 | Component Consistency | Pola CTA/CARD konsisten (positif) | Low |

---

## 1. UX Review

**Kondisi Saat Ini:** Alur AIDA lengkap dengan 9 section. Navigasi hanya menautkan 3 dari 7 section ber-anchor. Section TestimonialsSection bisa menghilang otomatis bila kosong.

**Permasalahan:** Pengguna tidak dapat melompat cepat ke Membership, Keunggulan, atau FAQ melalui navigasi. Hilangnya Testimonials mengubah panjang & ritme halaman tanpa indikator.

**Dampak:** Pengguna pada perangkat panjang harus scroll manual; potensi friksi pada tahap Desire dan Action.

**Rekomendasi:** Pertimbangkan menambah tautan navigasi ke Membership & FAQ (anchor sudah tersedia), atau menyederhanakan jumlah anchor yang tidak dipakai. Tambahkan placeholder ringan/CTA alternatif saat Testimonials kosong.

**Prioritas:** Medium

**Estimasi Manfaat:** Mempercepat akses ke section konversi tinggi; menjaga konsistensi panjang halaman.

---

## 2. UI Review

**Kondisi Saat Ini:** UI memakai shadcn/ui + komponen Magic UI (MagicCard, Marquee, NumberTicker, KineticText, BorderBeam). Kartu konsisten memakai `MagicCard` dengan hover lift (`hover:-translate-y-1`).

**Permasalahan:** Tidak ada masalah fungsional signifikan. Hero hanya memakai satu gambar statis (`/img/clinik.jpg`) tanpa skeleton/placeholder saat memuat.

**Dampak:** Pada koneksi lambat, area visual hero bisa kosong sesaat (meski `loading="eager"`).

**Rekomendasi:** Tambahkan rasio aspek tetap atau placeholder blur untuk mencegah layout shift pada hero & kartu layanan.

**Prioritas:** Low

**Estimasi Manfaat:** Mengurangi Cumulative Layout Shift (CLS), persepsi loading lebih halus.

---

## 3. Visual Hierarchy

**Kondisi Saat Ini:** Heading section konsisten (`text-3xl md:text-4xl`), hero `text-4xl md:text-5xl lg:text-6xl`. Section dipisah `border-b` dan latar selang-seling (`bg-muted/30`).

**Permasalahan:** CTASection dan TrustBar tidak memiliki anchor id; ritme antar-section bergantung penuh pada border tipis sehingga separasi visual relatif datar.

**Dampak:** Pemindaian (scanning) section bisa kurang tegas pada layar besar.

**Rekomendasi:** Pertahankan hierarki heading; pertimbangkan variasi spacing/latar yang lebih tegas antar kelompok area (Top/Middle/Bottom).

**Prioritas:** Low

**Estimasi Manfaat:** Keterbacaan & pemindaian section lebih baik.

---

## 4. Typography

**Kondisi Saat Ini:** Ditemukan beberapa sumber font: `index.css` menetapkan `system-ui` pada `:root` dan `h1 { font-size: 3.2em }`; `assets/tailwind.css` mendefinisikan `@font-face` Barlow & Poppins, mengimpor Geist variable, dan menetapkan `html { font-family: var(--font-poppins) }`.

**Permasalahan:** Definisi typography tersebar dan berpotensi tumpang tindih (system-ui vs Poppins vs Geist). Aturan `h1 { font-size: 3.2em }` di `index.css` berpotensi bertabrakan dengan kelas Tailwind pada hero.

**Dampak:** Inkonsistensi rendering font antar lingkungan; potensi override tak terduga pada heading.

**Rekomendasi:** Konsolidasikan satu sumber kebenaran typography (mis. Poppins untuk body, Barlow untuk heading) dan hapus aturan `h1` global yang dapat bertabrakan dengan utility class.

**Prioritas:** Low

**Estimasi Manfaat:** Konsistensi visual lintas halaman & perangkat.

---

## 5. Color System

**Kondisi Saat Ini:** Token warna HSL terdefinisi rapi di `index.css` untuk light & dark (`--primary: 142 76% 36%` hijau, dsb.). Komponen memakai token semantik (`text-foreground`, `bg-muted`, `text-primary`). Badge membership memakai warna tier eksplisit.

**Permasalahan:** Tidak ada masalah berarti. Catatan minor: `assets/tailwind.css` juga mendefinisikan palet warna terpisah (`--color-hijau: #00B074`) untuk area dashboard, berbeda dari `--primary` HSL landing.

**Dampak:** Potensi dua "hijau brand" yang sedikit berbeda antara landing dan dashboard.

**Rekomendasi:** Selaraskan nilai hijau brand antara token landing (`--primary`) dan dashboard (`--color-hijau`) agar identitas warna seragam.

**Prioritas:** Low

**Estimasi Manfaat:** Konsistensi brand color di seluruh produk.

---

## 6. Component Consistency

**Kondisi Saat Ini:** Pola kartu (`Card` + `MagicCard`), tombol (`Button` shadcn), dan animasi (`Reveal` dengan `delay` bertahap) konsisten di seluruh section.

**Permasalahan:** Tidak ditemukan inkonsistensi komponen yang berarti (temuan positif).

**Dampak:** Positif — pemeliharaan dan prediktabilitas tinggi.

**Rekomendasi:** Pertahankan pola ini; dokumentasikan sebagai design pattern internal.

**Prioritas:** Low

**Estimasi Manfaat:** Kecepatan pengembangan section baru ke depan.

---

## 7. Responsive Design

**Kondisi Saat Ini:** Grid & padding responsif memakai breakpoint `sm/md/lg`. Navbar punya mode mobile penuh. TrustBar `grid-cols-2 md:grid-cols-4`.

**Permasalahan:** Tidak ditemukan penanganan khusus untuk layar sangat kecil (<320px) atau orientasi landscape ponsel. Pengaturan breakpoint kustom hanya ada untuk dashboard, bukan landing.

**Dampak:** Risiko rendah; layout Tailwind default umumnya aman.

**Rekomendasi:** Verifikasi manual pada 320px dan landscape; pastikan hero dua kolom tetap terbaca.

**Prioritas:** Low

**Estimasi Manfaat:** Cakupan perangkat lebih luas.

---

## 8. Motion & Animation

**Kondisi Saat Ini:** Animasi kaya: `Reveal` (fade+slide via IntersectionObserver), `KineticText`, `NumberTicker`, `Marquee`, `MagicCard`, `SmoothCursor`, `AnimatedThemeToggler` (View Transitions API), `BorderBeam`, meteor, ripple.

**Permasalahan:** Tidak ditemukan dukungan `prefers-reduced-motion`. Marquee & smooth cursor berjalan terus tanpa opsi pengurangan gerak.

**Dampak:** Pengguna dengan sensitivitas gerak (vestibular) dapat terganggu; berpotensi menurunkan aksesibilitas.

**Rekomendasi:** Tambahkan dukungan `prefers-reduced-motion` untuk menonaktifkan/meredam Marquee, SmoothCursor, dan Reveal bagi yang membutuhkan.

**Prioritas:** Medium

**Estimasi Manfaat:** Kepatuhan aksesibilitas gerak; kenyamanan sebagian pengguna.

---

## 9. Accessibility

**Kondisi Saat Ini:** Terdapat `aria-label`, `aria-expanded`, `aria-current`, `alt`, dan `rel="noopener noreferrer"`. Namun `<html lang="en">` sedangkan konten Indonesia; FAQ belum punya pola ARIA penuh; SmoothCursor global.

**Permasalahan:** Mismatch bahasa memengaruhi screen reader; accordion tanpa `aria-controls`/region; kursor kustom dapat mengganggu pointer assistif.

**Dampak:** Pengalaman pengguna disabilitas menurun; potensi tidak lolos audit WCAG.

**Rekomendasi:** Ubah `lang="id"`, lengkapi pola ARIA accordion, dan beri opsi/penghormatan reduced-motion untuk kursor.

**Prioritas:** High

**Estimasi Manfaat:** Aksesibilitas & kepatuhan lebih baik; jangkauan pengguna lebih luas.

---

## 10. SEO

**Kondisi Saat Ini:** `index.html` hanya memuat `<title>LUMIVA Beauty Clinic</title>`, `charset`, `viewport`, dan favicon. Tidak ada meta description, Open Graph, Twitter Card, canonical, atau structured data. Aplikasi adalah SPA (client-side render) tanpa SSR/prerender yang teridentifikasi.

**Permasalahan:** Mesin pencari & pratinjau berbagi sosial tidak memperoleh metadata memadai; konten dirender via JS.

**Dampak:** Visibilitas organik & CTR berbagi sosial rendah; risiko indexing tidak optimal.

**Rekomendasi:** Tambahkan meta description, Open Graph/Twitter tags, `lang="id"`, dan pertimbangkan prerender/SSR untuk landing. Tambah structured data `LocalBusiness`/`MedicalBusiness`.

**Prioritas:** High

**Estimasi Manfaat:** Peningkatan trafik organik dan tampilan berbagi sosial yang profesional.

---

## 11. Copywriting

**Kondisi Saat Ini:** Copy berbahasa Indonesia, ringkas, dan berorientasi manfaat (hero, membership, FAQ). Namun ada jejak brand lama "MediCare" pada komentar/localStorage dan tautan legal footer non-fungsional.

**Permasalahan:** Tautan "Kebijakan Privasi" & "Syarat & Ketentuan" hanya teks tanpa halaman; jejak brand legacy menurunkan kerapian.

**Dampak:** Kredibilitas & kepercayaan sedikit menurun; ekspektasi legal pengguna tidak terpenuhi.

**Rekomendasi:** Sediakan halaman/konten legal nyata atau hapus tautan; bersihkan referensi brand lama.

**Prioritas:** Medium

**Estimasi Manfaat:** Profesionalisme & kepercayaan meningkat.

---

## 12. Trust Building

**Kondisi Saat Ini:** TrustBar menampilkan member & rating dari data nyata (fallback statis), Testimonials menampilkan review approved nyata. Namun "Jenis Perawatan (20+)" dan "Produk Aman & Legal (100%)" statis; link sosial Instagram generik.

**Permasalahan:** Sebagian metrik tidak terikat data; link sosial tidak menuju profil resmi; tidak ada badge sertifikasi/legalitas konkret.

**Dampak:** Kepercayaan berpotensi melemah bila pengunjung menyadari angka statis atau link sosial buntu.

**Rekomendasi:** Ikat metrik ke data nyata bila memungkinkan (jumlah layanan dari tabel services), arahkan sosial ke profil resmi, dan pertimbangkan menampilkan kredensial/legalitas.

**Prioritas:** Medium

**Estimasi Manfaat:** Kepercayaan & kredibilitas konversi meningkat.

---

## 13. CTA Effectiveness

**Kondisi Saat Ini:** CTA kontekstual (guest/member) dengan tujuan jelas (`/register`, `/login`, `/member/bookings`). Hero, Membership, dan CTASection sama-sama mengarah ke registrasi/booking.

**Permasalahan:** Tiga titik CTA dengan pesan serupa berpotensi redundan; tidak ada pelacakan klik (analytics) yang teridentifikasi untuk mengukur efektivitas.

**Dampak:** Sulit mengukur CTA mana yang paling konversi; pesan berulang bisa menurunkan dampak.

**Rekomendasi:** Diferensiasikan pesan tiap CTA (mis. Hero = "Daftar", CTASection = "Booking"), dan tambahkan event tracking untuk tiap CTA.

**Prioritas:** Medium

**Estimasi Manfaat:** Pengukuran konversi yang dapat dioptimasi (data-driven).

---

## 14. User Flow

**Kondisi Saat Ini:** Flow guest → register/login → member konsisten. Booking dari Services mengarahkan guest ke `/login` (bukan `/register`), sedangkan CTA lain ke `/register`.

**Permasalahan:** Inkonsistensi tujuan: tombol Booking guest ke `/login`, padahal guest kemungkinan belum punya akun.

**Dampak:** Guest tanpa akun yang klik "Booking Sekarang" diarahkan ke login, bukan register — friksi konversi.

**Rekomendasi:** Pertimbangkan mengarahkan guest dari Booking ke `/register` (atau halaman login dengan tautan register yang jelas).

**Prioritas:** Medium

**Estimasi Manfaat:** Mengurangi friksi & drop-off pada jalur booking.

---

## 15. Conversion Opportunity

**Kondisi Saat Ini:** Landing memiliki banyak titik konversi namun tanpa instrumentasi analitik dan tanpa diferensiasi penawaran.

**Permasalahan:** Tidak ada pengukuran funnel; tidak ada penawaran spesifik (mis. promo member baru ditegaskan secara visual/terukur).

**Dampak:** Optimasi konversi tidak dapat dijalankan secara terukur.

**Rekomendasi:** Pasang analytics funnel (view → klik CTA → register), uji A/B headline/CTA, dan tonjolkan promo member baru.

**Prioritas:** Medium

**Estimasi Manfaat:** Dasar untuk peningkatan conversion rate berkelanjutan.

---

## Kesimpulan Evaluasi

Implementasi Landing Page sudah solid secara struktur (AIDA lengkap), modular, dan sebagian berbasis data realtime. Area prioritas tertinggi adalah **SEO** dan **Accessibility** (terutama `lang`, meta tag, reduced-motion), diikuti perbaikan **konsistensi navigasi/flow** dan **instrumentasi konversi**. Seluruh rekomendasi dapat dijalankan tanpa mengubah identitas visual brand LUMIVA. Roadmap eksekusi dirinci pada PRD V3.
