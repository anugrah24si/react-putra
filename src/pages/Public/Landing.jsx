import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { services } from "@/data/services";
import { isLoggedIn } from "@/lib/auth";

/**
 * Landing - Halaman publik utama.
 * Berisi 3 bagian: Beranda (hero), Layanan (daftar layanan), dan Kontak.
 * Pengunjung bisa melihat layanan tanpa login, tetapi untuk MEMAKAI layanan
 * harus login terlebih dahulu.
 */
export default function Landing() {
    const navigate = useNavigate();

    /**
     * handleUseService - Saat user ingin memakai sebuah layanan.
     * Jika belum login → diarahkan ke halaman login.
     * Jika sudah login → tampilkan konfirmasi sederhana.
     */
    const handleUseService = (service) => {
        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }
        alert(`Terima kasih! Permintaan layanan "${service.name}" telah diterima.`);
    };

    return (
        <div>
            {/* ===================== BERANDA (HERO) ===================== */}
            <section id="beranda" className="border-b border-border">
                <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
                    <div className="flex flex-col gap-5">
                        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            Klinik Kecantikan & Kesehatan
                        </span>
                        <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
                            Rawat Diri Anda Bersama{" "}
                            <span className="text-primary">MediCare</span>
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Nikmati layanan perawatan kulit, wajah, dan kecantikan profesional
                            dengan tenaga ahli berpengalaman. Lihat layanan kami, dan login untuk
                            mulai memesan.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button size="lg" asChild>
                                <a href="#layanan">
                                    Lihat Layanan
                                    <ArrowRight className="ml-1.5 h-4 w-4" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="#kontak">Hubungi Kami</a>
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border">
                        <img
                            src="/img/clinik.jpg"
                            alt="MediCare Clinic"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* ===================== LAYANAN ===================== */}
            <section id="layanan" className="border-b border-border">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Layanan Kami</h2>
                        <p className="mt-2 text-muted-foreground">
                            Pilih layanan yang sesuai dengan kebutuhan Anda
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <Card key={service.id} className="overflow-hidden pt-0">
                                <div className="flex h-40 items-center justify-center bg-muted/40">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="h-32 w-32 object-contain"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle>{service.name}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg font-bold text-primary">{service.price}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => handleUseService(service)}>
                                        Gunakan Layanan
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== KONTAK ===================== */}
            <section id="kontak">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-foreground">Hubungi Kami</h2>
                        <p className="mt-2 text-muted-foreground">
                            Punya pertanyaan? Tim kami siap membantu Anda
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground">Email</h3>
                                <p className="text-sm text-muted-foreground">info@medicare.com</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground">Telepon</h3>
                                <p className="text-sm text-muted-foreground">+62 812-3456-7890</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground">Alamat</h3>
                                <p className="text-sm text-muted-foreground">Jakarta Central, Indonesia</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
