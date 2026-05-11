import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message || "Login failed");
                    return;
                }

                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const errorInfo = error ? (
        <div className="login-alert login-alert--error" role="alert">
            <BsFillExclamationDiamondFill className="login-alert__icon login-alert__icon--error" />
            <div className="login-alert__text">{error}</div>
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="login-alert login-alert--loading" role="status" aria-live="polite">
            <ImSpinner2 className="login-alert__icon login-alert__icon--loading" />
            <div className="login-alert__text">Mohon tunggu...</div>
        </div>
    ) : null;

    return (
        <div className="login-page-wrap">
            <div className="login-page">
                <aside className="login-visual">
                    <div className="login-visual__shine" aria-hidden="true" />
                    <div className="login-visual__inner">
                        <img
                            className="login-visual__hero"
                            src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=80"
                            alt="Medical team"
                        />

                        <div className="login-visual__copy">
                            <h2>Optimize your medicare operations with our intelligent medical admin dashboard</h2>
                            <p>
                                This comprehensive digital solution centralizes and streamlines essential tasks, data,
                                and processes, empowering medicare providers to deliver better patient care and enhance
                                operational efficiency.
                            </p>
                        </div>

                        <div className="login-visual__dots" aria-hidden="true">
                            <span className="login-visual__dot login-visual__dot--active" />
                            <span className="login-visual__dot" />
                            <span className="login-visual__dot" />
                        </div>
                    </div>
                </aside>

                <main className="login-panel">
                    <div className="login-panel__inner">
                        <div className="login-panel__brand">
                            <div className="login-panel__brandmark">
                                <img src="/img/logo.png" alt="MediCare" />
                            </div>
                        </div>

                        <section className="login-card">
                            <div className="login-card__head">
                                <h1>Login</h1>
                                <p>Let’s login into your MediCare account first</p>
                            </div>

                            {errorInfo}
                            {loadingInfo}

                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="email">Email</label>
                                    <div className="login-field__control">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={dataForm.email}
                                            onChange={handleChange}
                                            placeholder="tempmail@gmail.com"
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="login-field">
                                    <label className="login-field__label" htmlFor="password">Password</label>
                                    <div className="login-field__control login-field__control--password">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={dataForm.password}
                                            onChange={handleChange}
                                            placeholder="*******"
                                            autoComplete="current-password"
                                            required
                                        />
                                        <span className="login-field__action" aria-hidden="true">
                                            <EyeIcon />
                                        </span>
                                    </div>
                                </div>

                                <div className="login-form__row">
                                    <label className="login-check">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(event) => setRememberMe(event.target.checked)}
                                        />
                                        <span>Remember me</span>
                                    </label>

                                    <button type="button" className="login-link" onClick={() => navigate("/forgot-password")}>
                                        Forgot Password
                                    </button>
                                </div>

                                <button className="login-button" type="submit" disabled={loading}>
                                    {loading ? <ImSpinner2 className="login-button__spinner" /> : null}
                                    {loading ? "Signing In..." : "Login"}
                                </button>
                            </form>

                            <div className="login-divider">
                                <span>or</span>
                            </div>

                            <button type="button" className="login-google">
                                <span className="login-google__icon" aria-hidden="true">
                                    <span className="login-google__g login-google__g--red" />
                                    <span className="login-google__g login-google__g--green" />
                                    <span className="login-google__g login-google__g--blue" />
                                    <span className="login-google__g login-google__g--yellow" />
                                </span>
                                <span>Login with Google</span>
                            </button>

                            <div className="login-card__footer">
                                <span>Don’t have an account?</span>
                                <button type="button" className="login-link" onClick={() => navigate("/register")}>
                                    Register Here
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