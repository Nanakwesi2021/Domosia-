import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PropertyForm from "./components/PropertyForm";
import SimulationResults from "./components/SimulationResults";
import { simulateRevenue, type PropertyInput, type SimulationResult } from "./lib/moroccan-market-data";

export default function SimulatorView() {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [lastInput, setLastInput] = useState<PropertyInput | null>(null);
  const { dir } = useLanguage();

  const handleSubmit = (input: PropertyInput) => {
    const sim = simulateRevenue(input);
    setResult(sim);
    setLastInput(input);
  };

  const handleBack = () => {
    setResult(null);
    setLastInput(null);
  };

  return (
    <div className="w-full h-full p-4 overflow-y-auto bg-[#faf8f5]" dir={dir}>
      <div className="max-w-4xl mx-auto py-8">
        {result && lastInput ? (
          <SimulationResults result={result} input={lastInput} onBack={handleBack} />
        ) : (
          <PropertyForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
