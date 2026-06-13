# Referensi Penggunaan Hooks di Proyek

Dokumen ini merangkum lokasi dan tujuan penggunaan `useState`, `useEffect`, dan `useRef` di proyek react-putra.

---

## 📊 useState - 60+ Penggunaan

### Authentication Pages
- **[src/pages/Auth/Login.jsx](src/pages/Auth/Login.jsx#L19)**
  - `loading` - State untuk loading indicator saat submit
  - `error` - State untuk error message
  - `rememberMe` - State untuk checkbox "remember me"
  - `dataForm` - State untuk form data (email, password)

- **[src/pages/Auth/Register.jsx](src/pages/Auth/Register.jsx#L18)**
  - `loading` - Loading indicator
  - `error` - Error message
  - `dataForm` - Form data (email, password, confirm password)

- **[src/pages/Auth/Forgot.jsx](src/pages/Auth/Forgot.jsx#L9)**
  - `email` - Email untuk reset password
  - `loading` - Loading state
  - `error` - Error message
  - `success` - Success message setelah submit

### Main Pages
- **[src/App.jsx](src/App.jsx#L162)**
  ```javascript
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [ordersData, setOrdersData] = useState(orderRows);
  const [customersData, setCustomersData] = useState(customerRows);
  const [theme, setTheme] = useState(() => { /* lazy init */ });
  ```
  - Sangat kompleks - menyimpan seluruh app state

- **[src/pages/Main/Dashboard.jsx](src/pages/Main/Dashboard.jsx)**
  - Inherited dari App.jsx

- **[src/pages/Main/Customers.jsx](src/pages/Main/Customers.jsx#L16)**
  - `customerForm` - Form data
  - `isCreateOpen` - Control create modal
  - `isFilterOpen` - Control filter dropdown
  - `statusFilter` - Filter value
  - `currentPage` - Pagination

- **[src/pages/Main/Orders.jsx](src/pages/Main/Orders.jsx#L17)**
  - `orderForm` - Form data
  - `isCreateOpen` - Modal visibility
  - `isFilterOpen` - Filter visibility
  - `statusFilter` - Filter value
  - `currentPage` - Pagination

- **[src/pages/Main/Products.jsx](src/pages/Main/Products.jsx#L193)**
  ```javascript
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearch] = useState('');
  const [categoryFilter, setCat] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [deleteTarget, setDelete] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  ```
  - Paling kompleks dengan multiple modals dan forms

- **[src/pages/Main/DoctorsAndStaff.jsx](src/pages/Main/DoctorsAndStaff.jsx#L20)**
  - `searchTerm` - Pencarian staff
  - `filterRole` - Filter by role
  - `showFilter` - Filter visibility
  - `selectedStaff` - Selected staff
  - `isModalOpen` - Staff profile modal
  - `addOpen` - Add new staff modal
  - `form` - Staff form data

- **[src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L24)**
  - `product` - Data produk yang ditemukan
  - `error` - Error message jika produk tidak ditemukan

### Layout Components
- **[src/layout/MainLayout.jsx](src/layout/MainLayout.jsx#L245)**
  - `isSidebarOpen` - Control sidebar visibility di mobile

### Form Components
- **[src/pertemuan-3/HitungGajiForm.jsx](src/pertemuan-3/HitungGajiForm.jsx#L4)**
  - `gaji` - Gaji input

- **[src/pertemuan-3/UserForm.jsx](src/pertemuan-3/UserForm.jsx#L11)**
  - `form` - User form data
  - `errors` - Form validation errors
  - `submitted` - Track apakah form sudah disubmit
  - `submittedData` - Data yang sudah disubmit

- **[src/pertemuan-4/FrameworkList.jsx](src/pertemuan-4/FrameworkList.jsx#L8)**
  - `dataForm` - Framework form

- **[src/pertemuan-5/main.jsx](src/pertemuan-5/main.jsx#L55)**
  - Multiple states untuk dashboard kompleks

---

## ⏱️ useEffect - 4 Penggunaan

### Side Effects & Synchronization

1. **[src/App.jsx](src/App.jsx#L177)** - Theme Persistence
   ```javascript
   useEffect(() => {
     document.documentElement.setAttribute("data-theme", theme);
     document.body.setAttribute("data-theme", theme);
     window.localStorage.setItem("medicare-theme", theme);
   }, [theme]);
   ```
   - **Tujuan**: Menyimpan preferensi tema user
   - **Dependencies**: `[theme]` - Jalankan setiap tema berubah
   - **Side Effect**: Update DOM dan localStorage

2. **[src/layout/MainLayout.jsx](src/layout/MainLayout.jsx#L248)** - Sidebar Responsiveness (1st effect)
   ```javascript
   useEffect(() => {
     // Handle window resize untuk responsive sidebar
   }, [isSidebarOpen]);
   ```
   - **Tujuan**: Setup responsive behavior

3. **[src/layout/MainLayout.jsx](src/layout/MainLayout.jsx#L260)** - Sidebar Responsiveness (2nd effect)
   ```javascript
   useEffect(() => {
     // Additional effect untuk event handling
   }, [isSidebarOpen]);
   ```

4. **[src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L39)** - Product Data Fetching
   ```javascript
   useEffect(() => {
     try {
       const productId = parseInt(id, 10);
       const foundProduct = productsData.find((p) => p.id === productId);
       
       if (!foundProduct) {
         setError("Produk tidak ditemukan");
         return;
       }
       
       setProduct(foundProduct);
       setError(null);
     } catch (err) {
       setError("Terjadi kesalahan saat memuat produk");
     }
   }, [id]);
   ```
   - **Tujuan**: Fetch produk detail saat ID parameter berubah
   - **Dependencies**: `[id]` - Jalankan ulang saat ID berubah
   - **Data Handling**: Error handling, state updates

---

## 🎯 useRef - 0 Penggunaan ❌

Saat ini **useRef tidak digunakan di proyek**. Namun, ada beberapa tempat di mana useRef bisa ditambahkan untuk improvement:

### Kandidat Penggunaan useRef:

1. **Input Focus Management** (di form components)
   ```javascript
   // src/pages/Auth/Login.jsx atau src/pages/Main/Customers.jsx
   const emailInputRef = useRef(null);
   const passwordInputRef = useRef(null);
   
   const focusEmailInput = () => {
     emailInputRef.current?.focus();
   };
   ```

2. **Form Dirty State Tracking**
   ```javascript
   // src/pages/Main/Products.jsx atau form manapun
   const formDataRef = useRef(null);
   
   const isDirty = () => {
     return JSON.stringify(formDataRef.current) !== JSON.stringify(formData);
   };
   ```

3. **Scroll Container Control**
   ```javascript
   // src/components/ui/scroll-area.jsx
   const scrollContainerRef = useRef(null);
   
   const scrollToTop = () => {
     scrollContainerRef.current?.scrollTo({ top: 0 });
   };
   ```

---

## 📈 Statistik Penggunaan

| Hook | Jumlah | File | Status |
|------|--------|------|--------|
| `useState` | 60+ | 13+ files | ✅ Banyak digunakan |
| `useEffect` | 4 | 3 files | ⚠️ Minimal |
| `useRef` | 0 | - | ❌ Tidak digunakan |

---

## 🎓 Recommendations

1. **useState** ✅
   - Sudah digunakan dengan baik di seluruh proyek
   - Fokus pada state management yang cleaner jika ada

2. **useEffect** ⚠️
   - Hanya 4 penggunaan - cukup minimal
   - Pertimbangkan menambahkan untuk data fetching yang lebih kompleks
   - Perhatikan dependency array untuk menghindari infinite loops

3. **useRef** ❌ - PERLU DITAMBAHKAN
   - Tidak ada penggunaan sama sekali
   - Banyak opportunity untuk improvement:
     - Form input focus management
     - Tracking form dirty state
     - Scroll position management
     - Storing interval/timeout IDs

---

## 📝 Notes

- **App.jsx** adalah file paling kompleks dengan paling banyak useState
- **Products.jsx** memiliki state management yang sangat detail (11+ useState)
- **ProductDetail.jsx** adalah contoh baik untuk useEffect dengan error handling
- **MainLayout.jsx** menunjukkan responsive behavior dengan multiple effects

---

Untuk penjelasan detail tentang setiap hook, silakan lihat file **PENJELASAN_REACT_HOOKS_5W1H.md**
