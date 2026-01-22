
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjfwfkcyfgplduudnmtl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZndma2N5ZmdwbGR1dWRubXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODkyMzQsImV4cCI6MjA3NjE2NTIzNH0.zBWDLTEx2NrYzfWh_5st04jO4GTghXTjOQ8Zd7ZmDUU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
