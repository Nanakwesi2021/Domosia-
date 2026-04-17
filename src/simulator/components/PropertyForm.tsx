import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CITIES, PROPERTY_TYPES, AMENITIES, FURNITURE_QUALITY,
  ROOM_LIMITS, RENT_RANGES, validateInputs,
  type PropertyInput, type ValidationWarning,
} from "@/simulator/lib/moroccan-market-data";
import { useLanguage, AMENITY_KEYS } from "@/contexts/LanguageContext";
import { Building2, MapPin, Sofa, ArrowRight, ArrowLeft, User, AlertTriangle } from "lucide-react";

type Props = { onSubmit: (input: PropertyInput) => void };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?\d{7,15}$/;

export default function PropertyForm({ onSubmit }: Props) {
  const { t: tr, dir } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PropertyInput>({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    city: "",
    neighborhood: "",
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    toilets: 1,
    amenities: [],
    furnitureQuality: "standard",
    longTermRent: 0,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const STEPS = [tr("steps.contact"), tr("steps.property"), tr("steps.location"), tr("steps.amenities")];

  const update = <K extends keyof PropertyInput>(key: K, val: PropertyInput[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const markTouched = (field: string) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const toggleAmenity = (a: string) =>
    update("amenities", form.amenities.includes(a) ? form.amenities.filter(x => x !== a) : [...form.amenities, a]);

  const cityNeighborhoods = form.city ? CITIES[form.city]?.neighborhoods ?? [] : [];
  const roomLimits = form.propertyType ? ROOM_LIMITS[form.propertyType] : null;
  const rentRange = form.city ? RENT_RANGES[form.city] : null;

  const nameValid = form.fullName.trim().length >= 3;
  const emailValid = EMAIL_REGEX.test(form.email.trim());
  const phoneValid = PHONE_REGEX.test(form.phone.replace(/\s/g, ""));

  const inputWarnings = validateInputs(form);

  const canNext = step === 0
    ? nameValid && emailValid && phoneValid
    : step === 1
    ? form.propertyType !== ""
    : step === 2
    ? form.city !== "" && form.longTermRent > 0 && inputWarnings.length === 0
    : true;

  const handleNext = () => {
    if (step === 0) {
      setTouched({ fullName: true, email: true, phone: true });
    }
    if (canNext) setStep(s => s + 1);
  };

  const propertyTypeLabel = (value: string) => {
    const key = `property.${value}` as const;
    return tr(key);
  };

  const qualityLabel = (value: string) => {
    const key = `amenities.${value}` as const;
    return tr(key);
  };

  const amenityLabel = (a: string) => {
    const key = AMENITY_KEYS[a];
    return key ? tr(key) : a;
  };

  const ArrowForward = dir === "rtl" ? ArrowLeft : ArrowRight;
  const ArrowBackward = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <div className="w-full max-w-2xl mx-auto" dir={dir}>
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                i === step
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : i < step
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i === 0 && <User className="w-4 h-4" />}
              {i === 1 && <Building2 className="w-4 h-4" />}
              {i === 2 && <MapPin className="w-4 h-4" />}
              {i === 3 && <Sofa className="w-4 h-4" />}
              {s}
            </button>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border p-8 shadow-sm">
        {/* Step 0: Contact */}
        {step === 0 && (
          <div className="space-y-5 animate-fade-up">
            <p className="text-sm text-muted-foreground mb-4">{tr("contact.intro")}</p>
            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("contact.fullName")} *</Label>
              <Input
                placeholder={tr("contact.fullNamePlaceholder")}
                value={form.fullName}
                onChange={e => update("fullName", e.target.value)}
                onBlur={() => markTouched("fullName")}
                className={touched.fullName && !nameValid ? "border-destructive" : ""}
              />
              {touched.fullName && !nameValid && (
                <p className="text-xs text-destructive mt-1">{tr("contact.fullNameError")}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("contact.email")} *</Label>
              <Input
                type="email"
                placeholder={tr("contact.emailPlaceholder")}
                value={form.email}
                onChange={e => update("email", e.target.value)}
                onBlur={() => markTouched("email")}
                className={touched.email && !emailValid ? "border-destructive" : ""}
              />
              {touched.email && !emailValid && (
                <p className="text-xs text-destructive mt-1">{tr("contact.emailError")}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("contact.phone")} *</Label>
              <Input
                type="tel"
                placeholder={tr("contact.phonePlaceholder")}
                value={form.phone}
                onChange={e => update("phone", e.target.value)}
                onBlur={() => markTouched("phone")}
                className={touched.phone && !phoneValid ? "border-destructive" : ""}
              />
              {touched.phone && !phoneValid && (
                <p className="text-xs text-destructive mt-1">{tr("contact.phoneError")}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 1: Property */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("property.type")}</Label>
              <div className="grid grid-cols-2 gap-3">
                {PROPERTY_TYPES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => {
                      update("propertyType", t.value);
                      const limits = ROOM_LIMITS[t.value];
                      if (limits) {
                        if (form.bedrooms > limits.maxBedrooms) update("bedrooms", limits.maxBedrooms);
                        if (form.beds > limits.maxBeds) update("beds", limits.maxBeds);
                        if (form.bathrooms > limits.maxBathrooms) update("bathrooms", limits.maxBathrooms);
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 active:scale-[0.97] ${
                      form.propertyType === t.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <span className="font-medium">{propertyTypeLabel(t.value)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {([
                ["bedrooms", tr("property.bedrooms"), roomLimits?.maxBedrooms ?? 10],
                ["beds", tr("property.beds"), roomLimits?.maxBeds ?? 15],
                ["bathrooms", tr("property.bathrooms"), roomLimits?.maxBathrooms ?? 8],
                ["toilets", tr("property.toilets"), 10],
              ] as [keyof PropertyInput, string, number][]).map(([key, label, max]) => (
                <div key={key}>
                  <Label className="text-sm font-semibold mb-2 block">{label}</Label>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors active:scale-95"
                      onClick={() => update(key, Math.max(key === "bedrooms" && form.propertyType === "studio" ? 0 : 1, (form[key] as number) - 1))}
                    >−</button>
                    <span className="w-8 text-center font-medium tabular-nums">{form[key] as number}</span>
                    <button
                      className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors active:scale-95"
                      onClick={() => update(key, Math.min(max, (form[key] as number) + 1))}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("location.city")}</Label>
              <Select value={form.city} onValueChange={v => { update("city", v); update("neighborhood", ""); }}>
                <SelectTrigger><SelectValue placeholder={tr("location.cityPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  {Object.entries(CITIES).map(([k, c]) => (
                    <SelectItem key={k} value={k}>{tr(`city.${k}`)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {cityNeighborhoods.length > 0 && (
              <div>
                <Label className="text-sm font-semibold mb-2 block">{tr("location.neighborhood")}</Label>
                <Select value={form.neighborhood} onValueChange={v => update("neighborhood", v)}>
                  <SelectTrigger><SelectValue placeholder={tr("location.neighborhoodPlaceholder")} /></SelectTrigger>
                  <SelectContent>
                    {cityNeighborhoods.map(n => (
                      <SelectItem key={n} value={n}>{tr(`neighborhood.${n}`)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("location.longTermRent")} ({tr("common.madPerMonth")})</Label>
              <Input
                type="number"
                placeholder={rentRange ? `${rentRange.min.toLocaleString()} - ${rentRange.max.toLocaleString()}` : "Ex: 5000"}
                value={form.longTermRent || ""}
                onChange={e => update("longTermRent", Number(e.target.value))}
                className="tabular-nums"
              />
              <p className="text-xs text-muted-foreground mt-1">{tr("location.longTermRentHint")}</p>
            </div>

            {inputWarnings.length > 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-destructive text-sm font-semibold">
                  <AlertTriangle className="w-4 h-4" /> {tr("location.outOfRange")}
                </div>
                {inputWarnings.map((w, i) => (
                  <p key={i} className="text-sm text-destructive/80">{tr(w.key, w.params)}</p>
                ))}
                <p className="text-xs text-muted-foreground">{tr("location.fixValues")}</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Amenities */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <Label className="text-sm font-semibold mb-2 block">{tr("amenities.quality")}</Label>
              <div className="grid grid-cols-3 gap-3">
                {FURNITURE_QUALITY.map(q => (
                  <button
                    key={q.value}
                    onClick={() => update("furnitureQuality", q.value)}
                    className={`p-3 rounded-xl border-2 text-center transition-all duration-200 active:scale-[0.97] ${
                      form.furnitureQuality === q.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40 hover:shadow-sm"
                    }`}
                  >
                    <span className="font-medium text-sm">{qualityLabel(q.value)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-3 block">{tr("amenities.label")}</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES.map(a => (
                  <label
                    key={a}
                    className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      checked={form.amenities.includes(a)}
                      onCheckedChange={() => toggleAmenity(a)}
                    />
                    <span className="text-sm">{amenityLabel(a)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowBackward className="w-4 h-4" /> {tr("common.back")}
          </Button>

          {step < 3 ? (
            <Button onClick={handleNext} disabled={!canNext} className="gap-2">
              {tr("common.next")} <ArrowForward className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => onSubmit(form)} className="gap-2">
              {tr("form.simulate")} <ArrowForward className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
