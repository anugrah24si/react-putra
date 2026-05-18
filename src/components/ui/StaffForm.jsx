import { X } from 'lucide-react';
import { Input, Select } from '../form';
import Button from './Button';

/**
 * StaffForm Component - Form modal untuk add/edit staff
 * 
 * @param {string} title - Judul form
 * @param {Object} form - Data form
 * @param {function} onChange - Handler saat input berubah
 * @param {function} onSubmit - Handler saat form disubmit
 * @param {function} onClose - Handler saat form ditutup
 * @param {string} submitLabel - Label tombol submit
 */
export default function StaffForm({
    title,
    form,
    onChange,
    onSubmit,
    onClose,
    submitLabel = 'Add Staff'
}) {
    const ROLES = ['Doctor', 'Nurse', 'Therapist', 'Receptionist'];
    const STATUSES = ['Active', 'On Leave'];

    return (
        <div className="med-overlay" role="dialog" aria-modal="true">
            <div className="med-modal">
                {/* Header */}
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

                {/* Form Body */}
                <form className="med-modal__body" onSubmit={onSubmit}>
                    {/* Name and Role */}
                    <div className="med-grid-2">
                        <Input
                            label="Full Name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            required
                            placeholder="e.g., Dr. Amelia Chen"
                        />
                        <Select
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={onChange}
                            required
                            options={ROLES}
                            placeholder="Select Role"
                        />
                    </div>

                    {/* Specialization */}
                    <Input
                        label="Specialization"
                        name="specialization"
                        value={form.specialization}
                        onChange={onChange}
                        required
                        placeholder="e.g., Dermatology & Aesthetic Medicine"
                    />

                    {/* Email and Phone */}
                    <div className="med-grid-2">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            required
                            placeholder="name@clinic.com"
                        />
                        <Input
                            label="Phone"
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            required
                            placeholder="+62 812-3456-7890"
                        />
                    </div>

                    {/* Schedule and Location */}
                    <div className="med-grid-2">
                        <Input
                            label="Schedule"
                            name="schedule"
                            value={form.schedule}
                            onChange={onChange}
                            required
                            placeholder="Mon - Fri, 09:00 - 17:00"
                        />
                        <Input
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={onChange}
                            required
                            placeholder="e.g., Jakarta Central"
                        />
                    </div>

                    {/* Status */}
                    <Select
                        label="Status"
                        name="status"
                        value={form.status}
                        onChange={onChange}
                        options={STATUSES}
                    />

                    {/* Actions */}
                    <div className="med-modal__actions">
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {submitLabel}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
