import { Crown, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MembershipBadge from "./MembershipBadge";
import { getLevelConfig, getNextLevel, getProgressToNextLevel } from "@/utils/membership";

/**
 * MembershipCard - Kartu yang menampilkan ringkasan membership user:
 * level sekarang, poin, progress menuju level berikutnya, dan benefit.
 *
 * @param {Object} membership - { membership_level, points, full_name }
 */
export default function MembershipCard({ membership }) {
    const level = membership?.membership_level || "Bronze";
    const points = membership?.points ?? 0;

    const config = getLevelConfig(level);
    const next = getNextLevel(level);
    const progress = getProgressToNextLevel(points, level);

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-primary" />
                        Membership Saya
                    </CardTitle>
                    <MembershipBadge level={level} />
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* Poin */}
                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-2xl font-bold text-foreground">{points}</span>
                    <span className="text-sm text-muted-foreground">poin</span>
                </div>

                {/* Progress menuju level berikutnya */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Level {level}</span>
                        <span>{next ? `Menuju ${next.name}` : "Level tertinggi 🎉"}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {next ? (
                        <p className="text-xs text-muted-foreground">
                            Butuh {Math.max(0, next.minPoints - points)} poin lagi untuk naik ke {next.name}
                        </p>
                    ) : null}
                </div>

                {/* Benefit level sekarang */}
                <div>
                    <p className="mb-2 text-sm font-medium text-foreground">Benefit kamu:</p>
                    <ul className="space-y-1.5">
                        {config.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {benefit}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
