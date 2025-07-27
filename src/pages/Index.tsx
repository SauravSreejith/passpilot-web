import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Grid3X3, FolderOpen, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const features = [
    {
      icon: Grid3X3,
      title: "Bare Minimum Calculator",
      description: "Know exactly what it takes to pass — nothing more, nothing less. Get your survival score: the fewest topics you need to hit 40/100. Whether you've got 24 hours or just 6, PassPilot shows you the smartest way to spend every minute.",
      id: "section-1"
    },
    {
      icon: FolderOpen,
      title: "Topic Triage System", 
      description: "Not all chapters are created equal — study smart, not hard. Our AI sorts your syllabus into Green (must-study), Yellow (if time), and Red (skip) zones based on frequency, difficulty, and marks potential. Make every minute count.",
      id: "section-2"
    },
    {
      icon: AlertTriangle,
      title: "Crisis Mode Protocol",
      description: "Exam in 6 hours? We've got your back. Activate Panic Mode: ultra-condensed notes, cheat sheets, and high-yield topics served fast. Whether it's 2AM or 2 hours left — we'll help you squeeze out those lifesaving marks.",
      id: "section-3"
    },
    {
      icon: CheckCircle,
      title: "Dual-Track System",
      description: "Two paths. One goal: your success. Choose between Survival Track (just enough to pass) or Excellence Track (aim higher). Unlock higher goals once you've secured your pass — we'll guide the way.",
      id: "section-4"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <HeroSection />
      
      {/* Feature Sections */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index}
                id={feature.id}
                className={`flex items-center gap-16 group hover:scale-105 transition-all duration-500 hover:bg-card/10 rounded-3xl p-8 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-40 h-40 rounded-3xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-500 group-hover:shadow-glow">
                    <Icon className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                  <h2 className="text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className={`${isEven ? 'text-left' : 'text-right'}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-glow">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-primary"></div>
              </div>
              <h3 className="text-2xl font-bold text-foreground">PassPilot</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <button className="text-muted-foreground hover:text-foreground transition-colors text-left">
                About us
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors text-left">
                Help and support
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors text-left">
                Privacy and terms
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;