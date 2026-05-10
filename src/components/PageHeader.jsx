import { X, Mail, Phone, Clock, MapPin, Edit } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// UTILITIES - Color helpers
// ═══════════════════════════════════════════════════════════════════

export const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return { bg: '#ECFDF5', color: '#007A55', border: '#A4F4CF' };
    case 'On Leave':
      return { bg: '#FFFBEB', color: '#BB4D00', border: '#FEE685' };
    default:
      return { bg: '#F0F0F0', color: '#666', border: '#D0D0D0' };
  }
};

export const getRoleColor = (role) => {
  switch (role) {
    case 'Doctor':
      return { bg: '#FAF5FF', color: '#8200DB', border: '#E9D4FF' };
    case 'Nurse':
      return { bg: '#EFF6FF', color: '#1447E6', border: '#BEDBFF' };
    case 'Therapist':
      return { bg: '#FDF2F8', color: '#C6005C', border: '#FCCEE8' };
    default:
      return { bg: '#FFFBEB', color: '#BB4D00', border: '#FEE685' };
  }
};

// ═══════════════════════════════════════════════════════════════════
// STATS CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function StatsCard({ label, value, icon: Icon }) {
  return (
    <div className="stats-card">
      <div className="stats-card__content">
        <p className="stats-card__label">{label}</p>
        <p className="stats-card__value">{value}</p>
      </div>
      <div className="stats-card__icon">
        <Icon size={20} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STAFF CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function StaffCard({ staff, onViewProfile }) {
  const statusStyle = getStatusColor(staff.status);
  const roleStyle = getRoleColor(staff.role);

  return (
    <div className="staff-card">
      <div className="staff-card__header">
        <img
          src={staff.image}
          alt={staff.name}
          className="staff-card__image"
        />
        <div
          className="staff-card__status"
          style={{
            background: statusStyle.bg,
            color: statusStyle.color,
            borderColor: statusStyle.border,
          }}
        >
          {staff.status}
        </div>
      </div>

      <div className="staff-card__body">
        <h3 className="staff-card__name">{staff.name}</h3>
        <p className="staff-card__specialization">{staff.specialization}</p>

        <div
          className="staff-card__role"
          style={{
            background: roleStyle.bg,
            color: roleStyle.color,
            borderColor: roleStyle.border,
          }}
        >
          {staff.role}
        </div>

        <div className="staff-card__details">
          <div className="staff-card__detail-item">
            <Mail size={14} />
            <span>{staff.email}</span>
          </div>
          <div className="staff-card__detail-item">
            <Phone size={14} />
            <span>{staff.phone}</span>
          </div>
          <div className="staff-card__detail-item">
            <Clock size={14} />
            <span>{staff.schedule}</span>
          </div>
          <div className="staff-card__detail-item">
            <MapPin size={14} />
            <span>{staff.location}</span>
          </div>
        </div>
      </div>

      <div className="staff-card__footer">
        <button 
          className="staff-card__btn staff-card__btn--view"
          onClick={() => onViewProfile && onViewProfile(staff)}
        >
          View Profile
        </button>
        <button className="staff-card__btn staff-card__btn--edit">
          <Edit size={16} />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STAFF FORM MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function StaffForm({ title, form, onChange, onSubmit, onClose, submitLabel = 'Add Staff' }) {
  const ROLES = ['Doctor', 'Nurse', 'Therapist', 'Receptionist'];
  const STATUSES = ['Active', 'On Leave'];

  return (
    <div className="staff-overlay" role="dialog" aria-modal="true">
      <div className="staff-modal">
        <div className="staff-modal__head">
          <h3 className="staff-modal__title">{title}</h3>
          <button 
            type="button" 
            className="staff-modal__close" 
            onClick={onClose} 
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form className="staff-modal__body" onSubmit={onSubmit}>
          <div className="staff-form-grid">
            <div className="staff-field">
              <label className="staff-label">Full Name <span className="staff-req">*</span></label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="e.g., Dr. Amelia Chen"
                className="staff-input"
              />
            </div>
            <div className="staff-field">
              <label className="staff-label">Role <span className="staff-req">*</span></label>
              <select 
                name="role" 
                value={form.role} 
                onChange={onChange} 
                required
                className="staff-input"
              >
                <option value="">Select Role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="staff-field">
            <label className="staff-label">Specialization <span className="staff-req">*</span></label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={onChange}
              required
              placeholder="e.g., Dermatology & Aesthetic Medicine"
              className="staff-input"
            />
          </div>

          <div className="staff-form-grid">
            <div className="staff-field">
              <label className="staff-label">Email <span className="staff-req">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="name@clinic.com"
                className="staff-input"
              />
            </div>
            <div className="staff-field">
              <label className="staff-label">Phone <span className="staff-req">*</span></label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                required
                placeholder="+62 812-3456-7890"
                className="staff-input"
              />
            </div>
          </div>

          <div className="staff-form-grid">
            <div className="staff-field">
              <label className="staff-label">Schedule <span className="staff-req">*</span></label>
              <input
                name="schedule"
                value={form.schedule}
                onChange={onChange}
                required
                placeholder="Mon - Fri, 09:00 - 17:00"
                className="staff-input"
              />
            </div>
            <div className="staff-field">
              <label className="staff-label">Location <span className="staff-req">*</span></label>
              <input
                name="location"
                value={form.location}
                onChange={onChange}
                required
                placeholder="e.g., Jakarta Central"
                className="staff-input"
              />
            </div>
          </div>

          <div className="staff-field">
            <label className="staff-label">Status</label>
            <select 
              name="status" 
              value={form.status} 
              onChange={onChange}
              className="staff-input"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="staff-modal__actions">
            <button type="button" className="staff-btn staff-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="staff-btn staff-btn--primary">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STAFF PROFILE MODAL COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function StaffProfileModal({ staff, isOpen, onClose }) {
  if (!isOpen || !staff) return null;

  const statusStyle = getStatusColor(staff.status);
  const roleStyle = getRoleColor(staff.role);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <img src={staff.image} alt={staff.name} className="modal-avatar" />
          <div className="modal-header-info">
            <h2 className="modal-title">{staff.name}</h2>
            <p className="modal-subtitle">{staff.specialization}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <div
                className="modal-badge"
                style={{
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  borderColor: statusStyle.border,
                }}
              >
                {staff.status}
              </div>
              <div
                className="modal-badge"
                style={{
                  background: roleStyle.bg,
                  color: roleStyle.color,
                  borderColor: roleStyle.border,
                }}
              >
                {staff.role}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <section className="modal-section">
            <h3 className="modal-section-title">Contact Information</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <Mail size={18} className="modal-info-icon" />
                <div>
                  <p className="modal-info-label">Email</p>
                  <p className="modal-info-value">{staff.email}</p>
                </div>
              </div>
              <div className="modal-info-item">
                <Phone size={18} className="modal-info-icon" />
                <div>
                  <p className="modal-info-label">Phone</p>
                  <p className="modal-info-value">{staff.phone}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="modal-section">
            <h3 className="modal-section-title">Work Information</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <Clock size={18} className="modal-info-icon" />
                <div>
                  <p className="modal-info-label">Schedule</p>
                  <p className="modal-info-value">{staff.schedule}</p>
                </div>
              </div>
              <div className="modal-info-item">
                <MapPin size={18} className="modal-info-icon" />
                <div>
                  <p className="modal-info-label">Location</p>
                  <p className="modal-info-value">{staff.location}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="modal-section">
            <h3 className="modal-section-title">Additional Details</h3>
            <div className="modal-details-list">
              <div className="modal-detail-row">
                <span className="modal-detail-label">Staff ID:</span>
                <span className="modal-detail-value">{staff.id}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Role:</span>
                <span className="modal-detail-value">{staff.role}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Specialization:</span>
                <span className="modal-detail-value">{staff.specialization}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Status:</span>
                <span className="modal-detail-value">{staff.status}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button className="modal-btn modal-btn--secondary" onClick={onClose}>
            Close
          </button>
          <button className="modal-btn modal-btn--primary">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE HEADER COMPONENT (original)
// ═══════════════════════════════════════════════════════════════════

export default function PageHeader({ title, subtitle, actionLabel }) {
  const breadcrumbItems = subtitle.split(" /").map((item) => item.trim()).filter(Boolean);

  return (
    <div id="pageheader-container">
      <div id="pageheader-left">
        <span id="page-title">
          {title}
        </span>
        <div id="breadcrumb-links">
          {breadcrumbItems.map((item, index) => (
            <div key={`${item}-${index}`}>
              <span id={index === 0 ? "breadcrumb-home" : "breadcrumb-current"}>
                {item}
              </span>
              {index < breadcrumbItems.length - 1 ? (
                <span id="breadcrumb-separator"> / </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div id="action-button">
        <button id="add-button">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
