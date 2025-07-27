import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // NEW: For topic selection
import { getTopicsForCourse } from "@/services/api"; // NEW: Import API service
import { Label } from "@/components/ui/label"; // NEW: For checkbox labels

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // NEW: State to manage form data and dynamic content
  const [course, setCourse] = useState("");
  const [internalMarks, setInternalMarks] = useState("");
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [studiedTopics, setStudiedTopics] = useState<Set<string>>(new Set());
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  // NEW: Fetch topics when a course is selected
  useEffect(() => {
    if (course) {
      setIsLoadingTopics(true);
      getTopicsForCourse(course)
          .then((data) => {
            setAvailableTopics(data.topics || []);
            setStudiedTopics(new Set()); // Reset selection
          })
          .catch(error => {
            console.error("Failed to fetch topics:", error);
            setAvailableTopics([]); // Clear topics on error
          })
          .finally(() => setIsLoadingTopics(false));
    }
  }, [course]);

  // NEW: Handle checkbox changes for studied topics
  const handleTopicToggle = (topic: string) => {
    setStudiedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topic)) {
        newSet.delete(topic);
      } else {
        newSet.add(topic);
      }
      return newSet;
    });
  };

  const handleDone = () => {
    if (!course || !internalMarks) {
      alert("Please select a course and enter your internal marks.");
      return;
    }
    // NEW: Store structured data for the results page
    const examData = {
      courseCode: course,
      internalMarks: Number(internalMarks),
      studiedTopics: Array.from(studiedTopics),
    };
    localStorage.setItem("examData", JSON.stringify(examData));
    navigate("/results");
  };

  if (!username) return null;

  // NEW: Using a more realistic course code list that might exist in your backend
  const courses = [
    { code: "CST206", name: "Operating Systems" },
    { code: "CST202", name: "Computer Networks" },
  ];

  return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-left">
              Hey {username}!
            </h1>
            <p className="text-lg text-muted-foreground text-left mb-12">
              Last-minute prep? Join us and power through!
            </p>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground text-left">
                Tell us about your exam
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select onValueChange={(value) => setCourse(value)}>
                  <SelectTrigger className="h-12 bg-background/20 border-border/30 text-foreground">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border max-h-40">
                    {courses.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="text-foreground hover:bg-accent">
                          {c.name} ({c.code})
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                    placeholder="Enter your internal marks (out of 150)"
                    type="number"
                    value={internalMarks}
                    onChange={(e) => setInternalMarks(e.target.value)}
                    className="h-12 bg-background/20 border-border/30 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-4">
                <p className="text-lg text-foreground text-left">
                  Select the topics you have already studied:
                </p>
                <div className="min-h-[200px] p-6 rounded-xl bg-background/20 border border-border/30">
                  {isLoadingTopics && <p className="text-muted-foreground">Loading topics...</p>}
                  {!isLoadingTopics && !availableTopics.length && course && <p className="text-muted-foreground">No topics found for this course. Check the course code.</p>}
                  {!course && <p className="text-muted-foreground">Please select a course to see topics.</p>}

                  {/* NEW: Dynamic Topic Checkbox Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {availableTopics.map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <Checkbox
                              id={topic}
                              onCheckedChange={() => handleTopicToggle(topic)}
                              checked={studiedTopics.has(topic)}
                          />
                          <Label htmlFor={topic} className="text-foreground font-normal cursor-pointer">
                            {topic}
                          </Label>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-left">
                <Button
                    onClick={handleDone}
                    disabled={!course || !internalMarks} // NEW: Disable button if form is incomplete
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Get My Strategy
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default Dashboard;