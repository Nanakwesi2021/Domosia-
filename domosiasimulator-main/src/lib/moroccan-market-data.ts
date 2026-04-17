// Realistic Moroccan short-term rental market data (MAD per night)
// Based on 2024 Airbnb/Booking averages for each city

export type CityData = {
  label: string;
  neighborhoods: string[];
  baseRates: {
    studio: { high: number; low: number };
    apartment: { high: number; low: number };
    villa: { high: number; low: number };
    riad: { high: number; low: number };
  };
  highSeasonMonths: number[];
  occupancyHigh: number;
  occupancyLow: number;
};

export const CITIES: Record<string, CityData> = {
  marrakech: {
    label: "Marrakech",
    neighborhoods: ["Médina", "Guéliz", "Hivernage", "Palmeraie", "Targa", "Route de l'Ourika"],
    baseRates: {
      studio: { high: 550, low: 350 },
      apartment: { high: 850, low: 500 },
      villa: { high: 2800, low: 1600 },
      riad: { high: 1800, low: 1000 },
    },
    highSeasonMonths: [3, 4, 5, 10, 11, 12],
    occupancyHigh: 0.82,
    occupancyLow: 0.55,
  },
  casablanca: {
    label: "Casablanca",
    neighborhoods: ["Maarif", "Anfa", "Gauthier", "Bourgogne", "Ain Diab", "Centre Ville"],
    baseRates: {
      studio: { high: 480, low: 320 },
      apartment: { high: 750, low: 450 },
      villa: { high: 2200, low: 1400 },
      riad: { high: 1200, low: 750 },
    },
    highSeasonMonths: [6, 7, 8, 9],
    occupancyHigh: 0.75,
    occupancyLow: 0.50,
  },
  tangier: {
    label: "Tanger",
    neighborhoods: ["Kasbah", "Ville Nouvelle", "Malabata", "Tanja Marina", "Cap Spartel", "Boukhalef"],
    baseRates: {
      studio: { high: 500, low: 300 },
      apartment: { high: 700, low: 420 },
      villa: { high: 2400, low: 1300 },
      riad: { high: 1400, low: 800 },
    },
    highSeasonMonths: [6, 7, 8, 9],
    occupancyHigh: 0.78,
    occupancyLow: 0.45,
  },
  agadir: {
    label: "Agadir",
    neighborhoods: ["Bord de Mer", "Founty", "Sonaba", "Charaf", "Talborjt", "Bay d'Agadir"],
    baseRates: {
      studio: { high: 450, low: 280 },
      apartment: { high: 680, low: 400 },
      villa: { high: 2000, low: 1200 },
      riad: { high: 1100, low: 650 },
    },
    highSeasonMonths: [10, 11, 12, 1, 2, 3],
    occupancyHigh: 0.80,
    occupancyLow: 0.48,
  },
  fes: {
    label: "Fès",
    neighborhoods: ["Fès el-Bali", "Fès el-Jdid", "Ville Nouvelle", "Route de Sefrou", "Ain Chkef"],
    baseRates: {
      studio: { high: 400, low: 250 },
      apartment: { high: 600, low: 380 },
      villa: { high: 1800, low: 1000 },
      riad: { high: 1500, low: 850 },
    },
    highSeasonMonths: [3, 4, 5, 9, 10, 11],
    occupancyHigh: 0.72,
    occupancyLow: 0.42,
  },
  essaouira: {
    label: "Essaouira",
    neighborhoods: ["Médina", "Diabat", "Bord de Mer", "Quartier des Dunes"],
    baseRates: {
      studio: { high: 480, low: 300 },
      apartment: { high: 700, low: 420 },
      villa: { high: 2200, low: 1200 },
      riad: { high: 1400, low: 800 },
    },
    highSeasonMonths: [6, 7, 8, 9],
    occupancyHigh: 0.76,
    occupancyLow: 0.40,
  },
  rabat: {
    label: "Rabat",
    neighborhoods: ["Agdal", "Hassan", "Les Orangers", "Hay Riad", "Souissi", "Médina"],
    baseRates: {
      studio: { high: 420, low: 280 },
      apartment: { high: 650, low: 400 },
      villa: { high: 2000, low: 1200 },
      riad: { high: 1100, low: 700 },
    },
    highSeasonMonths: [6, 7, 8, 9],
    occupancyHigh: 0.70,
    occupancyLow: 0.45,
  },
  chefchaouen: {
    label: "Chefchaouen",
    neighborhoods: ["Médina", "Ras el-Maa", "Quartier Andalou"],
    baseRates: {
      studio: { high: 380, low: 220 },
      apartment: { high: 550, low: 320 },
      villa: { high: 1600, low: 900 },
      riad: { high: 1200, low: 700 },
    },
    highSeasonMonths: [4, 5, 6, 7, 8, 9],
    occupancyHigh: 0.74,
    occupancyLow: 0.35,
  },
};

