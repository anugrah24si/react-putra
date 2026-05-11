import { useMemo, useState } from 'react';
import { Filter, Plus, Edit, Trash2, Eye, Package, X } from 'lucide-react';


const CATEGORIES = ['Facial Treatment', 'Laser Treatment', 'Anti-Aging', 'Injectable', 'Medical Treatment'];
const PAGE_SIZE = 6;

const initialProducts = [
  { id: 'PRD-001', name: 'Facial Diamond Glow', category: 'Facial Treatment', price: 'Rp 850,000', stock: 25, status: 'available', image: '/product_treatment.png', description: 'Premium diamond facial treatment for radiant skin' },
  { id: 'PRD-002', name: 'Laser Hair Removal', category: 'Laser Treatment', price: 'Rp 1,200,000', stock: 15, status: 'available', image: '/product_skincare.png', description: 'Permanent hair removal with advanced laser technology' },
  { id: 'PRD-003', name: 'Skin Rejuvenation', category: 'Anti-Aging', price: 'Rp 950,000', stock: 8, status: 'low-stock', image: '/product_skincare.png', description: 'Restore youthful skin with collagen boosting therapy' },
  { id: 'PRD-004', name: 'Botox Treatment', category: 'Injectable', price: 'Rp 2,500,000', stock: 12, status: 'available', image: '/product_treatment.png', description: 'FDA-approved botox for wrinkle reduction' },
  { id: 'PRD-005', name: 'Chemical Peeling', category: 'Facial Treatment', price: 'Rp 750,000', stock: 0, status: 'out-of-stock', image: '/product_skincare.png', description: 'Deep exfoliation for smooth and even skin tone' },
  { id: 'PRD-006', name: 'Dermal Filler', category: 'Injectable', price: 'Rp 3,200,000', stock: 18, status: 'available', image: '/product_treatment.png', description: 'Hyaluronic acid filler for volume restoration' },
  { id: 'PRD-007', name: 'Acne Treatment', category: 'Medical Treatment', price: 'Rp 680,000', stock: 20, status: 'available', image: '/product_skincare.png', description: 'Comprehensive acne therapy with clinical-grade products' },
  { id: 'PRD-008', name: 'Hydrafacial', category: 'Facial Treatment', price: 'Rp 1,100,000', stock: 5, status: 'low-stock', image: '/product_treatment.png', description: 'Deep cleansing and hydration facial treatment' },
];

const EMPTY_FORM = { name: '', category: 'Facial Treatment', price: '', stock: '', description: '' };

function deriveStatus(stock) {
  const n = Number(stock);
  if (n === 0) return 'out-of-stock';
  if (n <= 10) return 'low-stock';
  return 'available';
}

function formatPrice(raw) {
  const digits = raw.replace(/\D/g, '');
  return digits ? `Rp ${Number(digits).toLocaleString('id-ID')}` : '';
}

function getStatusBadge(status) {
  switch (status) {
    case 'available':    return 'med-badge med-badge--green';
    case 'low-stock':   return 'med-badge med-badge--amber';
    case 'out-of-stock': return 'med-badge med-badge--red';
    default:            return 'med-badge';
  }
}

