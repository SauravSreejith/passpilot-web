import { Grid3X3, FolderOpen, AlertTriangle, CheckCircle } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { useNavigate } from "react-router-dom";

const FeaturesSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Grid3X3,
      title: "Bare Minimum Calculator",
      description: "Calculate the exact minimum effort needed to pass each subject.",
      path: "/calculator"
    },
    {
      icon: FolderOpen,
      title: "Topic Triage System", 
      description: "Prioritize topics based on exam weightage and understanding.",
      path: "/triage"
    },
    {
      icon: AlertTriangle,
      title: "Crisis Mode Protocol",
      description: "Emergency study plans for last-minute preparation.",
      path: "/crisis"
    },
    {
      icon: CheckCircle,
      title: "Dual Track Strategy",
      description: "Balance minimum marks and maximum scores efficiently.",
      path: "/strategy"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          onClick={() => navigate(feature.path)}
          className="cursor-pointer"
        >
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;