export const PROPERTY_TYPES = [
  { value: "studio", label: "Studio" },
  { value: "apartment", label: "Appartement" },
  { value: "villa", label: "Villa" },
  { value: "riad", label: "Riad" },
] as const;

export const AMENITIES = [
  "WiFi", "Climatisation", "Piscine", "Parking", "Terrasse",
  "Cuisine équipée", "Machine à laver", "TV", "Jardin", "Vue mer",
  "Cheminée", "Jacuzzi", "Salle de sport",
] as const;

export const FURNITURE_QUALITY = [
  { value: "basic", label: "Basique", multiplier: 0.8 },
  { value: "standard", label: "Standard", multiplier: 1.0 },
  { value: "luxury", label: "Luxe", multiplier: 1.35 },
] as const;

export type PropertyInput = {
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  city: string;
  neighborhood: string;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  toilets: number;
  amenities: string[];
  furnitureQuality: string;
  longTermRent: number;
};

// Realistic caps per city/property type (max nightly rate in MAD)
export const NIGHTLY_RATE_CAPS: Record<string, Record<string, number>> = {
  marrakech: { studio: 1200, apartment: 2000, villa: 8000, riad: 5000 },
  casablanca: { studio: 1000, apartment: 1800, villa: 6000, riad: 3000 },
  tangier: { studio: 1000, apartment: 1600, villa: 6500, riad: 3500 },
  agadir: { studio: 900, apartment: 1500, villa: 5500, riad: 2800 },
  fes: { studio: 800, apartment: 1400, villa: 5000, riad: 4000 },
  essaouira: { studio: 1000, apartment: 1600, villa: 6000, riad: 3500 },
  rabat: { studio: 900, apartment: 1500, villa: 5500, riad: 2800 },
  chefchaouen: { studio: 800, apartment: 1200, villa: 4000, riad: 3000 },
};

// Room count limits per property type
export const ROOM_LIMITS: Record<string, { maxBedrooms: number; maxBeds: number; maxBathrooms: number }> = {
  studio: { maxBedrooms: 1, maxBeds: 2, maxBathrooms: 1 },
  apartment: { maxBedrooms: 5, maxBeds: 8, maxBathrooms: 4 },
  villa: { maxBedrooms: 10, maxBeds: 15, maxBathrooms: 8 },
  riad: { maxBedrooms: 8, maxBeds: 12, maxBathrooms: 6 },
};

// Long-term rent realistic ranges per city (MAD/month)
export const RENT_RANGES: Record<string, { min: number; max: number }> = {
  marrakech: { min: 2000, max: 50000 },
  casablanca: { min: 2500, max: 60000 },
  tangier: { min: 2000, max: 45000 },
  agadir: { min: 1500, max: 40000 },
  fes: { min: 1500, max: 35000 },
  essaouira: { min: 2000, max: 40000 },
  rabat: { min: 2000, max: 50000 },
  chefchaouen: { min: 1000, max: 25000 },
};

export type ValidationWarning = {
  field: string;
  message: string;
};

export function validateInputs(input: PropertyInput): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  const limits = ROOM_LIMITS[input.propertyType];
  
  if (limits) {
    if (input.bedrooms > limits.maxBedrooms) {
      warnings.push({ field: "bedrooms", message: `Maximum ${limits.maxBedrooms} chambres pour un ${input.propertyType}` });
    }
    if (input.beds > limits.maxBeds) {
      warnings.push({ field: "beds", message: `Maximum ${limits.maxBeds} lits pour un ${input.propertyType}` });
    }
    if (input.bathrooms > limits.maxBathrooms) {
      warnings.push({ field: "bathrooms", message: `Maximum ${limits.maxBathrooms} salles de bain pour un ${input.propertyType}` });
    }
  }

  if (input.city && input.longTermRent > 0) {
    const range = RENT_RANGES[input.city];
    if (range && (input.longTermRent < range.min || input.longTermRent > range.max)) {
      warnings.push({ field: "longTermRent", message: `Loyer attendu entre ${range.min.toLocaleString()} et ${range.max.toLocaleString()} MAD pour ${CITIES[input.city]?.label}` });
    }
  }

  return warnings;
}

