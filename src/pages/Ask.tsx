import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot } from "lucide-react";
import ChatBubble from "@/components/ChatBubble"; // NEW: Import the bubble component
import { askRAG } from "@/services/api"; // NEW: Import the RAG API service

// NEW: Define the structure for a chat message
interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Ask = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: "Hello! I have access to the course PDF documents. Ask me anything about the material."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // NEW: Ref for the scrollable chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // NEW: Effect to scroll to the bottom when new messages are added
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await askRAG(input);
      const botMessage: Message = { role: 'bot', content: response.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Failed to get RAG response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        <Navigation />

        {/* Main Chat Content */}
        <div ref={chatContainerRef} className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
          <div className="w-full max-w-4xl space-y-6">
            {messages.map((msg, index) => (
                <ChatBubble key={index} role={msg.role} message={msg.content} />
            ))}

            {/* NEW: Typing Indicator */}
            {isLoading && (
                <div className="flex items-start gap-4 justify-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div className="max-w-xl p-4 rounded-2xl bg-background/20 border border-border rounded-bl-none">
                    <div className="flex items-center space-x-2">
                      <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>

        {/* Input Section */}
        <div className="p-6 bg-background/10 backdrop-blur-sm border-t border-border/20">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 p-2 rounded-2xl bg-primary/20 border border-primary/30">
              <Input
                  placeholder="Ask about the course material..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 h-12 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              />
              <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 hover:shadow-glow disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Ask;