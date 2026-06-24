import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/BrandLogo";

/**
 * NotFound - Halaman 404 dengan desain modern selaras tema brand LUMIVA.
 */
export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
            {/* Aksen latar lembut */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Logo */}
            <BrandLogo className="mb-8" />

            {/* Angka 404 */}
            <h1 className="bg-gradient-to-b from-primary to-emerald-600 bg-clip-text text-8xl font-extrabold tracking-tighter text-transparent md:text-9xl">
                404
            </h1>

            <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">
                Halaman Tidak Ditemukan
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
                Yuk kembali ke beranda untuk melanjutkan.
            </p>

            {/* Tombol aksi */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={() => navigate("/")}>
                    <Home className="mr-1.5 h-4 w-4" />
                    Kembali ke Beranda
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Halaman Sebelumnya
                </Button>
            </div>

            <p className="mt-10 text-xs text-muted-foreground">
                Butuh bantuan? Hubungi kami di{" "}
                <a
                    href="https://wa.me/6282225546502"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                >
                    WhatsApp
                </a>
            </p>
        </div>
    );
}
