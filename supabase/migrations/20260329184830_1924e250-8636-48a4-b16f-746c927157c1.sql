CREATE TABLE public.simulation_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  property_type text NOT NULL,
  city text NOT NULL,
  neighborhood text,
  bedrooms integer DEFAULT 1,
  beds integer DEFAULT 1,
  bathrooms integer DEFAULT 1,
  toilets integer DEFAULT 1,
  amenities text[] DEFAULT '{}',
  furniture_quality text DEFAULT 'standard',
  long_term_rent numeric DEFAULT 0,
  annual_revenue numeric,
  revenue_increase numeric,
  simulation_data jsonb
);

ALTER TABLE public.simulation_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage leads"
  ON public.simulation_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);