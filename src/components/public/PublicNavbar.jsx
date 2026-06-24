import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import BrandLogo from "@/components/BrandLogo";
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
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    // Section yang sedang tampil di layar (untuk menandai link aktif/bold)
    const [activeSection, setActiveSection] = useState("beranda");
    const user = getCurrentUser();

    // Hanya halaman landing ("/") yang punya section untuk scroll-spy
    const isLanding = location.pathname === "/";

    // Link publik ke section di halaman (pakai "/#..." agar bisa diklik dari
    // halaman mana pun, termasuk dari dashboard member → kembali ke landing).
    const navLinks = [
        { label: "Beranda", href: "/#beranda" },
        { label: "Layanan", href: "/#layanan" },
        { label: "Kontak", href: "/#kontak" },
    ];

    // Path dashboard sesuai role (untuk link "Dashboard" di navbar member)
    const dashboardPath = isAdmin() ? "/admin" : "/member";
    // Dashboard dianggap aktif bila sedang berada di rute dashboard (mis. /member)
    const dashboardActive = location.pathname.startsWith(dashboardPath);

    // Scroll-spy: pantau section landing yang sedang tampil → tandai link aktif.
    // Hanya berjalan di halaman landing; di rute lain tidak ada section yang aktif.
    useEffect(() => {
        if (!isLanding) {
            setActiveSection("");
            return;
        }
        const ids = navLinks.map((l) => l.href.split("#")[1]);
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            // Aktif saat section berada di sekitar bagian tengah viewport
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLanding]);

    // Kelas link nav sesuai status aktif (bold + terang bila section sedang dilihat)
    const navLinkClass = (sectionId) =>
        `text-sm transition-colors ${isLanding && activeSection === sectionId
            ? "font-bold text-foreground"
            : "font-medium text-muted-foreground hover:text-foreground"
        }`;

    // Kelas khusus link Dashboard (bold bila sedang di rute dashboard)
    const dashboardLinkClass = `text-sm transition-colors ${dashboardActive
        ? "font-bold text-foreground"
        : "font-medium text-muted-foreground hover:text-foreground"
        }`;

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
                    <BrandLogo />
                </Link>

                {/* Link desktop */}
                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={navLinkClass(link.href.split("#")[1])}
                        >
                            {link.label}
                        </a>
                    ))}
                    {/* Link Dashboard otomatis muncul di samping Kontak saat login */}
                    {user ? (
                        <Link
                            to={dashboardPath}
                            className={dashboardLinkClass}
                        >
                            Dashboard
                        </Link>
                    ) : null}
                </div>

                {/* Aksi kanan (desktop) */}
                <div className="hidden items-center gap-2 md:flex">
                    <AnimatedThemeToggler
                        theme={theme}
                        onToggleTheme={onToggleTheme}
                        className="h-9 w-9 rounded-md text-foreground hover:bg-accent"
                    />

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
                                className={navLinkClass(link.href.split("#")[1])}
                            >
                                {link.label}
                            </a>
                        ))}
                        {/* Link Dashboard di samping Kontak (mobile) saat login */}
                        {user ? (
                            <Link
                                to={dashboardPath}
                                onClick={() => setMobileOpen(false)}
                                className={dashboardLinkClass}
                            >
                                Dashboard
                            </Link>
                        ) : null}

                        <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
                            <AnimatedThemeToggler
                                theme={theme}
                                onToggleTheme={onToggleTheme}
                                className="h-9 w-9 rounded-md text-foreground hover:bg-accent"
                            />

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
