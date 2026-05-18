import { Mail, Phone, Clock, MapPin, Edit } from 'lucide-react';
import Badge from './Badge';
import Button from './Button';

/**
 * getStatusColor - Helper untuk mendapatkan warna status
 */
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

/**
 * getRoleColor - Helper untuk mendapatkan warna role
 */
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

/**
 * StaffCard Component - Card untuk menampilkan informasi staff/doctor
 * 
 * @param {Object} staff - Data staff
 * @param {function} onViewProfile - Handler saat tombol View Profile diklik
 * @param {function} onEdit - Handler saat tombol Edit diklik
 */
export default function StaffCard({ staff, onViewProfile, onEdit }) {
    const statusStyle = getStatusColor(staff.status);
    const roleStyle = getRoleColor(staff.role);

    return (
        <div className="med-staff-card">
            {/* Header dengan image dan status */}
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

            {/* Body dengan informasi staff */}
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

                {/* Detail informasi kontak */}
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

            {/* Footer dengan action buttons */}
            <div className="med-staff-card__footer">
                <button
                    className="med-staff-card__btn med-staff-card__btn--view"
                    onClick={() => onViewProfile?.(staff)}
                >
                    View Profile
                </button>
                <button
                    className="med-staff-card__btn med-staff-card__btn--edit"
                    onClick={() => onEdit?.(staff)}
                >
                    <Edit size={16} />
                </button>
            </div>
        </div>
    );
}
