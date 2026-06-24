import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KineticText } from "@/components/ui/kinetic-text";
import Reveal from "@/components/public/Reveal";
import { isLoggedIn } from "@/lib/auth";

/**
 * HeroSection - Bagian pembuka landing (above the fold).
 * Menyampaikan value utama + CTA daftar/booking dalam sekali pandang.
 */
export default function HeroSection() {
    const navigate = useNavigate();

    // CTA utama: jika sudah login arahkan ke dashboard member, jika belum ke register
    const handlePrimaryCta = () => {
        navigate(isLoggedIn() ? "/member" : "/register");
    };

    return (
        <section id="beranda" className="relative overflow-hidden border-b border-border">
            {/* Aksen latar lembut */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
                {/* Teks */}
                <Reveal className="flex flex-col gap-5">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Klinik Kecantikan &amp; Perawatan Profesional
                    </span>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                        <KineticText text="Rawat Kecantikan Anda Bersama" />{" "}
                        <KineticText text="LUMIVA" className="text-primary" />
                    </h1>

                    <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                        Layanan perawatan kulit & kecantikan oleh tenaga ahli berpengalaman.
                        Pesan mudah, pelayanan personal, dan nikmati keuntungan eksklusif sebagai member.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <Button
                            size="lg"
                            className="transition-transform hover:-translate-y-0.5"
                            onClick={handlePrimaryCta}
                        >
                            {isLoggedIn() ? "Buka Dashboard" : "Daftar Sekarang"}
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="transition-transform hover:-translate-y-0.5"
                            asChild
                        >
                            <a href="#layanan">Lihat Layanan</a>
                        </Button>
                    </div>
                </Reveal>

                {/* Visual */}
                <Reveal delay={150} className="group relative overflow-hidden rounded-3xl border border-border shadow-sm">
                    <img
                        src="/img/clinik.jpg"
                        alt="Suasana LUMIVA Beauty Clinic"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="eager"
                    />
                </Reveal>
            </div>
        </section>
    );
}
