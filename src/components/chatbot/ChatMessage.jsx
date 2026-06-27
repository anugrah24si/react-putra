import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Markdown from "./Markdown";

/**
 * ChatMessage - Satu bubble chat (user atau AI).
 * Bubble AI merender markdown; bubble user teks biasa.
 *
 * @param {Object} message - { role: 'user'|'assistant', content: string }
 */
export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    if (isUser) {
        return (
            <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
            </div>
            <div className={cn("max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-foreground")}>
                <Markdown text={message.content} />
            </div>
        </div>
    );
}
