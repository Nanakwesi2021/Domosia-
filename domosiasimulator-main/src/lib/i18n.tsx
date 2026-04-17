import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Lang = "fr" | "en" | "ar";

type Translations = Record<string, Record<Lang, string>>;

export const t: Translations = {
  // Common
  "common.next": { fr: "Suivant", en: "Next", ar: "التالي" },
  "common.back": { fr: "Retour", en: "Back", ar: "رجوع" },
  "common.madPerYear": { fr: "MAD/an", en: "MAD/year", ar: "درهم/سنة" },
  "common.madPerNight": { fr: "MAD/nuit", en: "MAD/night", ar: "درهم/ليلة" },
  "common.madPerMonth": { fr: "MAD/mois", en: "MAD/month", ar: "درهم/شهر" },

  // Step labels
  "steps.contact": { fr: "Contact", en: "Contact", ar: "التواصل" },
  "steps.property": { fr: "Propriété", en: "Property", ar: "العقار" },
  "steps.location": { fr: "Localisation", en: "Location", ar: "الموقع" },
  "steps.amenities": { fr: "Équipements", en: "Amenities", ar: "المرافق" },

  // Contact form
  "contact.intro": { fr: "Veuillez renseigner vos coordonnées pour recevoir votre simulation personnalisée.", en: "Please enter your details to receive your personalized simulation.", ar: "يرجى إدخال بياناتك للحصول على محاكاة مخصصة." },
  "contact.fullName": { fr: "Nom complet", en: "Full name", ar: "الاسم الكامل" },
  "contact.fullNamePlaceholder": { fr: "Ex: Ahmed Benali", en: "Ex: Ahmed Benali", ar: "مثال: أحمد بنعلي" },
  "contact.fullNameError": { fr: "Veuillez entrer votre nom complet (min. 3 caractères)", en: "Please enter your full name (min. 3 characters)", ar: "يرجى إدخال اسمك الكامل (3 أحرف على الأقل)" },
  "contact.email": { fr: "Email", en: "Email", ar: "البريد الإلكتروني" },
  "contact.emailPlaceholder": { fr: "Ex: ahmed@email.com", en: "Ex: ahmed@email.com", ar: "مثال: ahmed@email.com" },
  "contact.emailError": { fr: "Veuillez entrer une adresse email valide", en: "Please enter a valid email address", ar: "يرجى إدخال بريد إلكتروني صالح" },
  "contact.phone": { fr: "Téléphone", en: "Phone", ar: "الهاتف" },
  "contact.phonePlaceholder": { fr: "Ex: +212 6 12 34 56 78", en: "Ex: +212 6 12 34 56 78", ar: "+212 6 12 34 56 78 :مثال" },
  "contact.phoneError": { fr: "Numéro marocain valide requis (ex: +212612345678 ou 0612345678)", en: "Valid Moroccan number required (ex: +212612345678 or 0612345678)", ar: "مطلوب رقم مغربي صالح (مثال: 0612345678 أو 212612345678+)" },

  // Property
  "property.type": { fr: "Type de propriété", en: "Property type", ar: "نوع العقار" },
  "property.studio": { fr: "Studio", en: "Studio", ar: "استوديو" },
  "property.apartment": { fr: "Appartement", en: "Apartment", ar: "شقة" },
  "property.villa": { fr: "Villa", en: "Villa", ar: "فيلا" },
  "property.riad": { fr: "Riad", en: "Riad", ar: "رياض" },
  "property.bedrooms": { fr: "Chambres", en: "Bedrooms", ar: "غرف النوم" },
  "property.beds": { fr: "Lits", en: "Beds", ar: "الأسرّة" },
  "property.bathrooms": { fr: "Salles de bain", en: "Bathrooms", ar: "الحمامات" },
  "property.toilets": { fr: "Toilettes", en: "Toilets", ar: "المراحيض" },

  // Location
  "location.city": { fr: "Ville", en: "City", ar: "المدينة" },
  "location.cityPlaceholder": { fr: "Sélectionnez une ville", en: "Select a city", ar: "اختر مدينة" },
  "location.neighborhood": { fr: "Quartier", en: "Neighborhood", ar: "الحي" },
  "location.neighborhoodPlaceholder": { fr: "Sélectionnez un quartier", en: "Select a neighborhood", ar: "اختر حياً" },
  "location.longTermRent": { fr: "Loyer longue durée", en: "Long-term rent", ar: "إيجار طويل الأمد" },
  "location.longTermRentHint": { fr: "Utilisé pour comparer avec les revenus locatifs courte durée", en: "Used to compare with short-term rental revenue", ar: "يُستخدم للمقارنة مع إيرادات الإيجار القصير الأمد" },
  "location.outOfRange": { fr: "Données hors limites", en: "Data out of range", ar: "بيانات خارج النطاق" },
  "location.fixValues": { fr: "Veuillez corriger les valeurs avant de continuer.", en: "Please fix the values before continuing.", ar: "يرجى تصحيح القيم قبل المتابعة." },

  // Amenities
  "amenities.quality": { fr: "Qualité de l'ameublement", en: "Furniture quality", ar: "جودة الأثاث" },
  "amenities.basic": { fr: "Basique", en: "Basic", ar: "أساسي" },
  "amenities.standard": { fr: "Standard", en: "Standard", ar: "عادي" },
  "amenities.luxury": { fr: "Luxe", en: "Luxury", ar: "فاخر" },
  "amenities.label": { fr: "Équipements", en: "Amenities", ar: "المرافق" },
  "amenities.wifi": { fr: "WiFi", en: "WiFi", ar: "واي فاي" },
  "amenities.ac": { fr: "Climatisation", en: "Air conditioning", ar: "تكييف" },
  "amenities.pool": { fr: "Piscine", en: "Pool", ar: "مسبح" },
  "amenities.parking": { fr: "Parking", en: "Parking", ar: "موقف سيارات" },
  "amenities.terrace": { fr: "Terrasse", en: "Terrace", ar: "تراس" },
  "amenities.kitchen": { fr: "Cuisine équipée", en: "Equipped kitchen", ar: "مطبخ مجهز" },
  "amenities.washer": { fr: "Machine à laver", en: "Washing machine", ar: "غسالة" },
  "amenities.tv": { fr: "TV", en: "TV", ar: "تلفاز" },
  "amenities.garden": { fr: "Jardin", en: "Garden", ar: "حديقة" },
  "amenities.seaView": { fr: "Vue mer", en: "Sea view", ar: "إطلالة بحرية" },
  "amenities.fireplace": { fr: "Cheminée", en: "Fireplace", ar: "مدفأة" },
  "amenities.jacuzzi": { fr: "Jacuzzi", en: "Jacuzzi", ar: "جاكوزي" },
  "amenities.gym": { fr: "Salle de sport", en: "Gym", ar: "صالة رياضة" },

  // Simulate button
  "form.simulate": { fr: "Simuler le revenu", en: "Simulate revenue", ar: "محاكاة الإيرادات" },

  // Results
  "results.annualRevenue": { fr: "MAD/an", en: "MAD/year", ar: "درهم/سنة" },
  "results.simulationFor": { fr: "Simulation pour", en: "Simulation for", ar: "محاكاة لـ" },
  "results.vsLongTerm": { fr: "vs longue durée", en: "vs long-term", ar: "مقارنة بالإيجار الطويل" },
  "results.highSeason": { fr: "Tarif haute saison", en: "High season rate", ar: "سعر الموسم المرتفع" },
  "results.lowSeason": { fr: "Tarif basse saison", en: "Low season rate", ar: "سعر الموسم المنخفض" },
  "results.occupancy": { fr: "Taux d'occupation", en: "Occupancy rate", ar: "نسبة الإشغال" },
  "results.highLow": { fr: "haute / basse", en: "high / low", ar: "مرتفع / منخفض" },
  "results.longTermRevenue": { fr: "Revenu longue durée", en: "Long-term revenue", ar: "إيرادات طويلة الأمد" },
  "results.monthlyEstimated": { fr: "Revenus mensuels estimés", en: "Estimated monthly revenue", ar: "الإيرادات الشهرية المقدرة" },
  "results.formula": { fr: "Formule : Revenu = tarif/nuit × taux d'occupation × 30 jours, avec pondération saisonnière", en: "Formula: Revenue = rate/night × occupancy rate × 30 days, with seasonal weighting", ar: "الصيغة: الإيرادات = السعر/ليلة × نسبة الإشغال × 30 يوماً، مع ترجيح موسمي" },
  "results.scenario": { fr: "Scénario", en: "Scenario", ar: "السيناريو" },
  "results.monthly": { fr: "Mensuel", en: "Monthly", ar: "شهري" },
  "results.annual": { fr: "Annuel", en: "Annual", ar: "سنوي" },
  "results.highSeasonLabel": { fr: "Haute saison", en: "High season", ar: "الموسم المرتفع" },
  "results.lowSeasonLabel": { fr: "Basse saison", en: "Low season", ar: "الموسم المنخفض" },
  "results.annualEstimate": { fr: "Estimation annuelle", en: "Annual estimate", ar: "التقدير السنوي" },
  "results.monthlyComparison": { fr: "Comparaison mensuelle", en: "Monthly comparison", ar: "مقارنة شهرية" },
  "results.shortTerm": { fr: "Courte durée", en: "Short-term", ar: "قصير الأمد" },
  "results.longTerm": { fr: "Longue durée", en: "Long-term", ar: "طويل الأمد" },
  "results.bestCase": { fr: "Meilleur scénario", en: "Best case", ar: "أفضل سيناريو" },
  "results.bestCaseDesc": { fr: "Occupation optimale + haute demande", en: "Optimal occupancy + high demand", ar: "إشغال مثالي + طلب مرتفع" },
  "results.worstCase": { fr: "Pire scénario", en: "Worst case", ar: "أسوأ سيناريو" },
  "results.worstCaseDesc": { fr: "Occupation faible + basse saison prolongée", en: "Low occupancy + extended low season", ar: "إشغال ضعيف + موسم منخفض ممتد" },
  "results.assumptions": { fr: "Hypothèses de la simulation", en: "Simulation assumptions", ar: "فرضيات المحاكاة" },
  "results.newSimulation": { fr: "Nouvelle simulation", en: "New simulation", ar: "محاكاة جديدة" },
  "results.downloadPdf": { fr: "Télécharger PDF", en: "Download PDF", ar: "تحميل PDF" },
  "results.generating": { fr: "Génération...", en: "Generating...", ar: "جاري التوليد..." },
  "results.unrealisticWarning": { fr: "Attention : résultats potentiellement irréalistes", en: "Warning: potentially unrealistic results", ar: "تنبيه: نتائج قد تكون غير واقعية" },
  "results.adjustRecommendation": { fr: "Nous vous recommandons de relancer la simulation avec des données ajustées.", en: "We recommend relaunching the simulation with adjusted data.", ar: "نوصي بإعادة المحاكاة ببيانات معدلة." },

  // Disclaimer
  "disclaimer": {
    fr: "⚠️ Avertissement : Les résultats estimés ne sont pas garantis et peuvent varier en fonction des conditions locales, de la saisonnalité, de la concurrence et de la qualité de gestion. Cette simulation est fournie à titre indicatif uniquement et ne constitue pas un engagement contractuel de la part de DOMOSIA.",
    en: "⚠️ Disclaimer: Estimated results are not guaranteed and may vary depending on local conditions, seasonality, competition, and management quality. This simulation is provided for informational purposes only and does not constitute a contractual commitment from DOMOSIA.",
    ar: "⚠️ تنبيه: النتائج المقدّرة غير مضمونة وقد تتغير حسب الظروف المحلية والموسمية والمنافسة وجودة الإدارة. هذه المحاكاة مقدمة لأغراض إعلامية فقط ولا تشكل التزاماً تعاقدياً من طرف DOMOSIA.",
  },

  // Hero
  "hero.badge": { fr: "Simulateur de revenus locatifs", en: "Rental revenue simulator", ar: "محاكي إيرادات الإيجار" },
  "hero.title": { fr: "Estimez le potentiel de votre bien au Maroc", en: "Estimate your property's potential in Morocco", ar: "قدّر إمكانيات عقارك في المغرب" },
  "hero.subtitle": { fr: "Comparez les revenus courte durée vs longue durée grâce aux données du marché marocain.", en: "Compare short-term vs long-term rental revenue using Moroccan market data.", ar: "قارن إيرادات الإيجار القصير والطويل الأمد باستخدام بيانات السوق المغربي." },
  "hero.footer": { fr: "Les estimations sont basées sur les moyennes du marché marocain et ne constituent pas un conseil financier.", en: "Estimates are based on Moroccan market averages and do not constitute financial advice.", ar: "التقديرات مبنية على متوسطات السوق المغربي ولا تعتبر استشارة مالية." },

  // Assumptions details
  "assumptions.occupancy": { fr: "Taux d'occupation:", en: "Occupancy rate:", ar: "نسبة الإشغال:" },
  "assumptions.highSeason": { fr: "en haute saison,", en: "in high season,", ar: "في الموسم المرتفع،" },
  "assumptions.lowSeason": { fr: "en basse saison", en: "in low season", ar: "في الموسم المنخفض" },
  "assumptions.seasonInfo": { fr: "Haute saison Maroc : été, printemps, décembre, janvier + vacances scolaires (varie selon la ville)", en: "Morocco high season: summer, spring, December, January + school holidays (varies by city)", ar: "الموسم المرتفع في المغرب: الصيف، الربيع، ديسمبر، يناير + العطل المدرسية (يختلف حسب المدينة)" },
  "assumptions.formulaDetail": { fr: "Formule : Revenu = tarif/nuit × taux d'occupation × 30 jours", en: "Formula: Revenue = rate/night × occupancy rate × 30 days", ar: "الصيغة: الإيرادات = السعر/ليلة × نسبة الإشغال × 30 يوماً" },
  "assumptions.marketBased": { fr: "Tarifs basés sur les moyennes du marché marocain pour des propriétés similaires", en: "Rates based on Moroccan market averages for similar properties", ar: "الأسعار مبنية على متوسطات السوق المغربي لعقارات مماثلة" },
  "assumptions.feesNotIncluded": { fr: "Les frais de gestion, nettoyage et commissions plateforme ne sont pas inclus", en: "Management, cleaning fees and platform commissions are not included", ar: "رسوم الإدارة والتنظيف وعمولات المنصة غير مشمولة" },
  "assumptions.scenarios": { fr: "Meilleur scénario: +15% sur l'estimation de base. Pire scénario: -30%", en: "Best case: +15% on base estimate. Worst case: -30%", ar: "أفضل سيناريو: 15%+ على التقدير الأساسي. أسوأ سيناريو: 30%-" },
};

// Amenity translation mapping (original French label → i18n key)
export const AMENITY_KEYS: Record<string, string> = {
  "WiFi": "amenities.wifi",
  "Climatisation": "amenities.ac",
  "Piscine": "amenities.pool",
  "Parking": "amenities.parking",
  "Terrasse": "amenities.terrace",
  "Cuisine équipée": "amenities.kitchen",
  "Machine à laver": "amenities.washer",
  "TV": "amenities.tv",
  "Jardin": "amenities.garden",
  "Vue mer": "amenities.seaView",
  "Cheminée": "amenities.fireplace",
  "Jacuzzi": "amenities.jacuzzi",
  "Salle de sport": "amenities.gym",
};

type I18nContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    // Check URL param first (e.g. ?lang=en), then localStorage
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang === "fr" || urlLang === "en" || urlLang === "ar") return urlLang;
    const saved = localStorage.getItem("domosia-lang");
    return (saved === "fr" || saved === "en" || saved === "ar") ? saved : "fr";
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("domosia-lang", newLang);
  }, []);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const tr = useCallback((key: string) => {
    return t[key]?.[lang] ?? key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, tr, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
