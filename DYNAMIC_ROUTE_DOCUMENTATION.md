# 📂 Dynamic Route Implementation - Dokumentasi

## 📋 Overview
Implementasi Dynamic Route untuk aplikasi klinik kecantikan yang memungkinkan pengguna melihat daftar produk dan detail setiap produk berdasarkan ID.

---

## 🎯 File-file yang Telah Dibuat/Dimodifikasi

### 1. **src/data/products.json** ✅
File JSON yang berisi 30 data produk dengan struktur:
```json
{
  "id": 1,
  "title": "Essence Mascara Lash Princess",
  "code": "PROD-001",
  "category": "Makeup",
  "brand": "Essence",
  "price": 99900,
  "stock": 45,
  "thumbnail": "URL image"
}
```

**Field yang digunakan:**
- `id` - ID unik produk (untuk routing)
- `title` - Nama produk
- `code` - Kode referensi produk
- `category` - Kategori (Makeup, Skincare, Treatment, Hair Care)
- `brand` - Brand/merek produk
- `price` - Harga dalam Rupiah
- `stock` - Jumlah stok tersedia
- `thumbnail` - URL gambar produk

---

### 2. **src/pages/Main/Products.jsx** ✅
Komponen halaman daftar produk dengan fitur:

**Fungsi-fungsi:**
- `filteredProducts()` - Memfilter produk berdasarkan search query menggunakan `useMemo`
- `formatRupiah()` - Mengubah angka menjadi format Rupiah (Rp X.XXX)

**Fitur:**
- ✓ Menampilkan tabel dengan kolom: #, Name, Category, Brand, Price, Stock
- ✓ Search/filter produk secara real-time
- ✓ Link dinamis ke detail produk: `/products/${item.id}`
- ✓ Badge status stock dengan warna berbeda
- ✓ Responsive design dengan Tailwind CSS
- ✓ Gradient background dan styling tema klinik kecantikan

**Flow:**
```
User membuka /products
  ↓
Component render tabel produk
  ↓
User search/filter produk
  ↓
User klik nama produk (Link)
  ↓
Navigate ke /products/:id
```

---

### 3. **src/pages/ProductDetail.jsx** ✅
Komponen halaman detail produk dengan Dynamic Route:

**Hooks yang digunakan:**
- `useParams()` - Mengambil parameter `id` dari URL
- `useNavigate()` - Untuk navigasi back to list
- `useState()` - Menyimpan product, error, status
- `useEffect()` - Fetch/search produk saat component mount

**Fungsi-fungsi:**
- `getStockStatus()` - Menentukan status stok (In Stock, Low Stock, Very Low)
- `formatRupiah()` - Format nilai harga

**Fitur:**
- ✓ Mengambil ID dari URL parameter `:id`
- ✓ Mencari produk dari JSON lokal menggunakan `find()`
- ✓ Menampilkan detail lengkap: gambar, nama, kategori, brand, harga, stock
- ✓ Loading state dengan spinner animasi
- ✓ Error handling jika produk tidak ditemukan
- ✓ Tombol kembali ke halaman products
- ✓ Status stock dengan badge warna
- ✓ Rating placeholder dan deskripsi produk
- ✓ Keunggulan produk dengan checklist
- ✓ Action buttons: "Tambah ke Keranjang" dan "Hubungi Kami"

**Alur Process:**

```
URL: /products/5
  ↓
useParams() ambil id = "5"
  ↓
useEffect runs (dependency: id)
  ↓
Parse id menjadi number (5)
  ↓
find() di productsData cari yang match
  ↓
setProduct(foundProduct)
  ↓
Component render dengan data produk
```

---

### 4. **src/App.jsx** ✅
Update App.jsx dengan:

**Import Components (React.lazy):**
```javascript
const Products = React.lazy(() => import("./pages/Main/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
```

**Update initialMenuItems:**
```javascript
const initialMenuItems = [
    { id: "dashboard", label: "Dashboard", removable: false },
    { id: "orders", label: "Orders", removable: false },
    { id: "customers", label: "Customers", removable: false },
    { id: "products", label: "Products", removable: false }, // ← BARU
];
```

**Update activeSection logic:**
```javascript
const activeSection = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/orders")) return "orders";
    if (path.startsWith("/customers")) return "customers";
    if (path.startsWith("/products")) return "products"; // ← BARU
    return "dashboard";
}, [location.pathname]);
```

