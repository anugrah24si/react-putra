import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import "../../styles/login.css";

export default function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulate sending reset link
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
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
                            <h2>Reset your password securely and get back to managing your clinic</h2>
                            <p>
                                We'll send a secure link to your registered email address. Follow the instructions
                                to create a new password and regain access to your MediCare dashboard.
                            </p>
                        </div>

                        <div className="login-visual__dots" aria-hidden="true">
                            <span className="login-visual__dot" />
                            <span className="login-visual__dot" />
                            <span className="login-visual__dot login-visual__dot--active" />
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
                                <h1>Forgot Password</h1>
                                <p>Enter your email and we'll send you a reset link</p>
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
                                    <div className="login-alert__text">Sending reset link...</div>
                                </div>
                            )}

                            {success && (
                                <div className="login-alert login-alert--success" role="status">
                                    <BsCheckCircleFill className="login-alert__icon login-alert__icon--success" />
                                    <div className="login-alert__text">
                                        Reset link sent! Please check your email inbox.
                                    </div>
                                </div>
                            )}

                            {!success ? (
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <div className="login-field">
                                        <label className="login-field__label" htmlFor="forgot-email">
                                            Email Address
                                        </label>
                                        <div className="login-field__control">
                                            <input
                                                type="email"
                                                id="forgot-email"
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="tempmail@gmail.com"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>
                                        <span style={{
                                            fontSize: "12px",
                                            color: "#acb5bb",
                                            paddingLeft: "12px",
                                            marginTop: "-4px"
                                        }}>
                                            Enter the email address associated with your account
                                        </span>
                                    </div>

                                    <button className="login-button" type="submit" disabled={loading}>
                                        {loading ? <ImSpinner2 className="login-button__spinner" /> : null}
                                        {loading ? "Sending..." : "Send Reset Link"}
                                    </button>
                                </form>
                            ) : (
                                <button
                                    className="login-button"
                                    type="button"
                                    onClick={() => navigate("/login")}
                                >
                                    Back to Login
                                </button>
                            )}

                            <div className="login-card__footer">
                                <span>Remember your password?</span>
                                <button type="button" className="login-link" onClick={() => navigate("/login")}>
                                    Back to Login
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