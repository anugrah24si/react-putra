import { Mail, Phone, Clock, MapPin } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "./dialog"
import { Button } from "./button"
import { Badge } from "./badge"
import { Separator } from "./separator"
import { getStatusColor, getRoleColor } from './staff-card'

/**
 * StaffProfileModal Component - Modal untuk menampilkan detail profile staff
 * Menggunakan shadcn Dialog, Badge, Button
 * 
 * @param {Object} staff - Data staff
 * @param {boolean} isOpen - Status modal terbuka/tertutup
 * @param {function} onClose - Handler saat modal ditutup
 * @param {function} onEdit - Handler saat tombol Edit diklik
 */
export function StaffProfileModal({ staff, isOpen, onClose, onEdit }) {
    if (!staff) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-start gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
                            <img
                                src={staff.image}
                                alt={staff.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <h2 className="text-2xl font-bold">{staff.name}</h2>
                            <p className="text-muted-foreground">{staff.specialization}</p>
                            <div className="flex gap-2">
                                <Badge variant={getStatusColor(staff.status)}>
                                    {staff.status}
                                </Badge>
                                <Badge variant={getRoleColor(staff.role)}>
                                    {staff.role}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3 font-semibold">Contact Information</h3>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{staff.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="text-sm text-muted-foreground">{staff.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="mb-3 font-semibold">Work Information</h3>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Schedule</p>
                                    <p className="text-sm text-muted-foreground">{staff.schedule}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">Location</p>
                                    <p className="text-sm text-muted-foreground">{staff.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="mb-3 font-semibold">Additional Details</h3>
                        <div className="grid gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Staff ID:</span>
                                <span className="font-medium">{staff.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Role:</span>
                                <span className="font-medium">{staff.role}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Specialization:</span>
                                <span className="font-medium">{staff.specialization}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className="font-medium">{staff.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={() => onEdit?.(staff)}>
                        Edit Profile
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
