import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";

const Results = () => {
  const navigate = useNavigate();

  const topics = [
    "Synchronization hardware",
    "Monitors", 
    "Mutex Locks",
    "Synchronization problems"
  ];

  const handleTopicClick = (topic: string) => {
    localStorage.setItem("selectedTopic", topic);
    navigate("/topic");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pass Probability Card */}
            <div className="p-8 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Current pass
                  </h3>
                  <h3 className="text-xl font-semibold text-foreground">
                    probability :
                  </h3>
                </div>
                <CircularProgress percentage={27} />
              </div>
            </div>

            {/* Estimated Score Card */}
            <div className="p-8 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Current
              </h3>
              <h3 className="text-xl font-semibold text-foreground mb-8">
                estimated score :
              </h3>
              <div className="text-right">
                <span className="text-6xl font-bold text-foreground">21</span>
              </div>
            </div>
          </div>

          {/* Recommended Topics */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2 text-left">
                Recommended topics
              </h2>
              <p className="text-lg text-muted-foreground text-left">
                Study the following topics to increase your pass probability :
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-primary/15 backdrop-blur-sm border border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topics.map((topic, index) => (
                  <Button
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="p-4 h-auto bg-primary/30 hover:bg-primary/40 text-foreground rounded-xl border border-primary/40 transition-all duration-300 hover:shadow-glow"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground text-left">
              Summary
            </h2>
            <p className="text-lg font-bold text-foreground text-left">
              You need about 39 more marks. Studying the recommended topics can get you to an estimated score of 47.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;