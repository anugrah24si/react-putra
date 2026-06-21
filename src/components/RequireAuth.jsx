import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/lib/auth";

/**
 * RequireAuth - Guard untuk halaman yang wajib login (semua role).
 * Jika belum login → diarahkan ke /login.
 *
 * @param {ReactNode} children - Konten yang dilindungi
 */
export default function RequireAuth({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
