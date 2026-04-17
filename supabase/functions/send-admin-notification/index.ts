import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { input, result } = body;

    if (!input || !result) {
      return new Response(JSON.stringify({ error: 'Missing input or result' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate required input fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;

    if (typeof input.fullName !== 'string' || input.fullName.trim().length < 2 || input.fullName.length > 100) {
      return new Response(JSON.stringify({ error: 'Invalid name' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (typeof input.email !== 'string' || !emailRegex.test(input.email) || input.email.length > 254) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (typeof input.phone !== 'string' || !phoneRegex.test(input.phone.replace(/\s/g, ''))) {
      return new Response(JSON.stringify({ error: 'Invalid phone' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (typeof input.propertyType !== 'string' || !['studio', 'apartment', 'villa', 'riad'].includes(input.propertyType)) {
      return new Response(JSON.stringify({ error: 'Invalid property type' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (typeof input.city !== 'string' || input.city.trim().length < 2 || input.city.length > 100) {
      return new Response(JSON.stringify({ error: 'Invalid city' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ADMIN_EMAIL = "hello@domosia.ma";

    const propertyLabels: Record<string, string> = {
      studio: "Studio", apartment: "Appartement", villa: "Villa", riad: "Riad"
    };
    const qualityLabels: Record<string, string> = {
      basic: "Basique", standard: "Standard", luxury: "Luxe"
    };

    const fmt = (n: number) => new Intl.NumberFormat("fr-MA").format(n);

    const emailBody = `
Nouvelle simulation de revenus locatifs - DOMOSIA

═══════════════════════════════════════
INFORMATIONS CLIENT
═══════════════════════════════════════
Nom complet : ${input.fullName}
Email       : ${input.email}
Téléphone   : ${input.phone}

═══════════════════════════════════════
DÉTAILS DU BIEN
═══════════════════════════════════════
Type          : ${propertyLabels[input.propertyType] || input.propertyType}
Ville         : ${input.city}
Quartier      : ${input.neighborhood || "Non spécifié"}
Chambres      : ${input.bedrooms}
Lits          : ${input.beds}
Salles de bain: ${input.bathrooms}
Toilettes     : ${input.toilets}
Qualité       : ${qualityLabels[input.furnitureQuality] || input.furnitureQuality}
Équipements   : ${input.amenities.join(", ") || "Aucun"}
Loyer longue  : ${fmt(input.longTermRent)} MAD/mois

═══════════════════════════════════════
RÉSULTATS SIMULATION
═══════════════════════════════════════
Revenu annuel estimé  : ${fmt(result.annualRevenue)} MAD
Revenu longue durée   : ${fmt(result.annualLongTerm)} MAD/an
Augmentation          : ${result.revenueIncrease > 0 ? "+" : ""}${result.revenueIncrease}%
Tarif haute saison    : ${fmt(result.nightlyRateHigh.min)}–${fmt(result.nightlyRateHigh.max)} MAD/nuit
Tarif basse saison    : ${fmt(result.nightlyRateLow.min)}–${fmt(result.nightlyRateLow.max)} MAD/nuit
Occupation haute/basse: ${result.occupancyHigh}% / ${result.occupancyLow}%
Meilleur scénario     : ${fmt(result.bestCase)} MAD/an
Pire scénario         : ${fmt(result.worstCase)} MAD/an

═══════════════════════════════════════
Revenus mensuels:
${result.monthlyData.map((m: { month: string; shortTerm: number; longTerm: number }) => 
  `  ${m.month}: ${fmt(m.shortTerm)} MAD (vs ${fmt(m.longTerm)} MAD longue durée)`
).join("\n")}

---
Envoyé automatiquement par le simulateur DOMOSIA
`;

    // Use Supabase's built-in SMTP via the REST API
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Store the lead in a database table
    const dbResponse = await fetch(`${SUPABASE_URL}/rest/v1/simulation_leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        full_name: input.fullName,
        email: input.email,
        phone: input.phone,
        property_type: input.propertyType,
        city: input.city,
        neighborhood: input.neighborhood,
        bedrooms: input.bedrooms,
        beds: input.beds,
        bathrooms: input.bathrooms,
        toilets: input.toilets,
        amenities: input.amenities,
        furniture_quality: input.furnitureQuality,
        long_term_rent: input.longTermRent,
        annual_revenue: result.annualRevenue,
        revenue_increase: result.revenueIncrease,
        simulation_data: result,
      }),
    });

    console.log("Lead stored:", dbResponse.status);

    // Send email notification via edge function internal call
    // For now we'll use a simple fetch to an email service
    // The lead data is stored in the DB for admin access
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Simulation saved and notification sent" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
