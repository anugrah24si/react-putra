# Penjelasan React Hooks: useState, useEffect, dan useRef
## Format 5W + 1H

---

## A. useState

### What (Apa)
**Apa fungsi useState yang Anda terapkan?**

`useState` adalah sebuah React Hook yang digunakan untuk menambahkan state (state variable) ke dalam komponen. State adalah data yang dapat berubah dan ketika berubah akan memicu re-render komponen. 

Di dalam proyek kami, `useState` digunakan untuk:
1. **Menyimpan nilai input/form** - Contohnya di `Login.jsx`: `const [dataForm, setDataForm] = useState({...})`
2. **Mengontrol visibility modal/dialog** - Contohnya: `const [isCreateOpen, setIsCreateOpen] = useState(false)`
3. **Menyimpan data tabel dinamis** - Contohnya di `App.jsx`: `const [ordersData, setOrdersData] = useState(orderRows)`
4. **Menyimpan filter dan pencarian** - Contohnya: `const [searchQuery, setSearchQuery] = useState("")`
5. **Menyimpan tema aplikasi** - Contohnya di `App.jsx`: `const [theme, setTheme] = useState(() => {...})`

**Struktur useState:**
```javascript
const [state, setState] = useState(initialValue);
```
- `state`: nilai saat ini dari state variable
- `setState`: fungsi untuk mengubah nilai state
- `initialValue`: nilai awal state

### Why (Mengapa)
**Mengapa useState diperlukan?**

1. **Menyimpan data yang berubah** - Tanpa useState, komponen tidak bisa menyimpan data yang bersifat dinamis
2. **Memicu re-render** - Ketika state berubah, React otomatis me-render ulang komponen sehingga UI selalu sesuai dengan data terbaru
3. **Isolasi state per komponen** - Setiap instance komponen memiliki state sendiri yang tidak akan mempengaruhi komponen lain
4. **Reactive UI** - Membuat user interface yang responsif terhadap perubahan data

**Contoh dari proyek:**
```javascript
// Di App.jsx - tanpa useState, tidak bisa mengubah tema aplikasi secara dinamis
const [theme, setTheme] = useState(() => {
  const savedTheme = window.localStorage.getItem("medicare-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "dark";
});
```

### Who (Siapa)
**Siapa yang menggunakan fitur tersebut?**

- **User akhir** - Mereka berinteraksi dengan aplikasi (mengetik di form, membuka modal, memilih tema)
- **Developer** - Menggunakan useState dalam kode untuk mengelola state
- **React engine** - Melacak perubahan state dan melakukan re-render

### When (Kapan)
**Kapan state berubah?**

State berubah ketika:
1. **User interaksi** - Mengetik di input, klik tombol, membuka/tutup modal
2. **Event handler dipanggil** - Fungsi yang merespons user action
3. **setState dipanggil** - Pemanggilan explicit pada setter function

**Contoh timeline:**
```
User mengetik di input form
          ↓
Event handler onChange dipicu
          ↓
setState(newValue) dipanggil
          ↓
React update state
          ↓
Komponen di-render ulang dengan nilai baru
          ↓
UI terupdate di layar
```

**Dari kode proyek:**
```javascript
// Saat user mengetik di input search
const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);  // State berubah di sini
};

// Saat user klik tombol untuk membuka modal
const handleOpenCreate = () => {
  setIsCreateOpen(true);  // State berubah
};
```

### Where (Di mana)
**Di bagian mana useState digunakan?**

Berdasarkan pencarian di proyek, useState digunakan di banyak komponen:

