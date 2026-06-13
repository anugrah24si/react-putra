# Penjelasan Kode Fitur User (Supabase)

Dokumen ini menjelaskan kode yang dibuat untuk fitur **User** (Login, Register, CRUD)
yang terhubung ke database Supabase, beserta **fungsinya** dan **letak filenya**.

---

## Ringkasan Alur

```
Halaman (Login/Register/Users)
        │  memanggil
        ▼
src/services/userService.js   ← kumpulan fungsi (login, register, CRUD)
        │  memakai
        ▼
src/lib/supabase.js           ← koneksi ke Supabase
        │  terhubung ke
        ▼
Database Supabase (tabel "users" + fungsi login_user & register_user)
```

---

## 1. Koneksi ke Supabase

**Letak file:** `src/lib/supabase.js`

**Fungsi:** Membuat satu koneksi (client) ke Supabase yang dipakai di seluruh aplikasi.

**Penjelasan kode:**
- Membaca `VITE_SUPABASE_URL` dan `VITE_SUPABASE_KEY` dari file `.env`
- Ada nilai cadangan (fallback) supaya tetap jalan saat deploy ke Vercel
- `createClient(...)` membuat objek `supabase` yang bisa di-import di mana saja

```js
export const supabase = createClient(supabaseUrl, supabaseKey)
```

---

## 2. Service User (Pusat Logika)

**Letak file:** `src/services/userService.js`

**Fungsi:** Berisi SEMUA fungsi yang berhubungan dengan data user. Halaman cukup
memanggil fungsi di sini, tidak menulis query Supabase langsung.

| Fungsi | Tugas | Dipakai di |
|--------|-------|------------|
| `loginUser(email, password)` | Cek email + password lewat RPC `login_user` | `Login.jsx` |
| `registerUser({...})` | Daftar user baru lewat RPC `register_user` | `Register.jsx`, `Users.jsx` |
| `getUsers()` | Ambil semua user (READ) | `Users.jsx` |
| `createUser({...})` | Tambah user baru (CREATE) | `Users.jsx` |
| `updateUser(id, payload)` | Ubah data user (UPDATE) | `Users.jsx` |
| `deleteUser(id)` | Hapus user (DELETE) | `Users.jsx` |

**Contoh penjelasan `loginUser`:**
- Memanggil fungsi database `login_user` lewat `supabase.rpc(...)`
- Jika hasil kosong → berarti email/password salah → lempar error
- Jika cocok → kembalikan data user

---

## 3. Halaman Login

**Letak file:** `src/pages/Auth/Login.jsx`

**Fungsi:** Form login. Sudah TIDAK pakai dummy json lagi, langsung ke Supabase.

**Bagian penting kode:**
- `handleSubmit` → memanggil `loginUser(...)` dari service
- Jika berhasil → data user disimpan di `localStorage` (`medicare-user`) → pindah ke `/`
- Jika gagal → tampilkan pesan error
- Tampilan memakai komponen shadcn: `Card`, `Input`, `Label`, `Button`

```js
const user = await loginUser(dataForm.email, dataForm.password);
window.localStorage.setItem("medicare-user", JSON.stringify(user));
navigate("/");
```

---

## 4. Halaman Register

**Letak file:** `src/pages/Auth/Register.jsx`

**Fungsi:** Form pendaftaran akun baru.

**Bagian penting kode:**
- Validasi: `password` harus sama dengan `confirmPassword`
- `handleSubmit` → memanggil `registerUser(...)`
- Jika berhasil → diarahkan ke `/login` agar bisa langsung login dengan akun baru
- Tampilan memakai komponen shadcn (Card, Input, Label, Button)

---

## 5. Halaman Forgot Password

**Letak file:** `src/pages/Auth/Forgot.jsx`

**Fungsi:** Form lupa password (saat ini masih simulasi kirim link).

**Bagian penting kode:**
- `handleSubmit` → menampilkan status "sukses" setelah simulasi
- Tampilan memakai komponen shadcn

---

## 6. Halaman Admin CRUD User

**Letak file:** `src/pages/Main/Users.jsx`

**Fungsi:** Halaman untuk mengelola data user (Create, Read, Update, Delete).

**Bagian penting kode:**
- `loadUsers()` → ambil data (READ) saat halaman dibuka (`useEffect`)
- `filteredUsers` → hasil pencarian (nama/email) + filter role
- `openAddForm()` / `openEditForm()` → buka modal tambah / edit
- `handleSubmit()` → menyimpan data: CREATE (user baru) atau UPDATE (edit)
- `handleDelete()` → hapus user (dengan konfirmasi)

| Aksi | Fungsi yang dipanggil |
|------|------------------------|
| Tampilkan data | `getUsers()` |
| Tambah | `createUser()` |
| Edit | `updateUser()` |
| Hapus | `deleteUser()` |

---

## 7. Tema Dark/Light di Halaman Auth

**Letak file:**
- `src/layout/AuthLayout.jsx` → meneruskan `theme` & `onToggleTheme` ke halaman auth
- `src/components/AuthThemeToggle.jsx` → tombol matahari/bulan untuk ganti tema

**Fungsi:** Memungkinkan halaman Login/Register/Forgot ganti mode gelap/terang,
dan tetap sinkron dengan tema dashboard (disimpan di `localStorage`).

---

## 8. Routing & Menu

**Letak file:** `src/App.jsx`

**Fungsi:** Mendaftarkan halaman ke alamat URL.

- `/login`, `/register`, `/forgot` → di dalam `AuthLayout`
- `/users` → halaman admin CRUD user (di dalam `MainLayout`)

**Letak file:** `src/components/Sidebar.jsx`

- Menambahkan menu **Users** ke sidebar (path `/users` + ikon)

---

## 9. Database (SQL)

**Letak file:**
- `database/supabase_setup.sql` → setup lengkap (tabel `users`, fungsi `register_user`,
  `login_user`, keamanan RLS, dan data awal)
- `database/fix_crypt.sql` → perbaikan error `crypt() does not exist`
  (menambahkan schema `extensions` ke pencarian fungsi)

**Fungsi:** File ini di-Run di Supabase (menu SQL Editor) untuk membuat struktur database.

---

## Daftar File yang Dibuat / Diubah

| File | Status | Keterangan |
|------|--------|------------|
| `src/lib/supabase.js` | Baru | Koneksi Supabase |
| `src/services/userService.js` | Baru | Semua fungsi user (login, register, CRUD) |
| `src/pages/Auth/Login.jsx` | Diubah | Login ke Supabase + desain shadcn |
| `src/pages/Auth/Register.jsx` | Diubah | Register ke Supabase + desain shadcn |
| `src/pages/Auth/Forgot.jsx` | Diubah | Desain shadcn |
| `src/pages/Main/Users.jsx` | Baru | Halaman admin CRUD user |
| `src/layout/AuthLayout.jsx` | Diubah | Menyalurkan tema ke halaman auth |
| `src/components/AuthThemeToggle.jsx` | Baru | Tombol ganti tema dark/light |
| `src/App.jsx` | Diubah | Routing `/users` + tema auth |
| `src/components/Sidebar.jsx` | Diubah | Menu "Users" |
| `database/supabase_setup.sql` | Baru | Setup database |
| `database/fix_crypt.sql` | Baru | Perbaikan fungsi crypt |
| `.env` | Baru | Kredensial Supabase |
