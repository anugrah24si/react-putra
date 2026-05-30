import { Mail, Phone, Clock, MapPin, Edit, Eye, MoreVertical, Trash2, UserCog } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription, CardAction } from "./card"
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
 * StaffCard Component - Card untuk menampilkan informasi staff/doctor
 * Menggunakan struktur Card component dengan CardAction dan CardDescription
 * Dark mode: Background hitam solid
 * Dropdown menu untuk actions (View, Edit, Delete)
 * 
 * @param {Object} staff - Data staff
 * @param {function} onViewProfile - Handler saat tombol View Profile diklik
 * @param {function} onEdit - Handler saat tombol Edit diklik
 * @param {function} onDelete - Handler saat tombol Delete diklik
 */
export function StaffCard({ staff, onViewProfile, onEdit, onDelete }) {
    return (
        <Card className="relative mx-auto w-full border border-gray-200 bg-white pt-0 dark:border-white/10 dark:bg-[#0d0d0d]">
            {/* Image dengan overlay */}
            <div className="relative">
                <div className="flex justify-center bg-gray-100 py-4 dark:bg-[#0d0d0d]">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 dark:border-white/10">
                        <img
                            src={staff.image}
                            alt={staff.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <CardHeader>
                <CardAction>
                    <Badge variant={getStatusColor(staff.status)}>
                        {staff.status}
                    </Badge>
                </CardAction>
                <CardTitle className="dark:text-white">{staff.name}</CardTitle>
                <CardDescription className="dark:text-gray-400">
                    {staff.specialization}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <Badge variant={getRoleColor(staff.role)} className="w-fit">
                    {staff.role}
                </Badge>

                <div className="space-y-1.5 text-xs">
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
            </CardContent>

            <CardFooter className="gap-2 dark:border-white/10 dark:bg-[#0d0d0d]">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
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
                            className="dark:text-white dark:hover:bg-white/10"
                        >
                            <MoreVertical className="h-3.5 w-3.5" />
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
            </CardFooter>
        </Card>
    )
}
