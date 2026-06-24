import { Link } from "react-router-dom";
import { Globe, Phone, Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

/**
 * PublicFooter - Footer halaman publik.
 * Berisi brand, navigasi, kontak, social link, dan informasi legal.
 */
export default function PublicFooter() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2">
                            <BrandLogo />
                        </Link>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                            Klinik kecantikan & perawatan profesional. Rawat diri Anda bersama tim ahli
                            kami untuk hasil yang sehat dan memuaskan.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-foreground">Navigasi</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/#beranda" className="transition-colors hover:text-foreground">Beranda</a></li>
                            <li><a href="/#layanan" className="transition-colors hover:text-foreground">Layanan</a></li>
                            <li><a href="/#membership" className="transition-colors hover:text-foreground">Membership</a></li>
                            <li><a href="/#kontak" className="transition-colors hover:text-foreground">Kontak</a></li>
                        </ul>
                    </div>

                    {/* Kontak & Social */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-foreground">Terhubung</h4>
                        <div className="flex gap-3">
                            <a
                                href="https://wa.me/6282225546502"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <Phone className="h-4 w-4" />
                            </a>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=anugrah24si@mahasiswa.pcr.ac.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Email"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <Mail className="h-4 w-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                                <Globe className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bawah: legal */}
                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
                    <p>© {year} LUMIVA Beauty Clinic. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span className="transition-colors hover:text-foreground">Kebijakan Privasi</span>
                        <span className="transition-colors hover:text-foreground">Syarat &amp; Ketentuan</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
