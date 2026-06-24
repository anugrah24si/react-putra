import { useNavigate } from "react-router-dom";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import Reveal from "@/components/public/Reveal";
import { MEMBERSHIP_LEVELS } from "@/data/membershipLevels";
import { isLoggedIn } from "@/lib/auth";

/**
 * MembershipSection - Menjelaskan program membership & benefitnya.
 * Tujuan utama: mendorong pengunjung untuk registrasi member.
 */
export default function MembershipSection() {
    const navigate = useNavigate();

    return (
        <section id="membership" className="border-b border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
                <Reveal className="mb-12 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Crown className="h-3.5 w-3.5" />
                        Program Membership
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Jadi Member, Dapat Lebih
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                        Daftar gratis &amp; mulai dari level Bronze. Kumpulkan poin di setiap transaksi
                        dan naik level untuk benefit yang lebih besar.
                    </p>
                </Reveal>

                {/* Daftar tier */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {MEMBERSHIP_LEVELS.map((level, index) => (
                        <Reveal key={level.name} delay={index * 70}>
                            <Card className="h-full border-none p-0 shadow-none transition-transform duration-300 hover:-translate-y-1">
                                <MagicCard className="h-full rounded-xl">
                                    <div className="flex h-full flex-col gap-4 p-6">
                                        <div>
                                            <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${level.color}`}>
                                                <Crown className="h-3 w-3" />
                                                {level.name}
                                            </span>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {level.minPoints === 0 ? "Mulai gratis" : `Mulai ${level.minPoints} poin`}
                                            </p>
                                        </div>
                                        <ul className="space-y-2">
                                            {level.benefits.map((benefit) => (
                                                <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </MagicCard>
                            </Card>
                        </Reveal>
                    ))}
                </div>

                {/* CTA daftar */}
                <Reveal className="mt-10 text-center">
                    <Button
                        size="lg"
                        className="transition-transform hover:-translate-y-0.5"
                        onClick={() => navigate(isLoggedIn() ? "/member" : "/register")}
                    >
                        {isLoggedIn() ? "Lihat Membership Saya" : "Daftar Gratis Sekarang"}
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
