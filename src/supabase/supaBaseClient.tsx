import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types'

// const supabaseUrl = process.env.SUPABASE_URL;
const supabaseUrl = "https://yxikljwoyubyvvuxlztw.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aWtsandveXVieXZ2dXhsenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNzU5NDgsImV4cCI6MjAzMTY1MTk0OH0.VVADwNbshg0rVHhDYQpRj4xn120Fl73r_AUvwyunge4";

const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;