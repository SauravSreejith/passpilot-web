import { Bot, User } from 'lucide-react';
import { cn } from "@/lib/utils"; // For combining class names

interface ChatBubbleProps {
    role: 'user' | 'bot';
    message: string;
}

const ChatBubble = ({ role, message }: ChatBubbleProps) => {
    const isUser = role === 'user';

    const wrapperClasses = cn(
        "flex items-start gap-4",
        isUser ? "justify-end" : "justify-start"
    );

    const bubbleClasses = cn(
        "max-w-xl p-4 rounded-2xl bg-background/20 border border-border",
        isUser
            ? "bg-primary/20 border-primary/30 rounded-br-none" // User messages are blue, align right
            : "rounded-bl-none" // Bot messages are default, align left
    );

    const icon = isUser ? (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
        </div>
    ) : (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-foreground" />
        </div>
    );

    return (
        <div className={wrapperClasses}>
            {!isUser && icon} {/* Show bot icon on the left */}

            <div className={bubbleClasses}>
                <p className="text-foreground whitespace-pre-wrap">{message}</p>
            </div>

            {isUser && icon} {/* Show user icon on the right */}
        </div>
    );
};

export default ChatBubble;