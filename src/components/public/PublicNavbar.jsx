import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, isAdmin, logout } from "@/lib/auth";

/**
 * PublicNavbar - Navbar untuk halaman publik (Landing).
 * Berisi link Beranda, Layanan, Kontak, tombol tema, dan status login.
 *
 * @param {string} theme - Tema saat ini ('dark'/'light')
 * @param {function} onToggleTheme - Handler ganti tema
 */
export default function PublicNavbar({ theme, onToggleTheme }) {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = getCurrentUser();

    // Link publik ke section di halaman (pakai "/#..." agar bisa diklik dari
    // halaman mana pun, termasuk dari dashboard member → kembali ke landing).
    const navLinks = [
        { label: "Beranda", href: "/#beranda" },
        { label: "Layanan", href: "/#layanan" },
        { label: "Kontak", href: "/#kontak" },
    ];

    // Path dashboard sesuai role (untuk link "Dashboard" di navbar member)
    const dashboardPath = isAdmin() ? "/admin" : "/member";

    // Handler logout lalu refresh ke beranda
    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <img src="/img/logo.png" alt="MediCare" className="h-6 w-6 object-contain" />
                    </div>
                    <span className="text-lg font-bold text-foreground">MediCare</span>
                </Link>

                {/* Link desktop */}
                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {link.label}
                        </a>
                    ))}
                    {/* Link Dashboard otomatis muncul di samping Kontak saat login */}
                    {user ? (
                        <Link
                            to={dashboardPath}
                            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                            Dashboard
                        </Link>
                    ) : null}
                </div>

                {/* Aksi kanan (desktop) */}
                <div className="hidden items-center gap-2 md:flex">
                    <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Ganti tema">
                        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    {user ? (
                        <>
                            <span className="text-sm font-medium text-foreground">
                                Hi, {user.full_name?.split(" ")[0]}
                            </span>
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className="mr-1.5 h-4 w-4" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                                Login
                            </Button>
                            <Button size="sm" onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </>
                    )}
                </div>

                {/* Tombol menu mobile */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            {/* Menu mobile */}
            {mobileOpen && (
                <div className="border-t border-border bg-background px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                        {/* Link Dashboard di samping Kontak (mobile) saat login */}
                        {user ? (
                            <Link
                                to={dashboardPath}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm font-medium text-primary hover:text-primary/80"
                            >
                                Dashboard
                            </Link>
                        ) : null}

                        <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                            <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Ganti tema">
                                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            </Button>

                            {user ? (
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                                        Login
                                    </Button>
                                    <Button size="sm" onClick={() => navigate("/register")}>
                                        Register
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
