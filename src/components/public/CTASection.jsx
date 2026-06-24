import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/public/Reveal";
import { isLoggedIn } from "@/lib/auth";

/**
 * CTASection - Ajakan akhir yang kuat untuk mendorong registrasi/booking.
 */
export default function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-12 text-center md:px-12 md:py-16">
                        {/* Aksen latar */}
                        <div className="pointer-events-none absolute inset-0 -z-10">
                            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                        </div>

                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                            Siap Merawat Diri Anda Hari Ini?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                            Daftar gratis, nikmati promo member baru, dan pesan perawatan favorit Anda
                            dalam hitungan menit.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Button
                                size="lg"
                                className="transition-transform hover:-translate-y-0.5"
                                onClick={() => navigate(isLoggedIn() ? "/member/bookings" : "/register")}
                            >
                                {isLoggedIn() ? "Booking Sekarang" : "Daftar Sekarang"}
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="transition-transform hover:-translate-y-0.5"
                                asChild
                            >
                                <a href="#kontak">Hubungi Kami</a>
                            </Button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
