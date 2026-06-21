import { useEffect, useMemo, useState } from "react";
import { Plus, Star, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CustomerNoteForm from "./CustomerNoteForm";
import { getCategoryColor } from "@/data/noteCategories";
import { computeNoteStats } from "@/utils/customerNote";
import { getCurrentUser } from "@/lib/auth";
import { getNotesByUser, createNote, updateNote, deleteNote } from "@/services/customerNoteService";

/**
 * CustomerNotes - Tab Customer Notes di halaman Detail Member.
 * Menampilkan summary statistik + daftar catatan (penting di atas) + CRUD.
 *
 * @param {string} userId - ID member yang sedang dilihat
 */
export default function CustomerNotes({ userId }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    async function load() {
        if (!userId) return;
        setLoading(true);
        setError("");
        try {
            setNotes(await getNotesByUser(userId));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    // Statistik (dipakai ulang di Tahap 8 via computeNoteStats)
    const stats = useMemo(() => computeNoteStats(notes), [notes]);

    function openAdd() {
        setEditingNote(null);
        setFormOpen(true);
    }

    function openEdit(note) {
        setEditingNote(note);
        setFormOpen(true);
    }

    async function handleSubmit(values) {
        if (editingNote) {
            await updateNote(editingNote.id, values);
        } else {
            const admin = getCurrentUser();
            await createNote({ ...values, user_id: userId, created_by: admin?.id || null });
        }
        await load();
    }

    async function handleDelete(note) {
        if (!window.confirm("Hapus catatan ini?")) return;
        try {
            await deleteNote(note.id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total Notes</p><p className="text-2xl font-bold text-foreground">{stats.total}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Penting</p><p className="text-2xl font-bold text-foreground">{stats.important}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Allergy</p><p className="text-2xl font-bold text-foreground">{stats.byCategory["Allergy"]}</p></CardContent></Card>
                <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Medical Warning</p><p className="text-2xl font-bold text-foreground">{stats.byCategory["Medical Warning"]}</p></CardContent></Card>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Daftar Catatan</h3>
                <Button size="sm" onClick={openAdd}>
                    <Plus className="mr-1.5 h-4 w-4" /> Tambah Catatan
                </Button>
            </div>

            {error ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>
            ) : null}

            {/* Daftar catatan (penting otomatis di atas dari service) */}
            {loading ? (
                <p className="text-sm text-muted-foreground">Memuat...</p>
            ) : notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada catatan untuk member ini.</p>
            ) : (
                <div className="space-y-3">
                    {notes.map((note) => (
                        <Card key={note.id} className={note.is_important ? "border-rose-500/40" : ""}>
                            <CardContent className="flex items-start justify-between gap-3 p-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(note.note_type)}`}>
                                            {note.note_type}
                                        </span>
                                        {note.is_important ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                                                <Star className="h-3 w-3 fill-current" /> Penting
                                            </span>
                                        ) : null}
                                    </div>
                                    <p className="text-sm text-foreground">{note.note_content}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(note.created_at).toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <div className="flex shrink-0 gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => openEdit(note)} aria-label="Edit">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(note)} aria-label="Hapus">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <CustomerNoteForm open={formOpen} onOpenChange={setFormOpen} note={editingNote} onSubmit={handleSubmit} />
        </div>
    );
}
