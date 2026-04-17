// This file is specific to the simulator integration.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wholocgodgwrmlwzlvka.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indob2xvY2dvZGd3cm1sd3psdmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDczNTcsImV4cCI6MjA5MDM4MzM1N30.Rx3Xsh-Q_zg0VjR-eYDwL95NXBB6cLmtSH3IwXRYRFI";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});