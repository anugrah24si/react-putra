import { Link } from "react-router-dom";

// Komponen halaman error reusable berbasis desain Figma kartu vertikal.
export default function ErrorPage({ errorCode, description, image }) {
    return (
        <section className="error-page-wrapper">
            <article className="error-phone-card">
                <header className="error-card-header">
                    <span className="error-logo">LOGO</span>
                    <span className="error-menu">≡</span>
                </header>

                <div className="error-card-body">
                    <h1 className="error-code">{errorCode}</h1>
                    <h2 className="error-title">{description}</h2>

                    <img
                        src={image}
                        alt={`Ilustrasi error ${errorCode}`}
                        className="error-image"
                    />

                    <p className="error-caption">
                        Maaf, terjadi kendala pada sistem. Silakan coba lagi atau kembali ke halaman utama.
                    </p>

                    <Link to="/" className="error-cta">
                        CTA
                    </Link>
                </div>

                <footer className="error-card-footer">FOOTER</footer>
            </article>
        </section>
    );
}
