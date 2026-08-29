import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ierngexznkonrkznjqjk.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllcm5nZXh6bmtvbnJrem5qcWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMDA5NTYsImV4cCI6MjEwMzU3Njk1Nn0.bpWA01vGLemWmfkhAXN_PTM4pEShuc5Q2XAmTQfQkJw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

