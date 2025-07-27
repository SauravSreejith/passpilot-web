import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Bare Minimum Calculator", id: "section-1" },
    { name: "Topic Triage System", id: "section-2" },
    { name: "Crisis Mode Protocol", id: "section-3" },
    { name: "Dual Track Strategy", id: "section-4" }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-foreground">PassPilot</h1>
        
        {/* Navigation Items and User Profile */}
        <div className="flex items-center space-x-6">
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* User Profile */}
          <Button
            onClick={() => navigate("/login")}
            variant="ghost"
            size="icon"
            className="rounded-full bg-white hover:bg-white/90 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-glow"
          >
            <User className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;