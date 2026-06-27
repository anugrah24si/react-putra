import { Fragment } from "react";

/**
 * Markdown.jsx - Renderer markdown ringan & aman (tanpa dangerouslySetInnerHTML
 * dan tanpa library tambahan). Mendukung: code block (```), inline code (`),
 * bold (**), link [teks](url), serta daftar (- / *).
 */

/**
 * renderInline - Mengubah satu baris teks menjadi node React dengan format
 * bold, inline code, dan link.
 */
function renderInline(text, keyPrefix) {
    // Token: **bold** | `code` | [teks](url)
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    const parts = text.split(regex).filter((p) => p !== "");

    return parts.map((part, i) => {
        const key = `${keyPrefix}-${i}`;
        if (/^\*\*[^*]+\*\*$/.test(part)) {
            return <strong key={key}>{part.slice(2, -2)}</strong>;
        }
        if (/^`[^`]+`$/.test(part)) {
            return (
                <code key={key} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
                    {part.slice(1, -1)}
                </code>
            );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
            return (
                <a
                    key={key}
                    href={link[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                >
                    {link[1]}
                </a>
            );
        }
        return <Fragment key={key}>{part}</Fragment>;
    });
}

/**
 * Markdown - Komponen utama. Memecah teks menjadi blok kode dan teks biasa,
 * lalu merender daftar/paragraf dengan format inline.
 */
export default function Markdown({ text = "" }) {
    // Pisahkan blok kode (```...```)
    const segments = String(text).split(/```/);

    return (
        <div className="space-y-2 text-sm leading-relaxed">
            {segments.map((seg, idx) => {
                // Indeks ganjil = blok kode
                if (idx % 2 === 1) {
                    const code = seg.replace(/^[a-zA-Z0-9]*\n/, "");
                    return (
                        <pre
                            key={idx}
                            className="overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs text-foreground"
                        >
                            <code>{code}</code>
                        </pre>
                    );
                }

                // Teks biasa: kelompokkan baris menjadi list / paragraf
                const lines = seg.split("\n");
                const nodes = [];
                let listItems = [];

                const flushList = (k) => {
                    if (listItems.length > 0) {
                        nodes.push(
                            <ul key={`ul-${k}`} className="list-disc space-y-1 pl-5">
                                {listItems.map((li, i) => (
                                    <li key={i}>{renderInline(li, `li-${k}-${i}`)}</li>
                                ))}
                            </ul>
                        );
                        listItems = [];
                    }
                };

                lines.forEach((line, i) => {
                    const trimmed = line.trim();
                    if (/^[-*]\s+/.test(trimmed)) {
                        listItems.push(trimmed.replace(/^[-*]\s+/, ""));
                    } else {
                        flushList(`${idx}-${i}`);
                        if (trimmed) {
                            nodes.push(<p key={`p-${idx}-${i}`}>{renderInline(trimmed, `p-${idx}-${i}`)}</p>);
                        }
                    }
                });
                flushList(`end-${idx}`);

                return <Fragment key={idx}>{nodes}</Fragment>;
            })}
        </div>
    );
}
