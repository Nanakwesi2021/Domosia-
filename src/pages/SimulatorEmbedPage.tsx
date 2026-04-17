import { useState } from "react";
import PropertyForm from "@/simulator/components/PropertyForm";
import SimulationResults from "@/simulator/components/SimulationResults";
import { simulateRevenue, type PropertyInput, type SimulationResult } from "@/simulator/lib/moroccan-market-data";
import { useLanguage } from "@/contexts/LanguageContext";

const EmbedContent = () => {
  const { dir } = useLanguage();
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
    <div className="min-h-screen bg-transparent px-4 py-4" dir={dir}>
      <div className="max-w-4xl mx-auto">
        {result && lastInput ? (
          <SimulationResults result={result} input={lastInput} onBack={handleBack} />
        ) : (
          <PropertyForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default function SimulatorEmbedPage() {
  return <EmbedContent />;
}
