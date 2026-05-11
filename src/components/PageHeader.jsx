import { X, Mail, Phone, Clock, MapPin, Edit } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════
// UTILITIES - Color helpers
// ═══════════════════════════════════════════════════════════════════

export const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return { bg: 'rgba(0, 192, 70, 0.14)', color: '#8df0b4', border: 'rgba(0, 192, 70, 0.28)' };
    case 'On Leave':
      return { bg: 'rgba(255, 87, 16, 0.14)', color: '#ffb08b', border: 'rgba(255, 87, 16, 0.28)' };
    default:
      return { bg: 'rgba(255, 255, 255, 0.06)', color: '#d9dce5', border: 'rgba(255, 255, 255, 0.12)' };
  }
};

export const getRoleColor = (role) => {
  switch (role) {
    case 'Doctor':
      return { bg: 'rgba(46, 111, 252, 0.14)', color: '#9fbbff', border: 'rgba(46, 111, 252, 0.28)' };
    case 'Nurse':
      return { bg: 'rgba(0, 192, 70, 0.14)', color: '#8df0b4', border: 'rgba(0, 192, 70, 0.28)' };
    case 'Therapist':
      return { bg: 'rgba(163, 41, 251, 0.14)', color: '#c79aff', border: 'rgba(163, 41, 251, 0.28)' };
    default:
      return { bg: 'rgba(255, 255, 255, 0.06)', color: '#d9dce5', border: 'rgba(255, 255, 255, 0.12)' };
  }
};

// ═══════════════════════════════════════════════════════════════════
// STATS CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════

