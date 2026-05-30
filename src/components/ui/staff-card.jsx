import { Mail, Phone, Clock, MapPin, Edit, Eye, MoreVertical, Trash2, UserCog } from 'lucide-react'
import { Card } from "./card"
import { Badge } from "./badge"
import { Button } from "./button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu"

/**
 * getStatusColor - Helper untuk mendapatkan warna status badge
 */
export const getStatusColor = (status) => {
    switch (status) {
        case 'Active':
            return 'default'
        case 'On Leave':
            return 'secondary'
        default:
            return 'outline'
    }
}

/**
 * getRoleColor - Helper untuk mendapatkan warna role badge
 */
export const getRoleColor = (role) => {
    switch (role) {
        case 'Doctor':
            return 'default'
        case 'Nurse':
            return 'secondary'
        case 'Therapist':
            return 'outline'
        default:
            return 'outline'
    }
}

/**
 * StaffCard Component - Card vertikal untuk menampilkan informasi staff/doctor
 * Layout vertikal dengan foto di atas seperti screenshot
 * Dark mode: Background hitam solid
 * 
 * @param {Object} staff - Data staff
 * @param {function} onViewProfile - Handler saat tombol View Profile diklik
 * @param {function} onEdit - Handler saat tombol Edit diklik
 * @param {function} onDelete - Handler saat tombol Delete diklik
 */
export function StaffCard({ staff, onViewProfile, onEdit, onDelete }) {
    return (
        <Card className="relative w-full overflow-hidden border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0d0d0d]">
            {/* Header dengan Foto dan Badge Status */}
            <div className="relative bg-gray-100 p-4 dark:bg-[#0d0d0d]">
                {/* Badge Status di pojok kanan atas */}
                <div className="absolute right-3 top-3 z-10">
                    <Badge variant={getStatusColor(staff.status)} className="text-xs">
                        {staff.status}
                    </Badge>
                </div>

                {/* Foto Profil - Center */}
                <div className="flex justify-center">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 dark:border-white/10">
                        <img
                            src={staff.image}
                            alt={staff.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Body - Info Staff */}
            <div className="space-y-2 p-4">
                {/* Nama & Spesialisasi */}
                <div className="text-center">
                    <h3 className="text-base font-semibold leading-tight text-gray-900 dark:text-white">
                        {staff.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {staff.specialization}
                    </p>
                </div>

                {/* Role Badge - Center */}
                <div className="flex justify-center">
                    <Badge variant={getRoleColor(staff.role)} className="text-xs">
                        {staff.role}
                    </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-1.5 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{staff.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="h-3.5 w-3.5 shrink-0" />
                        <span>{staff.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span>{staff.location}</span>
                    </div>
                </div>
            </div>

            {/* Footer dengan Buttons */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-[#0d0d0d]">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                    onClick={() => onViewProfile?.(staff)}
                >
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    View
                </Button>

                {/* Dropdown Menu for More Actions */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0 dark:text-white dark:hover:bg-white/10"
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onViewProfile?.(staff)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(staff)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Manage Schedule</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => onDelete?.(staff)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Staff</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )
}
