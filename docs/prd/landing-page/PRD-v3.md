# PRD V3 — Roadmap Pengembangan Landing Page LUMIVA Beauty Clinic

| Metadata | Keterangan |
|---|---|
| Dokumen | PRD V3 — Roadmap & Requirement Pengembangan |
| Produk | Landing Page Publik LUMIVA Beauty Clinic |
| Versi Dokumen | 1.0 |
| Basis | PRD V1 (dokumentasi) + PRD V2 (evaluasi) |
| Tujuan | Menyusun roadmap pengembangan realistis berdasarkan hasil audit |

> Roadmap ini diturunkan dari temuan PRD V2 dan kondisi nyata PRD V1. Tidak ada fitur yang diada-adakan; seluruh requirement mengacu pada section dan komponen yang sudah ada.

---

## 1. Product Vision

Menjadikan Landing Page LUMIVA sebagai kanal akuisisi utama yang mengubah pengunjung anonim menjadi member aktif klinik kecantikan, melalui pengalaman yang cepat, kredibel, aksesibel, dan terukur — tanpa mengubah identitas brand yang sudah mapan.

---

## 2. Business Objective

| Kode | Objective | Dasar |
|---|---|---|
| BO-1 | Meningkatkan konversi guest → registrasi member | CTA dominan ke `/register` |
| BO-2 | Meningkatkan volume booking layanan | CTA booking di Services & CTASection |
| BO-3 | Meningkatkan visibilitas organik (SEO) | Temuan SEO PRD V2 |
| BO-4 | Meningkatkan kepercayaan & kredibilitas | TrustBar, Testimonials, WhyChooseUs |

> Target kuantitatif (angka/periode) **belum dapat diidentifikasi berdasarkan implementasi project saat ini** dan perlu ditetapkan oleh stakeholder bisnis.

---

## 3. Success Metrics

| Metrik | Definisi | Status Instrumentasi Saat Ini |
|---|---|---|
| Conversion Rate (Register) | % pengunjung yang menyelesaikan registrasi | Belum ada tracking teridentifikasi |
| Booking Conversion | % pengunjung yang menuju alur booking | Belum ada tracking teridentifikasi |
| Bounce Rate / Scroll Depth | Kedalaman interaksi landing | Belum ada tracking teridentifikasi |
| Organic Traffic | Sesi dari mesin pencari | Bergantung pada perbaikan SEO |
| CTA Click-through Rate | Rasio klik tiap CTA | Belum ada tracking teridentifikasi |

---

## 4. KPI Landing Page

- KPI-1: Registrasi member baru per bulan (BO-1).
- KPI-2: Jumlah pengunjung yang mencapai alur `/member/bookings` (BO-2).
- KPI-3: Posisi & impresi organik untuk kata kunci klinik kecantikan lokal (BO-3).
- KPI-4: Skor aksesibilitas otomatis (mis. Lighthouse a11y) ≥ target yang disepakati.

> Nilai ambang/target tiap KPI perlu ditetapkan stakeholder; **belum dapat diidentifikasi dari implementasi saat ini.**

---

## 5. Functional Requirements

| ID | Requirement | Sumber Temuan |
|---|---|---|
| FR-1 | Landing menampilkan 9 section sesuai urutan AIDA | PRD V1 §11 |
| FR-2 | CTA wajib kontekstual terhadap status login | PRD V1 §16 |
| FR-3 | Navigasi menautkan section konversi tinggi (min. Membership & FAQ) | PRD V2 §1 |
| FR-4 | Booking guest diarahkan ke alur yang menyertakan opsi registrasi | PRD V2 §14 |
| FR-5 | Setiap CTA memiliki event tracking | PRD V2 §13, §15 |
| FR-6 | Tautan legal footer menuju halaman/konten nyata | PRD V2 §11 |
| FR-7 | Link sosial menuju profil resmi | PRD V2 §12 |
| FR-8 | Metrik TrustBar diikat ke data nyata bila tersedia | PRD V2 §12 |

---

## 6. Non Functional Requirements

| ID | Requirement | Kategori |
|---|---|---|
| NFR-1 | `lang="id"` & metadata SEO lengkap (description, OG, canonical) | SEO |
| NFR-2 | Dukungan `prefers-reduced-motion` untuk seluruh animasi | Accessibility |
| NFR-3 | Pola ARIA lengkap pada accordion FAQ | Accessibility |
| NFR-4 | Mencegah layout shift (CLS) pada hero & kartu | Performance |
| NFR-5 | Konsolidasi sumber typography & warna brand | Maintainability |
| NFR-6 | Fallback aman saat data Supabase kosong/gagal | Reliability (sudah terpenuhi sebagian) |
| NFR-7 | Responsif terverifikasi hingga 320px & landscape | Responsive |

