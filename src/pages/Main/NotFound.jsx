import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="login-page-wrap">
            <div className="login-page">
                {/* LEFT VISUAL PANEL */}
                <aside className="login-visual">
                    <div className="login-visual__shine" aria-hidden="true" />
                    <div className="login-visual__inner">
                        <img
                            className="login-visual__hero"
                            src="/img/clinik.jpg"
                            alt="Medical clinic"
                        />

                        <div className="login-visual__copy">
                            <h2>Page Not Found</h2>
                            <p>
                                It seems like the page you're trying to access doesn't exist or has been moved.
                                Don't worry, you can navigate back to the main dashboard to continue managing your clinic operations.
                            </p>
                        </div>

                        <div className="login-visual__dots" aria-hidden="true">
                            <span className="login-visual__dot login-visual__dot--active" />
                            <span className="login-visual__dot" />
                            <span className="login-visual__dot" />
                        </div>
                    </div>
                </aside>

                {/* RIGHT PANEL */}
                <main className="login-panel">
                    <div className="login-panel__inner">
                        <div className="login-panel__brand">
                            <div className="login-panel__brandmark">
                                <img src="/img/logo.png" alt="MediCare" />
                            </div>
                        </div>

                        <section className="login-card">
                            <div className="login-card__head">
                                <h1 style={{fontSize: '72px', margin: '0 0 16px 0', color: '#C9A886'}}>404</h1>
                                <h2 style={{fontSize: '24px', margin: '0 0 8px 0', color: '#2D2A27'}}>Oops! Page Not Found</h2>
                                <p style={{color: '#666666', marginTop: '0'}}>The page you're looking for doesn't exist</p>
                            </div>

                            <form className="login-form" style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'linear-gradient(90deg, #C9A886 0%, #D4AF8C 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Inter, sans-serif',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.opacity = '0.9'}
                                    onMouseOut={(e) => e.target.style.opacity = '1'}
                                >
                                    Go to Dashboard
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/orders")}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'transparent',
                                        color: '#C9A886',
                                        border: '2px solid #C9A886',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Inter, sans-serif',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#f5f5f5';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'transparent';
                                    }}
                                >
                                    View Orders
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/customers")}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'transparent',
                                        color: '#C9A886',
                                        border: '2px solid #C9A886',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Inter, sans-serif',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#f5f5f5';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'transparent';
                                    }}
                                >
                                    View Customers
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        background: 'transparent',
                                        color: '#C9A886',
                                        border: '2px solid #C9A886',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        fontFamily: 'Inter, sans-serif',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.background = '#f5f5f5';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.background = 'transparent';
                                    }}
                                >
                                    Back to Sign In
                                </button>
                            </form>

                            <div style={{
                                marginTop: '32px',
                                padding: '16px',
                                background: '#f9f8f7',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '12px',
                                color: '#999999',
                                fontFamily: 'Inter, sans-serif'
                            }}>
                                If you think this is a mistake, please contact support at support@medicare.com
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}
