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
import StarRating from "./StarRating";
import { reviewSchema } from "@/schemas/reviewSchema";

/**
 * ReviewForm - Dialog form untuk member memberi / mengedit review.
 * Memakai React Hook Form + Zod.
 *
 * @param {boolean} open
 * @param {function} onOpenChange
 * @param {Object} booking - Booking (Completed) yang akan direview
 * @param {Object} existingReview - Review lama (jika mode edit)
 * @param {function} onSubmit - async ({ rating, comment }) => void
 */
export default function ReviewForm({ open, onOpenChange, booking, existingReview, onSubmit }) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 0, comment: "" },
    });

    // Isi form sesuai review lama (edit) atau kosong (baru)
    useEffect(() => {
        reset({
            rating: existingReview?.rating || 0,
            comment: existingReview?.comment || "",
        });
    }, [existingReview, open, reset]);

    const rating = watch("rating");

    const submit = async (values) => {
        setSaving(true);
        setError("");
        try {
            await onSubmit(values);
            onOpenChange(false);
        } catch (err) {
            setError(err.message || "Gagal menyimpan review");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{existingReview ? "Edit Review" : "Beri Review"}</DialogTitle>
                    <DialogDescription>
                        {booking?.service_name} · {booking?.booking_date}
                    </DialogDescription>
                </DialogHeader>

                {error ? (
                    <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Rating</Label>
                        <StarRating value={rating} onChange={(v) => setValue("rating", v, { shouldValidate: true })} size="h-7 w-7" />
                        {errors.rating ? <p className="text-xs text-destructive">{errors.rating.message}</p> : null}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="comment">Ulasan (opsional)</Label>
                        <Textarea id="comment" rows={4} placeholder="Bagaimana pengalaman kamu?" {...register("comment")} />
                        {errors.comment ? <p className="text-xs text-destructive">{errors.comment.message}</p> : null}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
                        <Button type="submit" disabled={saving}>{saving ? "Menyimpan..." : "Kirim"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