---

## 7. Requirement Tiap Section

| Section | Requirement Pengembangan |
|---|---|
| HeroSection | Tambah placeholder/aspect-ratio gambar (NFR-4); diferensiasi pesan CTA (FR-5) |
| TrustBar | Ikat "Jenis Perawatan" ke jumlah services nyata (FR-8) |
| ServicesSection | Booking guest → sertakan jalur registrasi (FR-4); tracking klik (FR-5) |
| WhyChooseUs | Tambah anchor & tautan navigasi opsional (FR-3) |
| MembershipSection | Tautkan dari navbar (FR-3); tracking CTA (FR-5) |
| TestimonialsSection | Placeholder/CTA alternatif saat kosong (PRD V2 §1) |
| FAQSection | Pola ARIA penuh (NFR-3) |
| CTASection | Diferensiasi pesan dari Hero (FR-5) |
| ContactSection | — (sudah berbasis link nyata) |
| PublicFooter | Tautan legal nyata (FR-6); sosial resmi (FR-7) |
| PublicNavbar | Tambah link Membership/FAQ (FR-3) |

---

## 8. User Stories

- **US-1 (Guest):** Sebagai pengunjung baru, saya ingin menavigasi cepat ke Membership & FAQ agar dapat menilai benefit dan menjawab keraguan sebelum mendaftar.
- **US-2 (Guest):** Sebagai pengunjung yang tertarik booking, saya ingin diarahkan ke registrasi (jika belum punya akun) agar tidak terjebak di halaman login.
- **US-3 (Pengguna disabilitas):** Sebagai pengguna screen reader, saya ingin bahasa halaman dan pola ARIA benar agar konten dapat dipahami.
- **US-4 (Pengguna sensitif gerak):** Sebagai pengguna dengan `prefers-reduced-motion`, saya ingin animasi diredam agar nyaman.
- **US-5 (Tim Marketing):** Sebagai tim pemasaran, saya ingin landing terindeks & tampil baik di berbagi sosial agar trafik organik meningkat.
- **US-6 (Tim Produk):** Sebagai PM, saya ingin pelacakan klik CTA agar dapat mengukur dan mengoptimasi konversi.

---

## 9. Acceptance Criteria

| Story | Acceptance Criteria |
|---|---|
| US-1 | Navbar menampilkan tautan ke Membership & FAQ yang men-scroll ke anchor terkait |
| US-2 | Klik "Booking Sekarang" oleh guest membuka jalur dengan opsi registrasi yang jelas |
| US-3 | `<html lang="id">`; accordion FAQ memiliki `aria-controls`/region; audit a11y otomatis tidak menandai mismatch bahasa |
| US-4 | Dengan `prefers-reduced-motion: reduce`, Marquee/SmoothCursor/Reveal tidak menimbulkan gerak signifikan |
| US-5 | `<head>` memuat meta description, Open Graph, dan canonical; pratinjau berbagi menampilkan judul/gambar |
| US-6 | Setiap klik CTA mengirim event ke layanan analytics yang ditentukan |

---

## 10. Technical Consideration

- **Stack:** React + React Router (SPA, lazy routes), Tailwind + shadcn/ui + Magic UI, Supabase (data services/reviews/users), animasi berbasis IntersectionObserver & View Transitions API.
- **SEO pada SPA:** Perbaikan meta dapat dilakukan via pengelolaan `<head>` (mis. komponen head management). Untuk indexing optimal, evaluasi prerender/SSR — perlu kajian karena saat ini murni client-render.
- **Data realtime:** Hook `useRealtimeSync` sudah dipakai (users, reviews, services); perubahan FR-8 dapat memanfaatkannya.
- **Sesi:** Berbasis `localStorage` (`medicare-user`); tidak memengaruhi landing secara langsung.
- **Konsolidasi style:** Typography & warna tersebar di `index.css` dan `assets/tailwind.css`; konsolidasi perlu hati-hati agar tidak memengaruhi dashboard.

---

## 11. Dependency

| Dependency | Keterangan |
|---|---|
| Supabase | Sumber data Services, Reviews, Users untuk TrustBar/Services/Testimonials |
| Konten legal | Diperlukan dari stakeholder untuk FR-6 |
| Profil sosial resmi | Diperlukan untuk FR-7 |
| Layanan analytics | Diperlukan untuk FR-5 (pemilihan tool oleh tim) |
| Target KPI bisnis | Diperlukan dari stakeholder untuk §3–§4 |

---

