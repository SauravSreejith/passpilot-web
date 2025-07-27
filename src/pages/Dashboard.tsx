import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    course: "",
    semester: "",
    subject: "",
    internalMarks: "",
    studiedTopics: ""
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDone = () => {
    // Store form data and navigate to results
    localStorage.setItem("examData", JSON.stringify(formData));
    navigate("/results");
  };

  if (!username) {
    return null;
  }

  const courses = ["CSE", "ECE", "ICE", "ME", "CE", "EEE"];
  const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
  const subjects = ["Operating systems", "Computer Networks"];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Greeting Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-left">
            Hey {username}!
          </h1>
          <p className="text-lg text-muted-foreground text-left mb-12">
            Last-minute prep? Join us and power through!
          </p>

          {/* Exam Form */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-foreground text-left">
              Do you have an exam tomorrow?
            </h2>

            {/* Dropdown Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select onValueChange={(value) => handleInputChange("course", value)}>
                <SelectTrigger className="h-12 bg-background/20 border-border/30 text-foreground">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border max-h-40">
                  {courses.map((course) => (
                    <SelectItem key={course} value={course} className="text-foreground hover:bg-accent">
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleInputChange("semester", value)}>
                <SelectTrigger className="h-12 bg-background/20 border-border/30 text-foreground">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border max-h-40">
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester} className="text-foreground hover:bg-accent">
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger className="h-12 bg-background/20 border-border/30 text-foreground">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border max-h-40">
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="text-foreground hover:bg-accent">
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Internal Marks Input */}
            <div className="space-y-2">
              <Input
                placeholder="Enter your internal marks"
                value={formData.internalMarks}
                onChange={(e) => handleInputChange("internalMarks", e.target.value)}
                className="h-12 bg-background/20 border-border/30 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Topics Section */}
            <div className="space-y-4">
              <p className="text-lg text-foreground text-left">
                Select the topics you have already studied :
              </p>
              <div className="min-h-[200px] p-6 rounded-xl bg-background/20 border border-border/30">
                <Textarea
                  placeholder="Enter the topics you have studied (one per line)"
                  value={formData.studiedTopics}
                  onChange={(e) => handleInputChange("studiedTopics", e.target.value)}
                  className="min-h-[150px] bg-transparent border-none text-foreground placeholder:text-muted-foreground resize-none focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Done Button */}
            <div className="text-left">
              <Button 
                onClick={handleDone}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;