// Header halaman reusable untuk judul, breadcrumb, dan area aksi custom.
export default function PageHeader({ title, breadcrumb, children }) {
    const breadcrumbItems = Array.isArray(breadcrumb)
        ? breadcrumb
        : String(breadcrumb || "")
            .split("/")
            .map((item) => item.trim())
            .filter(Boolean);

    return (
        <div id="pageheader-container">
            <div id="pageheader-left">
                <span id="page-title">{title}</span>
                <div id="breadcrumb-links">
                    {breadcrumbItems.map((item, index) => (
                        <div key={`${item}-${index}`}>
                            <span id={index === 0 ? "breadcrumb-home" : "breadcrumb-current"}>{item}</span>
                            {index < breadcrumbItems.length - 1 ? <span id="breadcrumb-separator"> / </span> : null}
                        </div>
                    ))}
                </div>
            </div>
            {children ? <div id="action-button">{children}</div> : null}
        </div>
    );
}
