import { useRef, useState, useEffect } from "react";
import { type SimulationResult, type PropertyInput, CITIES, FURNITURE_QUALITY, validateResults } from "@/lib/moroccan-market-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { TrendingUp, Sun, Cloud, Calendar, ArrowLeft, ArrowRight, Info, Download, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domosiaLogo from "@/assets/domosia-logo.png";

type Props = {
  result: SimulationResult;
  input: PropertyInput;
  onBack: () => void;
};

function fmt(n: number) {
  return new Intl.NumberFormat("fr-MA").format(n);
}

const PDF_FOOTER = {
  site: "DOMOSIA.ma",
  email: "hello@domosia.ma",
  whatsapp: "+212 777 237 983",
};

export default function SimulationResults({ result, input, onBack }: Props) {
  const { tr, dir, lang } = useI18n();
  const city = CITIES[input.city];
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const resultWarnings = validateResults(result, input);

  const ArrowBackward = dir === "rtl" ? ArrowRight : ArrowLeft;

  // Send admin notification on mount
  useEffect(() => {
    if (!emailSent) {
      supabase.functions.invoke("send-admin-notification", {
        body: { input, result },
      }).then(() => setEmailSent(true)).catch(console.error);
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!page1Ref.current || !page2Ref.current) return;
    setDownloading(true);
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Helper to render a ref to a page
      const renderPage = async (ref: HTMLDivElement, pageIndex: number) => {
        if (pageIndex > 0) pdf.addPage();
        const canvas = await html2canvas(ref, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#faf8f5",
        });
        const imgData = canvas.toDataURL("image/png");
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        
        // White background for logo area
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pdfWidth, 20, "F");
        // Add logo at top
        pdf.addImage(domosiaLogo, "PNG", pdfWidth / 2 - 20, 2, 40, 16);

        // Add content below logo
        const contentY = 20;
        const availableHeight = pageHeight - 30; // leave room for footer
        pdf.addImage(imgData, "PNG", 0, contentY, pdfWidth, Math.min(imgHeight, availableHeight));

        // Footer
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        const footerY = pageHeight - 8;
        pdf.text(`${PDF_FOOTER.site}  |  ${PDF_FOOTER.email}  |  WhatsApp: ${PDF_FOOTER.whatsapp}`, pdfWidth / 2, footerY, { align: "center" });
        pdf.setDrawColor(200, 200, 200);
        pdf.line(15, footerY - 4, pdfWidth - 15, footerY - 4);
      };

      await renderPage(page1Ref.current, 0);
      await renderPage(page2Ref.current, 1);

      pdf.save(`simulation-domosia-${input.city}-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const propertyLabel = input.propertyType === "studio" ? tr("property.studio") 
    : input.propertyType === "apartment" ? tr("property.apartment") 
    : input.propertyType === "villa" ? tr("property.villa") 
    : tr("property.riad");

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8" dir={dir}>
      {/* ===== PAGE 1: Summary + Key Metrics ===== */}
      <div ref={page1Ref} className="space-y-6 bg-[#faf8f5] p-4">
        {/* Result warnings */}
        {resultWarnings.length > 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 animate-fade-up">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-destructive">{tr("results.unrealisticWarning")}</p>
                {resultWarnings.map((w, i) => (
                  <p key={i} className="text-sm text-destructive/80">{w.message}</p>
                ))}
                <p className="text-sm text-muted-foreground">{tr("results.adjustRecommendation")}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header summary */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm animate-fade-up">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                {propertyLabel}
                {" · "}{city?.label}{input.neighborhood ? `, ${input.neighborhood}` : ""}
                {" · "}{input.bedrooms} {tr("property.bedrooms").toLowerCase()}
              </p>
              <h2 className="text-3xl font-serif mt-2" style={{ lineHeight: "1.15" }}>
                {fmt(result.annualRevenue)} <span className="text-lg text-muted-foreground">{tr("results.annualRevenue")}</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-1">{tr("results.simulationFor")} {input.fullName}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              result.revenueIncrease > 0 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"
            }`}>
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {result.revenueIncrease > 0 ? "+" : ""}{result.revenueIncrease}% {tr("results.vsLongTerm")}
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ animationDelay: "100ms" }}>
          {[
            { icon: Sun, label: tr("results.highSeason"), value: `${fmt(result.nightlyRateHigh.min)}–${fmt(result.nightlyRateHigh.max)}`, sub: tr("common.madPerNight") },
            { icon: Cloud, label: tr("results.lowSeason"), value: `${fmt(result.nightlyRateLow.min)}–${fmt(result.nightlyRateLow.max)}`, sub: tr("common.madPerNight") },
            { icon: Calendar, label: tr("results.occupancy"), value: `${result.occupancyHigh}% / ${result.occupancyLow}%`, sub: tr("results.highLow") },
            { icon: TrendingUp, label: tr("results.longTermRevenue"), value: fmt(result.annualLongTerm), sub: tr("common.madPerYear") },
          ].map((m, i) => (
            <div
              key={m.label}
              className="bg-card rounded-xl border p-5 shadow-sm animate-fade-up"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <m.icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-muted-foreground font-medium">{m.label}</p>
              <p className="text-lg font-semibold mt-1 tabular-nums">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Revenue table */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm animate-fade-up" style={{ animationDelay: "200ms" }}>
          <h3 className="font-serif text-xl mb-4" style={{ lineHeight: "1.15" }}>{tr("results.monthlyEstimated")}</h3>
          <p className="text-xs text-muted-foreground mb-4">{tr("results.formula")}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-muted-foreground">{tr("results.scenario")}</th>
                  <th className="text-right py-3 font-medium text-muted-foreground">{tr("results.monthly")}</th>
                  <th className="text-right py-3 font-medium text-muted-foreground">{tr("results.annual")}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium flex items-center gap-2"><Sun className="w-4 h-4 text-primary" /> {tr("results.highSeasonLabel")}</td>
                  <td className="text-right tabular-nums font-medium">{fmt(result.monthlyRevenueHigh)} MAD</td>
                  <td className="text-right tabular-nums text-muted-foreground">{fmt(result.monthlyRevenueHigh * 6)} MAD</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium flex items-center gap-2"><Cloud className="w-4 h-4 text-chart-lt" /> {tr("results.lowSeasonLabel")}</td>
                  <td className="text-right tabular-nums font-medium">{fmt(result.monthlyRevenueLow)} MAD</td>
                  <td className="text-right tabular-nums text-muted-foreground">{fmt(result.monthlyRevenueLow * 6)} MAD</td>
                </tr>
                <tr className="bg-primary/5 rounded">
                  <td className="py-3 font-semibold">{tr("results.annualEstimate")}</td>
                  <td></td>
                  <td className="text-right tabular-nums font-bold text-primary">{fmt(result.annualRevenue)} MAD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Scenarios */}
        <div className="grid md:grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="bg-accent/10 rounded-xl border border-accent/20 p-6">
            <h4 className="font-semibold text-accent mb-1">{tr("results.bestCase")}</h4>
            <p className="text-2xl font-serif tabular-nums" style={{ lineHeight: "1.15" }}>{fmt(result.bestCase)} {tr("common.madPerYear")}</p>
            <p className="text-xs text-muted-foreground mt-1">{tr("results.bestCaseDesc")}</p>
          </div>
          <div className="bg-muted rounded-xl border p-6">
            <h4 className="font-semibold text-muted-foreground mb-1">{tr("results.worstCase")}</h4>
            <p className="text-2xl font-serif tabular-nums" style={{ lineHeight: "1.15" }}>{fmt(result.worstCase)} {tr("common.madPerYear")}</p>
            <p className="text-xs text-muted-foreground mt-1">{tr("results.worstCaseDesc")}</p>
          </div>
        </div>
      </div>

      {/* ===== PAGE 2: Chart + Assumptions + Disclaimer ===== */}
      <div ref={page2Ref} className="space-y-6 bg-[#faf8f5] p-4">
        {/* Chart */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm animate-fade-up" style={{ animationDelay: "300ms" }}>
          <h3 className="font-serif text-xl mb-6" style={{ lineHeight: "1.15" }}>{tr("results.monthlyComparison")}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.monthlyData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))", fontSize: 13 }}
                  formatter={(value: number) => [`${fmt(value)} MAD`]}
                />
                <Legend />
                <Bar dataKey="shortTerm" name={tr("results.shortTerm")} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="longTerm" name={tr("results.longTerm")} fill="hsl(var(--chart-lt))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assumptions */}
        <div className="bg-muted/50 rounded-xl border p-6 animate-fade-up" style={{ animationDelay: "500ms" }}>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">{tr("results.assumptions")}</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>{tr("assumptions.occupancy")} {result.occupancyHigh}% {tr("assumptions.highSeason")} {result.occupancyLow}% {tr("assumptions.lowSeason")}</li>
                <li>{tr("assumptions.seasonInfo")}</li>
                <li>{tr("assumptions.formulaDetail")}</li>
                <li>{tr("assumptions.marketBased")}</li>
                <li>{tr("assumptions.feesNotIncluded")}</li>
                <li>{tr("assumptions.scenarios")}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-destructive/5 border border-destructive/15 rounded-xl p-4 animate-fade-up" style={{ animationDelay: "550ms" }}>
          <p className="text-xs text-muted-foreground text-center italic">
            {tr("disclaimer")}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowBackward className="w-4 h-4" /> {tr("results.newSimulation")}
        </Button>
        <Button onClick={handleDownloadPDF} disabled={downloading} className="gap-2">
          {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {downloading ? tr("results.generating") : tr("results.downloadPdf")}
        </Button>
      </div>
    </div>
  );
}
