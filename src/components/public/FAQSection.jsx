import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import Reveal from "@/components/public/Reveal";

/**
 * Daftar pertanyaan umum (FAQ) untuk menghilangkan keraguan calon pelanggan.
 */
const faqs = [
    {
        q: "Bagaimana cara memesan layanan?",
        a: "Cukup daftar/login sebagai member, pilih layanan yang diinginkan di halaman Booking, lalu tentukan tanggalnya. Tim kami akan mengonfirmasi pesanan Anda.",
    },
    {
        q: "Apakah harus menjadi member untuk memesan?",
        a: "Anda bisa melihat seluruh layanan tanpa login. Namun untuk memesan, Anda perlu mendaftar (gratis) agar pesanan dan riwayat perawatan tersimpan rapi.",
    },
    {
        q: "Apa manfaat menjadi member?",
        a: "Member mendapatkan poin di setiap transaksi, akses voucher & promo, serta benefit yang meningkat seiring naiknya level membership (Bronze hingga Diamond).",
    },
    {
        q: "Apakah produk dan perawatan aman?",
        a: "Ya. Kami menggunakan produk yang teruji dan aman, serta ditangani oleh tenaga profesional yang berpengalaman.",
    },
    {
        q: "Bagaimana data pribadi saya dijaga?",
        a: "Data Anda hanya digunakan untuk keperluan layanan klinik dan tidak dibagikan ke pihak yang tidak berkepentingan.",
    },
];

/**
 * FAQSection - Accordion FAQ sederhana (buka/tutup) tanpa library tambahan.
 */
export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (index) => {
        setOpenIndex((current) => (current === index ? -1 : index));
    };

    return (
        <section id="faq" className="border-b border-border bg-muted/30">
            <div className="mx-auto max-w-3xl px-4 py-16 md:py-20">
                <Reveal className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Pertanyaan Umum
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Hal-hal yang sering ditanyakan sebelum memesan layanan
                    </p>
                </Reveal>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <Reveal key={faq.q} delay={index * 60}>
                                <Card className="overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => toggle(index)}
                                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-medium text-foreground">{faq.q}</span>
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {isOpen ? (
                                        <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                                            {faq.a}
                                        </div>
                                    ) : null}
                                </Card>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
