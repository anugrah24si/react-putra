import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import "../../styles/login.css";

function EyeIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

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

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        setLoading(true);
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="login-page-wrap">
            <div className="login-page">
                {/* LEFT VISUAL PANEL */}
                <aside className="login-visual">
                    <div className="login-visual__shine" aria-hidden="true" />
                    <div className="login-visual__inner">
                        <img
                            className="login-visual__hero"
                            src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80"
                            alt="Medical team"
                        />

                        <div className="login-visual__copy">
                            <h2>Join the MediCare team and start managing your clinic smarter</h2>
                            <p>
                                Create your admin account to access the full suite of tools for patient management,
                                scheduling, and operational efficiency in one centralized platform.
                            </p>
                        </div>

                        <div className="login-visual__dots" aria-hidden="true">
                            <span className="login-visual__dot" />
                            <span className="login-visual__dot login-visual__dot--active" />
                            <span className="login-visual__dot" />
                        </div>
                    </div>
                </aside>

                {/* RIGHT FORM PANEL */}
                <main className="login-panel">
                    <div className="login-panel__inner">
                        <div className="login-panel__brand">
                            <div className="login-panel__brandmark">
                                <img src="/img/logo.png" alt="MediCare" />
                            </div>
                        </div>

                        <section className="login-card">
                            <div className="login-card__head">
                                <h1>Create Account</h1>
                                <p>Join the MediCare admin team today</p>
                            </div>

                            {error && (
                                <div className="login-alert login-alert--error" role="alert">
                                    <BsFillExclamationDiamondFill className="login-alert__icon login-alert__icon--error" />
                                    <div className="login-alert__text">{error}</div>
                                </div>
                            )}

                            {loading && (
                                <div className="login-alert login-alert--loading" role="status" aria-live="polite">
                                    <ImSpinner2 className="login-alert__icon login-alert__icon--loading" />
                                    <div className="login-alert__text">Creating your account...</div>
                                </div>
                            )}

                            <form className="login-form" onSubmit={handleSubmit}>
                                {/* FULL NAME */}
                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="fullName">Full Name</label>
                                    <div className="login-field__control">
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            value={dataForm.fullName}
                                            onChange={handleChange}
                                            placeholder="Dr. Anugrah"
                                            autoComplete="name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* EMAIL */}
                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="reg-email">Email Address</label>
                                    <div className="login-field__control">
                                        <input
                                            type="email"
                                            name="email"
                                            id="reg-email"
                                            value={dataForm.email}
                                            onChange={handleChange}
                                            placeholder="admin@medicare.com"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* PHONE */}
                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="phone">Phone Number</label>
                                    <div className="login-field__control">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={dataForm.phone}
                                            onChange={handleChange}
                                            placeholder="+62 812-3456-7890"
                                            autoComplete="tel"
                                        />
                                    </div>
                                </div>

                                {/* PASSWORD */}
                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="reg-password">Password</label>
                                    <div className="login-field__control login-field__control--password">
                                        <input
                                            type="password"
                                            name="password"
                                            id="reg-password"
                                            value={dataForm.password}
                                            onChange={handleChange}
                                            placeholder="Create a strong password"
                                            autoComplete="new-password"
                                            required
                                        />
                                        <span className="login-field__action" aria-hidden="true">
                                            <EyeIcon />
                                        </span>
                                    </div>
                                </div>

                                {/* CONFIRM PASSWORD */}
                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="login-field__control login-field__control--password">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={dataForm.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            required
                                        />
                                        <span className="login-field__action" aria-hidden="true">
                                            <EyeIcon />
                                        </span>
                                    </div>
                                </div>

                                {/* TERMS */}
                                <p style={{
                                    fontSize: "13px",
                                    color: "#6c7278",
                                    textAlign: "center",
                                    margin: "0",
                                    fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
                                }}>
                                    By creating an account, you agree to our{" "}
                                    <button type="button" className="login-link" style={{ fontSize: "13px" }}>
                                        Terms of Service
                                    </button>{" "}
                                    and{" "}
                                    <button type="button" className="login-link" style={{ fontSize: "13px" }}>
                                        Privacy Policy
                                    </button>
                                </p>

                                <button className="login-button" type="submit" disabled={loading}>
                                    {loading ? <ImSpinner2 className="login-button__spinner" /> : null}
                                    {loading ? "Creating Account..." : "Create Account"}
                                </button>
                            </form>

                            <div className="login-card__footer">
                                <span>Already have an account?</span>
                                <button type="button" className="login-link" onClick={() => navigate("/login")}>
                                    Sign In
                                </button>
                            </div>
                        </section>

                        <footer className="login-panel__footer">
                            <div>© 2023 MediCare. All rights reserved.</div>
                            <div className="login-panel__footer-links">
                                <button type="button" className="login-link">Term &amp; Condition</button>
                                <button type="button" className="login-link">Privacy &amp; Policy</button>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}