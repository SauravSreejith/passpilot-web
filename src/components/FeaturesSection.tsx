import { Grid3X3, FolderOpen, AlertTriangle, CheckCircle } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: Grid3X3,
      title: "Bare Minimum Calculator",
      description: "Calculate the exact minimum effort needed to pass each subject.",
      gradient: "bg-gradient-to-br from-card to-secondary/50"
    },
    {
      icon: FolderOpen,
      title: "Topic Triage System", 
      description: "Prioritize topics based on exam weightage and understanding.",
      gradient: "bg-gradient-to-br from-purple-900/30 to-primary/20"
    },
    {
      icon: AlertTriangle,
      title: "Crisis Mode Protocol",
      description: "Emergency study plans for last-minute preparation.",
      gradient: "bg-gradient-to-br from-primary/30 to-accent/20"
    },
    {
      icon: CheckCircle,
      title: "Dual Track Strategy",
      description: "Balance minimum marks and maximum scores efficiently.",
      gradient: "bg-gradient-to-br from-accent/20 to-primary/30"
    }
  ];

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;