export function StatsCard({ label, value, icon: Icon }) {
  return (
    <div className="med-stats-card">
      <div className="med-stats-card__content">
        <p className="med-stats-card__label">{label}</p>
        <p className="med-stats-card__value">{value}</p>
      </div>
      <div className="med-stats-card__icon">
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
    <div className="med-staff-card">
      <div className="med-staff-card__header">
        <img
          src={staff.image}
          alt={staff.name}
          className="med-staff-card__image"
        />
        <div
          className="med-staff-card__status"
          style={{
            background: statusStyle.bg,
            color: statusStyle.color,
            borderColor: statusStyle.border,
          }}
        >
          {staff.status}
        </div>
      </div>

      <div className="med-staff-card__body">
        <h3 className="med-staff-card__name">{staff.name}</h3>
        <p className="med-staff-card__specialization">{staff.specialization}</p>

        <div
          className="med-staff-card__role"
          style={{
            background: roleStyle.bg,
            color: roleStyle.color,
            borderColor: roleStyle.border,
          }}
        >
          {staff.role}
        </div>

        <div className="med-staff-card__details">
          <div className="med-staff-card__detail-item">
            <Mail size={14} />
            <span>{staff.email}</span>
          </div>
          <div className="med-staff-card__detail-item">
            <Phone size={14} />
            <span>{staff.phone}</span>
          </div>
          <div className="med-staff-card__detail-item">
            <Clock size={14} />
            <span>{staff.schedule}</span>
          </div>
          <div className="med-staff-card__detail-item">
            <MapPin size={14} />
            <span>{staff.location}</span>
          </div>
        </div>
      </div>

      <div className="med-staff-card__footer">
        <button 
          className="med-staff-card__btn med-staff-card__btn--view"
          onClick={() => onViewProfile && onViewProfile(staff)}
        >
          View Profile
        </button>
        <button className="med-staff-card__btn med-staff-card__btn--edit">
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
    <div className="med-overlay" role="dialog" aria-modal="true">
      <div className="med-modal">
        <div className="med-modal__head">
          <h3 className="med-modal__title">{title}</h3>
          <button 
            type="button" 
            className="med-modal__close" 
            onClick={onClose} 
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form className="med-modal__body" onSubmit={onSubmit}>
          <div className="med-grid-2">
            <div className="med-field">
              <label className="med-label">Full Name <span className="med-req">*</span></label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="e.g., Dr. Amelia Chen"
                className="med-input"
              />
            </div>
            <div className="med-field">
              <label className="med-label">Role <span className="med-req">*</span></label>
              <select 
                name="role" 
                value={form.role} 
                onChange={onChange} 
                required
                className="med-select"
              >
                <option value="">Select Role</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div className="med-field">
            <label className="med-label">Specialization <span className="med-req">*</span></label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={onChange}
              required
              placeholder="e.g., Dermatology & Aesthetic Medicine"
              className="med-input"
            />
          </div>

          <div className="med-grid-2">
            <div className="med-field">
              <label className="med-label">Email <span className="med-req">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="name@clinic.com"
                className="med-input"
              />
            </div>
            <div className="med-field">
              <label className="med-label">Phone <span className="med-req">*</span></label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                required
                placeholder="+62 812-3456-7890"
                className="med-input"
              />
            </div>
          </div>

          <div className="med-grid-2">
            <div className="med-field">
              <label className="med-label">Schedule <span className="med-req">*</span></label>
              <input
                name="schedule"
                value={form.schedule}
                onChange={onChange}
                required
                placeholder="Mon - Fri, 09:00 - 17:00"
                className="med-input"
              />
            </div>
            <div className="med-field">
              <label className="med-label">Location <span className="med-req">*</span></label>
              <input
                name="location"
                value={form.location}
                onChange={onChange}
                required
                placeholder="e.g., Jakarta Central"
                className="med-input"
              />
            </div>
          </div>

          <div className="med-field">
            <label className="med-label">Status</label>
            <select 
              name="status" 
              value={form.status} 
              onChange={onChange}
              className="med-select"
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="med-modal__actions">
            <button type="button" className="med-btn med-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="med-btn med-btn--primary">
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
    <div className="med-overlay" onClick={onClose}>
      <div className="med-modal med-modal--view" onClick={(e) => e.stopPropagation()}>
        <button className="med-modal__close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="med-view-meta">
          <img src={staff.image} alt={staff.name} className="med-view-img" />
          <div className="med-view-info">
            <h2 className="med-view-name">{staff.name}</h2>
            <p className="med-view-desc">{staff.specialization}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <div
                className="med-badge"
                style={{
                  background: statusStyle.bg,
                  color: statusStyle.color,
                  borderColor: statusStyle.border,
                }}
              >
                {staff.status}
              </div>
              <div
                className="med-badge"
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

        <div className="med-modal__body">
          <section className="med-profile-section">
            <h3 className="med-profile-section__title">Contact Information</h3>
            <div className="med-profile-info-grid">
              <div className="med-profile-info-item">
                <Mail size={18} className="med-profile-info-icon" />
                <div>
                  <p className="med-profile-info-label">Email</p>
                  <p className="med-profile-info-value">{staff.email}</p>
                </div>
              </div>
              <div className="med-profile-info-item">
                <Phone size={18} className="med-profile-info-icon" />
                <div>
                  <p className="med-profile-info-label">Phone</p>
                  <p className="med-profile-info-value">{staff.phone}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="med-profile-section">
            <h3 className="med-profile-section__title">Work Information</h3>
            <div className="med-profile-info-grid">
              <div className="med-profile-info-item">
                <Clock size={18} className="med-profile-info-icon" />
                <div>
                  <p className="med-profile-info-label">Schedule</p>
                  <p className="med-profile-info-value">{staff.schedule}</p>
                </div>
              </div>
              <div className="med-profile-info-item">
                <MapPin size={18} className="med-profile-info-icon" />
                <div>
                  <p className="med-profile-info-label">Location</p>
                  <p className="med-profile-info-value">{staff.location}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="med-profile-section">
            <h3 className="med-profile-section__title">Additional Details</h3>
            <div className="med-profile-details-list">
              <div className="med-profile-detail-row">
                <span className="med-profile-detail-label">Staff ID:</span>
                <span className="med-profile-detail-value">{staff.id}</span>
              </div>
              <div className="med-profile-detail-row">
                <span className="med-profile-detail-label">Role:</span>
                <span className="med-profile-detail-value">{staff.role}</span>
              </div>
              <div className="med-profile-detail-row">
                <span className="med-profile-detail-label">Specialization:</span>
                <span className="med-profile-detail-value">{staff.specialization}</span>
              </div>
              <div className="med-profile-detail-row">
                <span className="med-profile-detail-label">Status:</span>
                <span className="med-profile-detail-value">{staff.status}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="med-modal__actions">
          <button className="med-btn med-btn--ghost" onClick={onClose}>
            Close
          </button>
          <button className="med-btn med-btn--primary">
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
