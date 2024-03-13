import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://iislxdtlheahtjwflfir.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpc2x4ZHRsaGVhaHRqd2ZsZmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxNTY3NDEsImV4cCI6MjAyNTczMjc0MX0.3BvC8waPXQ0yXmy4GJntJWgsVWVQp2N9BBUmtue7rrA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
