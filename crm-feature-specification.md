IMPORTANT INSTRUCTION

Sebelum melakukan perubahan kode, baca dan pahami seluruh isi file dokumentasi berikut:

docs/crm-feature-specification.md

File tersebut berisi seluruh kebutuhan sistem CRM Klinik Kecantikan yang harus dijadikan acuan utama selama proses development.

JANGAN mengabaikan isi file tersebut.

Setiap fitur yang dibuat harus mengikuti spesifikasi yang ada pada file markdown tersebut.

====================================================

PROJECT INFORMATION

Project Name:
MediCare Beauty Clinic CRM

Technology Stack:

* React.js
* Vite
* Tailwind CSS
* Shadcn UI
* React Router DOM
* Supabase
* Lucide React
* React Hook Form
* Zod Validation

====================================================

DEVELOPMENT RULES

1. Selalu baca file:

docs/crm-feature-specification.md

sebelum membuat fitur.

2. Jangan membuat file secara acak.

3. Gunakan struktur folder yang rapi dan scalable.

4. Pisahkan:

* Pages
* Components
* Layouts
* Services
* Hooks
* Context
* Types
* Data
* Utils

5. Gunakan reusable component.

6. Gunakan clean code.

7. Gunakan TypeScript.

8. Jangan membuat kode duplikat.

9. Gunakan naming convention yang konsisten.

10. Setiap fitur baru harus terhubung dengan Dashboard Admin.

====================================================

ROLE SYSTEM

Guest
Member
Admin

Guest yang login otomatis menjadi Member Bronze.

====================================================

FITUR YANG HARUS DIIMPLEMENTASIKAN

1. Dashboard Member
2. Membership System
3. Booking Management
4. Transaction History
5. Rating & Review
6. Voucher System
7. Promotion System
8. Customer Notes
9. Therapist Management
10. CRM Analytics Dashboard

====================================================

IMPLEMENTATION REQUIREMENTS

Saat user login:

1. Sistem otomatis mengubah role menjadi Member.
2. Membership awal otomatis Bronze.
3. Navbar Guest berubah menjadi Navbar Member.
4. Dashboard Member muncul.
5. Data member tersimpan di database.
6. Semua aktivitas member tersinkronisasi ke Dashboard Admin.

====================================================

ADMIN SYNCHRONIZATION

Setiap aktivitas berikut harus otomatis memperbarui Dashboard Admin:

* Registrasi Member
* Login Member
* Booking
* Pembayaran
* Voucher Usage
* Review
* Membership Upgrade
* Customer Notes
* Transaction History

====================================================

OUTPUT EXPECTATION

Saat membuat fitur:

* Buat file sesuai folder structure.
* Jelaskan file yang dibuat.
* Jelaskan fungsi masing-masing file.
* Jelaskan relasi antar file.
* Jangan menaruh seluruh kode dalam satu file.
* Terapkan modular architecture.
* Terapkan clean architecture.
* Pastikan project mudah dikembangkan di masa depan.

====================================================

Keputusan Project:

1. Tetap gunakan JavaScript (.jsx).

Jangan migrasi project ke TypeScript.

Gunakan:

* .jsx
* .js

dan pastikan kompatibel dengan React + Vite yang sudah berjalan.

2. Install dependency berikut:

npm install react-hook-form zod @hookform/resolvers

Gunakan React Hook Form dan Zod untuk seluruh form baru.

3. Role system tetap:

role:

* admin
* user

Jangan mengubah role menjadi member.

Member direpresentasikan sebagai:

role = user

dan menggunakan field tambahan:

membership_level

dengan nilai:

* Bronze
* Silver
* Gold
* Platinum
* Diamond

4. Ikuti seluruh struktur folder pada dokumentasi.

5. Jangan membuat seluruh fitur sekaligus.

Implementasi dilakukan bertahap.

Tahap pengerjaan:

Tahap 1:
Membership System

Tahap 2:
Member Dashboard

Tahap 3:
Booking Management

Tahap 4:
Transaction History

Tahap 5:
Rating & Review

Tahap 6:
Voucher & Promotion

Tahap 7:
Customer Notes

Tahap 8:
CRM Analytics Dashboard

Mulai dari Tahap 1 yaitu Membership System.

Sebelum membuat kode:

* Analisis struktur project yang ada.
* Buat daftar file yang perlu dibuat.
* Buat daftar file yang perlu dimodifikasi.
* Jelaskan relasi antar file.
* Pastikan tidak merusak fitur existing.
* Gunakan struktur folder yang rapi dan modular.
