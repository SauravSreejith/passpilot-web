import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FeaturesSection from "@/components/FeaturesSection";
import CircularProgress from "@/components/CircularProgress";
import { Compass } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  if (!username) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Greeting Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-left">
              Hey {username}!
            </h1>
            <p className="text-lg text-muted-foreground text-left">
              Have an exam tomorrow? Study with us!
            </p>
          </div>
          
          {/* Progress Circle */}
          <div className="ml-8 text-center">
            <CircularProgress percentage={67} />
            <p className="text-lg font-bold text-foreground mt-4">Your progress</p>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Compass className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-foreground">Explore</h2>
          </div>
          <FeaturesSection />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;