## 12. Risk Analysis

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Perubahan SEO via SSR/prerender mengubah arsitektur SPA | Tinggi | Mulai dari meta tag client-side; kaji SSR terpisah |
| Konsolidasi typography/warna memengaruhi dashboard | Sedang | Uji regresi visual area admin sebelum rilis |
| Penambahan tracking menambah skrip pihak ketiga | Sedang | Pilih tool ringan; pertimbangkan privasi & consent |
| Reduced-motion menonaktifkan animasi brand signature | Rendah | Redam, bukan hapus; pertahankan identitas |
| Data Supabase kosong menyembunyikan section | Rendah | Fallback sudah ada; tambah placeholder bila perlu |

---

## 13. Prioritas Pengembangan

| Prioritas | Item | Referensi |
|---|---|---|
| P0 (High) | SEO meta + `lang="id"` | NFR-1, FR (SEO) |
| P0 (High) | Accessibility: ARIA FAQ, reduced-motion | NFR-2, NFR-3 |
| P1 (Medium) | Navigasi: tautan Membership/FAQ + konsistensi | FR-3 |
| P1 (Medium) | Flow booking guest → registrasi | FR-4 |
| P1 (Medium) | Tracking CTA & funnel | FR-5 |
| P2 (Low-Med) | Tautan legal & sosial nyata | FR-6, FR-7 |
| P2 (Low) | Konsolidasi typography & warna | NFR-5 |
| P2 (Low) | Anti layout shift hero/kartu | NFR-4 |

---

## 14. Development Roadmap

**Fase 1 — Fondasi SEO & Aksesibilitas (P0)**
- Perbaiki `lang`, tambah meta description/OG/canonical.
- Tambah dukungan `prefers-reduced-motion` & pola ARIA FAQ.

**Fase 2 — Optimasi Konversi & Navigasi (P1)**
- Lengkapi tautan navigasi ke section konversi.
- Sempurnakan flow booking guest.
- Pasang tracking CTA & funnel.

**Fase 3 — Kredibilitas & Kerapian (P2)**
- Tautan legal & sosial nyata.
- Ikat metrik TrustBar ke data nyata.
- Konsolidasi typography/warna & anti-CLS.

**Fase 4 — Pengukuran & Iterasi (berkelanjutan)**
- Analisis funnel, A/B testing headline/CTA.

> Estimasi durasi tiap fase **belum dapat diidentifikasi** tanpa kapasitas tim; perlu penjadwalan oleh tim pengembang.

---

## 15. Milestone

| Milestone | Definisi Selesai |
|---|---|
| M1 | Skor SEO & Accessibility dasar terpenuhi (Fase 1) |
| M2 | Navigasi & flow booking diperbaiki, tracking aktif (Fase 2) |
| M3 | Kredibilitas & konsolidasi style selesai (Fase 3) |
| M4 | Dashboard pengukuran konversi berjalan & iterasi pertama (Fase 4) |

---

## 16. Testing Strategy

- **Unit/Component:** Uji render section & perilaku CTA kontekstual (guest vs login).
- **Accessibility:** Audit otomatis (Lighthouse/axe) + uji manual screen reader & keyboard.
- **Responsive:** Verifikasi 320px, tablet, desktop, dan landscape ponsel.
- **SEO:** Validasi meta tag, pratinjau Open Graph, dan crawlability.
- **Regression:** Uji visual area dashboard saat konsolidasi style.
- **Analytics:** Verifikasi event CTA terkirim sesuai spesifikasi funnel.

> Framework pengujian yang terpasang **belum dapat diidentifikasi** dari file yang diaudit; perlu konfirmasi sebelum implementasi tes.

---

## 17. Deployment Checklist

- [ ] Meta SEO & `lang="id"` terverifikasi di build produksi.
- [ ] Audit aksesibilitas lulus ambang yang disepakati.
- [ ] Seluruh CTA & tautan (internal/eksternal) berfungsi.
- [ ] Fallback data Supabase teruji (kondisi kosong & gagal).
- [ ] Tracking analytics aktif & terverifikasi.
- [ ] Uji lintas perangkat & dark/light mode.
- [ ] Tidak ada regresi visual pada area dashboard.
- [ ] Tautan legal & sosial mengarah ke konten nyata.

---

## 18. Future Enhancement

- Prerender/SSR untuk landing demi SEO & performa.
- Structured data (`LocalBusiness`/`MedicalBusiness`) dan rich snippet.
- A/B testing headline, CTA, dan urutan section.
- Personalisasi konten berbasis status login/level membership.
- Integrasi promo/voucher dinamis pada Hero & CTASection (memanfaatkan modul voucher yang sudah ada).
- Multi-bahasa (i18n) bila menyasar audiens lebih luas.

---

*Roadmap ini melengkapi PRD V1 (dokumentasi) dan PRD V2 (evaluasi) sebagai acuan pengembangan Landing Page LUMIVA berikutnya. Seluruh item bersifat rekomendasi pengembangan; tidak ada perubahan kode yang dilakukan dalam penyusunan dokumen ini.*
