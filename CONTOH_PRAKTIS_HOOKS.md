# Contoh Praktis React Hooks - useState, useEffect, useRef

File ini berisi contoh-contoh implementasi praktis dari ketiga hooks yang bisa langsung digunakan dan dipahami.

---

## 1. useState - Contoh Praktis

### ✅ Contoh 1: Counter Sederhana

```javascript
import { useState } from 'react';

function Counter() {
  // State untuk menyimpan nilai counter
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

**Penjelasan:**
- `const [count, setCount] = useState(0)` - Create state dengan initial value 0
- `setCount(count + 1)` - Update state saat button clicked
- Component re-render dengan nilai baru setiap kali state berubah

---

### ✅ Contoh 2: Form Input dengan useState

```javascript
import { useState } from 'react';

function LoginForm() {
  // State untuk menyimpan form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }

    setError('');
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ email: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

**Penjelasan:**
- `formData` state menyimpan object dengan multiple properties
- `setFormData(prev => ({...prev, [name]: value}))` - Update specific property dalam object
- Conditional rendering untuk error message

---

### ✅ Contoh 3: Toggle Modal dengan useState

```javascript
import { useState } from 'react';

function ModalExample() {
  // State untuk control modal visibility
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Modal Title</h2>
            <p>Modal content goes here</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalExample;
```

**Penjelasan:**
- `isOpen` state menentukan apakah modal ditampilkan
- Conditional rendering `{isOpen && <Modal />}` untuk tampilkan/sembunyikan modal
- Fungsi `closeModal` untuk menutup modal

---

### ✅ Contoh 4: Multiple useState vs Single Object

```javascript
import { useState } from 'react';

// ❌ KURANG BAIK - Terlalu banyak useState
function BadExample() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // ... dst
}

// ✅ BAIK - Combine related state
function GoodExample() {
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <input
        name="firstName"
        value={userForm.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        value={userForm.lastName}
        onChange={handleChange}
      />
      {/* ... dst */}
    </div>
  );
}
```

---

## 2. useEffect - Contoh Praktis

### ✅ Contoh 1: useEffect saat Component Mount

```javascript
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect ini hanya berjalan saat component mount (1 kali)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        
        // Simulasi API call
        const response = await fetch('https://api.example.com/user/1');
        const data = await response.json();
        
        setUser(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array = hanya saat mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;
```

**Penjelasan:**
- `useEffect(() => { ... }, [])` dengan empty dependency array
- Berjalan hanya 1 kali saat component mount
- Cocok untuk fetch initial data, setup listeners, dll

---

### ✅ Contoh 2: useEffect dengan Dependency

```javascript
import { useState, useEffect } from 'react';

function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect ini berjalan saat 'query' berubah
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search (tunggu 500ms setelah user berhenti typing)
    const timeoutId = setTimeout(searchUsers, 500);

    // Cleanup function - dibersihkan sebelum effect berjalan lagi
    return () => clearTimeout(timeoutId);
  }, [query]); // Dependency = [query], effect berjalan saat query berubah

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Searching...</p>}
      
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;
```

**Penjelasan:**
- `useEffect` dengan dependency `[query]` 
- Setiap kali user typing, query state berubah dan effect berjalan
- Cleanup function `return () => clearTimeout(timeoutId)` untuk cancel previous request
- Debounce technique untuk mengurangi API calls

---

### ✅ Contoh 3: useEffect untuk Save ke localStorage

```javascript
import { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // Lazy initialization - load dari localStorage
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState('');

  // Effect 1: Save todos ke localStorage setiap kali todos berubah
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Todos saved to localStorage');
  }, [todos]); // Dependency = [todos]

  // Effect 2: Load todos saat component mount
  useEffect(() => {
    console.log('Component mounted, todos loaded from localStorage');
  }, []); // Empty dependency = hanya saat mount

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const removeTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

**Penjelasan:**
- Lazy initialization untuk load dari localStorage
- Dua separate effects dengan tujuan berbeda
- Auto-save setiap kali todos berubah

---

### ✅ Contoh 4: useEffect dengan Cleanup

```javascript
import { useState, useEffect } from 'react';

function WindowResizeListener() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // Setup - Add event listener
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup - Remove event listener saat component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency = setup once at mount, cleanup at unmount

  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
    </div>
  );
}

export default WindowResizeListener;
```

**Penjelasan:**
- Setup: `addEventListener`
- Cleanup: `removeEventListener` (penting untuk prevent memory leak!)
- Cleanup function = return statement di dalam useEffect

---

## 3. useRef - Contoh Praktis

### ✅ Contoh 1: Focus Input dengan useRef

```javascript
import { useRef } from 'react';