export function validateResults(result: SimulationResult, input: PropertyInput): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  const cap = NIGHTLY_RATE_CAPS[input.city]?.[input.propertyType];
  
  if (cap && result.nightlyRateHigh.max > cap) {
    warnings.push({ field: "rate", message: `Le tarif estimé dépasse le plafond réaliste de ${cap} MAD/nuit pour ce type de bien dans cette ville` });
  }

  if (result.revenueIncrease > 300) {
    warnings.push({ field: "revenue", message: "L'augmentation de revenu semble irréaliste. Veuillez vérifier vos données." });
  }

  return warnings;
}

export type SimulationResult = {
  nightlyRateHigh: { min: number; max: number };
  nightlyRateLow: { min: number; max: number };
  monthlyRevenueHigh: number;
  monthlyRevenueLow: number;
  annualRevenue: number;
  occupancyHigh: number;
  occupancyLow: number;
  revenueIncrease: number;
  annualLongTerm: number;
  monthlyData: { month: string; shortTerm: number; longTerm: number }[];
  bestCase: number;
  worstCase: number;
};

const MONTH_LABELS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export function simulateRevenue(input: PropertyInput): SimulationResult {
  const cityData = CITIES[input.city];
  if (!cityData) throw new Error("City not found");

  const type = input.propertyType as keyof CityData["baseRates"];
  const baseHigh = cityData.baseRates[type]?.high ?? 600;
  const baseLow = cityData.baseRates[type]?.low ?? 350;

  // Adjustments
  const bedroomMultiplier = 1 + (input.bedrooms - 1) * 0.18;
  const qualityData = FURNITURE_QUALITY.find(f => f.value === input.furnitureQuality);
  const qualityMultiplier = qualityData?.multiplier ?? 1;
  const amenityBonus = 1 + input.amenities.length * 0.025;

  const adjustedHigh = Math.round(baseHigh * bedroomMultiplier * qualityMultiplier * amenityBonus);
  const adjustedLow = Math.round(baseLow * bedroomMultiplier * qualityMultiplier * amenityBonus);

  const occHigh = cityData.occupancyHigh;
  const occLow = cityData.occupancyLow;

  const monthlyHigh = Math.round(adjustedHigh * 30 * occHigh);
  const monthlyLow = Math.round(adjustedLow * 30 * occLow);

  const highMonths = cityData.highSeasonMonths;
  const monthlyData = MONTH_LABELS.map((label, i) => {
    const isHigh = highMonths.includes(i + 1);
    const rate = isHigh ? adjustedHigh : adjustedLow;
    const occ = isHigh ? occHigh : occLow;
    return {
      month: label,
      shortTerm: Math.round(rate * 30 * occ),
      longTerm: input.longTermRent,
    };
  });

  const annualRevenue = monthlyData.reduce((sum, m) => sum + m.shortTerm, 0);
  const annualLongTerm = input.longTermRent * 12;
  const revenueIncrease = annualLongTerm > 0 ? ((annualRevenue - annualLongTerm) / annualLongTerm) * 100 : 0;

  const bestCase = Math.round(annualRevenue * 1.15);
  const worstCase = Math.round(annualRevenue * 0.7);

  return {
    nightlyRateHigh: { min: Math.round(adjustedHigh * 0.9), max: Math.round(adjustedHigh * 1.1) },
    nightlyRateLow: { min: Math.round(adjustedLow * 0.9), max: Math.round(adjustedLow * 1.1) },
    monthlyRevenueHigh: monthlyHigh,
    monthlyRevenueLow: monthlyLow,
    annualRevenue,
    occupancyHigh: Math.round(occHigh * 100),
    occupancyLow: Math.round(occLow * 100),
    revenueIncrease: Math.round(revenueIncrease),
    annualLongTerm,
    monthlyData,
    bestCase,
    worstCase,
  };
}
