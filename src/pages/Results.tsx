import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { getPassStrategy, getPassSimulation } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react"; // NEW: Icon for the button

// (Interface definitions remain the same)
interface StrategyData {
  current_estimated_score: number;
  recommendations: { topic_name: string }[];
  summary: string;
}

interface SimulationData {
  pass_probability: number;
}

const Results = () => {
  const navigate = useNavigate();

  // MODIFIED: State management now includes studiedTopics and a recalculation flag
  const [isLoading, setIsLoading] = useState(true);
  const [isRecalculating, setIsRecalculating] = useState(false); // NEW: For recalculation spinner
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<StrategyData | null>(null);
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [studiedTopics, setStudiedTopics] = useState<string[]>([]); // NEW: To track topics live
  const [internalMarks, setInternalMarks] = useState(0); // NEW: Store internal marks

  // NEW: Refactored fetch logic into a reusable function
  const fetchResults = (topics: string[], marks: number) => {
    // Determine loading state
    const isInitialLoad = !strategy;
    if (isInitialLoad) {
      setIsLoading(true);
    } else {
      setIsRecalculating(true); // Use a separate flag for subsequent loads
    }

    const apiPayload = {
      studied_topics: topics,
      internal_marks: marks,
    };

    Promise.all([
      getPassStrategy(apiPayload),
      getPassSimulation(apiPayload)
    ])
        .then(([strategyData, simulationData]) => {
          setStrategy(strategyData);
          setSimulation(simulationData);
        })
        .catch(err => {
          setError(err.message || "Failed to fetch results. Please try again.");
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
          setIsRecalculating(false);
        });
  };

  // MODIFIED: Initial effect to load data and set initial state
  useEffect(() => {
    const examDataString = localStorage.getItem("examData");
    if (!examDataString) {
      navigate("/");
      return;
    }

    const examData = JSON.parse(examDataString);
    setStudiedTopics(examData.studiedTopics);
    setInternalMarks(examData.internalMarks);

    fetchResults(examData.studiedTopics, examData.internalMarks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // NEW: Handler for marking a topic as complete
  const handleMarkAsComplete = (topicToComplete: string) => {
    const newStudiedTopics = [...studiedTopics, topicToComplete];
    setStudiedTopics(newStudiedTopics);

    // Update localStorage to persist the change on refresh
    const examDataString = localStorage.getItem("examData");
    if(examDataString) {
      const examData = JSON.parse(examDataString);
      examData.studiedTopics = newStudiedTopics;
      localStorage.setItem("examData", JSON.stringify(examData));
    }

    // Recalculate results with the new list
    fetchResults(newStudiedTopics, internalMarks);
  };


  const handleTopicClick = (topic: string) => {
    localStorage.setItem("selectedTopic", topic);
    navigate("/topic");
  };

  // Loading and Error states remain the same...
  if (isLoading) {
    return (
        <div className="min-h-screen bg-gradient-hero">
          <Navigation />
          <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="h-[150px] rounded-2xl bg-primary/20" />
                <Skeleton className="h-[150px] rounded-2xl bg-primary/20" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-12 w-1/3 rounded-lg bg-primary/20" />
                <Skeleton className="h-40 rounded-2xl bg-primary/20" />
              </div>
            </div>
          </section>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-3xl font-bold text-destructive mb-4">An Error Occurred</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate("/")}>Go back to Dashboard</Button>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <section className="py-12 px-6">
          <div className={`max-w-7xl mx-auto space-y-12 transition-opacity duration-300 ${isRecalculating ? 'opacity-50' : 'opacity-100'}`}>
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Current pass</h3>
                    <h3 className="text-xl font-semibold text-foreground">probability :</h3>
                  </div>
                  <CircularProgress percentage={Math.round((simulation?.pass_probability || 0) * 100)} />
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30">
                <h3 className="text-xl font-semibold text-foreground mb-4">Current</h3>
                <h3 className="text-xl font-semibold text-foreground mb-8">estimated score :</h3>
                <div className="text-right">
                  <span className="text-6xl font-bold text-foreground">{Math.round(strategy?.current_estimated_score || 0)}</span>
                </div>
              </div>
            </div>

            {/* Recommended Topics */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2 text-left">
                  Recommended topics
                  {isRecalculating && <span className="text-lg ml-4 text-muted-foreground animate-pulse">Recalculating...</span>}
                </h2>
                <p className="text-lg text-muted-foreground text-left">Study these topics to increase your pass probability. Click a topic to see past questions, or mark it as studied.</p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-primary/15 backdrop-blur-sm border border-primary/20">
                {/* NEW: Updated display for topics with action buttons */}
                <div className="space-y-4">
                  {strategy?.recommendations && strategy.recommendations.length > 0 ? (
                      strategy.recommendations.map((rec, index) => (
                          <div key={index} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <Button
                                variant="link"
                                onClick={() => handleTopicClick(rec.topic_name)}
                                className="text-lg text-left justify-start flex-1 text-foreground hover:text-primary"
                                disabled={isRecalculating}
                            >
                              {rec.topic_name}
                            </Button>
                            <Button
                                onClick={() => handleMarkAsComplete(rec.topic_name)}
                                disabled={isRecalculating}
                                className="bg-green-600/80 hover:bg-green-600 text-white w-full sm:w-auto"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark as Studied
                            </Button>
                          </div>
                      ))
                  ) : (
                      <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-green-400">Congratulations!</h3>
                        <p className="text-muted-foreground mt-2">You've covered all the high-impact topics we recommend.</p>
                      </div>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground text-left">Summary</h2>
              <p className="text-lg font-bold text-foreground text-left">
                {strategy?.summary || "Analysis complete."}
              </p>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Results;