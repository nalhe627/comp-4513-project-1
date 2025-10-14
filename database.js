import supa from '@supabase/supabase-js';

const supaUrl = process.env.PROJECT_URL;
const supaAnonKey = process.env.ANON_API_KEY;

const supabase = supa.createClient(supaUrl, supaAnonKey);

export default supabase;