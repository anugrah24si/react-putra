import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";

/**
 * ChatWindow - Jendela chat: merangkai header, body, dan input.
 * Responsive: lebar ~380px di desktop, full width di mobile.
 *
 * @param {Array} messages
 * @param {boolean} loading
 * @param {Array<string>} suggestions
 * @param {function} onSend
 * @param {function} onClear
 * @param {function} onClose
 */
export default function ChatWindow({ messages, loading, suggestions, onSend, onClear, onClose }) {
    return (
        <div
            className="fixed bottom-0 right-0 z-[60] flex h-[100dvh] w-full flex-col overflow-hidden border border-border bg-background shadow-2xl sm:bottom-24 sm:right-5 sm:h-[34rem] sm:max-h-[80vh] sm:w-[380px] sm:rounded-2xl"
            role="dialog"
            aria-label="LUMIVA Assistant"
        >
            <ChatHeader onClear={onClear} onClose={onClose} />
            <ChatBody
                messages={messages}
                loading={loading}
                suggestions={suggestions}
                onSuggestion={onSend}
            />
            <ChatInput onSend={onSend} disabled={loading} />
        </div>
    );
}
