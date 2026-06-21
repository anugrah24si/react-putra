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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { customerNoteSchema } from "@/schemas/customerNoteSchema";
import { NOTE_CATEGORY_VALUES } from "@/data/noteCategories";

/**
 * CustomerNoteForm - Dialog form tambah/edit Customer Note (admin).
 * Memakai React Hook Form + Zod.
 *
 * @param {boolean} open
 * @param {function} onOpenChange
 * @param {Object} note - Note lama (mode edit) atau null (mode tambah)
 * @param {function} onSubmit - async ({ note_type, note_content, is_important }) => void
 */
export default function CustomerNoteForm({ open, onOpenChange, note, onSubmit }) {
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
        resolver: zodResolver(customerNoteSchema),
        defaultValues: { note_type: "Allergy", note_content: "", is_important: false },
    });

    // Isi form sesuai note (edit) atau kosong (tambah)
    useEffect(() => {
        reset({
            note_type: note?.note_type || "Allergy",
            note_content: note?.note_content || "",
            is_important: note?.is_important || false,
        });
    }, [note, open, reset]);

    const noteType = watch("note_type");
    const isImportant = watch("is_important");

    const submit = async (values) => {
        setSaving(true);
        setError("");
        try {
            await onSubmit(values);
            onOpenChange(false);
        } catch (err) {
            setError(err.message || "Gagal menyimpan catatan");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{note ? "Edit Catatan" : "Tambah Catatan"}</DialogTitle>
                    <DialogDescription>Catatan CRM untuk pelayanan lebih personal.</DialogDescription>
                </DialogHeader>

                {error ? (
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
                ) : null}

                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Kategori</Label>
                        <Select value={noteType} onValueChange={(v) => setValue("note_type", v, { shouldValidate: true })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                {NOTE_CATEGORY_VALUES.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.note_type ? <p className="text-xs text-destructive">{errors.note_type.message}</p> : null}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="note_content">Isi Catatan</Label>
                        <Textarea id="note_content" rows={4} placeholder="Contoh: Alergi terhadap produk Retinol" {...register("note_content")} />
                        {errors.note_content ? <p className="text-xs text-destructive">{errors.note_content.message}</p> : null}
                    </div>

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                        <input
                            type="checkbox"
                            checked={isImportant}
                            onChange={(e) => setValue("is_important", e.target.checked)}
                            className="h-4 w-4"
                        />
                        Tandai sebagai catatan penting
                    </label>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
                        <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Simpan"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
