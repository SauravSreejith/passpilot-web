import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Topic = () => {
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    const selectedTopic = localStorage.getItem("selectedTopic");
    if (selectedTopic) {
      setTopicName(selectedTopic);
    } else {
      setTopicName("Synchronization hardware");
    }
  }, []);

  const questions = [
    "What is synchronization hardware?",
    "Explain test and set"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-foreground text-left">
              {topicName}
            </h1>
            <Button 
              onClick={() => navigate("/ask")}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow"
            >
              Ask your doubts
            </Button>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-6 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/25 transition-all duration-300"
              >
                <span className="text-lg text-foreground">{question}</span>
                <Button
                  onClick={() => navigate("/ask")}
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                  <Sparkles className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic;