import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  (typeof process !== 'undefined' && process.env?.SUPABASE_URL) || 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://bxsilckpxcpsgojrakfs.supabase.co/';

const supabaseAnonKey = 
  (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) || 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'sb_publishable_LGb-62oHXiolJluDwsXUiw_ZxRfiUpT';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
