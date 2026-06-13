import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "@/lib/auth";

/**
 * RequireAdmin - Komponen penjaga (guard) untuk halaman admin.
 * - Jika belum login → diarahkan ke /login
 * - Jika login tapi bukan admin → diarahkan ke / (halaman publik)
 * - Jika admin → tampilkan kontennya
 *
 * @param {ReactNode} children - Konten yang dilindungi
 */
export default function RequireAdmin({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/" replace />;
    }

    return children;
}
