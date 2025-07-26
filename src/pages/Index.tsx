import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { Grid3X3, FolderOpen, AlertTriangle, CheckCircle } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Grid3X3,
      title: "Bare Minimum Calculator",
      description: "Calculate the exact minimum effort needed to pass each subject.",
    },
    {
      icon: FolderOpen,
      title: "Topic Triage System", 
      description: "Prioritize topics based on exam weightage and understanding.",
    },
    {
      icon: AlertTriangle,
      title: "Crisis Mode Protocol",
      description: "Emergency study plans for last-minute preparation.",
    },
    {
      icon: CheckCircle,
      title: "Dual Track Strategy",
      description: "Balance minimum marks and maximum scores efficiently.",
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
                className={`flex items-center gap-16 group hover:scale-105 transition-all duration-500 hover:bg-card/10 rounded-3xl p-8 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-3xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-500 group-hover:shadow-glow">
                    <Icon className="h-16 w-16 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                  <h2 className="text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">PassPilot</h3>
              <p className="text-muted-foreground">The strategic KTU survival guide</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 text-center md:text-right">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Product</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Calculator</li>
                  <li>Triage System</li>
                  <li>Crisis Mode</li>
                  <li>Strategy</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Company</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>About</li>
                  <li>Contact</li>
                  <li>Privacy</li>
                  <li>Terms</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-muted-foreground">
            <p>&copy; 2024 PassPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
