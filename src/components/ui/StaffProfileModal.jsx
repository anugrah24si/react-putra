import { X, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { getStatusColor, getRoleColor } from './StaffCard';
import Button from './Button';

/**
 * StaffProfileModal Component - Modal untuk menampilkan detail profile staff
 * 
 * @param {Object} staff - Data staff
 * @param {boolean} isOpen - Status modal terbuka/tertutup
 * @param {function} onClose - Handler saat modal ditutup
 * @param {function} onEdit - Handler saat tombol Edit diklik
 */
export default function StaffProfileModal({ staff, isOpen, onClose, onEdit }) {
    if (!isOpen || !staff) return null;

    const statusStyle = getStatusColor(staff.status);
    const roleStyle = getRoleColor(staff.role);

    return (
        <div className="med-overlay" onClick={onClose}>
            <div className="med-modal med-modal--view" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="med-modal__close" onClick={onClose}>
                    <X size={24} />
                </button>

                {/* Profile Header */}
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

                {/* Profile Body */}
                <div className="med-modal__body">
                    {/* Contact Information */}
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

                    {/* Work Information */}
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

                    {/* Additional Details */}
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

                {/* Footer Actions */}
                <div className="med-modal__actions">
                    <Button variant="ghost" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onEdit?.(staff)}>
                        Edit Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}
