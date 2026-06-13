import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { registerUser } from "../../services/userService";
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
 * Register Page - Menggunakan komponen shadcn UI (Card, Button, Input, Label).
 * Mendaftarkan akun baru ke Supabase. Setelah berhasil, diarahkan ke /login
 * agar user bisa langsung login dengan akun baru.
 */
export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    // Handler perubahan input form
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((current) => ({ ...current, [name]: value }));
    };

    // Handler submit pendaftaran ke Supabase
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validasi: password dan konfirmasi harus sama
        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        setLoading(true);

        try {
            await registerUser({
                fullName: dataForm.fullName,
                email: dataForm.email,
                phone: dataForm.phone,
                password: dataForm.password,
            });
            // Pendaftaran berhasil → arahkan ke halaman login
            navigate("/login");
        } catch (err) {
            setError(err.message || "Gagal mendaftar. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <AuthThemeToggle />

            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>
                        Enter your details below to create a new account
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
                            <span>Creating your account...</span>
                        </div>
                    ) : null}

                    <form id="register-form" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Dr. Anugrah"
                                    value={dataForm.fullName}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+62 812-3456-7890"
                                    value={dataForm.phone}
                                    onChange={handleChange}
                                    autoComplete="tel"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    value={dataForm.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={dataForm.confirmPassword}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="register-form" className="w-full" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