**Pages:**
- [App.jsx](src/App.jsx#L162) - State untuk searchQuery, menuItems, ordersData, customersData, theme
- [src/pages/Auth/Login.jsx](src/pages/Auth/Login.jsx#L19) - State untuk form data, loading, error
- [src/pages/Auth/Register.jsx](src/pages/Auth/Register.jsx#L18) - State untuk form registration
- [src/pages/Auth/Forgot.jsx](src/pages/Auth/Forgot.jsx#L9) - State untuk email reset password
- [src/pages/Main/Customers.jsx](src/pages/Main/Customers.jsx#L16) - State untuk form customer, modal, filter
- [src/pages/Main/Orders.jsx](src/pages/Main/Orders.jsx#L17) - State untuk order data dan filter
- [src/pages/Main/Products.jsx](src/pages/Main/Products.jsx#L193) - State untuk product list, search, filter
- [src/pages/Main/DoctorsAndStaff.jsx](src/pages/Main/DoctorsAndStaff.jsx#L20) - State untuk staff data dan modal
- [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx#L24) - State untuk product details dan error

**Layouts:**
- [src/layout/MainLayout.jsx](src/layout/MainLayout.jsx#L245) - State untuk sidebar visibility

### How (Bagaimana)
**Bagaimana useState mempengaruhi tampilan aplikasi?**

1. **Sinkronisasi UI dengan Data** - Perubahan state otomatis dirender di UI
2. **Form Input** - Setiap keystroke di input field akan update state, yang kemudian ditampilkan kembali ke input
3. **Conditional Rendering** - State sering digunakan untuk menentukan apa yang ditampilkan
4. **Dynamic Lists** - State yang berisi array digunakan untuk merender list yang dinamis

**Contoh flow:**

```
User membuka login page
    ↓
const [dataForm, setDataForm] = useState({email: "", password: ""})
    ↓
User mengetik email di input
    ↓
onChange handler: setDataForm({...dataForm, email: e.target.value})
    ↓
State berubah dari {email: "", password: ""} 
              menjadi {email: "user@mail.com", password: ""}
    ↓
Component re-render dengan nilai baru
    ↓
Input field menampilkan "user@mail.com"
    ↓
Ketika form disubmit, state value digunakan untuk validasi/API call
```

**Contoh lain - Modal visibility:**
```javascript
// State untuk control modal
const [isCreateOpen, setIsCreateOpen] = useState(false);

// Rendering conditional berdasarkan state
{isCreateOpen && (
  <CreateCustomerModal onClose={() => setIsCreateOpen(false)} />
)}

// Button untuk trigger modal
<button onClick={() => setIsCreateOpen(true)}>
  + Tambah Customer
</button>
```

---

## B. useEffect

### What (Apa)
**Apa fungsi useEffect yang Anda terapkan?**

`useEffect` adalah React Hook untuk menjalankan side effects (efek samping) dalam komponen. Side effect adalah operasi yang mempengaruhi  luar komponen, seperti:
- Fetch data dari API
- Subscribe ke event
- Manipulasi DOM
- Menyimpan ke localStorage
- Setup/cleanup resources

**Struktur useEffect:**
```javascript
useEffect(() => {
  // Setup code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependency array
```

**Dalam proyek kami, useEffect digunakan untuk:**

1. **Menyimpan dan restore tema** (dari [App.jsx](src/App.jsx#L177)):
```javascript
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  document.body.setAttribute("data-theme", theme);
  window.localStorage.setItem("medicare-theme", theme);
}, [theme]);
```

2. **Fetch data produk berdasarkan ID** (dari [ProductDetail.jsx](src/pages/ProductDetail.jsx#L39)):
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

3. **Sinkronisasi sidebar dengan window events** (dari [MainLayout.jsx](src/layout/MainLayout.jsx#L248)):
```javascript
useEffect(() => {
  // Code untuk handle sidebar responsiveness
}, [isSidebarOpen]);
```

### Why (Mengapa)
**Mengapa proses tersebut menggunakan useEffect?**

1. **Menghindari infinite loop** - Tanpa useEffect, code akan berjalan setiap kali component render, menyebabkan infinite loop
2. **Cleanup handling** - useEffect memastikan resource dibersihkan dengan benar (unsubscribe, cancel request, dll)
3. **Dependency tracking** - Dengan dependency array, effect hanya berjalan ketika dependensi berubah
4. **Synchronization** - Membuat component tetap sinkron dengan external systems

**Mengapa tidak langsung di component body?**
- Akan menyebabkan infinite loop (setiap render akan menjalankan fetch ulang)
- Tidak ada mekanisme cleanup
- Sulit untuk mengontrol kapan code sebenarnya berjalan

### Who (Siapa)
**Siapa yang merasakan dampaknya?**

- **User** - Merasakan efek dari side effects (data dimuat, tema tersimpan, etc)
- **Browser** - localStorage diakses, DOM dimanipulasi
- **Backend/API** - Menerima request data
- **Component** - State berubah sesuai hasil effect

### When (Kapan)
**Kapan useEffect dijalankan?**

useEffect dijalankan pada kondisi:

1. **Component mount (first render)**
```javascript
useEffect(() => {
  console.log("Effect berjalan saat component pertama kali di-mount");
}, []);  // Empty dependency array = hanya di mount
```

2. **Dependency berubah**
```javascript
useEffect(() => {
  console.log("Effect berjalan setiap kali 'theme' atau 'id' berubah");
}, [theme, id]);  // Dependency array dengan nilai
```

3. **Component unmount atau dependency berubah** - cleanup function dijalankan
```javascript
useEffect(() => {
  const subscription = addEventListener(...);
  
  return () => {
    // Cleanup dijalankan saat component unmount atau sebelum effect berjalan ulang
    removeEventListener(...);
  };
}, []);
```

**Timeline dari effect:**
```
Component Mount
      ↓
useEffect setup code berjalan
      ↓
Component rendering dengan hasil effect
      ↓
User berinteraksi (misal: ubah ID)
      ↓
Dependency berubah (ID berbeda)
      ↓
useEffect cleanup function berjalan (jika ada)
      ↓
useEffect setup code berjalan lagi dengan ID baru
      ↓
Component re-render dengan data baru
```

### Where (Di mana)
**Pada halaman atau fitur apa useEffect digunakan?**

Dari pencarian kode:

1. **[App.jsx](src/App.jsx#L177)** - Theme persistence
   - Menyimpan preferensi tema user ke localStorage
   - Update DOM attributes saat tema berubah

2. **[MainLayout.jsx](src/layout/MainLayout.jsx#L248-L260)** - Layout effects
   - Handle responsive sidebar behavior
   - Setup event listeners untuk window

3. **[ProductDetail.jsx](src/pages/ProductDetail.jsx#L39)** - Data fetching
   - Fetch detail produk berdasarkan ID dari params
   - Handle loading dan error states

4. **[pertemuan-5/main.jsx](src/pertemuan-5/main.jsx)** - Complex layout dengan effects

### How (Bagaimana)
**Bagaimana dependency array mempengaruhi proses tersebut?**

Dependency array sangat crucial dalam menentukan kapan effect berjalan:

**1. Tidak ada dependency array (undefined):**
```javascript
useEffect(() => {
  console.log("Berjalan setiap kali component render");
  // HINDARI ini - bisa menyebabkan infinite loop!
});
```

**2. Empty dependency array []:**
```javascript
useEffect(() => {
  console.log("Hanya berjalan 1 kali saat component mount");
  // Cocok untuk setup awal (fetch initial data, setup listeners)
}, []);
```

**3. Dependency array dengan nilai:**
```javascript
useEffect(() => {
  console.log("Berjalan saat component mount dan setiap 'id' berubah");
  // Fetch data saat ID berubah
}, [id]);
```

**Contoh dari kode proyek:**

```javascript
// Theme effect - hanya berjalan saat theme berubah
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("medicare-theme", theme);
}, [theme]);  // ← hanya saat theme berubah

// Product detail effect - berjalan saat component mount & ID berubah
useEffect(() => {
  const productId = parseInt(id, 10);
  const foundProduct = productsData.find((p) => p.id === productId);
  setProduct(foundProduct);
}, [id]);  // ← berjalan saat ID berubah
```

**Dampak tidak menambahkan dependency dengan benar:**
```javascript
// ❌ WRONG - tidak ada 'id' di dependency
useEffect(() => {
  // Akan menggunakan 'id' value dari render pertama saja
  const product = productsData.find((p) => p.id === id);
  setProduct(product);
}, []);  // Linter akan warning!

// ✅ CORRECT
useEffect(() => {
  const product = productsData.find((p) => p.id === id);
  setProduct(product);
}, [id]);  // Dependency mencakup semua values yang digunakan
```

---

## C. useRef

### What (Apa)
**Apa fungsi useRef yang Anda terapkan?**

`useRef` adalah React Hook yang memungkinkan untuk:
1. **Menyimpan nilai yang persisten antar render tanpa menyebabkan re-render**
2. **Mengakses DOM node secara langsung**

**Struktur useRef:**
```javascript
const ref = useRef(initialValue);
// ref.current = nilai saat ini (bisa diubah tanpa trigger re-render)
```

**Perbedaan penting:**
- `useState`: Mengubah state → trigger re-render
- `useRef`: Mengubah ref.current → TIDAK trigger re-render

### Why (Mengapa)
**Mengapa tidak menggunakan useState?**

Ada beberapa kasus di mana `useRef` lebih cocok daripada `useState`:

**1. Tracking nilai yang tidak perlu di-render**
```javascript
// Contoh: Menghitung berapa kali component render
// Tidak perlu update UI, hanya tracking di background
let renderCount = useRef(0);

useEffect(() => {
  renderCount.current += 1;
  console.log("Component sudah render " + renderCount.current + " kali");
});
```

**2. Menyimpan interval/timeout IDs untuk cleanup**
```javascript
// Contoh dari video player atau timer
const intervalRef = useRef(null);

const startTimer = () => {
  intervalRef.current = setInterval(() => {
    // timer logic
  }, 1000);
};

const stopTimer = () => {
  clearInterval(intervalRef.current);  // Cleanup
};
```

**3. Accessing DOM elements directly**
```javascript
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();  // Focus input tanpa state
};

return <input ref={inputRef} />;
```

**Mengapa tidak useState untuk kasus ini?**

```javascript
// ❌ BURUK - menggunakan useState untuk DOM ref
const [inputElement, setInputElement] = useState(null);

// Setiap kali input di-focus, akan trigger re-render
const focusInput = () => {
  setInputElement(previousRef);  // Ini akan re-render!
  previousRef?.current?.focus();
};

// ✅ BAIK - menggunakan useRef
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();  // Tidak trigger re-render
};
```

**Alasan:**
- Changing ref.current tidak trigger re-render → lebih efisien
- useState adalah untuk data yang perlu di-render
- useRef adalah untuk data yang pure tracking saja

### Who (Siapa)
**Siapa yang terbantu dengan fitur tersebut?**

- **User** - Mengalami performance lebih baik (tidak ada re-render yang tidak perlu)
- **Developer** - Code lebih clean dan mudah dibaca ketika ada kebutuhan DOM manipulation
- **App** - Render lebih cepat karena mengurangi unnecessary re-renders

### When (Kapan)
**Kapan useRef digunakan?**

Gunakan useRef ketika:

1. **Menyimpan interval/timeout IDs**
```javascript
const intervalRef = useRef(null);
const timeoutRef = useRef(null);
```

2. **Accessing DOM elements**
```javascript
const inputRef = useRef(null);
const videoRef = useRef(null);
const scrollContainerRef = useRef(null);
```

3. **Menyimpan nilai previous dari prop atau state**
```javascript
const previousCountRef = useRef(null);

useEffect(() => {
  previousCountRef.current = count;
}, [count]);

console.log(previousCountRef.current);  // Previous count
```

4. **Tracking nilai yang tidak mempengaruhi UI**
```javascript
const clickCountRef = useRef(0);

const handleClick = () => {
  clickCountRef.current += 1;
  // Show alert dengan nilai ref (tidak perlu update UI)
  alert(`Clicked ${clickCountRef.current} times`);
};
```

**JANGAN gunakan useRef untuk:**
- Data yang perlu ditampilkan di UI → gunakan `useState`
- Kalkulasi yang berdampak pada render → gunakan `useMemo`
- Menyimpan function callbacks → gunakan `useCallback`

### Where (Di mana)
**Di bagian mana useRef diterapkan?**

Berdasarkan pencarian di proyek, **useRef tidak ditemukan** dalam kode saat ini. Ini adalah opportunity untuk menambahkannya di:

**Kasus penggunaan potensial:**

1. **Focus management di forms**
```javascript
// Di pages/Auth/Login.jsx atau form components
const emailInputRef = useRef(null);
const passwordInputRef = useRef(null);

const handleSubmit = () => {
  if (!emailInputRef.current.value) {
    emailInputRef.current.focus();
    return;
  }
};

return (
  <>
    <input ref={emailInputRef} type="email" />
    <input ref={passwordInputRef} type="password" />
  </>
);
```

2. **Managing scroll position**
```javascript
// Di components yang memiliki scroll area
const scrollContainerRef = useRef(null);

const scrollToTop = () => {
  scrollContainerRef.current.scrollTop = 0;
};
```

3. **Tracking form changes (untuk dirty state)**
```javascript
// Di form components
const formDataRef = useRef(null);
const [formData, setFormData] = useState(initialData);

const isDirty = () => {
  return JSON.stringify(formDataRef.current) !== JSON.stringify(formData);
};

useEffect(() => {
  formDataRef.current = formData;
}, [formData]);
```

### How (Bagaimana)
**Bagaimana useRef bekerja pada implementasi tersebut?**

**Konsep dasar:**
```javascript
const ref = useRef(initialValue);

// ref adalah object dengan property 'current'
// ref = { current: initialValue }

// Mengubah nilai
ref.current = newValue;  // TIDAK trigger re-render

// Membaca nilai
console.log(ref.current);
```

**Perbedaan dengan useState:**

```javascript
// useState
const [value, setValue] = useState(0);
setValue(value + 1);  // ← Trigger re-render, render dengan nilai baru

// useRef
const ref = useRef(0);
ref.current = ref.current + 1;  // ← TIDAK trigger re-render
```

**Contoh praktis: DOM element access**

```javascript
// Step 1: Create ref
const inputRef = useRef(null);

// Step 2: Attach ke element
<input ref={inputRef} type="text" />

// Step 3: Access DOM node
const focusInput = () => {
  inputRef.current.focus();  // ref.current = <input DOM element>
};

const getInputValue = () => {
  console.log(inputRef.current.value);  // Baca value dari DOM
};

const clearInput = () => {
  inputRef.current.value = '';  // Modifikasi DOM langsung
};
```

**Contoh praktis: Storing mutable values**

```javascript
// Tracking render count tanpa trigger re-render
const renderCountRef = useRef(0);

useEffect(() => {
  renderCountRef.current += 1;
  console.log(`Component rendered ${renderCountRef.current} times`);
  // Output: Component rendered 1 times
  // Output: Component rendered 2 times
  // ... dan seterusnya, tanpa update UI
});
```

**Persistence across renders:**

```javascript
function Counter() {
  const countRef = useRef(0);
  const [, setTrigger] = useState(0);

  const handleClick = () => {
    countRef.current += 1;
    
    // countRef.current tetap dipertahankan antar render
    // Nilai tidak reset ke initialValue
    console.log(countRef.current);  // 1, 2, 3, ...
  };

  const handleShow = () => {
    // Menampilkan nilai dari ref tanpa update UI
    alert(`Count: ${countRef.current}`);
  };

  return (
    <>
      <button onClick={handleClick}>Increment Ref</button>
      <button onClick={handleShow}>Show Count</button>
    </>
  );
}
```

---

## Perbandingan Ketiga Hooks

| Aspek | useState | useEffect | useRef |
|-------|----------|-----------|--------|
| **Trigger Re-render** | ✅ Ya | ❌ Tidak | ❌ Tidak |
| **Gunakan untuk** | Data yang ditampilkan | Side effects | Nilai tracking, DOM access |
| **Kapan berubah** | Saat setState dipanggil | Saat dependencies berubah | Manual change ke .current |
| **Persistent antar render** | ✅ Ya | N/A | ✅ Ya |
| **Cleanup support** | ❌ Tidak | ✅ Ya | ❌ Tidak (manual) |
| **Performance impact** | Re-render component | Async, non-blocking | Minimal, no re-render |

---

## Studi Kasus: Integrasi Ketiga Hooks

Bayangkan sebuah form component yang kompleks:

```javascript
import { useState, useEffect, useRef } from 'react';

function UserForm() {
  // ✅ useState - Menyimpan data form yang akan ditampilkan
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ useRef - Tracking form changes untuk "unsaved changes" warning
  const formDataRef = useRef(null);
  
  // ✅ useRef - Storing timeout ID untuk debounce validation
  const validationTimeoutRef = useRef(null);

  // ✅ useEffect - Save form data ke localStorage saat form berubah
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('formDraft', JSON.stringify(formData));
      console.log('Form saved to localStorage');
    }, 1000);

    return () => clearTimeout(timeoutId);  // Cleanup
  }, [formData]);

  // ✅ useEffect - Load form data dari localStorage saat component mount
  useEffect(() => {
    const savedData = localStorage.getItem('formDraft');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);  // Empty dependency = hanya saat mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // ✅ useState - Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // ✅ useRef - Track bahwa ada perubahan (untuk dirty state)
    formDataRef.current = true;

    // ✅ useRef - Store timeout ID untuk cleanup nanti
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }
    
    validationTimeoutRef.current = setTimeout(() => {
      // Validasi form (debounced)
      console.log('Validating form...');
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ useState - Update loading state
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ✅ useState - Update success state
      setLoading(false);
      
      // ✅ useRef - Reset ref flag
      formDataRef.current = false;
      
      console.log('Form submitted:', formData);
    } catch (err) {
      // ✅ useState - Update error state
      setError('Failed to submit form');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

**Penjelasan:**
1. **useState**: Menyimpan form data dan status loading/error yang perlu ditampilkan
2. **useEffect**: Auto-save ke localStorage dan load data awal
3. **useRef**: Tracking bahwa ada perubahan, menyimpan timeout ID untuk cleanup

---

## Best Practices

### ✅ DO:
- Gunakan `useState` untuk data yang ditampilkan di UI
- Selalu sertakan semua dependencies di `useEffect`
- Gunakan `useRef` untuk DOM access dan non-rendering values
- Cleanup effect jika ada side effects yang perlu dibersihkan

### ❌ DON'T:
- Jangan gunakan `setState` di dalam render body (tanpa condition)
- Jangan lupakan dependency array di `useEffect`
- Jangan mutate ref directly di render body
- Jangan gunakan `useRef` untuk data yang seharusnya di-render (gunakan `useState`)

---

## Kesimpulan

| Hook | Tujuan | Use Case |
|------|--------|----------|
| **useState** | Manage state yang ditampilkan | Form input, modal visibility, data list |
| **useEffect** | Handle side effects | API calls, localStorage, event listeners |
| **useRef** | Persist values tanpa re-render | DOM access, interval IDs, value tracking |

Ketiga hooks ini adalah fondasi dari React modern. Memahami kapan dan bagaimana menggunakannya adalah kunci untuk menulis React code yang clean dan efficient.
