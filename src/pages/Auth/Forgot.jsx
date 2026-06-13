import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import AuthThemeToggle from "../../components/AuthThemeToggle";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Forgot Password Page - Menggunakan komponen shadcn UI (Card, Button, Input, Label).
 * Mengirim link reset password (saat ini masih simulasi).
 */
export default function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Referensi ke input email untuk auto-focus saat halaman dibuka
    const emailInputRef = useRef(null);

    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    // Handler submit kirim link reset (simulasi)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <AuthThemeToggle />

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email and we'll send you a reset link
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={() => navigate("/login")}>
                            Sign In
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    {/* Alert error */}
                    {error ? (
                        <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            <BsFillExclamationDiamondFill className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    ) : null}

                    {/* Alert loading */}
                    {loading ? (
                        <div className="mb-4 flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-foreground">
                            <ImSpinner2 className="shrink-0 animate-spin" />
                            <span>Sending reset link...</span>
                        </div>
                    ) : null}

                    {/* Alert success */}
                    {success ? (
                        <div className="mb-4 flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-600 dark:text-green-400">
                            <BsCheckCircleFill className="shrink-0" />
                            <span>Reset link sent! Please check your email inbox.</span>
                        </div>
                    ) : null}

                    {!success ? (
                        <form id="forgot-form" onSubmit={handleSubmit}>
                            <div className="grid gap-2">
                                <Label htmlFor="forgot-email">Email Address</Label>
                                <Input
                                    id="forgot-email"
                                    name="email"
                                    type="email"
                                    ref={emailInputRef}
                                    placeholder="m@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter the email address associated with your account
                                </p>
                            </div>
                        </form>
                    ) : null}
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    {!success ? (
                        <Button type="submit" form="forgot-form" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            className="w-full"
                            onClick={() => {
                                setEmail("");
                                setSuccess(false);
                                navigate("/login");
                            }}
                        >
                            Back to Login
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
