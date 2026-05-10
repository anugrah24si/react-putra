import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

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
                maxWidth: '672px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                alignItems: 'stretch'
            }}>
                {/* Error Code - 404 */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '180px',
                    fontWeight: '700',
                    color: 'rgba(201, 168, 134, 0.4)',
                    lineHeight: '1',
                    margin: '0',
                    padding: '0'
                }}>
                    404
                </div>

                {/* Main Card */}
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    boxShadow: '0px 8px 10px -6px rgba(201, 168, 134, 0.10), 0px 20px 25px -5px rgba(201, 168, 134, 0.10)',
                    border: '1px solid rgba(201, 168, 134, 0.15)',
                    padding: '48px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    alignItems: 'center'
                }}>
                    {/* Title */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: '28px',
                        fontWeight: '600',
                        color: '#2D2A27',
                        fontFamily: 'Inter, sans-serif'
                    }}>
                        Page Not Found
                    </div>

                    {/* Description */}
                    <div style={{
                        textAlign: 'center',
                        fontSize: '16px',
                        color: '#666666',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '1.5'
                    }}>
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                        {/* Go to Dashboard Button */}
                        <button
                            onClick={() => navigate("/")}
                            style={{
                                padding: '12px 32px',
                                background: 'linear-gradient(90deg, #C9A886 0%, #D4AF8C 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: 'Inter, sans-serif',
                                cursor: 'pointer',
                                transition: 'opacity 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseOver={(e) => e.target.style.opacity = '0.9'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            <span>🏠</span>
                            Go to Dashboard
                        </button>

                        {/* Back to Sign In Button */}
                        <button
                            onClick={() => navigate("/login")}
                            style={{
                                padding: '12px 32px',
                                background: 'transparent',
                                color: '#C9A886',
                                border: '2px solid #C9A886',
                                borderRadius: '12px',
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
                    </div>
                </div>

                {/* Info Card */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(201, 168, 134, 0.15)',
                    padding: '24px 32px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start'
                }}>
                    {/* Icon */}
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #C9A886 0%, #D4AF8C 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexShrink: 0
                    }}>
                        <span style={{fontSize: '24px'}}>🔍</span>
                    </div>

                    {/* Content */}
                    <div style={{
                        flex: 1
                    }}>
                        {/* Title */}
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#2D2A27',
                            fontFamily: 'Inter, sans-serif',
                            marginBottom: '8px'
                        }}>
                            Looking for something specific?
                        </div>

                        {/* Description */}
                        <div style={{
                            fontSize: '14px',
                            color: '#666666',
                            fontFamily: 'Inter, sans-serif',
                            marginBottom: '16px'
                        }}>
                            Try searching from the dashboard or check these popular sections:
                        </div>

                        {/* Quick Links */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={() => navigate("/")}
                                style={{
                                    padding: '8px 16px',
                                    background: '#f5f5f5',
                                    color: '#2D2A27',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    fontFamily: 'Inter, sans-serif',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#eeeeee'}
                                onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => navigate("/orders")}
                                style={{
                                    padding: '8px 16px',
                                    background: '#f5f5f5',
                                    color: '#2D2A27',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    fontFamily: 'Inter, sans-serif',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#eeeeee'}
                                onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => navigate("/customers")}
                                style={{
                                    padding: '8px 16px',
                                    background: '#f5f5f5',
                                    color: '#2D2A27',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    fontFamily: 'Inter, sans-serif',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#eeeeee'}
                                onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
                            >
                                Customers
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#999999',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    © 2026 Lumière Clinic. All rights reserved.
                </div>
            </div>
        </div>
    );
}
