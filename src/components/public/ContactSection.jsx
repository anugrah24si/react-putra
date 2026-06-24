import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import Reveal from "@/components/public/Reveal";

/**
 * ContactSection - Informasi kontak klinik (email, WhatsApp, alamat) dengan
 * efek MagicCard. Setiap item dapat diklik langsung (email, chat WA, buka peta).
 */
export default function ContactSection() {
    return (
        <section id="kontak" className="border-b border-border">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                <Reveal className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Hubungi Kami</h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Punya pertanyaan? Tim kami siap membantu Anda
                    </p>
                </Reveal>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Email */}
                    <Reveal delay={0}>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=anugrah24si@mahasiswa.pcr.ac.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                        >
                            <Card className="h-full border-none p-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                                <MagicCard className="h-full rounded-xl">
                                    <div className="flex h-full flex-col items-center gap-3 p-8 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground">Email</h3>
                                        <span className="text-sm text-muted-foreground transition-colors hover:text-primary">
                                            anugrah24si@mahasiswa.pcr.ac.id
                                        </span>
                                    </div>
                                </MagicCard>
                            </Card>
                        </a>
                    </Reveal>

                    {/* WhatsApp */}
                    <Reveal delay={100}>
                        <a
                            href="https://wa.me/6282225546502"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                        >
                            <Card className="h-full border-none p-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                                <MagicCard className="h-full rounded-xl">
                                    <div className="flex h-full flex-col items-center gap-3 p-8 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground">Telepon / WhatsApp</h3>
                                        <span className="text-sm text-muted-foreground transition-colors hover:text-primary">
                                            +62 822-2554-6502
                                        </span>
                                    </div>
                                </MagicCard>
                            </Card>
                        </a>
                    </Reveal>

                    {/* Alamat */}
                    <Reveal delay={200}>
                        <a
                            href="https://maps.app.goo.gl/cb5VXSQVyEnNopfSA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                        >
                            <Card className="h-full border-none p-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                                <MagicCard className="h-full rounded-xl">
                                    <div className="flex h-full flex-col items-center gap-3 p-8 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-foreground">Alamat</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Rumbai Central, Pekanbaru, Riau
                                        </p>
                                    </div>
                                </MagicCard>
                            </Card>
                        </a>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
