import { useState } from "react";
import heroImage from "@/assets/hero-riad.jpg";
import PropertyForm from "@/components/PropertyForm";
import SimulationResults from "@/components/SimulationResults";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { simulateRevenue, type PropertyInput, type SimulationResult } from "@/lib/moroccan-market-data";
import { useI18n } from "@/lib/i18n";
import { Building2 } from "lucide-react";

export default function Index() {
  const { tr, dir } = useI18n();
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
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <LanguageSwitcher />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/15 backdrop-blur-sm border border-background/20 text-primary-foreground text-sm font-medium mb-6 animate-fade-up"
          >
            <Building2 className="w-4 h-4" />
            {tr("hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground animate-fade-up"
            style={{ lineHeight: "1.08", animationDelay: "80ms", textWrap: "balance" }}
          >
            {tr("hero.title")}
          </h1>
          <p
            className="mt-5 text-lg text-primary-foreground/80 max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: "160ms", textWrap: "pretty" }}
          >
            {tr("hero.subtitle")}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {result && lastInput ? (
          <SimulationResults result={result} input={lastInput} onBack={handleBack} />
        ) : (
          <PropertyForm onSubmit={handleSubmit} />
        )}
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>{tr("hero.footer")}</p>
      </footer>
    </div>
  );
}
