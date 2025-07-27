import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { getQuestionsForTopic } from "@/services/api"; // NEW: Import API service
import { Skeleton } from "@/components/ui/skeleton"; // NEW: For loading state

// NEW: Type for a single question from the backend
interface Question {
  id: string;
  question: string;
  marks: string;
  module: string;
  year: string;
}

const Topic = () => {
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState("");
  // NEW: State for questions, loading, and errors
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const selectedTopic = localStorage.getItem("selectedTopic");
    if (selectedTopic) {
      setTopicName(selectedTopic);
      // NEW: Fetch questions for this topic
      getQuestionsForTopic(selectedTopic)
          .then(data => {
            setQuestions(data.results || []);
          })
          .catch(err => {
            setError(err.message || "Could not fetch questions.");
            console.error(err);
          })
          .finally(() => setIsLoading(false));

    } else {
      // Handle case where user lands here directly
      navigate("/");
    }
  }, [navigate]);

  return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-foreground text-left">
                {topicName || <Skeleton className="h-12 w-80" />}
              </h1>
              <Button
                  onClick={() => navigate("/ask")}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow"
              >
                Ask your doubts
              </Button>
            </div>

            {/* NEW: Dynamic Questions Section */}
            <div className="space-y-4">
              {isLoading && (
                  // Loading skeletons
                  Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
              )}
              {!isLoading && error && <p className="text-destructive text-center">{error}</p>}
              {!isLoading && !error && questions.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No past questions found for this specific topic.</p>
              )}

              {questions.map((q) => (
                  <div
                      key={q.id}
                      className="flex flex-col md:flex-row justify-between md:items-center p-6 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30"
                  >
                    <div className="flex-1 mb-4 md:mb-0">
                      <p className="text-lg text-foreground">{q.question}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {q.module} • {q.year} • {q.marks} Marks
                      </p>
                    </div>
                    <Button
                        onClick={() => navigate("/ask")} // This could be enhanced to pre-fill the ask page with the question
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary/80 hover:bg-primary/10 self-start md:self-center"
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