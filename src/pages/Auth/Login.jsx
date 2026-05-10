import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    /* navigate, state & handleChange*/
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
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    /* process form */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(false);

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email,
                password: dataForm.password,
            })
            .then((response) => {
                // Jika status bukan 200, tampilkan pesan error
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }

                // Redirect ke dashboard jika login sukses
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

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    const handleCreateAccount = () => {
        navigate("/register");
    };

    /* error & loading status */
    const errorInfo = error ? (
        <div style={{
            alignSelf: 'stretch',
            padding: '16px',
            background: '#FEE2E2',
            borderRadius: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid #FECACA'
        }}>
            <BsFillExclamationDiamondFill style={{ color: '#DC2626', fontSize: '18px', flexShrink: 0 }} />
            <div style={{ color: '#991B1B', fontSize: '14px', fontWeight: '500' }}>
                {error}
            </div>
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div style={{
            alignSelf: 'stretch',
            padding: '16px',
            background: '#E0E7FF',
            borderRadius: '12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid #C7D2FE'
        }}>
            <ImSpinner2 style={{ color: '#4338CA', fontSize: '18px', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
            <div style={{ color: '#3730A3', fontSize: '14px', fontWeight: '500' }}>
                Mohon Tunggu...
            </div>
        </div>
    ) : null;

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FAF8F5 0%, #F8F6F2 17%, #F7F3F0 33%, #F5F1ED 50%, #F2EEEA 60%, #F0EBE7 70%, #EDE9E3 80%, #EBE6E0 90%, #E8E3DD 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '448px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'stretch'
            }}>
                {/* Header Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #C9A886 0%, #CCAA87 25%, #CEAB89 50%, #D1AD8A 75%, #D4AF8C 100%)',
                    padding: '40px 32px',
                    textAlign: 'center',
                    borderRadius: '24px 24px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '16px'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'rgba(255, 255, 255, 0.20)',
                        borderRadius: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '700',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            LC
                        </div>
                    </div>
                    <div style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '32px'
                    }}>
                        Welcome Back
                    </div>
                    <div style={{
                        color: 'rgba(255, 255, 255, 0.80)',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '20px'
                    }}>
                        Sign in to access your admin panel
                    </div>
                </div>

                {/* Form Section */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '32px',
                    borderRadius: '0 0 24px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    backdropFilter: 'blur(10px)'
                }}>
                    {errorInfo}
                    {loadingInfo}

                    <form onSubmit={handleSubmit} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        {/* Email Field */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <label style={{
                                color: '#2D2A27',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: '20px'
                            }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={dataForm.email}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px 14px 48px',
                                    background: '#F9F7F4',
                                    border: '1px solid rgba(201, 168, 134, 0.20)',
                                    borderRadius: '16px',
                                    fontSize: '16px',
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#2D2A27',
                                    boxSizing: 'border-box',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect x='1.67' y='5.83' width='16.67' height='5' fill='none' stroke='%238B8581' stroke-width='1.67'/%3E%3Crect x='1.67' y='3.33' width='16.67' height='13.33' fill='none' stroke='%238B8581' stroke-width='1.67'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '16px center',
                                    backgroundSize: '20px 20px',
                                    paddingLeft: '48px'
                                }}
                                placeholder="admin@lumiereclinic.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <label style={{
                                color: '#2D2A27',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontFamily: 'Inter, sans-serif',
                                lineHeight: '20px'
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={dataForm.password}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '14px 48px',
                                    background: '#F9F7F4',
                                    border: '1px solid rgba(201, 168, 134, 0.20)',
                                    borderRadius: '16px',
                                    fontSize: '16px',
                                    fontFamily: 'Inter, sans-serif',
                                    color: '#2D2A27',
                                    boxSizing: 'border-box',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Crect x='2.5' y='9.17' width='15' height='9.17' fill='none' stroke='%238B8581' stroke-width='1.67'/%3E%3Crect x='5.83' y='1.67' width='8.33' height='7.5' fill='none' stroke='%238B8581' stroke-width='1.67'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '16px center',
                                    backgroundSize: '20px 20px'
                                }}
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '14px',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                color: '#2D2A27',
                                fontWeight: '500'
                            }}>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        cursor: 'pointer',
                                        accentColor: '#C9A886'
                                    }}
                                />
                                Remember me
                            </label>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#C9A886',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontFamily: 'Inter, sans-serif',
                                    lineHeight: '20px'
                                }}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: loading ? '#D4AF8C' : 'linear-gradient(90deg, #C9A886 0%, #CCAA87 25%, #CEAB89 50%, #D1AD8A 75%, #D4AF8C 100%)',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '500',
                                fontFamily: 'Inter, sans-serif',
                                border: 'none',
                                borderRadius: '16px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            {loading && <ImSpinner2 style={{ animation: 'spin 1s linear infinite' }} />}
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Create Account Link */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '20px'
                    }}>
                        <span style={{ color: '#8B8581', fontWeight: '400' }}>
                            Don&apos;t have an account?{' '}
                        </span>
                        <button
                            type="button"
                            onClick={handleCreateAccount}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#C9A886',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    color: '#8B8581',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    lineHeight: '16px'
                }}>
                    © 2026 Lumière Clinic. All rights reserved.
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
