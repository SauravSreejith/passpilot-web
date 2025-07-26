import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Navigation = () => {
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
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-foreground">PassPilot</h1>
          
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
        </div>

        {/* User Profile */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-gradient-card border border-border hover:shadow-glow transition-all duration-300"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;