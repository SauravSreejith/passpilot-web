import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <HeroSection />
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <FeaturesSection />
        </div>
      </section>
    </div>
  );
};

export default Index;
