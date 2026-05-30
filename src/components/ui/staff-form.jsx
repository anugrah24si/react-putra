import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

const ROLES = ['Doctor', 'Nurse', 'Therapist', 'Receptionist']
const STATUSES = ['Active', 'On Leave']

/**
 * StaffForm Component - Form modal untuk add/edit staff
 * Menggunakan shadcn Dialog, Input, Select, Button
 * 
 * @param {boolean} open - Status modal terbuka/tertutup
 * @param {function} onOpenChange - Handler saat status modal berubah
 * @param {string} title - Judul form
 * @param {Object} form - Data form
 * @param {function} onChange - Handler saat input berubah
 * @param {function} onSubmit - Handler saat form disubmit
 * @param {string} submitLabel - Label tombol submit
 */
export function StaffForm({
    open,
    onOpenChange,
    title,
    form,
    onChange,
    onSubmit,
    submitLabel = 'Add Staff'
}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(e)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Fill in the information below to {submitLabel.toLowerCase()}.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Full Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                required
                                placeholder="e.g., Dr. Amelia Chen"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">
                                Role <span className="text-destructive">*</span>
                            </Label>
                            <Select name="role" value={form.role} onValueChange={(value) => onChange({ target: { name: 'role', value } })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ROLES.map(r => (
                                        <SelectItem key={r} value={r}>{r}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="specialization">
                            Specialization <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="specialization"
                            name="specialization"
                            value={form.specialization}
                            onChange={onChange}
                            required
                            placeholder="e.g., Dermatology & Aesthetic Medicine"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={onChange}
                                required
                                placeholder="name@clinic.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">
                                Phone <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={onChange}
                                required
                                placeholder="+62 812-3456-7890"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="schedule">
                                Schedule <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="schedule"
                                name="schedule"
                                value={form.schedule}
                                onChange={onChange}
                                required
                                placeholder="Mon - Fri, 09:00 - 17:00"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">
                                Location <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="location"
                                name="location"
                                value={form.location}
                                onChange={onChange}
                                required
                                placeholder="e.g., Jakarta Central"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" value={form.status} onValueChange={(value) => onChange({ target: { name: 'status', value } })}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUSES.map(s => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
