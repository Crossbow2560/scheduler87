import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rvczlchriahiukuctugj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Y3psY2hyaWFoaXVrdWN0dWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MzM0ODYsImV4cCI6MjA5MTEwOTQ4Nn0._I445KYJO50rnCc0zHep5LV4_WP5Fhq3s02MV_T5QKA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
