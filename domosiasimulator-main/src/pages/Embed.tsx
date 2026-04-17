import { useState } from "react";
import PropertyForm from "@/components/PropertyForm";
import SimulationResults from "@/components/SimulationResults";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { simulateRevenue, type PropertyInput, type SimulationResult } from "@/lib/moroccan-market-data";
import { useI18n } from "@/lib/i18n";

export default function Embed() {
  const { dir } = useI18n();
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
    <div className="min-h-screen bg-background px-4 py-8 md:py-12" dir={dir}>
      
      <div className="max-w-4xl mx-auto">
        {result && lastInput ? (
          <SimulationResults result={result} input={lastInput} onBack={handleBack} />
        ) : (
          <PropertyForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
