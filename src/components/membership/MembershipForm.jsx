import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { membershipSchema } from "@/schemas/membershipSchema";
import { MEMBERSHIP_LEVEL_NAMES } from "@/data/membershipLevels";
import { updateMembership } from "@/services/membershipService";

/**
 * MembershipForm - Dialog form untuk admin mengubah membership user.
 * Menggunakan React Hook Form + Zod untuk validasi.
 *
 * @param {boolean} open - Status dialog terbuka
 * @param {function} onOpenChange - Handler buka/tutup dialog
 * @param {Object} member - Data user yang akan diubah membership-nya
 * @param {function} onSuccess - Callback setelah update berhasil (refresh data)
 */
export default function MembershipForm({ open, onOpenChange, member, onSuccess }) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(membershipSchema),
        defaultValues: { membership_level: "Bronze", points: 0 },
    });

    // Isi form dengan data member saat dialog dibuka
    useEffect(() => {
        if (member) {
            reset({
                membership_level: member.membership_level || "Bronze",
                points: member.points ?? 0,
            });
        }
    }, [member, reset]);

    // Simpan perubahan ke Supabase
    const onSubmit = async (values) => {
        if (!member) return;
        setSaving(true);
        setError("");
        try {
            await updateMembership(member.id, values);
            onOpenChange(false);
            onSuccess?.();
        } catch (err) {
            setError(err.message || "Gagal menyimpan membership");
        } finally {
            setSaving(false);
        }
    };

    const selectedLevel = watch("membership_level");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Kelola Membership</DialogTitle>
                    <DialogDescription>
                        Ubah level dan poin membership untuk {member?.full_name}.
                    </DialogDescription>
                </DialogHeader>

                {error ? (
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Level Membership */}
                    <div className="grid gap-2">
                        <Label htmlFor="membership_level">Level Membership</Label>
                        <Select
                            value={selectedLevel}
                            onValueChange={(val) => setValue("membership_level", val, { shouldValidate: true })}
                        >
                            <SelectTrigger id="membership_level">
                                <SelectValue placeholder="Pilih level" />
                            </SelectTrigger>
                            <SelectContent>
                                {MEMBERSHIP_LEVEL_NAMES.map((name) => (
                                    <SelectItem key={name} value={name}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.membership_level ? (
                            <p className="text-xs text-destructive">{errors.membership_level.message}</p>
                        ) : null}
                    </div>

                    {/* Poin */}
                    <div className="grid gap-2">
                        <Label htmlFor="points">Poin</Label>
                        <Input
                            id="points"
                            type="number"
                            min={0}
                            {...register("points")}
                        />
                        {errors.points ? (
                            <p className="text-xs text-destructive">{errors.points.message}</p>
                        ) : null}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