function FocusInput() {
  // Ref untuk menyimpan reference ke input element
  const inputRef = useRef(null);

  const handleFocusClick = () => {
    // Access DOM element via ref.current
    inputRef.current?.focus();
  };

  const handleGetValue = () => {
    // Baca value dari input
    const value = inputRef.current?.value;
    alert(`Input value: ${value}`);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click button to focus me"
      />
      <button onClick={handleFocusClick}>Focus Input</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
}

export default FocusInput;
```

**Penjelasan:**
- `useRef(null)` untuk menyimpan DOM element reference
- `ref={inputRef}` untuk attach ref ke input element
- `inputRef.current` untuk access DOM node
- `inputRef.current.focus()` untuk call DOM methods

---

### ✅ Contoh 2: Tracking Render Count dengan useRef

```javascript
import { useEffect, useRef } from 'react';

function RenderCounter() {
  // useRef untuk tracking render count (tidak trigger re-render)
  const renderCountRef = useRef(0);

  useEffect(() => {
    // Increment render count setiap kali component render
    renderCountRef.current += 1;
    console.log(`Component rendered ${renderCountRef.current} times`);
  });

  return (
    <div>
      {/* 
        Note: renderCountRef.current tidak ditampilkan di sini,
        jika ditampilkan akan selalu 0 (dari render terakhir)
        Gunakan state jika ingin ditampilkan!
      */}
      <p>Check console to see render count</p>
      <button onClick={() => window.location.reload()}>
        Reload to test
      </button>
    </div>
  );
}

export default RenderCounter;
```

**Penjelasan:**
- `useRef` untuk tracking nilai yang tidak perlu update UI
- Tidak trigger re-render saat `renderCountRef.current` berubah
- Useful untuk interval/timeout IDs, previous values, dll

---

### ✅ Contoh 3: Interval Management dengan useRef

```javascript
import { useState, useEffect, useRef } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Store interval ID dalam ref untuk cleanup nanti
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    // Start interval
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup - stop interval saat component unmount atau isRunning berubah jadi false
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Timer: {seconds}s</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
```

**Penjelasan:**
- `useRef` menyimpan interval ID
- Cleanup function clear interval untuk prevent memory leak
- Interval berjalan hanya saat `isRunning` true

---

### ✅ Contoh 4: Scroll Position dengan useRef

```javascript
import { useRef } from 'react';

function ScrollContainer() {
  const scrollContainerRef = useRef(null);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  };

  const getScrollPosition = () => {
    const scrollTop = scrollContainerRef.current?.scrollTop;
    alert(`Current scroll position: ${scrollTop}px`);
  };

  return (
    <div>
      <button onClick={scrollToTop}>Scroll to Top</button>
      <button onClick={scrollToBottom}>Scroll to Bottom</button>
      <button onClick={getScrollPosition}>Get Position</button>

      <div
        ref={scrollContainerRef}
        style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc' }}
      >
        {/* Content that scrolls */}
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i}>Item {i + 1}</p>
        ))}
      </div>
    </div>
  );
}

export default ScrollContainer;
```

**Penjelasan:**
- `ref={scrollContainerRef}` attach ref ke scrollable div
- `scrollContainerRef.current.scrollTo()` untuk scroll ke posisi tertentu
- `scrollContainerRef.current.scrollHeight` untuk get total height

---

## 4. Kombinasi Ketiga Hooks

### ✅ Real-world Example: Product Filter dengan Form

```javascript
import { useState, useEffect, useRef } from 'react';

function ProductFilter() {
  // ✅ useState - untuk data yang ditampilkan
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  // ✅ useRef - untuk tracking form dirty state
  const searchInputRef = useRef(null);
  const initialSearchRef = useRef('');

  // ✅ useEffect - Fetch products saat component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const mockProducts = [
          { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
          { id: 2, name: 'Phone', category: 'Electronics', price: 599 },
          { id: 3, name: 'Book', category: 'Books', price: 29 },
          { id: 4, name: 'Pen', category: 'Stationery', price: 5 },
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Hanya saat mount

  // ✅ useEffect - Filter products saat search atau category berubah
  useEffect(() => {
    let result = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    result = result.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(result);

    // ✅ useRef - Track bahwa search berubah dari initial value
    if (searchTerm !== initialSearchRef.current) {
      console.log('Search term changed');
    }
  }, [searchTerm, selectedCategory, sortOrder, products]); // Dependency array

  const handleClearSearch = () => {
    setSearchTerm('');
    // ✅ useRef - Focus kembali ke search input
    searchInputRef.current?.focus();
  };

  return (
    <div>
      <h1>Product Filter</h1>

      <div style={{ marginBottom: '20px' }}>
        {/* ✅ useRef - attach ref ke input */}
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleClearSearch}>Clear</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Stationery</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} ({product.category})
          </li>
        ))}
      </ul>

      {filteredProducts.length === 0 && !loading && (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductFilter;
```

**Penjelasan:**
- **useState**: `products`, `filteredProducts`, `searchTerm`, `selectedCategory`, `loading`, `sortOrder` - semua data yang ditampilkan
- **useEffect #1**: Fetch initial products saat mount (empty dependency)
- **useEffect #2**: Filter & sort products saat dependency berubah
- **useRef**: `searchInputRef` untuk focus input, `initialSearchRef` untuk tracking initial value

---

## Checklist Best Practices

### ✅ useState
- [ ] Gunakan untuk data yang ditampilkan di UI
- [ ] Combine related state dalam single object
- [ ] Update state dengan setter function
- [ ] Tidak mutate state langsung

### ✅ useEffect
- [ ] Selalu sertakan dependency array
- [ ] Cleanup resources di return statement
- [ ] Hindari infinite loops
- [ ] Pisahkan unrelated effects

### ✅ useRef
- [ ] Gunakan untuk DOM access
- [ ] Gunakan untuk non-rendering values
- [ ] Jangan access ref di render body
- [ ] Cleanup ref jika diperlukan

---

Semua contoh di atas bisa langsung digunakan dalam proyek Anda. Sesuaikan sesuai kebutuhan spesifik aplikasi!