**Routes yang ditambahkan:**
```javascript
{/* Route untuk halaman Products - Menampilkan daftar semua produk */}
<Route path="/products" element={<Products />} />

{/* Route dinamis untuk halaman ProductDetail - Menerima ID produk dari URL */}
<Route path="/products/:id" element={<ProductDetail />} />
```

---

### 5. **src/components/Sidebar.jsx** ✅
Update Sidebar untuk support Products menu:

**Icon untuk Products:**
```javascript
if (type === "products") {
    return (
        <span className="lc-icon lc-icon--products" aria-hidden="true">
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
            <span style={{ outline: `1.67px ${stroke} solid`, outlineOffset: "-0.83px" }} />
        </span>
    );
}
```

**Update getMenuPath():**
```javascript
function getMenuPath(menuId) {
    if (menuId === "dashboard") return "/";
    if (menuId === "orders") return "/orders";
    if (menuId === "customers") return "/customers";
    if (menuId === "products") return "/products"; // ← BARU
    return "/";
}
```

---

## 🔄 Flow Aplikasi

### Diagram Flow:
```
┌─────────────────────────────────────────────┐
│         Dashboard / Sidebar Menu             │
└─────────────────────────────────────────────┘
           │
           ↓ Click "Products" menu
┌─────────────────────────────────────────────┐
│     /products Route                          │
│     Components: Products.jsx                 │
│     ├─ Menampilkan tabel 30 produk          │
│     ├─ Search/filter functionality          │
│     └─ Link ke /products/:id                │
└─────────────────────────────────────────────┘
           │
           ↓ Click product name (Link)
┌─────────────────────────────────────────────┐
│     /products/:id Dynamic Route              │
│     Components: ProductDetail.jsx            │
│     ├─ useParams() ambil ID                 │
│     ├─ find() cari produk di JSON           │
│     ├─ Tampilkan detail lengkap             │
│     └─ Tombol back ke /products             │
└─────────────────────────────────────────────┘
```

---

## 💻 Cara Testing

### 1. Akses Halaman Produk
```
http://localhost:5173/products
```

### 2. Cek Fitur Search
- Ketik di search box: "Essence" atau "Mascara"
- Harusnya filter produk yang sesuai

### 3. Klik Detail Produk
- Klik salah satu nama produk di tabel
- Harusnya navigate ke `/products/1` atau `/products/5` dst
- Lihat detail produk yang muncul

### 4. Test Dynamic Routing
Langsung buka URL dengan ID berbeda:
```
/products/1     → Essence Mascara Lash Princess
/products/5     → Hydrating Face Serum
/products/15    → Acne Spot Treatment
/products/999   → Error (produk tidak ada)
```

---

## 🎨 Tema & Styling

Semua component sudah menggunakan **Tailwind CSS** dengan tema:
- **Primary Color**: Emerald (hijau) - dari branding original
- **Secondary Color**: Pink/Rose - tema klinik kecantikan
- **Background**: Gradient pink-50 to rose-50
- **Accent**: Emerald buttons dan links

---

## 🚀 Fitur-Fitur yang Diimplementasikan

✅ **Dynamic Route** - `/products/:id` menerima parameter ID
✅ **useParams()** - Mengambil ID dari URL
✅ **Link Component** - Navigasi tanpa reload
✅ **State Management** - useState() untuk data & error
✅ **useEffect() Hook** - Fetch/search saat mount & ID berubah
✅ **useMemo()** - Optimasi filter products
✅ **Error Handling** - Jika produk tidak ditemukan
✅ **Loading State** - Spinner saat proses
✅ **Responsive Design** - Mobile & desktop friendly
✅ **Tailwind CSS** - Tema konsisten dengan website
✅ **Comments** - Dokumentasi untuk setiap function

---

## 📝 Notes

- Data produk diambil dari file JSON lokal, bukan API
- Semua ID produk adalah number (1-30)
- Harga sudah dalam format Rupiah
- Stock badge berubah warna sesuai jumlah: Hijau (>50), Kuning (>20), Merah (<20)
- Navigasi bisa pakai sidebar menu atau langsung klik nama produk

---

## ✨ Kesimpulan

Implementasi Dynamic Route sudah lengkap dengan:
- ✓ Route `/products/:id` di App.jsx
- ✓ Komponen Products.jsx untuk list produk
- ✓ Komponen ProductDetail.jsx untuk detail
- ✓ useParams() untuk ambil ID
- ✓ Styling tema klinik kecantikan
- ✓ Comments di setiap function
- ✓ Error handling lengkap
- ✓ Menu di sidebar
