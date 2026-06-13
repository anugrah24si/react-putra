# Planning Fitur User

Dokumen perencanaan sederhana untuk fitur User yang terhubung ke database Supabase.

---

## 1. Tujuan

Membuat sistem User yang bisa:
- **Login** langsung ke Supabase (bukan data dummy)
- **Register** akun baru, lalu akun itu bisa langsung dipakai login
- **CRUD** data User dari halaman admin (Create, Read, Update, Delete)

---

## 2. Struktur Database

Tabel utama: **`users`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | ID unik, dibuat otomatis |
| `full_name` | text | Nama lengkap |
| `email` | text | Email (unik, dipakai untuk login) |
| `phone` | text | Nomor telepon (opsional) |
| `password` | text | Password (disimpan ter-hash / bcrypt) |
| `role` | text | Peran: `admin` atau `user` |
| `status` | text | Status: `Active` atau `Inactive` |
| `created_at` | timestamptz | Waktu dibuat |
| `updated_at` | timestamptz | Waktu terakhir diubah |

Fungsi database (RPC):
- `register_user(...)` — menyimpan user baru dengan password ter-hash
- `login_user(...)` — mencocokkan email + password

---

## 3. Daftar Fitur (Planning)

| No | Fitur | Halaman | Status |
|----|-------|---------|--------|
| 1 | Login ke Supabase | `/login` | Selesai |
| 2 | Register akun baru | `/register` | Selesai |
| 3 | Lihat daftar user (Read) | `/users` | Selesai |
| 4 | Tambah user (Create) | `/users` | Selesai |
| 5 | Edit user (Update) | `/users` | Selesai |
| 6 | Hapus user (Delete) | `/users` | Selesai |
| 7 | Cari & filter user | `/users` | Selesai |

---

## 4. Alur Sederhana

### Register
1. User isi form (nama, email, phone, password)
2. Data dikirim ke fungsi `register_user` di Supabase
3. Jika email belum dipakai → akun dibuat → diarahkan ke halaman Login

### Login
1. User isi email + password
2. Data dicek lewat fungsi `login_user`
3. Jika cocok → masuk ke dashboard
4. Jika salah → tampil pesan error

### CRUD (Halaman Admin)
1. **Read** — daftar user diambil dari tabel `users`
2. **Create** — tambah user baru lewat tombol "Add User"
3. **Update** — ubah data user lewat tombol "Edit"
4. **Delete** — hapus user lewat tombol "Delete" (dengan konfirmasi)

---

## 5. Akun Awal (Seed)

| Email | Password | Role |
|-------|----------|------|
| admin@medicare.com | admin123 | admin |
| anugrah@medicare.com | anugrah123 | admin |
| user@medicare.com | user123 | user |

---

## 6. Rencana Pengembangan Selanjutnya (Opsional)

- Proteksi halaman: dashboard hanya bisa diakses jika sudah login
- Tombol Logout
- Validasi password lebih kuat (minimal karakter, kombinasi)
- Ubah password dari halaman profil
