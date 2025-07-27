import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Ask = () => {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (question.trim()) {
      // Handle sending the question
      console.log("Question sent:", question);
      setQuestion("");
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
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-8">
            Ask anything.
          </h1>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary/60"></div>
            <div className="w-3 h-3 rounded-full bg-primary/80"></div>
            <div className="w-3 h-3 rounded-full bg-primary"></div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 p-4 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30">
            <Input
              placeholder="Ask anything"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 hover:shadow-glow"
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