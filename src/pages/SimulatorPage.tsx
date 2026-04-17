import { useState } from "react";
import { Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyForm from "@/simulator/components/PropertyForm";
import SimulationResults from "@/simulator/components/SimulationResults";
import { simulateRevenue, type PropertyInput, type SimulationResult } from "@/simulator/lib/moroccan-market-data";
import { useLanguage } from "@/contexts/LanguageContext";

const SimulatorContent = () => {
  const { t: tr, dir } = useLanguage();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [lastInput, setLastInput] = useState<PropertyInput | null>(null);

  const handleSubmit = (input: PropertyInput) => {
    const sim = simulateRevenue(input);
    setResult(sim);
    setLastInput(input);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setResult(null);
    setLastInput(null);
  };

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />
      
      {/* Hero */}
      <header className="relative overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 h-[400px] md:h-[500px]">
          <img 
            src="/images/hero-riad.jpg" 
            alt="Traditional Moroccan Riad" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-oxford/70 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-sm font-medium mb-6 animate-fade-up"
          >
            <Building2 className="w-4 h-4" />
            {tr("hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground animate-fade-up"
            style={{ lineHeight: "1.08", animationDelay: "80ms", textWrap: "balance" }}
          >
            {tr("hero.title")}
          </h1>
          <p
            className="mt-5 text-lg text-primary-foreground/80 max-w-xl mx-auto animate-fade-up font-body"
            style={{ animationDelay: "160ms", textWrap: "pretty" }}
          >
            {tr("hero.subtitle")}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16 -mt-10">
        <div className="bg-[#faf8f5] rounded-2xl shadow-xl border border-gold/10 overflow-hidden min-h-[600px]">
          {result && lastInput ? (
            <div className="p-4 md:p-8">
              <SimulationResults result={result} input={lastInput} onBack={handleBack} />
            </div>
          ) : (
            <div className="p-4 md:p-8">
              <PropertyForm onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function SimulatorPage() {
  return <SimulatorContent />;
}
