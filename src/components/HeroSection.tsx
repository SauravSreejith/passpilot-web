const HeroSection = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
          The strategic
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            KTU Survival Guide.
          </span>
        </h1>
        
        <div className="space-y-2 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <p>Beat exam anxiety. Plan smart. Prioritize wisely.</p>
          <p className="font-semibold text-foreground">Pass with confidence.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;