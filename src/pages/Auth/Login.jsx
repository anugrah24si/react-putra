import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { loginUser } from "../../services/userService";
import { saveSession } from "@/lib/auth";
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
import { BorderBeam } from "@/components/ui/border-beam";

/**
 * Login Page - Menggunakan komponen shadcn UI (Card, Button, Input, Label).
 * Login langsung ke Supabase (bukan dummy json).
 */
export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    // Handler perubahan input form
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((current) => ({ ...current, [name]: value }));
    };

    // Handler submit login ke Supabase
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const user = await loginUser(dataForm.email, dataForm.password);
            // Simpan sesi user
            saveSession(user);
            // Arahkan berdasarkan role: admin → dashboard admin, member → dashboard member
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/member");
            }
        } catch (err) {
            setError(err.message || "Terjadi kesalahan saat login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <AuthThemeToggle />

            <Card className="relative w-full max-w-sm overflow-hidden">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={() => navigate("/register")}>
                            Sign Up
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
                            <span>Mohon tunggu...</span>
                        </div>
                    ) : null}

                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/forgot")}
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={dataForm.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="login-form" className="w-full" disabled={loading}>
                        {loading ? "Signing In..." : "Login"}
                    </Button>
                    <Button variant="outline" className="w-full" type="button">
                        Login with Google
                    </Button>
                </CardFooter>

                <BorderBeam duration={8} size={100} />
            </Card>
        </div>
    );
}
