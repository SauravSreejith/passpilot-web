import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  
  const navItems = [
    "Bare Minimum Calculator",
    "Topic Triage System", 
    "Crisis Mode Protocol",
    "Dual Track Strategy"
  ];

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
                key={item}
                variant="ghost"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* User Profile */}
          <Button
            onClick={() => navigate("/login")}
            variant="ghost"
            size="icon"
            className="rounded-full bg-white hover:bg-white/90 transition-all duration-300"
          >
            <User className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;