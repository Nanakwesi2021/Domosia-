-- Explicitly deny SELECT access for anon and authenticated roles
CREATE POLICY "Deny anon select" ON public.simulation_leads
  FOR SELECT TO anon USING (false);

CREATE POLICY "Deny authenticated select" ON public.simulation_leads
  FOR SELECT TO authenticated USING (false);

CREATE POLICY "Deny anon insert" ON public.simulation_leads
  FOR INSERT TO anon WITH CHECK (false);

CREATE POLICY "Deny authenticated insert" ON public.simulation_leads
  FOR INSERT TO authenticated WITH CHECK (false);

CREATE POLICY "Deny anon update" ON public.simulation_leads
  FOR UPDATE TO anon USING (false);

CREATE POLICY "Deny authenticated update" ON public.simulation_leads
  FOR UPDATE TO authenticated USING (false);

CREATE POLICY "Deny anon delete" ON public.simulation_leads
  FOR DELETE TO anon USING (false);

CREATE POLICY "Deny authenticated delete" ON public.simulation_leads
  FOR DELETE TO authenticated USING (false);