function getStatusText(status) {
  return status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

/* ─── Shared Modal Form ─────────────────────────────────── */
function ProductForm({ title, form, onChange, onSubmit, onClose, submitLabel }) {
  return (
    <div className="med-overlay" role="dialog" aria-modal="true">
      <div className="med-modal">
        {/* Header */}
        <div className="med-modal__head">
          <h3 className="med-modal__title">{title}</h3>
          <button type="button" className="med-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form className="med-form" onSubmit={onSubmit}>
          <div className="med-modal__body">
            <div className="med-grid-2">
              <div className="med-field">
                <label className="med-label">Product Name <span className="med-req">*</span></label>
                <input
                  name="name" value={form.name} onChange={onChange} required
                  placeholder="e.g., Facial Diamond Glow"
                  className="med-input"
                />
              </div>
              <div className="med-field">
                <label className="med-label">Category</label>
                <select name="category" value={form.category} onChange={onChange} className="med-select">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="med-grid-2">
            <div className="med-field">
              <label className="med-label">Price (Rp) <span className="med-req">*</span></label>
              <input
                name="price" value={form.price} onChange={onChange} required
                placeholder="850000"
                className="med-input"
              />
            </div>
            <div className="med-field">
              <label className="med-label">Stock Qty <span className="med-req">*</span></label>
              <input
                type="number" min="0" name="stock" value={form.stock} onChange={onChange} required
                placeholder="25"
                className="med-input"
              />
            </div>
          </div>

          <div className="med-field">
            <label className="med-label">Description</label>
            <textarea
              name="description" value={form.description} onChange={onChange}
              rows={3} placeholder="Describe the product or treatment..."
              className="med-textarea"
            />
          </div>
          </div>

          <div className="med-modal__actions">
            <button type="button" className="med-btn med-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="med-btn med-btn--primary">{submitLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── View Modal ────────────────────────────────────────── */
function ViewModal({ product, onClose, onEdit }) {
  return (
    <div className="med-overlay" role="dialog" aria-modal="true">
      <div className="med-modal med-modal--view">
        <div className="med-modal__head">
          <h3 className="med-modal__title">Product Detail</h3>
          <button type="button" className="med-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="med-modal__body">
          <div className="med-view-img">
            <img src={product.image} alt={product.name} onError={e => { e.target.src = '/product_treatment.png'; }} />
            <span className={getStatusBadge(product.status)}>{getStatusText(product.status)}</span>
          </div>
          <div className="med-view-meta">
            <span className="med-view-cat">{product.category}</span>
            <h2 className="med-view-name">{product.name}</h2>
            <p className="med-view-desc">{product.description}</p>
            <div className="med-view-row">
              <div className="med-view-stat">
                <span className="med-view-stat__label">Price</span>
                <span className="med-view-stat__val">{product.price}</span>
              </div>
              <div className="med-view-stat">
                <span className="med-view-stat__label">Stock</span>
                <span className="med-view-stat__val">{product.stock} units</span>
              </div>
              <div className="med-view-stat">
                <span className="med-view-stat__label">ID</span>
                <span className="med-view-stat__val">{product.id}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="med-modal__actions" style={{ padding: '0 28px 24px' }}>
          <button type="button" className="med-btn med-btn--ghost" onClick={onClose}>Close</button>
          <button type="button" className="med-btn med-btn--primary" onClick={() => { onClose(); onEdit(product); }}>
            <Edit size={14} /> Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Delete Confirm Modal ──────────────────────────────── */
function DeleteModal({ product, onConfirm, onClose }) {
  return (
    <div className="med-overlay" role="dialog" aria-modal="true">
      <div className="med-modal med-modal--sm">
        <div className="med-modal__head">
          <h3 className="med-modal__title">Delete Product</h3>
          <button type="button" className="med-modal__close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="med-modal__body">
          <div className="med-delete-icon">
            <Trash2 size={28} />
          </div>
          <p className="med-delete-text">
            Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="med-modal__actions" style={{ padding: '0 28px 24px' }}>
          <button type="button" className="med-btn med-btn--ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="med-btn med-btn--danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Products Component ───────────────────────────── */
export default function Products() {
  const [products, setProducts]     = useState(initialProducts);
  const [searchQuery, setSearch]    = useState('');
  const [categoryFilter, setCat]    = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setPage]      = useState(1);

  // Modal states
  const [addOpen, setAddOpen]       = useState(false);
  const [editTarget, setEditTarget] = useState(null);   // product being edited
  const [viewTarget, setViewTarget] = useState(null);   // product being viewed
  const [deleteTarget, setDelete]   = useState(null);   // product to delete

  const [form, setForm]             = useState(EMPTY_FORM);
  const [editForm, setEditForm]     = useState(EMPTY_FORM);

  /* ── Filtering & Pagination ── */
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter(p => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat    = categoryFilter === 'All' || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, searchQuery, categoryFilter]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const effectPage  = Math.min(currentPage, totalPages);
  const paged       = useMemo(() => filtered.slice((effectPage - 1) * PAGE_SIZE, effectPage * PAGE_SIZE), [filtered, effectPage]);

  /* ── Handlers ── */
  function handleFormChange(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }
  function handleEditFormChange(e) { setEditForm(f => ({ ...f, [e.target.name]: e.target.value })); }

  function handleAdd(e) {
    e.preventDefault();
    const stockNum = parseInt(form.stock, 10) || 0;
    const newProduct = {
      id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
      name: form.name.trim(),
      category: form.category,
      price: formatPrice(form.price) || `Rp ${form.price}`,
      stock: stockNum,
      status: deriveStatus(stockNum),
      image: '/product_treatment.png',
      description: form.description.trim(),
    };
    setProducts(prev => [newProduct, ...prev]);
    setForm(EMPTY_FORM);
    setAddOpen(false);
    setPage(1);
  }

  function openEdit(product) {
    setEditTarget(product);
    setEditForm({
      name: product.name,
      category: product.category,
      price: product.price.replace(/[^\d]/g, ''),
      stock: String(product.stock),
      description: product.description,
    });
  }

  function handleUpdate(e) {
    e.preventDefault();
    const stockNum = parseInt(editForm.stock, 10) || 0;
    setProducts(prev => prev.map(p =>
      p.id === editTarget.id
        ? {
            ...p,
            name: editForm.name.trim(),
            category: editForm.category,
            price: formatPrice(editForm.price) || `Rp ${editForm.price}`,
            stock: stockNum,
            status: deriveStatus(stockNum),
            description: editForm.description.trim(),
          }
        : p
    ));
    setEditTarget(null);
  }

  function handleDelete() {
    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
    setDelete(null);
  }

  return (
    <div className="med-products">
      {/* ── Header ── */}
      <div className="med-products-head">
        <div>
          <h2 className="med-products__title">Products &amp; Treatments</h2>
          <p className="med-products__subtitle">Manage your beauty services and treatment catalog ({products.length} items)</p>
        </div>
        <div className="med-products__actions">
          {/* Search */}
          <div className="med-search">
            <svg className="med-search__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" placeholder="Search products..."
              value={searchQuery} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="med-search__input"
            />
          </div>

          {/* Filter */}
          <div style={{ position: 'relative' }}>
            <button className="med-btn med-btn--ghost" onClick={() => setShowFilter(v => !v)}>
              <Filter size={14} /> Filter
            </button>
            {showFilter && (
              <div className="med-filter-pop">
                <p className="med-filter-pop__label">Category</p>
                <select className="med-select" value={categoryFilter} onChange={e => { setCat(e.target.value); setPage(1); setShowFilter(false); }}>
                  <option value="All">All Categories</option>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

          <button className="med-btn med-btn--primary" onClick={() => setAddOpen(true)}>
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="med-products-grid">
        {paged.length === 0 ? (
          <div className="med-empty">
            <Package size={40} />
            <p>Produk tidak ditemukan</p>
          </div>
        ) : (
          paged.map(product => (
            <div key={product.id} className="med-product-card">
              {/* Image */}
              <div className="med-product-card__img" style={{ backgroundImage: `url(${product.image})` }}>
                <img src={product.image} alt={product.name} onError={e => { e.target.src = '/product_treatment.png'; }} />
                <span className={getStatusBadge(product.status)}>{getStatusText(product.status)}</span>
              </div>

              {/* Info */}
              <div className="med-product-card__body">
                <span className="med-product-card__price">{product.price}</span>
                <h3 className="med-product-card__name">{product.name}</h3>
                <div className="med-product-card__actions">
                  <button className="med-chip" onClick={() => setViewTarget(product)}>
                    <Eye size={14} /> View
                  </button>
                  <button className="med-btn med-btn--ghost" onClick={() => openEdit(product)} aria-label="Edit" style={{ minHeight: '28px', padding: '4px 12px' }}>
                    <Edit size={14} />
                  </button>
                  <button className="med-btn med-btn--ghost" onClick={() => setDelete(product)} aria-label="Delete" style={{ minHeight: '28px', padding: '4px 12px' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Pagination ── */}
      {filtered.length > PAGE_SIZE && (
        <div className="med-dash-pagination">
          {/* Prev */}
          <button
            className="med-page-btn"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={effectPage === 1}
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
            <button
              key={pg}
              className={`med-page-num${effectPage === pg ? ' med-page-num--active' : ''}`}
              onClick={() => setPage(pg)}
              aria-label={`Page ${pg}`}
              aria-current={effectPage === pg ? 'page' : undefined}
            >{pg}</button>
          ))}

          {/* Next */}
          <button
            className="med-page-btn"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={effectPage === totalPages}
            aria-label="Next page"
          >
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}


      {/* ── Add Modal ── */}
      {addOpen && (
        <ProductForm
          title="Add New Product"
          form={form}
          onChange={handleFormChange}
          onSubmit={handleAdd}
          onClose={() => { setAddOpen(false); setForm(EMPTY_FORM); }}
          submitLabel="Add Product"
        />
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <ProductForm
          title={`Edit — ${editTarget.name}`}
          form={editForm}
          onChange={handleEditFormChange}
          onSubmit={handleUpdate}
          onClose={() => setEditTarget(null)}
          submitLabel="Save Changes"
        />
      )}

      {/* ── View Modal ── */}
      {viewTarget && (
        <ViewModal
          product={viewTarget}
          onClose={() => setViewTarget(null)}
          onEdit={openEdit}
        />
      )}

      {/* ── Delete Confirm ── */}
      {deleteTarget && (
        <DeleteModal
          product={deleteTarget}
          onConfirm={handleDelete}
          onClose={() => setDelete(null)}
        />
      )}
    </div>
  );
}
